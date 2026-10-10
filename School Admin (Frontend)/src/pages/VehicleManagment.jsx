import React, { useState } from 'react';
import Sidebar from '../components/common/Sidebar';
import Header from '../components/common/Header';
import VehicleStatCards from '../components/pagecomponents/VehicleManagement/VehicleStatCards';
import VehiclesTableSection, {
  initialVehiclesData,
} from '../components/pagecomponents/VehicleManagement/VehiclesTableSection';
import VehicleManagementFooter from '../components/pagecomponents/VehicleManagement/VehicleManagementFooter';
import AddVehicleModal from '../components/pagecomponents/VehicleManagement/AddVehicleModal';
import VehicleDetailsModal from '../components/pagecomponents/VehicleManagement/VehicleDetailsModal';

const VehicleManagment = ({
  onLogout,
  onNavigate,
  currentPage = 'Vehicles',
}) => {
  const [vehicles, setVehicles] = useState(initialVehiclesData);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('view'); // 'view' or 'edit'

  const handleAddVehicle = (newVehicle) => {
    setVehicles((prev) => [
      ...prev,
      {
        ...newVehicle,
        num: prev.length + 1,
      },
    ]);
  };

  const handleUpdateVehicle = (updatedVehicle) => {
    setVehicles((prev) =>
      prev.map((v) => (v.num === updatedVehicle.num ? updatedVehicle : v))
    );
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
        <Header />

        <main className="flex-1 p-8 space-y-6 max-w-[1440px] w-full mx-auto" data-purpose="dashboard-main-area">
          <VehicleStatCards
            totalVehicles={totalVehicles}
            runningVehicles={runningVehicles}
            idleVehicles={idleVehicles}
            maintenanceVehicles={maintenanceVehicles}
          />

          <VehiclesTableSection
            vehiclesList={vehicles}
            onAddVehicleClick={() => setIsAddModalOpen(true)}
            onViewVehicle={handleViewVehicle}
            onEditVehicle={handleEditVehicle}
          />

          <div className="h-4"></div>
        </main>

        <VehicleManagementFooter />
      </div>

      <AddVehicleModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddVehicle={handleAddVehicle}
      />

      <VehicleDetailsModal
        vehicle={selectedVehicle}
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        onSave={handleUpdateVehicle}
        mode={modalMode}
      />
    </div>
  );
};

export default VehicleManagment;
