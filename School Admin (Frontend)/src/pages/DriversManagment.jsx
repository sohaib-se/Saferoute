import { useState } from 'react';
import Sidebar from '../components/common/Sidebar';
import Header from '../components/common/Header';
import DriverKPICards from '../components/pagecomponents/DriverManagement/DriverKPICards';
import DriversTableSection, {
  initialDriversData,
} from '../components/pagecomponents/DriverManagement/DriversTableSection';
import DriverManagementFooter from '../components/pagecomponents/DriverManagement/DriverManagementFooter';
import AddDriverModal from '../components/pagecomponents/DriverManagement/AddDriverModal';
import DriverDetailsModal from '../components/pagecomponents/DriverManagement/DriverDetailsModal';

const DriversManagment = ({
  onLogout,
  onNavigate,
  currentPage = 'Drivers',
}) => {
  const [drivers, setDrivers] = useState(initialDriversData);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('view'); // 'view' or 'edit'

  const handleAddDriver = (newDriver) => {
    setDrivers((prev) => [
      ...prev,
      {
        ...newDriver,
        num: prev.length + 1,
      },
    ]);
  };

  const handleUpdateDriver = (updatedDriver) => {
    setDrivers((prev) =>
      prev.map((d) => (d.num === updatedDriver.num ? updatedDriver : d))
    );
  };

  const handleViewDriver = (driver) => {
    setSelectedDriver(driver);
    setModalMode('view');
    setIsDetailsModalOpen(true);
  };

  const handleEditDriver = (driver) => {
    setSelectedDriver(driver);
    setModalMode('edit');
    setIsDetailsModalOpen(true);
  };

  // Compute stats dynamically
  const totalDrivers = drivers.length;
  const activeDrivers = drivers.filter((d) => d.status === 'Online').length;
  const standbyDrivers = drivers.filter(
    (d) => d.status === 'Standby' || d.status === 'Idle / Break'
  ).length;
  const offDutyDrivers = drivers.filter((d) => d.status === 'Offline').length;

  return (
    <div className="h-screen flex bg-background text-on-surface font-body-md text-body-md antialiased overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        onLogout={onLogout}
        currentPage={currentPage}
        onNavigate={onNavigate}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-background overflow-y-auto h-screen">
        <Header />

        <main className="flex-1 w-full pt-6 bg-surface px-gutter-lg py-gutter space-y-gutter-lg">
          {/* Top 4 KPI Metrics Grid */}
          <DriverKPICards
            totalDrivers={totalDrivers}
            activeDrivers={activeDrivers}
            standbyDrivers={standbyDrivers}
            offDutyDrivers={offDutyDrivers}
          />

          {/* Main Management Container */}
          <DriversTableSection
            driversList={drivers}
            onAddDriverClick={() => setIsAddModalOpen(true)}
            onViewDriver={handleViewDriver}
            onEditDriver={handleEditDriver}
          />

          <div className="h-8"></div>
        </main>

        {/* Footer */}
        <DriverManagementFooter />
      </div>

      {/* Modals */}
      <AddDriverModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddDriver={handleAddDriver}
      />

      <DriverDetailsModal
        driver={selectedDriver}
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        onSave={handleUpdateDriver}
        mode={modalMode}
      />
    </div>
  );
};

export default DriversManagment;
