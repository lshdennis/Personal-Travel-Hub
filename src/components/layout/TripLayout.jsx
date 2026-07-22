import React, { useState } from 'react';
import NavigationSidebar from './NavigationSidebar';
import Sidebar from './Sidebar';
import Overview from './Overview';
import DayView from './DayView';
import Dashboard from './Dashboard';
import PackingPanel from './PackingPanel'; // 🎯 修正：改為同層引入 ./PackingPanel
import NotesPanel from './NotesPanel';     // 🎯 修正：改為同層引入 ./NotesPanel

export default function TripLayout({ tripData, currentDayIndex, onDayChange, activeTripId, onSelectTrip }) {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    const currentDayData = tripData?.days?.[currentDayIndex];

    switch (activeTab) {
      case 'dashboard':
        return (
          <Dashboard 
            activeTripId={activeTripId} 
            onSelectTrip={(id) => {
              onSelectTrip(id);
              setActiveTab('overview');
            }} 
          />
        );

      case 'overview':
        return <Overview tripData={tripData} />;

      case 'packing':
        return <PackingPanel packingData={tripData?.packing || []} />;

      case 'notes':
        return <NotesPanel notesData={tripData?.notes || []} />;
        
      case 'timeline':
      case 'hotel':
      case 'restaurant':
      case 'transport':
        return (
          <div className="space-y-6">
            <Sidebar 
              days={tripData?.days || []} 
              currentDayIndex={currentDayIndex} 
              onDayChange={onDayChange} 
            />
            {currentDayData ? (
              <DayView currentDayData={currentDayData} filterType={activeTab} />
            ) : (
              <div className="text-slate-400 py-8 text-center text-sm">無當日詳細內容</div>
            )}
          </div>
        );

      default:
        return <Overview tripData={tripData} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900">
      <NavigationSidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        tripTitle={tripData?.title} 
      />
      <main className="flex-1 p-8 overflow-y-auto">{renderContent()}</main>
    </div>
  );
}