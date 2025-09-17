import React from 'react';
import { Home, Camera, BarChart3, FileText, Calendar } from 'lucide-react';

const Sidebar = ({ currentView, setCurrentView }) => {
  const menuItems = [
    { id: 'home', label: 'Dashboard', icon: Home },
    { id: 'analysis', label: 'Skin Analysis', icon: Camera },
    { id: 'tracker', label: 'Chronic Tracker', icon: BarChart3 },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'appointments', label: 'Appointments', icon: Calendar }
  ];

  return (
    <div className="w-64 bg-white shadow-lg h-full">
      <div className="p-6 border-b">
        <h2 className="text-xl font-bold text-gray-800">SkinCare AI</h2>
        <p className="text-sm text-gray-600">User Portal</p>
      </div>
      <nav className="mt-6">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setCurrentView(item.id)}
            className={`w-full flex items-center gap-3 px-6 py-3 text-left hover:bg-blue-50 ${
              currentView === item.id ? 'bg-blue-50 border-r-2 border-blue-500' : ''
            }`}
          >
            <item.icon size={20} />
            {item.label}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;