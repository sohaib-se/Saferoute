import React, { useState, useEffect, useCallback } from 'react';
import Sidebar from '../components/common/Sidebar';
import Header from '../components/common/Header';
import LiveTrackingHeader from '../components/pagecomponents/LiveTracking/LiveTrackingHeader';
import LiveTrackingMap from '../components/pagecomponents/LiveTracking/LiveTrackingMap';
import RunningVehiclesCard from '../components/pagecomponents/LiveTracking/RunningVehiclesCard';
import LiveTrackingFooter from '../components/pagecomponents/LiveTracking/LiveTrackingFooter';
import {
  CallDriverModal,
  SendMessageModal,
  SOSAlertModal,
  VehicleDetailsModal,
} from '../components/pagecomponents/LiveTracking/LiveTrackingModals';
import {
  fetchActiveVehicleLocations,
  subscribeToAllVehicleLocations,
} from '../services/liveTrackingService';
import { getVehicles } from '../services/vehiclesService';
import { getDrivers } from '../services/driversService';
import { supabase } from '../lib/supabaseClient';

const LiveTracking = ({
  onLogout,
  onNavigate,
  currentPage = 'Live Tracking',
}) => {
  const [vehicles, setVehicles] = useState([]);
  const [runningTrips, setRunningTrips] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [selectedRoute, setSelectedRoute] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [mapViewMode, setMapViewMode] = useState('Roads');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [liveLocationsMap, setLiveLocationsMap] = useState({});

  // 1. Fetch real registered vehicles and drivers from Supabase
  useEffect(() => {
    let isMounted = true;

    const loadRealFleet = async () => {
      try {
        let vehiclesData = [];
        let driversData = [];

        try {
          vehiclesData = await getVehicles(true);
        } catch {
          const { data } = await supabase.from('vehicles').select('*');
          vehiclesData = data || [];
        }

        try {
          driversData = await getDrivers(true);
        } catch {
          const { data } = await supabase.from('drivers').select('*');
          driversData = data || [];
        }

        if (isMounted && vehiclesData && vehiclesData.length > 0) {
          const formatted = vehiclesData.map((v) => {
            const matchedDriver = (driversData || []).find(
              (d) =>
                (d.vehicle && d.vehicle.toLowerCase() === v.name.toLowerCase()) ||
                (d.name && v.driver_name && d.name.toLowerCase() === v.driver_name.toLowerCase())
            );

            return {
              id: v.id,
              name: v.name,
              plate: v.reg_no || '12312',
              driver: v.driver_name || matchedDriver?.name || 'Farhan Khan',
              driverPhone: matchedDriver?.phone || '213124',
              route: v.route || 'Ring Road',
              status: v.status || 'Active',
            };
          });

          setVehicles(formatted);
        }
      } catch (err) {
        console.warn('loadRealFleet exception:', err);
      }
    };

    loadRealFleet();

    return () => {
      isMounted = false;
    };
  }, []);

  // 2. Fetch and subscribe to running trips (pickup_active or dropoff_active)
  const loadRunningTrips = useCallback(async () => {
    try {
      const today = new Date().toISOString().split('T')[0];
      const { data, error } = await supabase
        .from('trips')
        .select('*')
        .eq('trip_date', today)
        .in('overall_status', ['pickup_active', 'dropoff_active']);

      if (!error && data) {
        setRunningTrips(data);
      } else {
        setRunningTrips([]);
      }
    } catch (err) {
      console.warn('loadRunningTrips error:', err);
      setRunningTrips([]);
    }
  }, []);

  useEffect(() => {
    loadRunningTrips();

    // Realtime subscription to trips table
    const tripChannel = supabase
      .channel('admin:realtime_trips')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'trips',
        },
        () => {
          loadRunningTrips();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(tripChannel);
    };
  }, [loadRunningTrips]);

  // 3. Fetch active vehicle locations and subscribe to Realtime updates
  useEffect(() => {
    let isMounted = true;

    const loadLiveLocations = async () => {
      const activeRows = await fetchActiveVehicleLocations();
      if (isMounted) {
        const map = {};
        activeRows.forEach((row) => {
          if (row.vehicle_name && row.is_active !== false) {
            map[row.vehicle_name] = row;
          }
        });
        setLiveLocationsMap(map);
      }
    };

    loadLiveLocations();

    const unsubscribe = subscribeToAllVehicleLocations(null, (updatedRow, eventType) => {
      if (!isMounted) return;

      setLiveLocationsMap((prev) => {
        if (eventType === 'DELETE' || (updatedRow && updatedRow.is_active === false)) {
          const next = { ...prev };
          delete next[updatedRow.vehicle_name];
          return next;
        }

        if (updatedRow && updatedRow.vehicle_name && updatedRow.is_active !== false) {
          return {
            ...prev,
            [updatedRow.vehicle_name]: updatedRow,
          };
        }
        return prev;
      });
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);

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

  // Construct runningVehicles list: ONLY vehicles with an active running trip AND live coordinates
  const runningVehicles = runningTrips
    .map((trip) => {
      const loc = liveLocationsMap[trip.vehicle_name];
      const matchedVehicle = vehicles.find(
        (v) => v.name?.toLowerCase() === trip.vehicle_name?.toLowerCase()
      );

      const lat = loc && typeof loc.latitude === 'number' ? Number(loc.latitude) : null;
      const lng = loc && typeof loc.longitude === 'number' ? Number(loc.longitude) : null;

      return {
        id: trip.id,
        tripId: trip.id,
        name: trip.vehicle_name,
        plate: matchedVehicle?.plate || '12312',
        driver: trip.driver_name || matchedVehicle?.driver || 'Farhan Khan',
        driverPhone: matchedVehicle?.driverPhone || '213124',
        route: trip.route || matchedVehicle?.route || 'Ring Road',
        tripPhase: trip.overall_status,
        tripType: trip.overall_status === 'dropoff_active' ? 'dropoff' : 'pickup',
        latitude: lat,
        longitude: lng,
        status: 'In Transit',
        lastUpdate: 'Live GPS',
      };
    })
    .filter(
      (v) =>
        typeof v.latitude === 'number' &&
        typeof v.longitude === 'number' &&
        !isNaN(v.latitude) &&
        !isNaN(v.longitude)
    );

  // Focus vehicle
  const currentVehicle =
    (selectedVehicle && runningVehicles.find((v) => v.name === selectedVehicle.name)) ||
    runningVehicles[0] ||
    null;

  const handleSelectVehicle = (vehicle) => {
    setSelectedVehicle(vehicle);
  };

  const handleCenterFleet = () => {
    if (runningVehicles.length > 0) {
      setSelectedVehicle(runningVehicles[0]);
      showToast(`Fleet view focused on ${runningVehicles[0].name}.`);
    } else {
      showToast('No active vehicles currently in transit.');
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await Promise.all([loadRunningTrips(), fetchActiveVehicleLocations()]);
    setIsRefreshing(false);
    showToast(`Telemetry synchronized (${runningVehicles.length} active in transit).`);
  };

  const handleCycleViewMode = () => {
    setMapViewMode((prev) => {
      if (prev === 'Roads') return 'Satellite';
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

  const routeOptions = Array.from(
    new Set(vehicles.map((v) => v.route).filter(Boolean))
  );

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
            activeCount={runningVehicles.length}
            idleCount={Math.max(0, vehicles.length - runningVehicles.length)}
            garageCount={0}
            routeOptions={routeOptions}
          />

          {/* Main Two-Column Layout (Interactive Google Tiles Map & Running Vehicles Panel) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start pb-6">
            {/* Left Google Tiles Leaflet Map Container (8 Cols) */}
            <LiveTrackingMap
              vehicles={runningVehicles}
              selectedVehicle={currentVehicle}
              onSelectVehicle={handleSelectVehicle}
              mapViewMode={mapViewMode}
              onCycleViewMode={handleCycleViewMode}
              onResetView={handleCenterFleet}
            />

            {/* Right Running Vehicles Panel Container (4 Cols) */}
            <div className="lg:col-span-4 space-y-5" data-purpose="running-vehicles-container">
              <RunningVehiclesCard
                runningVehicles={runningVehicles}
                selectedVehicle={currentVehicle}
                onSelectVehicle={handleSelectVehicle}
                onCallDriver={openCallModal}
                onSendMessage={openMessageModal}
                onTriggerSOS={openSOSModal}
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
        vehicle={targetVehicle || currentVehicle}
        onCallSuccess={showToast}
      />

      <SendMessageModal
        isOpen={isMessageModalOpen}
        onClose={() => setIsMessageModalOpen(false)}
        vehicle={targetVehicle || currentVehicle}
        onSendSuccess={showToast}
      />

      <SOSAlertModal
        isOpen={isSOSModalOpen}
        onClose={() => setIsSOSModalOpen(false)}
        vehicle={targetVehicle || currentVehicle}
        onConfirmSOS={(veh) =>
          showToast(`EMERGENCY: Distress signal sent to Depot for ${veh.name}!`)
        }
      />

      <VehicleDetailsModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        vehicle={targetVehicle || currentVehicle}
      />
    </div>
  );
};

export default LiveTracking;
