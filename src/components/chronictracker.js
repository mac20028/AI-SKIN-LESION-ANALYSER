import React, { useState, useRef } from 'react';
import { 
  Calendar, 
  Camera, 
  Upload, 
  Plus, 
  TrendingUp, 
  Clock, 
  Heart, 
  Moon, 
  Utensils, 
  Droplets, 
  Thermometer,
  Activity,
  Brain,
  Pill,
  Eye,
  BarChart3,
  Image as ImageIcon,
  X,
  Check,
  AlertCircle,
  Star,
  ChevronLeft,
  ChevronRight,
  Filter,
  Download,
  Share2
} from 'lucide-react';

const ChronicTracker = () => {
  const [chronicEntries, setChronicEntries] = useState([]);
  const [activeView, setActiveView] = useState('dashboard'); // dashboard, add-entry, photos, analytics
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedPhotos, setSelectedPhotos] = useState([]);
  const [currentEntry, setCurrentEntry] = useState({
    symptoms: {
      itching: 0,
      redness: 0,
      pain: 0,
      swelling: 0,
      dryness: 0
    },
    lifestyle: {
      sleepHours: 8,
      sleepQuality: 5,
      stressLevel: 3,
      exerciseMinutes: 0,
      waterIntake: 8
    },
    medications: [],
    skincare: [],
    diet: {
      spicyFood: false,
      dairy: false,
      nuts: false,
      alcohol: false,
      caffeine: false
    },
    notes: '',
    mood: 5,
    photos: []
  });
  
  const fileInputRef = useRef(null);

  // Mock data for demonstration
  const mockEntries = [
    {
      id: 1,
      date: '2025-01-15',
      symptoms: { itching: 3, redness: 2, pain: 1, swelling: 0, dryness: 4 },
      lifestyle: { sleepHours: 7, sleepQuality: 4, stressLevel: 6, exerciseMinutes: 30, waterIntake: 6 },
      mood: 6,
      photos: ['photo1.jpg', 'photo2.jpg']
    },
    {
      id: 2,
      date: '2025-01-14',
      symptoms: { itching: 5, redness: 4, pain: 3, swelling: 2, dryness: 5 },
      lifestyle: { sleepHours: 6, sleepQuality: 3, stressLevel: 8, exerciseMinutes: 0, waterIntake: 4 },
      mood: 4,
      photos: ['photo3.jpg']
    }
  ];

  const addChronicEntry = () => {
    const newEntry = {
      id: Date.now(),
      date: selectedDate,
      ...currentEntry
    };
    setChronicEntries([newEntry, ...chronicEntries]);
    setShowAddModal(false);
    resetCurrentEntry();
  };

  const resetCurrentEntry = () => {
    setCurrentEntry({
      symptoms: { itching: 0, redness: 0, pain: 0, swelling: 0, dryness: 0 },
      lifestyle: { sleepHours: 8, sleepQuality: 5, stressLevel: 3, exerciseMinutes: 0, waterIntake: 8 },
      medications: [],
      skincare: [],
      diet: { spicyFood: false, dairy: false, nuts: false, alcohol: false, caffeine: false },
      notes: '',
      mood: 5,
      photos: []
    });
    setSelectedPhotos([]);
  };

  const handlePhotoUpload = (event) => {
    const files = Array.from(event.target.files);
    const newPhotos = files.map(file => ({
      id: Date.now() + Math.random(),
      file,
      url: URL.createObjectURL(file),
      name: file.name
    }));
    setSelectedPhotos([...selectedPhotos, ...newPhotos]);
  };

  const removePhoto = (photoId) => {
    setSelectedPhotos(selectedPhotos.filter(photo => photo.id !== photoId));
  };

  const SymptomSlider = ({ label, value, onChange, color, icon: Icon }) => (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon size={16} className={`text-${color}-500`} />
          <label className="text-sm font-medium">{label}</label>
        </div>
        <span className={`text-sm font-bold text-${color}-600`}>{value}/10</span>
      </div>
      <div className="relative">
        <input
          type="range"
          min="0"
          max="10"
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value))}
          className={`w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-200 slider-${color}`}
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>None</span>
          <span>Severe</span>
        </div>
      </div>
    </div>
  );

  const StatCard = ({ title, value, subtitle, icon: Icon, color, trend }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 mb-1">{title}</p>
          <p className={`text-3xl font-bold text-${color}-600`}>{value}</p>
          {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
        </div>
        <div className={`p-3 rounded-full bg-${color}-100`}>
          <Icon className={`text-${color}-600`} size={24} />
        </div>
      </div>
      {trend && (
        <div className="flex items-center mt-3 text-sm">
          <TrendingUp size={16} className="text-green-500 mr-1" />
          <span className="text-green-600">+12% from last week</span>
        </div>
      )}
    </div>
  );

  const DashboardView = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Skin Health Tracker</h1>
          <p className="text-gray-600">Monitor your daily symptoms and lifestyle patterns</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setActiveView('analytics')}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2"
          >
            <BarChart3 size={18} />
            Analytics
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 flex items-center gap-2 shadow-lg"
          >
            <Plus size={18} />
            Add Entry
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Streak Days" 
          value="12" 
          subtitle="Current tracking streak"
          icon={Calendar} 
          color="green"
          trend={true}
        />
        <StatCard 
          title="Avg Symptoms" 
          value="3.2" 
          subtitle="Last 7 days severity"
          icon={Activity} 
          color="orange"
        />
        <StatCard 
          title="Photos Taken" 
          value="24" 
          subtitle="This month"
          icon={Camera} 
          color="blue"
        />
        <StatCard 
          title="Sleep Quality" 
          value="7.5" 
          subtitle="Weekly average"
          icon={Moon} 
          color="purple"
        />
      </div>

      {/* Recent Entries */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Recent Entries</h3>
            <button 
              onClick={() => setActiveView('photos')}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              View All Photos
            </button>
          </div>
        </div>
        
        <div className="p-6">
          {[...chronicEntries, ...mockEntries].length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="text-gray-400" size={32} />
              </div>
              <h4 className="text-lg font-medium text-gray-900 mb-2">No entries yet</h4>
              <p className="text-gray-500 mb-6">Start tracking your skin health journey today!</p>
              <button
                onClick={() => setShowAddModal(true)}
                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Add Your First Entry
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {[...chronicEntries, ...mockEntries].slice(0, 3).map((entry) => (
                <div key={entry.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-gray-900">{entry.date}</h4>
                    <div className="flex items-center gap-2">
                      {entry.photos && entry.photos.length > 0 && (
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <Camera size={14} />
                          <span>{entry.photos.length}</span>
                        </div>
                      )}
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                        entry.mood >= 7 ? 'bg-green-100 text-green-800' :
                        entry.mood >= 5 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        Mood: {entry.mood}/10
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Itching:</span>
                      <div className="flex items-center gap-1 mt-1">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={12} className={i < entry.symptoms.itching/2 ? 'text-red-400 fill-current' : 'text-gray-300'} />
                          ))}
                        </div>
                        <span className="text-xs text-gray-600">{entry.symptoms.itching}/10</span>
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-500">Sleep:</span>
                      <div className="font-medium">{entry.lifestyle.sleepHours}h</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Stress:</span>
                      <div className="font-medium">{entry.lifestyle.stressLevel}/10</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Exercise:</span>
                      <div className="font-medium">{entry.lifestyle.exerciseMinutes}min</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Water:</span>
                      <div className="font-medium">{entry.lifestyle.waterIntake} glasses</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const AddEntryModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Add Daily Entry</h2>
            <button
              onClick={() => setShowAddModal(false)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X size={24} />
            </button>
          </div>
          <p className="text-gray-600 mt-1">Track your symptoms, lifestyle, and photos for {selectedDate}</p>
        </div>

        <div className="p-6 space-y-8">
          {/* Date Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Symptoms Tracking */}
          <div className="bg-red-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Thermometer className="text-red-500" size={20} />
              Symptom Severity
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SymptomSlider
                label="Itching"
                value={currentEntry.symptoms.itching}
                onChange={(value) => setCurrentEntry({
                  ...currentEntry,
                  symptoms: { ...currentEntry.symptoms, itching: value }
                })}
                color="red"
                icon={Activity}
              />
              <SymptomSlider
                label="Redness"
                value={currentEntry.symptoms.redness}
                onChange={(value) => setCurrentEntry({
                  ...currentEntry,
                  symptoms: { ...currentEntry.symptoms, redness: value }
                })}
                color="orange"
                icon={Eye}
              />
              <SymptomSlider
                label="Pain"
                value={currentEntry.symptoms.pain}
                onChange={(value) => setCurrentEntry({
                  ...currentEntry,
                  symptoms: { ...currentEntry.symptoms, pain: value }
                })}
                color="red"
                icon={AlertCircle}
              />
              <SymptomSlider
                label="Dryness"
                value={currentEntry.symptoms.dryness}
                onChange={(value) => setCurrentEntry({
                  ...currentEntry,
                  symptoms: { ...currentEntry.symptoms, dryness: value }
                })}
                color="blue"
                icon={Droplets}
              />
            </div>
          </div>

          {/* Lifestyle Tracking */}
          <div className="bg-green-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Heart className="text-green-500" size={20} />
              Lifestyle Factors
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Moon size={16} />
                  Sleep Hours
                </label>
                <input
                  type="number"
                  min="0"
                  max="24"
                  value={currentEntry.lifestyle.sleepHours}
                  onChange={(e) => setCurrentEntry({
                    ...currentEntry,
                    lifestyle: { ...currentEntry.lifestyle, sleepHours: parseInt(e.target.value) }
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </div>
              <SymptomSlider
                label="Sleep Quality"
                value={currentEntry.lifestyle.sleepQuality}
                onChange={(value) => setCurrentEntry({
                  ...currentEntry,
                  lifestyle: { ...currentEntry.lifestyle, sleepQuality: value }
                })}
                color="green"
                icon={Moon}
              />
              <SymptomSlider
                label="Stress Level"
                value={currentEntry.lifestyle.stressLevel}
                onChange={(value) => setCurrentEntry({
                  ...currentEntry,
                  lifestyle: { ...currentEntry.lifestyle, stressLevel: value }
                })}
                color="orange"
                icon={Brain}
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Activity size={16} />
                  Exercise (minutes)
                </label>
                <input
                  type="number"
                  min="0"
                  value={currentEntry.lifestyle.exerciseMinutes}
                  onChange={(e) => setCurrentEntry({
                    ...currentEntry,
                    lifestyle: { ...currentEntry.lifestyle, exerciseMinutes: parseInt(e.target.value) }
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>
          </div>

          {/* Diet Triggers */}
          <div className="bg-yellow-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Utensils className="text-yellow-500" size={20} />
              Diet & Triggers
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {Object.entries(currentEntry.diet).map(([key, value]) => (
                <label key={key} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={(e) => setCurrentEntry({
                      ...currentEntry,
                      diet: { ...currentEntry.diet, [key]: e.target.checked }
                    })}
                    className="w-5 h-5 text-yellow-600 rounded focus:ring-yellow-500"
                  />
                  <span className="text-sm font-medium capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Photo Upload */}
          <div className="bg-blue-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Camera className="text-blue-500" size={20} />
              Daily Photos
            </h3>
            <div className="space-y-4">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full border-2 border-dashed border-blue-300 rounded-lg p-8 text-center hover:border-blue-400 hover:bg-blue-25 transition-colors"
              >
                <Upload className="mx-auto text-blue-400 mb-4" size={48} />
                <p className="text-lg font-medium text-blue-600">Upload Photos</p>
                <p className="text-sm text-blue-500">Click to select or drag and drop</p>
              </button>
              
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
              />
              
              {selectedPhotos.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {selectedPhotos.map((photo) => (
                    <div key={photo.id} className="relative group">
                      <img
                        src={photo.url}
                        alt="Upload preview"
                        className="w-full h-24 object-cover rounded-lg border border-gray-200"
                      />
                      <button
                        onClick={() => removePhoto(photo.id)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Additional Notes</label>
            <textarea
              value={currentEntry.notes}
              onChange={(e) => setCurrentEntry({ ...currentEntry, notes: e.target.value })}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Any additional observations, treatments used, or environmental factors..."
            />
          </div>

          {/* Overall Mood */}
          <div>
            <SymptomSlider
              label="Overall Mood"
              value={currentEntry.mood}
              onChange={(value) => setCurrentEntry({ ...currentEntry, mood: value })}
              color="purple"
              icon={Heart}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 rounded-b-2xl">
          <div className="flex gap-3 justify-end">
            <button
              onClick={() => setShowAddModal(false)}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={addChronicEntry}
              className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 flex items-center gap-2"
            >
              <Check size={18} />
              Save Entry
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        <DashboardView />
        {showAddModal && <AddEntryModal />}
      </div>
      
      <style jsx>{`
        .slider-red::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #ef4444;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .slider-orange::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #f97316;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .slider-green::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #22c55e;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .slider-blue::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .slider-purple::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #8b5cf6;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
      `}</style>
    </div>
  );
};

export default ChronicTracker;