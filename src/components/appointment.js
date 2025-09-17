import React, { useState } from 'react';

const Appointments = () => {
  const [doctors] = useState([
    {
      id: 1,
      name: "Dr. Michael Chen",
      specialty: "Dermatologist",
      subSpecialty: "Acne & Skin Infections",
      rating: 4.9,
      availability: "Available",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 2,
      name: "Dr. Sarah Rodriguez",
      specialty: "Dermatologist",
      subSpecialty: "Eczema & Psoriasis",
      rating: 4.8,
      availability: "Available",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 3,
      name: "Dr. James Parker",
      specialty: "Dermatologist",
      subSpecialty: "Skin Cancer & Moles",
      rating: 4.7,
      availability: "Busy",
      image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 4,
      name: "Dr. Emily Kim",
      specialty: "Dermatologist",
      subSpecialty: "Allergic Skin Reactions",
      rating: 4.6,
      availability: "Available",
      image: "https://images.unsplash.com/photo-1594824388875-3fc4b3dee2cc?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 5,
      name: "Dr. David Thompson",
      specialty: "Dermatologist",
      subSpecialty: "Fungal Infections",
      rating: 4.5,
      availability: "Available",
      image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 6,
      name: "Dr. Lisa Martinez",
      specialty: "Dermatologist",
      subSpecialty: "Rosacea & Sensitive Skin",
      rating: 4.8,
      availability: "Available",
      image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 7,
      name: "Dr. Robert Wilson",
      specialty: "Dermatologist",
      subSpecialty: "Vitiligo & Pigmentation",
      rating: 4.7,
      availability: "Available",
      image: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 8,
      name: "Dr. Amanda Foster",
      specialty: "Dermatologist",
      subSpecialty: "Hair Loss & Scalp Disorders",
      rating: 4.6,
      availability: "Busy",
      image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 9,
      name: "Dr. Kevin Chang",
      specialty: "Dermatologist",
      subSpecialty: "Skin Allergies & Contact Dermatitis",
      rating: 4.9,
      availability: "Available",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 10,
      name: "Dr. Nicole Brown",
      specialty: "Dermatologist",
      subSpecialty: "Pediatric Dermatology",
      rating: 4.8,
      availability: "Available",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 11,
      name: "Dr. Thomas Lee",
      specialty: "Dermatologist",
      subSpecialty: "Warts & Viral Skin Infections",
      rating: 4.5,
      availability: "Available",
      image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 12,
      name: "Dr. Jessica Adams",
      specialty: "Dermatologist",
      subSpecialty: "Chronic Skin Conditions",
      rating: 4.7,
      availability: "Busy",
      image: "https://images.unsplash.com/photo-1594824388875-3fc4b3dee2cc?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 13,
      name: "Dr. Mark Johnson",
      specialty: "Dermatologist",
      subSpecialty: "Skin Lesions & Cysts",
      rating: 4.6,
      availability: "Available",
      image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 14,
      name: "Dr. Rachel Green",
      specialty: "Dermatologist",
      subSpecialty: "Anti-Aging & Wrinkle Treatment",
      rating: 4.8,
      availability: "Available",
      image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 15,
      name: "Dr. Christopher Davis",
      specialty: "Dermatologist",
      subSpecialty: "Bacterial Skin Infections",
      rating: 4.7,
      availability: "Available",
      image: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 16,
      name: "Dr. Stephanie White",
      specialty: "Dermatologist",
      subSpecialty: "Melanoma & Skin Cancer",
      rating: 4.9,
      availability: "Busy",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 17,
      name: "Dr. Daniel Moore",
      specialty: "Dermatologist",
      subSpecialty: "Hyperhidrosis & Sweating Disorders",
      rating: 4.6,
      availability: "Available",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 18,
      name: "Dr. Ashley Taylor",
      specialty: "Dermatologist",
      subSpecialty: "Nail Disorders & Infections",
      rating: 4.5,
      availability: "Available",
      image: "https://images.unsplash.com/photo-1594824388875-3fc4b3dee2cc?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 19,
      name: "Dr. Brian Miller",
      specialty: "Dermatologist",
      subSpecialty: "Seborrheic Dermatitis",
      rating: 4.7,
      availability: "Available",
      image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 20,
      name: "Dr. Michelle Garcia",
      specialty: "Dermatologist",
      subSpecialty: "Autoimmune Skin Diseases",
      rating: 4.8,
      availability: "Busy",
      image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 21,
      name: "Dr. Ryan Anderson",
      specialty: "Dermatologist",
      subSpecialty: "Scarring & Wound Healing",
      rating: 4.6,
      availability: "Available",
      image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 22,
      name: "Dr. Karen Wilson",
      specialty: "Dermatologist",
      subSpecialty: "Cosmetic Dermatology",
      rating: 4.9,
      availability: "Available",
      image: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 23,
      name: "Dr. Jason Martinez",
      specialty: "Dermatologist",
      subSpecialty: "Skin Rashes & Irritation",
      rating: 4.5,
      availability: "Available",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 24,
      name: "Dr. Linda Clark",
      specialty: "Dermatologist",
      subSpecialty: "Birthmarks & Vascular Lesions",
      rating: 4.7,
      availability: "Busy",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 25,
      name: "Dr. Steven Harris",
      specialty: "Dermatologist",
      subSpecialty: "Keratosis & Rough Skin",
      rating: 4.6,
      availability: "Available",
      image: "https://images.unsplash.com/photo-1594824388875-3fc4b3dee2cc?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 26,
      name: "Dr. Patricia Lewis",
      specialty: "Dermatologist",
      subSpecialty: "Hormonal Skin Changes",
      rating: 4.8,
      availability: "Available",
      image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 27,
      name: "Dr. Matthew Walker",
      specialty: "Dermatologist",
      subSpecialty: "Sun Damage & Photo-aging",
      rating: 4.7,
      availability: "Available",
      image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 28,
      name: "Dr. Jennifer Young",
      specialty: "Dermatologist",
      subSpecialty: "Genetic Skin Disorders",
      rating: 4.9,
      availability: "Busy",
      image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 29,
      name: "Dr. Paul Robinson",
      specialty: "Dermatologist",
      subSpecialty: "Industrial Skin Exposure",
      rating: 4.5,
      availability: "Available",
      image: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 30,
      name: "Dr. Sandra King",
      specialty: "Dermatologist",
      subSpecialty: "Skin Texture & Pore Issues",
      rating: 4.8,
      availability: "Available",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face"
    }
  ]);

  const [appointments, setAppointments] = useState([
    {
      id: 1,
      doctorId: 1,
      doctorName: "Dr. Michael Chen",
      date: "2024-12-20",
      time: "10:00 AM",
      status: "Accepted",
      reason: "Acne treatment consultation"
    },
    {
      id: 2,
      doctorId: 2,
      doctorName: "Dr. Sarah Rodriguez",
      date: "2024-12-18",
      time: "2:30 PM",
      status: "Pending",
      reason: "Eczema flare-up examination"
    }
  ]);

  const [showRequestForm, setShowRequestForm] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [appointmentForm, setAppointmentForm] = useState({
    date: '',
    time: '',
    reason: ''
  });

  const handleRequestAppointment = (doctor) => {
    setSelectedDoctor(doctor);
    setShowRequestForm(true);
    setAppointmentForm({ date: '', time: '', reason: '' });
  };

  const handleFormSubmit = () => {
    if (!appointmentForm.date || !appointmentForm.time || !appointmentForm.reason) return;
    const newAppointment = {
      id: appointments.length + 1,
      doctorId: selectedDoctor.id,
      doctorName: selectedDoctor.name,
      date: appointmentForm.date,
      time: appointmentForm.time,
      status: Math.random() > 0.5 ? "Accepted" : "Pending", // Simulate random status
      reason: appointmentForm.reason
    };
    
    setAppointments([...appointments, newAppointment]);
    setShowRequestForm(false);
    setSelectedDoctor(null);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Accepted': return 'text-green-600 bg-green-100';
      case 'Pending': return 'text-yellow-600 bg-yellow-100';
      case 'Rejected': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getAvailabilityColor = (availability) => {
    return availability === 'Available' ? 'text-green-600' : 'text-red-600';
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Appointments</h1>
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <p className="text-gray-600">Schedule and manage your appointments with doctors.</p>
      </div>

      {/* My Appointments Section */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">My Appointments</h2>
        {appointments.length === 0 ? (
          <p className="text-gray-500">No appointments scheduled yet.</p>
        ) : (
          <div className="space-y-4">
            {appointments.map((appointment) => (
              <div key={appointment.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg">{appointment.doctorName}</h3>
                    <p className="text-gray-600">Date: {appointment.date}</p>
                    <p className="text-gray-600">Time: {appointment.time}</p>
                    <p className="text-gray-600">Reason: {appointment.reason}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(appointment.status)}`}>
                    {appointment.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Doctors List Section */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Dermatologists - Skin Disease Specialists</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.map((doctor) => (
            <div key={doctor.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center mb-3">
                <img 
                  src={doctor.image} 
                  alt={doctor.name}
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h3 className="font-semibold text-lg">{doctor.name}</h3>
                  <p className="text-gray-600">{doctor.specialty}</p>
                  <p className="text-sm text-blue-600">{doctor.subSpecialty}</p>
                </div>
              </div>
              <div className="mb-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-yellow-500">★ {doctor.rating}</span>
                  <span className={`font-medium ${getAvailabilityColor(doctor.availability)}`}>
                    {doctor.availability}
                  </span>
                </div>
              </div>
              <button 
                onClick={() => handleRequestAppointment(doctor)}
                disabled={doctor.availability === 'Busy'}
                className={`w-full py-2 px-4 rounded-md font-medium ${
                  doctor.availability === 'Available' 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {doctor.availability === 'Available' ? 'Request Appointment' : 'Not Available'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Appointment Request Modal */}
      {showRequestForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">
              Request Appointment with {selectedDoctor?.name}
            </h3>
            <div>
              <div className="mb-4">
                <div className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Date
                </div>
                <input
                  type="date"
                  value={appointmentForm.date}
                  onChange={(e) => setAppointmentForm({...appointmentForm, date: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <div className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Time
                </div>
                <select
                  value={appointmentForm.time}
                  onChange={(e) => setAppointmentForm({...appointmentForm, time: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select time</option>
                  <option value="9:00 AM">9:00 AM</option>
                  <option value="10:00 AM">10:00 AM</option>
                  <option value="11:00 AM">11:00 AM</option>
                  <option value="2:00 PM">2:00 PM</option>
                  <option value="3:00 PM">3:00 PM</option>
                  <option value="4:00 PM">4:00 PM</option>
                </select>
              </div>
              <div className="mb-6">
                <div className="block text-sm font-medium text-gray-700 mb-2">
                  Reason for Visit
                </div>
                <textarea
                  value={appointmentForm.reason}
                  onChange={(e) => setAppointmentForm({...appointmentForm, reason: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="3"
                  placeholder="Describe your symptoms or reason for the appointment"
                />
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={handleFormSubmit}
                  disabled={!appointmentForm.date || !appointmentForm.time || !appointmentForm.reason}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  Send Request
                </button>
                <button
                  onClick={() => setShowRequestForm(false)}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Appointments;