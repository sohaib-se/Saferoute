import React, { useState, useEffect, useCallback } from 'react';
import Sidebar from '../components/common/Sidebar';
import Header from '../components/common/Header';
import DriverKPICards from '../components/pagecomponents/DriverManagement/DriverKPICards';
import DriversTableSection from '../components/pagecomponents/DriverManagement/DriversTableSection';
import DriverManagementFooter from '../components/pagecomponents/DriverManagement/DriverManagementFooter';
import AddDriverModal from '../components/pagecomponents/DriverManagement/AddDriverModal';
import DriverDetailsModal from '../components/pagecomponents/DriverManagement/DriverDetailsModal';
import AppCredentialsModal from '../components/common/AppCredentialsModal';
import { getDrivers, addDriver, updateDriver, deleteDriver } from '../services/driversService';

const DriversManagment = ({
  onLogout,
  onNavigate,
  currentPage = 'Drivers',
}) => {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [editingDriver, setEditingDriver] = useState(null);
  const [selectedDriverForCreds, setSelectedDriverForCreds] = useState(null);
  const [isCredsModalOpen, setIsCredsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const fetchDriversList = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getDrivers();
      setDrivers(data);
    } catch (err) {
      console.error('Error fetching drivers:', err);
      setError(err.message || 'Failed to fetch drivers from database');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDriversList();
  }, [fetchDriversList]);

  const handleAddDriver = async (newDriver) => {
    setIsAddModalOpen(false);
    setLoading(true);
    try {
      await addDriver(newDriver);
      await fetchDriversList();
    } catch (err) {
      console.error('Failed to create driver:', err);
      alert('Failed to save driver to database: ' + (err.message || 'Unknown error'));
      await fetchDriversList();
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateDriver = async (updatedDriver) => {
    setEditingDriver(null);
    setLoading(true);
    try {
      if (updatedDriver.id) {
        await updateDriver(updatedDriver.id, updatedDriver);
        await fetchDriversList();
      }
    } catch (err) {
      console.error('Failed to update driver:', err);
      alert('Failed to update driver in database: ' + (err.message || 'Unknown error'));
      await fetchDriversList();
    } finally {
      setLoading(false);
    }
  };

  const handleViewDriver = (driver) => {
    setSelectedDriver(driver);
    setIsDetailsModalOpen(true);
  };

  const handleEditDriver = (driver) => {
    setEditingDriver(driver);
  };

  const handleDeleteDriver = async (driverId) => {
    if (!window.confirm('Are you sure you want to delete this driver? This action cannot be undone.')) {
      return;
    }
    setLoading(true);
    // Optimistic removal for instant UI feedback
    setDrivers((prev) => prev.filter((d) => d.id !== driverId));

    try {
      await deleteDriver(driverId);
      await fetchDriversList();
    } catch (err) {
      console.error('Failed to delete driver:', err);
      alert('Failed to delete driver from database: ' + (err.message || 'Unknown error'));
      await fetchDriversList();
    } finally {
      setLoading(false);
    }
  };

  // Compute stats dynamically
  const totalDrivers = drivers.length;
  const activeDrivers = drivers.filter((d) => d.status === 'Online').length;
  const standbyDrivers = drivers.filter(
    (d) => d.status === 'Standby' || d.status === 'Idle / Break'
  ).length;
  const offDutyDrivers = drivers.filter((d) => d.status === 'Offline').length;

  return (
    <div className="h-screen flex bg-[#F8FAFC] text-slate-800 antialiased overflow-hidden font-sans">
      <Sidebar
        onLogout={onLogout}
        currentPage={currentPage}
        onNavigate={onNavigate}
      />

      <div className="flex-1 flex flex-col min-w-0 bg-[#F8FAFC] overflow-y-auto h-screen">
        <Header onNavigate={onNavigate} />

        <main className="p-8 space-y-6 flex-1 max-w-[1440px] w-full mx-auto">
          <DriverKPICards
            totalDrivers={totalDrivers}
            activeDrivers={activeDrivers}
            standbyDrivers={standbyDrivers}
            offDutyDrivers={offDutyDrivers}
          />

          <DriversTableSection
            driversList={drivers}
            isLoading={loading}
            onAddDriverClick={() => setIsAddModalOpen(true)}
            onViewDriver={handleViewDriver}
            onEditDriver={handleEditDriver}
            onDeleteDriver={handleDeleteDriver}
            onViewCredentials={(driver) => {
              setSelectedDriverForCreds(driver);
              setIsCredsModalOpen(true);
            }}
          />

          <div className="h-4"></div>
        </main>

        <DriverManagementFooter />
      </div>

      {/* Add Driver Modal */}
      <AddDriverModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddDriver={handleAddDriver}
      />

      {/* Edit Driver Modal (Uses the exact same modal as adding) */}
      <AddDriverModal
        isOpen={Boolean(editingDriver)}
        onClose={() => setEditingDriver(null)}
        driver={editingDriver}
        onUpdateDriver={handleUpdateDriver}
      />

      {/* Details View Modal */}
      <DriverDetailsModal
        driver={selectedDriver}
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        onEdit={(driver) => {
          setIsDetailsModalOpen(false);
          setEditingDriver(driver);
        }}
      />

      <AppCredentialsModal
        isOpen={isCredsModalOpen}
        onClose={() => setIsCredsModalOpen(false)}
        entity={selectedDriverForCreds}
        userType="driver"
      />
    </div>
  );
};

export default DriversManagment;
