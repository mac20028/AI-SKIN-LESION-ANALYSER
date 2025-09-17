import React, { useState } from 'react';
import Sidebar from './components/sidebar';
import Dashboard from './components/dashboard';
import SkinAnalysis from './components/skinanalysis';
import ChronicTracker from './components/chronictracker';
import Reports from './components/reports';
import Appointments from './components/appointment';

const UsersPortal = () => {
  const [currentView, setCurrentView] = useState('home');

  const renderContent = () => {
    switch (currentView) {
      case 'analysis':
        return <SkinAnalysis />;3
      case 'tracker':
        return <ChronicTracker />;
      case 'reports':
        return <Reports />;
      case 'appointments':
        return <Appointments />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex h-screen">
        <Sidebar currentView={currentView} setCurrentView={setCurrentView} />
        
        <div className="flex-1 overflow-auto">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default UsersPortal;