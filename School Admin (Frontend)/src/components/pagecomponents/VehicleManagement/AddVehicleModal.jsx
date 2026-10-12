import React, { useState, useEffect } from 'react';
import { MdDirectionsBus } from 'react-icons/md';
import Modal from '../../common/Modal';
import { getDrivers } from '../../../services/driversService';
import { getRoutes } from '../../../services/routesService';

const AddVehicleModal = ({
  isOpen,
  onClose,
  onAddVehicle,
  drivers: initialDrivers,
  routes: initialRoutes,
}) => {
  const [driversList, setDriversList] = useState(initialDrivers || []);
  const [routesList, setRoutesList] = useState(initialRoutes || []);
  const [formData, setFormData] = useState({
    name: '',
    regNo: '',
    model: '',
    capacitySeats: '',
    driverName: '',
    route: '',
    status: 'Running',
  });

  useEffect(() => {
    if (initialDrivers && initialDrivers.length > 0) {
      setDriversList(initialDrivers);
    } else if (isOpen) {
      getDrivers()
        .then((data) => setDriversList(data || []))
        .catch((err) => console.error('Failed to load drivers for vehicle modal:', err));
    }
  }, [initialDrivers, isOpen]);

  useEffect(() => {
    if (initialRoutes && initialRoutes.length > 0) {
      setRoutesList(initialRoutes);
    } else if (isOpen) {
      getRoutes()
        .then((data) => setRoutesList(data || []))
        .catch((err) => console.error('Failed to load routes for vehicle modal:', err));
    }
  }, [initialRoutes, isOpen]);

  if (!isOpen) return null;

  const getInitials = (name) => {
    if (!name) return 'DR';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  const getStatusStyles = (status) => {
    switch (status) {
      case 'Running':
        return {
          badge: 'bg-emerald-50 text-emerald-600 border border-emerald-200/70',
          dot: 'bg-emerald-500',
        };
      case 'On Route':
        return {
          badge: 'bg-blue-50 text-blue-600 border border-blue-200/70',
          dot: 'bg-blue-500',
        };
      case 'Idle':
      case 'Standby':
        return {
          badge: 'bg-amber-50 text-amber-600 border border-amber-200/70',
          dot: 'bg-amber-500',
        };
      case 'Maintenance':
      default:
        return {
          badge: 'bg-rose-50 text-rose-600 border border-rose-200/70',
          dot: 'bg-rose-500',
        };
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.regNo) return;

    const styles = getStatusStyles('Running');
    const busCode = formData.name.replace(/[^0-9]/g, '') || '01';

    const newVehicle = {
      ...formData,
      route: formData.route || 'Unassigned',
      status: 'Running',
      code: busCode,
      badgeStyle: 'bg-blue-50 border-blue-100 text-blue-600',
      capacitySub: '0 Filled (Ready)',
      driverInitials: getInitials(formData.driverName),
      speed: '30 km/h',
      speedDot: styles.dot,
      signalSub: 'Signal: Strong 5G',
      statusBadgeStyle: styles.badge,
      statusDotStyle: styles.dot,
    };

    if (onAddVehicle) {
      onAddVehicle(newVehicle);
    }

    setFormData({
      name: '',
      regNo: '',
      model: '',
      capacitySeats: '',
      driverName: '',
      route: '',
      status: 'Running',
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      icon={<MdDirectionsBus size={20} />}
      title="Add New Vehicle"
      subtitle="Register school bus into the active transport fleet"
      maxWidth="max-w-lg"
    >
      <form onSubmit={handleSubmit}>
        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto custom-scrollbar">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Vehicle Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Bus-25"
                className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/10 transition-all font-sans"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Registration No <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. LHR-9988"
                className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/10 transition-all font-sans"
                value={formData.regNo}
                onChange={(e) => setFormData({ ...formData, regNo: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Vehicle Model
              </label>
              <input
                type="text"
                placeholder="e.g. Toyota Coaster 2024"
                className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/10 transition-all font-sans"
                value={formData.model}
                onChange={(e) => setFormData({ ...formData, model: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Seating Capacity
              </label>
              <input
                type="text"
                placeholder="e.g. 30 Seats"
                className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/10 transition-all font-sans"
                value={formData.capacitySeats}
                onChange={(e) => setFormData({ ...formData, capacitySeats: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Assigned Driver
              </label>
              <select
                className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/10 transition-all font-sans cursor-pointer"
                value={formData.driverName}
                onChange={(e) => {
                  const selectedName = e.target.value;
                  const matchedDriver = driversList.find((d) => d.name === selectedName);
                  setFormData((prev) => ({
                    ...prev,
                    driverName: selectedName,
                    route:
                      matchedDriver?.route && matchedDriver.route !== 'Unassigned'
                        ? matchedDriver.route
                        : prev.route,
                  }));
                }}
              >
                <option value="">Unassigned (No Driver Assigned)</option>
                {driversList.map((driver) => (
                  <option key={driver.id || driver.name} value={driver.name}>
                    {driver.name} {driver.phone ? `(${driver.phone})` : ''}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Assigned Route
              </label>
              <select
                className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/10 transition-all font-sans cursor-pointer"
                value={formData.route}
                onChange={(e) => setFormData({ ...formData, route: e.target.value })}
              >
                <option value="">Unassigned (No Route Assigned)</option>
                {routesList.map((route) => (
                  <option key={route.id || route.name} value={route.name}>
                    {route.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-50/60 border-t border-slate-100 flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-xl shadow-xs transition cursor-pointer"
          >
            Save Vehicle
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddVehicleModal;
