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
    <div className="h-screen flex bg-[#EEF2F6] antialiased text-[#1E293B] overflow-hidden font-sans">
      <Sidebar onLogout={onLogout} onNavigate={onNavigate} currentPage={currentPage} />
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <Header />
        
        <main className="p-8 space-y-6 flex-1 max-w-[1400px]">
          {/* Page Title & Operational Status */}
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h2 className="text-[22px] font-bold text-slate-900 tracking-tight">Dashboard</h2>
              <p className="text-xs text-slate-500 mt-0.5">Real-time school transport operational overview &amp; telematics.</p>
            </div>
            <div className="inline-flex items-center gap-2 bg-white px-3.5 py-1.5 rounded-full border border-slate-200 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse"></span>
              <span className="text-xs font-medium text-slate-700">Live Telematics System Active</span>
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
        </main>
        
        <DashboardFooter />
      </div>
    </div>
  );
};

export default DashboardPage;
