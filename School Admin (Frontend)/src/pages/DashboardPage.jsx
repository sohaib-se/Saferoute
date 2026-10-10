import React from 'react';
import Sidebar from '../components/common/Sidebar';
import Header from '../components/common/Header';
import StatCards from '../components/pagecomponents/Dashboard/StatCards';
import LiveTrackingMap from '../components/pagecomponents/Dashboard/LiveTrackingMap';
import TodaysTrips from '../components/pagecomponents/Dashboard/TodaysTrips';
import RecentActivity from '../components/pagecomponents/Dashboard/RecentActivity';
import VehicleStatus from '../components/pagecomponents/Dashboard/VehicleStatus';
import DashboardFooter from '../components/pagecomponents/Dashboard/DashboardFooter';

const DashboardPage = ({ onLogout, onNavigate, currentPage = 'Dashboard' }) => {
  return (
    <div className="h-screen flex bg-[#F8FAFC] antialiased text-slate-800 overflow-hidden font-sans">
      <Sidebar onLogout={onLogout} onNavigate={onNavigate} currentPage={currentPage} />
      <div className="flex-1 flex flex-col min-w-0 bg-[#F8FAFC] overflow-y-auto h-screen">
        <Header />
        
        <main className="p-8 space-y-6 flex-1 max-w-[1440px] w-full mx-auto">
          {/* Page Title & Operational Status */}
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Dashboard</h2>
            </div>
            <div className="inline-flex items-center gap-2 bg-white px-3.5 py-1.5 rounded-full border border-slate-200/80 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-xs font-semibold text-slate-700">Live Telematics System Active</span>
            </div>
          </div>
          
          <StatCards />
          
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <LiveTrackingMap />
            <TodaysTrips />
          </section>
          
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <RecentActivity />
            <VehicleStatus />
          </section>

          <div className="h-4"></div>
        </main>
        
        <DashboardFooter />
      </div>
    </div>
  );
};

export default DashboardPage;
