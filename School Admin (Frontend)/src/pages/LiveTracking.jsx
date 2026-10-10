import React, { useState } from 'react';
import Sidebar from '../components/common/Sidebar';
import Header from '../components/common/Header';
import LiveTrackingHeader from '../components/pagecomponents/LiveTracking/LiveTrackingHeader';
import LiveTrackingMap from '../components/pagecomponents/LiveTracking/LiveTrackingMap';
import VehicleDetailsCard from '../components/pagecomponents/LiveTracking/VehicleDetailsCard';
import OtherLiveUnits from '../components/pagecomponents/LiveTracking/OtherLiveUnits';
import LiveTrackingFooter from '../components/pagecomponents/LiveTracking/LiveTrackingFooter';
import {
  CallDriverModal,
  SendMessageModal,
  SOSAlertModal,
  VehicleDetailsModal,
} from '../components/pagecomponents/LiveTracking/LiveTrackingModals';
import { initialVehiclesTelemetry } from '../components/pagecomponents/LiveTracking/telemetryData';

const LiveTracking = ({
  onLogout,
  onNavigate,
  currentPage = 'Live Tracking',
}) => {
  const [vehicles, setVehicles] = useState(initialVehiclesTelemetry);
  const [selectedVehicle, setSelectedVehicle] = useState(initialVehiclesTelemetry[0]);
  const [selectedRoute, setSelectedRoute] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [mapViewMode, setMapViewMode] = useState('Roads');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Modals state
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [isSOSModalOpen, setIsSOSModalOpen] = useState(false);
  const [targetVehicle, setTargetVehicle] = useState(null);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Filter vehicles based on active filter controls
  const filteredVehicles = vehicles.filter((v) => {
    if (selectedRoute !== 'All' && v.route !== selectedRoute) {
      return false;
    }
    if (selectedStatus === 'Active' && v.statusType === 'delayed') {
      return false;
    }
    if (selectedStatus === 'Delayed' && v.statusType !== 'delayed') {
      return false;
    }
    return true;
  });

  const handleSelectVehicle = (vehicle) => {
    setSelectedVehicle(vehicle);
  };

  const handleCenterFleet = () => {
    setSelectedVehicle(vehicles[0]);
    showToast('Fleet view centered on primary transit zone.');
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      // Small simulated updates
      setVehicles((prev) =>
        prev.map((v) => ({
          ...v,
          lastUpdate: 'Just now',
          speed: Math.max(15, Math.min(48, v.speed + Math.floor(Math.random() * 5) - 2)),
        }))
      );
      showToast('Live GPS telematics synchronized across 18 vehicles.');
    }, 600);
  };

  const handleCycleViewMode = () => {
    setMapViewMode((prev) => {
      if (prev === 'Roads') return 'Traffic';
      if (prev === 'Traffic') return 'Satellite';
      return 'Roads';
    });
  };

  const openViewModal = (vehicle) => {
    setTargetVehicle(vehicle);
    setIsViewModalOpen(true);
  };

  const openCallModal = (vehicle) => {
    setTargetVehicle(vehicle);
    setIsCallModalOpen(true);
  };

  const openMessageModal = (vehicle) => {
    setTargetVehicle(vehicle);
    setIsMessageModalOpen(true);
  };

  const openSOSModal = (vehicle) => {
    setTargetVehicle(vehicle);
    setIsSOSModalOpen(true);
  };

  return (
    <div className="h-screen flex bg-[#F8FAFC] antialiased text-slate-800 overflow-hidden font-sans">
      <Sidebar
        onLogout={onLogout}
        onNavigate={onNavigate}
        currentPage={currentPage}
      />

      <div className="flex-1 flex flex-col min-w-0 bg-[#F8FAFC] overflow-y-auto h-screen">
        <Header onNavigate={onNavigate} />

        {/* Floating Toast Notification */}
        {toastMessage && (
          <div className="fixed top-20 right-8 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-3 border border-slate-700 animate-in fade-in zoom-in-95 duration-200">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-xs font-semibold">{toastMessage}</span>
          </div>
        )}

        <main
          className="p-8 space-y-6 max-w-[1440px] w-full mx-auto flex-1"
          data-purpose="live-tracking-dashboard"
        >
          {/* Subheader / Filters Bar */}
          <LiveTrackingHeader
            selectedRoute={selectedRoute}
            onSelectRoute={setSelectedRoute}
            selectedStatus={selectedStatus}
            onSelectStatus={setSelectedStatus}
            mapViewMode={mapViewMode}
            onSelectMapViewMode={setMapViewMode}
            onCenterFleet={handleCenterFleet}
            onRefresh={handleRefresh}
            isRefreshing={isRefreshing}
            activeCount={18}
            idleCount={5}
            garageCount={2}
          />

          {/* Main Two-Column Layout (Interactive Vector Map & Details Sidebar) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start pb-6">
            {/* Left Vector Map Container (8 Cols) */}
            <LiveTrackingMap
              vehicles={filteredVehicles.length > 0 ? filteredVehicles : vehicles}
              selectedVehicle={selectedVehicle}
              onSelectVehicle={handleSelectVehicle}
              mapViewMode={mapViewMode}
              onCycleViewMode={handleCycleViewMode}
              onResetView={handleCenterFleet}
            />

            {/* Right Telematics Panels Container (4 Cols) */}
            <div className="lg:col-span-4 space-y-5" data-purpose="vehicle-telematics-panel">
              {/* Focus Vehicle Details Card */}
              <VehicleDetailsCard
                vehicle={selectedVehicle}
                onViewDetails={openViewModal}
                onCallDriver={openCallModal}
                onSendMessage={openMessageModal}
                onTriggerSOS={openSOSModal}
              />

              {/* Other Live Units List */}
              <OtherLiveUnits
                vehicles={filteredVehicles.length > 0 ? filteredVehicles : vehicles}
                selectedVehicle={selectedVehicle}
                onSelectVehicle={handleSelectVehicle}
                onViewAll={() => showToast('Displaying all 18 active vehicles in fleet.')}
              />
            </div>
          </div>

          <div className="h-2"></div>
        </main>

        <LiveTrackingFooter />
      </div>

      {/* Interactive Action Modals */}
      <CallDriverModal
        isOpen={isCallModalOpen}
        onClose={() => setIsCallModalOpen(false)}
        vehicle={targetVehicle || selectedVehicle}
        onCallSuccess={showToast}
      />

      <SendMessageModal
        isOpen={isMessageModalOpen}
        onClose={() => setIsMessageModalOpen(false)}
        vehicle={targetVehicle || selectedVehicle}
        onSendSuccess={showToast}
      />

      <SOSAlertModal
        isOpen={isSOSModalOpen}
        onClose={() => setIsSOSModalOpen(false)}
        vehicle={targetVehicle || selectedVehicle}
        onConfirmSOS={(veh) =>
          showToast(`EMERGENCY: Distress signal sent to Depot for ${veh.name}!`)
        }
      />

      <VehicleDetailsModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        vehicle={targetVehicle || selectedVehicle}
      />
    </div>
  );
};

export default LiveTracking;
