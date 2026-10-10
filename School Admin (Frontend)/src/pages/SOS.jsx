import React, { useState } from 'react';
import Sidebar from '../components/common/Sidebar';
import Header from '../components/common/Header';
import SOSPageHeader from '../components/pagecomponents/SOS/SOSPageHeader';
import SOSStatCards from '../components/pagecomponents/SOS/SOSStatCards';
import CriticalAlertBanner from '../components/pagecomponents/SOS/CriticalAlertBanner';
import EmergencyResponseLedger from '../components/pagecomponents/SOS/EmergencyResponseLedger';
import EmergencyRadarMap from '../components/pagecomponents/SOS/EmergencyRadarMap';
import IncidentTimeline from '../components/pagecomponents/SOS/IncidentTimeline';
import SOSFooter from '../components/pagecomponents/SOS/SOSFooter';

const SOS = ({ onLogout, onNavigate, currentPage = 'SOS Alerts' }) => {
  const [toastMessage, setToastMessage] = useState(null);

  const showNotification = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  return (
    <div className="h-screen flex bg-[#F8FAFC] antialiased text-slate-800 overflow-hidden font-sans">
      <Sidebar onLogout={onLogout} onNavigate={onNavigate} currentPage={currentPage} />

      <div className="flex-1 flex flex-col min-w-0 bg-[#F8FAFC] overflow-y-auto h-screen">
        <Header />

        {/* Floating Toast Notification */}
        {toastMessage && (
          <div className="fixed top-20 right-8 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-3 border border-slate-700 animate-in fade-in zoom-in-95 duration-200">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
            <span className="text-xs font-semibold">{toastMessage}</span>
          </div>
        )}

        <main className="p-8 space-y-6 max-w-[1440px] w-full mx-auto flex-1">
          {/* Page Header & Actions */}
          <SOSPageHeader
            onBroadcast={() => showNotification('Safety Advisory broadcast sent to active fleet & parents.')}
            onExport={() => showNotification('Exporting Incident Log #SOS-9042 as PDF/CSV...')}
            onTriggerDistress={() => showNotification('Manual Distress Trigger Initiated!')}
          />

          {/* KPI Stat Cards */}
          <SOSStatCards />

          {/* Critical Alert Banner Card */}
          <CriticalAlertBanner
            onDeployEMS={() => showNotification('Emergency 911 / EMS Link dispatched with GPS telemetry.')}
            onOpenVideo={() => showNotification('Connecting to Bus 09 Live Cabin Video Feed...')}
            onSmsParents={() => showNotification('Broadcasting SMS alert to 28 onboard student parents...')}
            onBusStandby={() => showNotification('Bus 15 dispatched to standby coordinates.')}
          />

          {/* Two-Column Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column Ledger (Col-8) */}
            <div className="lg:col-span-8 space-y-4">
              <EmergencyResponseLedger />
            </div>

            {/* Right Column Telemetry (Col-4) */}
            <div className="lg:col-span-4 space-y-4">
              <EmergencyRadarMap />
              <IncidentTimeline
                onViewArchive={() => showNotification('Loading full diagnostic telemetry archive...')}
              />
            </div>
          </div>

          <div className="h-4"></div>
        </main>

        <SOSFooter />
      </div>
    </div>
  );
};

export default SOS;
