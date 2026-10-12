import React, { useState, useEffect, useCallback } from 'react';
import Sidebar from '../components/common/Sidebar';
import Header from '../components/common/Header';
import VehicleStatCards from '../components/pagecomponents/VehicleManagement/VehicleStatCards';
import VehiclesTableSection from '../components/pagecomponents/VehicleManagement/VehiclesTableSection';
import VehicleManagementFooter from '../components/pagecomponents/VehicleManagement/VehicleManagementFooter';
import AddVehicleModal from '../components/pagecomponents/VehicleManagement/AddVehicleModal';
import VehicleDetailsModal from '../components/pagecomponents/VehicleManagement/VehicleDetailsModal';
import { getVehicles, addVehicle, updateVehicle, deleteVehicle } from '../services/vehiclesService';
import { getDrivers } from '../services/driversService';
import { getRoutes } from '../services/routesService';

const VehicleManagment = ({
  onLogout,
  onNavigate,
  currentPage = 'Vehicles',
}) => {
  const [vehicles, setVehicles] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('view'); // 'view' or 'edit'

  const fetchVehiclesList = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const [vehiclesData, driversData, routesData] = await Promise.all([
        getVehicles(),
        getDrivers().catch((err) => {
          console.warn('Could not fetch drivers:', err);
          return [];
        }),
        getRoutes().catch((err) => {
          console.warn('Could not fetch routes:', err);
          return [];
        }),
      ]);
      setVehicles(vehiclesData);
      setDrivers(driversData);
      setRoutes(routesData);
    } catch (err) {
      console.error('Error fetching vehicles:', err);
      setError(err.message || 'Failed to fetch vehicles from database');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchVehiclesList();
  }, [fetchVehiclesList]);

  const handleAddVehicle = async (newVehicle) => {
    try {
      await addVehicle(newVehicle);
      await fetchVehiclesList();
      setIsAddModalOpen(false);
    } catch (err) {
      console.error('Failed to create vehicle:', err);
      alert('Failed to save vehicle to database: ' + (err.message || 'Unknown error'));
    }
  };

  const handleUpdateVehicle = async (updatedVehicle) => {
    try {
      if (updatedVehicle.id) {
        await updateVehicle(updatedVehicle.id, updatedVehicle);
        await fetchVehiclesList();
      }
      setIsDetailsModalOpen(false);
    } catch (err) {
      console.error('Failed to update vehicle:', err);
      alert('Failed to update vehicle in database: ' + (err.message || 'Unknown error'));
    }
  };

  const handleDeleteVehicle = async (vehicleId) => {
    if (!window.confirm('Are you sure you want to delete this vehicle? This action cannot be undone.')) {
      return;
    }
    try {
      await deleteVehicle(vehicleId);
      await fetchVehiclesList();
    } catch (err) {
      console.error('Failed to delete vehicle:', err);
      alert('Failed to delete vehicle from database: ' + (err.message || 'Unknown error'));
    }
  };

  const handleViewVehicle = (vehicle) => {
    setSelectedVehicle(vehicle);
    setModalMode('view');
    setIsDetailsModalOpen(true);
  };

  const handleEditVehicle = (vehicle) => {
    setSelectedVehicle(vehicle);
    setModalMode('edit');
    setIsDetailsModalOpen(true);
  };

  // Compute metrics dynamically
  const totalVehicles = vehicles.length;
  const runningVehicles = vehicles.filter(
    (v) => v.status === 'Running' || v.status === 'On Route'
  ).length;
  const idleVehicles = vehicles.filter(
    (v) => v.status === 'Idle' || v.status === 'Standby'
  ).length;
  const maintenanceVehicles = vehicles.filter(
    (v) => v.status === 'Maintenance'
  ).length;

  return (
    <div className="h-screen flex bg-[#F8FAFC] text-slate-800 antialiased overflow-hidden font-sans">
      <Sidebar
        onLogout={onLogout}
        currentPage={currentPage}
        onNavigate={onNavigate}
      />

      <div className="flex-1 flex flex-col min-w-0 bg-[#F8FAFC] overflow-y-auto h-screen">
        <Header onNavigate={onNavigate} />

        <main className="flex-1 p-8 space-y-6 max-w-[1440px] w-full mx-auto" data-purpose="dashboard-main-area">
          <VehicleStatCards
            totalVehicles={totalVehicles}
            runningVehicles={runningVehicles}
            idleVehicles={idleVehicles}
            maintenanceVehicles={maintenanceVehicles}
          />

          <VehiclesTableSection
            vehiclesList={vehicles}
            isLoading={loading}
            onAddVehicleClick={() => setIsAddModalOpen(true)}
            onViewVehicle={handleViewVehicle}
            onEditVehicle={handleEditVehicle}
            onDeleteVehicle={handleDeleteVehicle}
          />

          <div className="h-4"></div>
        </main>

        <VehicleManagementFooter />
      </div>

      <AddVehicleModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddVehicle={handleAddVehicle}
        drivers={drivers}
        routes={routes}
      />

      <VehicleDetailsModal
        vehicle={selectedVehicle}
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        onSave={handleUpdateVehicle}
        mode={modalMode}
        drivers={drivers}
        routes={routes}
      />
    </div>
  );
};

export default VehicleManagment;
