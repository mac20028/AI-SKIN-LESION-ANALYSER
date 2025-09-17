import React, { useState, useRef, useEffect } from 'react';
import { Camera, Video, Circle, Send, Shield, CheckCircle, X } from 'lucide-react';

const SkinAnalysis = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordedVideo, setRecordedVideo] = useState(null);
  const [screenshots, setScreenshots] = useState([]);
  const [annotations, setAnnotations] = useState({});
  const [analysisResult, setAnalysisResult] = useState(null);
  const [recordingTimer, setRecordingTimer] = useState(0);
  const [currentGuidance, setCurrentGuidance] = useState('');
  
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const streamRef = useRef(null);

  const mockAnalysisResults = {
    disease: 'Seborrheic Keratosis',
    confidence: 87,
    riskLevel: 'Low',
    description: 'A non-cancerous skin growth that appears as a waxy, scaly, slightly raised growth.',
    precautions: [
      'Monitor for changes in size, color, or texture',
      'Protect from sun exposure',
      'Keep the area clean and dry',
      'Schedule regular dermatological checkups'
    ]
  };

  const guidanceSteps = [
    "Position the lesion in good lighting",
    "Hold the camera steady and close to the skin",
    "Show the lesion from directly above",
    "Slowly rotate around the lesion",
    "Capture different angles - left side",
    "Capture different angles - right side",
    "Move closer for detailed view",
    "Recording complete!"
  ];

  useEffect(() => {
    let interval;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTimer(prev => prev + 1);
      }, 1000);
    } else {
      setRecordingTimer(0);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  useEffect(() => {
    if (isRecording) {
      const stepDuration = 3;
      const currentStep = Math.floor(recordingTimer / stepDuration);
      if (currentStep < guidanceSteps.length) {
        setCurrentGuidance(guidanceSteps[currentStep]);
      }
    }
  }, [recordingTimer, isRecording]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }, 
        audio: false 
      });
      
      streamRef.current = stream;
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      
      const chunks = [];
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };
      
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        setRecordedVideo(URL.createObjectURL(blob));
        generateScreenshots(blob);
        
        if (streamRef.current) {
          streamRef.current.getTracks().forEach(track => track.stop());
        }
      };
      
      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert('Unable to access camera. Please ensure camera permissions are granted.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      setIsRecording(false);
    }
  };

  const generateScreenshots = (videoBlob) => {
    const video = document.createElement('video');
    video.src = URL.createObjectURL(videoBlob);
    
    video.onloadedmetadata = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const capturedScreenshots = [];
      const totalFrames = 6;
      
      const captureFrame = (frameIndex) => {
        if (frameIndex >= totalFrames) {
          setScreenshots(capturedScreenshots.sort((a, b) => a.id - b.id));
          return;
        }
        
        const timePosition = (video.duration / (totalFrames + 1)) * (frameIndex + 1);
        video.currentTime = timePosition;
        
        video.onseeked = () => {
          setTimeout(() => {
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            const screenshotUrl = canvas.toDataURL('image/jpeg', 0.8);
            
            capturedScreenshots.push({ 
              id: frameIndex + 1, 
              url: screenshotUrl, 
              timestamp: timePosition 
            });
            
            captureFrame(frameIndex + 1);
          }, 100);
        };
      };
      
      captureFrame(0);
    };
  };

  const handleImageClick = (event, screenshotId) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    
    setAnnotations({
      ...annotations,
      [screenshotId]: { x, y }
    });
  };

  const analyzeImage = () => {
    setTimeout(() => {
      setAnalysisResult(mockAnalysisResults);
    }, 2000);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">AI Skin Analysis</h1>
      
      {!recordedVideo ? (
        <div className="max-w-2xl mx-auto">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
              <Shield className="text-blue-600" size={20} />
              Recording Guidelines
            </h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Ensure good lighting - natural light works best</li>
              <li>• Hold your device steady</li>
              <li>• Record for 15-20 seconds</li>
              <li>• Show the lesion from multiple angles</li>
              <li>• Keep the lesion in center of the frame</li>
              <li>• Move slowly and smoothly around the area</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h3 className="text-lg font-semibold mb-4">Record Video for Analysis</h3>
            
            {isRecording && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="font-medium text-green-800">Recording: {formatTime(recordingTimer)}</span>
                  </div>
                </div>
                <p className="text-green-700 font-medium mt-2">{currentGuidance}</p>
                <div className="mt-2 bg-green-200 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min((recordingTimer / 24) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
            )}
            
            <div className="relative bg-black rounded-lg overflow-hidden mb-4" style={{aspectRatio: '16/9'}}>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />
              
              {isRecording && (
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-12 h-12 border-2 border-white border-opacity-70 rounded-full"></div>
                  </div>
                  <div className="absolute top-4 left-4 w-6 h-6 border-l-2 border-t-2 border-white border-opacity-50"></div>
                  <div className="absolute top-4 right-4 w-6 h-6 border-r-2 border-t-2 border-white border-opacity-50"></div>
                  <div className="absolute bottom-4 left-4 w-6 h-6 border-l-2 border-b-2 border-white border-opacity-50"></div>
                  <div className="absolute bottom-4 right-4 w-6 h-6 border-r-2 border-b-2 border-white border-opacity-50"></div>
                </div>
              )}

              {!isRecording && !streamRef.current && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <Camera size={48} className="mx-auto mb-4 opacity-50" />
                    <p className="text-lg">Camera Preview</p>
                    <p className="text-sm opacity-70">Click "Start Recording" to access camera</p>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex gap-4 justify-center">
              <button
                onClick={isRecording ? stopRecording : startRecording}
                className={`px-8 py-4 rounded-lg flex items-center gap-3 text-lg font-medium ${
                  isRecording 
                    ? 'bg-red-500 hover:bg-red-600 text-white' 
                    : 'bg-blue-500 hover:bg-blue-600 text-white'
                }`}
              >
                {isRecording ? (
                  <>
                    <div className="w-4 h-4 bg-white rounded-sm"></div>
                    Stop Recording
                  </>
                ) : (
                  <>
                    <Video size={24} />
                    Start Recording
                  </>
                )}
              </button>
            </div>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium mb-2">💡 Pro Tips:</h4>
              <div className="text-sm text-gray-600 space-y-1">
                <p>• Record for at least 15 seconds to capture all angles</p>
                <p>• Keep the lesion within the center circle guide</p>
                <p>• Move slowly - the AI needs clear, stable footage</p>
                <p>• If lighting is poor, move to a window or brighter area</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto">
          {screenshots.length === 0 ? (
            <div className="text-center py-12">
              <div className="animate-spin w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-6"></div>
              <h3 className="text-lg font-semibold mb-2">Processing Your Video</h3>
              <p className="text-gray-600">Generating screenshots from video for analysis...</p>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold">Select and Annotate Images</h3>
                  <p className="text-gray-600">
                    Click on any lesion or area of concern in the images below to mark it for analysis.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setRecordedVideo(null);
                    setScreenshots([]);
                    setAnnotations({});
                    setAnalysisResult(null);
                  }}
                  className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg flex items-center gap-2"
                >
                  <X size={18} />
                  Record Again
                </button>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                {screenshots.map((screenshot) => (
                  <div key={screenshot.id} className="relative">
                    <div 
                      className="relative cursor-crosshair border-2 border-gray-200 rounded-lg overflow-hidden hover:border-blue-400 transition-colors"
                      onClick={(e) => handleImageClick(e, screenshot.id)}
                    >
                      <img 
                        src={screenshot.url} 
                        alt={`Screenshot ${screenshot.id}`}
                        className="w-full h-48 object-cover"
                      />
                      {annotations[screenshot.id] && (
                        <div
                          className="absolute w-8 h-8 border-2 border-red-500 bg-red-500 bg-opacity-20 rounded-full transform -translate-x-1/2 -translate-y-1/2"
                          style={{
                            left: `${annotations[screenshot.id].x}%`,
                            top: `${annotations[screenshot.id].y}%`
                          }}
                        >
                          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-red-500 rounded-full"></div>
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-2 text-center">
                      Frame {screenshot.id}
                    </p>
                  </div>
                ))}
              </div>
              
              <div className="text-center">
                <button
                  onClick={analyzeImage}
                  disabled={Object.keys(annotations).length === 0}
                  className="px-8 py-3 bg-green-500 hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg flex items-center gap-2 mx-auto"
                >
                  <Circle size={20} />
                  Analyze Selected Areas ({Object.keys(annotations).length})
                </button>
                
                {Object.keys(annotations).length === 0 && (
                  <p className="text-sm text-gray-500 mt-2">
                    Please mark at least one lesion to proceed with analysis
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      )}
      
      {analysisResult && (
        <div className="max-w-2xl mx-auto mt-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <CheckCircle className="text-green-500" size={24} />
              Analysis Results
            </h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-semibold">{analysisResult.disease}</h4>
                  <p className="text-sm text-gray-600">Confidence: {analysisResult.confidence}%</p>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                  analysisResult.riskLevel === 'Low' ? 'bg-green-100 text-green-800' :
                  analysisResult.riskLevel === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {analysisResult.riskLevel} Risk
                </div>
              </div>
              
              <div>
                <h5 className="font-medium mb-2">Description</h5>
                <p className="text-gray-600 text-sm">{analysisResult.description}</p>
              </div>
              
              <div>
                <h5 className="font-medium mb-2">Recommended Precautions</h5>
                <ul className="text-sm text-gray-600 space-y-1">
                  {analysisResult.precautions.map((precaution, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                      {precaution}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="flex gap-4 pt-4">
                <button className="flex-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg flex items-center justify-center gap-2">
                  <Send size={18} />
                  Share with Doctor
                </button>
                <button className="flex-1 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg flex items-center justify-center gap-2">
                  <FileText size={18} />
                  Save Report
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SkinAnalysis;