import React, { useState, useEffect, useCallback } from 'react';
import Sidebar from '../components/common/Sidebar';
import Header from '../components/common/Header';
import {
  TripStatCards,
  TripsTableSection,
  TripDetailsModal,
  TripLocateModal,
  TripManagementFooter,
} from '../components/pagecomponents/Trips';
import { getTrips, deleteTrip } from '../services/tripsService';
import { supabase } from '../lib/supabaseClient';

const Trips = ({
  onLogout,
  onNavigate,
  currentPage = 'Trips',
}) => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isLocateModalOpen, setIsLocateModalOpen] = useState(false);

  // Fetch real trips from database
  const fetchTripsList = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getTrips();
      setTrips(data);
    } catch (err) {
      console.error('Failed to load trips from database:', err);
      setError(err.message || 'Could not load trips.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTripsList();

    // Supabase Realtime subscription: updates admin page whenever a driver starts, picks up, or finishes
    const channel = supabase
      .channel('realtime_admin_trips')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'trips' },
        () => {
          fetchTripsList();
        }
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'trip_attendance' },
        () => {
          fetchTripsList();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchTripsList]);

  // Compute live KPI metrics based strictly on actual database records
  const totalScheduled = trips.length;
  const inTransit = trips.filter(
    (t) => t.overallStatus === 'pickup_active' || t.overallStatus === 'dropoff_active'
  ).length;
  const completed = trips.filter((t) => t.overallStatus === 'completed').length;
  const pending = trips.filter((t) => t.overallStatus === 'pending').length;
  const pickupDone = trips.filter((t) => t.overallStatus === 'pickup_done').length;

  // Handlers
  const handleDeleteTrip = async (tripId) => {
    if (!window.confirm('Are you sure you want to delete this trip record?')) return;
    try {
      await deleteTrip(tripId);
      setTrips((prev) => prev.filter((t) => t.id !== tripId));
    } catch (err) {
      alert('Failed to delete trip: ' + (err.message || 'Unknown error'));
    }
  };

  const handleLocateTrip = (trip) => {
    setSelectedTrip(trip);
    setIsLocateModalOpen(true);
  };

  const handleViewTrip = (trip) => {
    setSelectedTrip(trip);
    setIsDetailsModalOpen(true);
  };

  return (
    <div className="h-screen flex bg-[#F8FAFC] text-slate-800 antialiased overflow-hidden font-sans">
      {/* Sidebar Navigation */}
      <Sidebar
        onLogout={onLogout}
        currentPage={currentPage}
        onNavigate={onNavigate}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#F8FAFC] overflow-y-auto h-screen">
        {/* Common Header */}
        <Header onNavigate={onNavigate} />

        {/* Trips Main Area */}
        <main
          className="flex-1 p-8 space-y-6 max-w-[1440px] w-full mx-auto"
          data-purpose="trips-main-area"
        >
          {/* KPI Overview Cards - Live Real Database Counts */}
          <TripStatCards
            totalScheduled={totalScheduled}
            inTransit={inTransit}
            completed={completed}
            pending={pending}
            pickupDone={pickupDone}
            loading={loading}
          />

          {/* Error Banner */}
          {error && (
            <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs font-semibold flex items-center justify-between">
              <span>Failed to fetch trips: {error}</span>
              <button
                type="button"
                onClick={fetchTripsList}
                className="underline hover:text-rose-900 cursor-pointer"
              >
                Retry
              </button>
            </div>
          )}

          {/* Trips Management Section & Table */}
          <TripsTableSection
            tripsList={trips}
            loading={loading}
            onLocateTrip={handleLocateTrip}
            onViewTrip={handleViewTrip}
            onDeleteTrip={handleDeleteTrip}
            onRefresh={fetchTripsList}
          />

          <div className="h-4"></div>
        </main>

        {/* Site Footer */}
        <TripManagementFooter />
      </div>

      {/* Trip Details & Manifest Modal */}
      <TripDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        trip={selectedTrip}
        onLocate={handleLocateTrip}
      />

      {/* Trip GPS & Telematics Locate Modal */}
      <TripLocateModal
        isOpen={isLocateModalOpen}
        onClose={() => setIsLocateModalOpen(false)}
        trip={selectedTrip}
        onNavigateToLiveTracking={onNavigate}
      />
    </div>
  );
};

export default Trips;
