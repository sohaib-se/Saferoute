import React, { useState, useEffect, useCallback } from 'react';
import Sidebar from '../components/common/Sidebar';
import Header from '../components/common/Header';
import RouteKPICards from '../components/pagecomponents/RouteManagement/RouteKPICards';
import RoutesTableSection from '../components/pagecomponents/RouteManagement/RoutesTableSection';
import RouteManagementFooter from '../components/pagecomponents/RouteManagement/RouteManagementFooter';
import AddRouteModal from '../components/pagecomponents/RouteManagement/AddRouteModal';
import RouteDetailsModal from '../components/pagecomponents/RouteManagement/RouteDetailsModal';
import { getRoutes, addRoute, updateRoute, deleteRoute } from '../services/routesService';

const RouteManagment = ({
  onLogout,
  onNavigate,
  currentPage = 'Routes',
}) => {
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('view'); // 'view' or 'edit'

  const fetchRoutesList = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getRoutes();
      setRoutes(data || []);
    } catch (err) {
      console.error('Error fetching routes:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRoutesList();
  }, [fetchRoutesList]);

  const handleAddRoute = async (newRoute) => {
    try {
      await addRoute(newRoute);
      await fetchRoutesList();
      setIsAddModalOpen(false);
    } catch (err) {
      console.error('Failed to create route:', err);
      alert('Failed to save route to database: ' + (err.message || 'Unknown error'));
    }
  };

  const handleUpdateRoute = async (updatedRoute) => {
    try {
      if (updatedRoute.id) {
        await updateRoute(updatedRoute.id, updatedRoute);
        await fetchRoutesList();
      }
      setIsDetailsModalOpen(false);
    } catch (err) {
      console.error('Failed to update route:', err);
      alert('Failed to update route in database: ' + (err.message || 'Unknown error'));
    }
  };

  const handleDeleteRoute = async (routeId) => {
    if (!window.confirm('Are you sure you want to delete this route? This action cannot be undone.')) {
      return;
    }
    try {
      await deleteRoute(routeId);
      await fetchRoutesList();
    } catch (err) {
      console.error('Failed to delete route:', err);
      alert('Failed to delete route from database: ' + (err.message || 'Unknown error'));
    }
  };

  const handleEditRoute = (route) => {
    setSelectedRoute(route);
    setModalMode('edit');
    setIsDetailsModalOpen(true);
  };

  return (
    <div className="h-screen flex bg-[#F8FAFC] text-slate-800 antialiased overflow-hidden font-sans">
      <Sidebar
        onLogout={onLogout}
        currentPage={currentPage}
        onNavigate={onNavigate}
      />

      <div className="flex-1 flex flex-col min-w-0 bg-[#F8FAFC] overflow-y-auto h-screen">
        <Header onNavigate={onNavigate} />

        <main className="flex-1 p-8 space-y-6 max-w-[1440px] w-full mx-auto" data-purpose="routes-main-area">
          <RouteKPICards totalRoutes={routes.length} />

          <RoutesTableSection
            routesList={routes}
            isLoading={loading}
            onAddRouteClick={() => setIsAddModalOpen(true)}
            onEditRoute={handleEditRoute}
            onDeleteRoute={handleDeleteRoute}
          />

          <div className="h-4"></div>
        </main>

        <RouteManagementFooter />
      </div>

      <AddRouteModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddRoute={handleAddRoute}
      />

      <RouteDetailsModal
        route={selectedRoute}
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        onSave={handleUpdateRoute}
        mode={modalMode}
      />
    </div>
  );
};

export default RouteManagment;
