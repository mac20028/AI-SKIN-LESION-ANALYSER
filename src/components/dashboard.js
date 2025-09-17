import React from 'react';
import { Camera, Calendar, Stethoscope } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Recent Analyses</p>
              <p className="text-2xl font-bold text-blue-600">3</p>
            </div>
            <Camera className="text-blue-500" size={32} />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Tracking Days</p>
              <p className="text-2xl font-bold text-green-600">12</p>
            </div>
            <Calendar className="text-green-500" size={32} />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Appointments</p>
              <p className="text-2xl font-bold text-orange-600">2</p>
            </div>
            <Stethoscope className="text-orange-500" size={32} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;