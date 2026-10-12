import React, { useState, useEffect } from 'react';
import { MdDirectionsBus, MdEdit } from 'react-icons/md';
import Modal from '../../common/Modal';
import { getDrivers } from '../../../services/driversService';
import { getRoutes } from '../../../services/routesService';

const VehicleDetailsModal = ({
  vehicle,
  isOpen,
  onClose,
  onSave,
  mode = 'view',
  drivers: initialDrivers,
  routes: initialRoutes,
}) => {
  const [isEditing, setIsEditing] = useState(mode === 'edit');
  const [formData, setFormData] = useState(vehicle || {});
  const [driversList, setDriversList] = useState(initialDrivers || []);
  const [routesList, setRoutesList] = useState(initialRoutes || []);

  useEffect(() => {
    setIsEditing(mode === 'edit');
    setFormData(vehicle || {});
  }, [vehicle, mode, isOpen]);

  useEffect(() => {
    if (initialDrivers && initialDrivers.length > 0) {
      setDriversList(initialDrivers);
    } else if (isOpen) {
      getDrivers()
        .then((data) => setDriversList(data || []))
        .catch((err) => console.error('Failed to load drivers for vehicle details modal:', err));
    }
  }, [initialDrivers, isOpen]);

  useEffect(() => {
    if (initialRoutes && initialRoutes.length > 0) {
      setRoutesList(initialRoutes);
    } else if (isOpen) {
      getRoutes()
        .then((data) => setRoutesList(data || []))
        .catch((err) => console.error('Failed to load routes for vehicle details modal:', err));
    }
  }, [initialRoutes, isOpen]);

  if (!isOpen || !vehicle) return null;

  const handleSave = (e) => {
    e.preventDefault();
    if (onSave) {
      onSave(formData);
    }
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      icon={<MdDirectionsBus size={20} />}
      title={isEditing ? 'Edit Vehicle Information' : vehicle.name}
      subtitle={
        isEditing
          ? 'Update bus specs, driver link, or telematics status'
          : `${vehicle.regNo || ''}${vehicle.model ? ` • ${vehicle.model}` : ''}`
      }
      maxWidth="max-w-lg"
    >
      {isEditing ? (
        <form onSubmit={handleSave}>
          <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto custom-scrollbar">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Vehicle Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/10 transition-all font-sans"
                  value={formData.name || ''}
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
                  className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/10 transition-all font-sans"
                  value={formData.regNo || ''}
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
                  value={formData.model || ''}
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
                  value={formData.capacitySeats || ''}
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
                  value={formData.driverName || ''}
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
                  {formData.driverName &&
                    !driversList.some((d) => d.name === formData.driverName) && (
                      <option value={formData.driverName}>{formData.driverName}</option>
                    )}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Assigned Route
                </label>
                <select
                  className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/10 transition-all font-sans cursor-pointer"
                  value={formData.route || ''}
                  onChange={(e) => setFormData({ ...formData, route: e.target.value })}
                >
                  <option value="">Unassigned (No Route Assigned)</option>
                  {routesList.map((route) => (
                    <option key={route.id || route.name} value={route.name}>
                      {route.name}
                    </option>
                  ))}
                  {formData.route &&
                    !routesList.some((r) => r.name === formData.route) && (
                      <option value={formData.route}>{formData.route}</option>
                    )}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Status
              </label>
              <select
                className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/10 transition-all font-sans cursor-pointer"
                value={formData.status || 'Running'}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                <option value="Running">Running</option>
                <option value="On Route">On Route</option>
                <option value="Idle">Idle</option>
                <option value="Maintenance">Maintenance</option>
              </select>
            </div>
          </div>

          <div className="px-6 py-4 bg-slate-50/60 border-t border-slate-100 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-xl shadow-xs transition cursor-pointer"
            >
              Save Changes
            </button>
          </div>
        </form>
      ) : (
        <div>
          <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto custom-scrollbar">
            <div className="bg-slate-50/70 rounded-xl border border-slate-200/80 p-4 grid grid-cols-2 gap-4">
              <div>
                <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider mb-0.5">
                  Assigned Driver
                </span>
                <span className="text-xs text-slate-900 font-semibold block">
                  {vehicle.driverPhone ? `${vehicle.driverName} (${vehicle.driverPhone})` : (vehicle.driverName || 'Unassigned')}
                </span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider mb-0.5">
                  Assigned Route
                </span>
                <span className="text-xs text-slate-900 font-semibold block">
                  {vehicle.routeSub ? `${vehicle.route} (${vehicle.routeSub})` : (vehicle.route || 'Route 1')}
                </span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider mb-0.5">
                  Seating Capacity
                </span>
                <span className="text-xs text-slate-900 font-semibold block">
                  {vehicle.capacitySub ? `${vehicle.capacitySeats} - ${vehicle.capacitySub}` : (vehicle.capacitySeats || '30 Seats')}
                </span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider mb-0.5">
                  Telematics &amp; Status
                </span>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold ${vehicle.statusBadgeStyle || 'bg-emerald-50 text-emerald-600 border border-emerald-200/70'}`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${vehicle.statusDotStyle || 'bg-emerald-500'} mr-1.5`}
                    ></span>
                    {vehicle.status || 'Running'}
                  </span>
                  {vehicle.speed && (
                    <span className="text-xs text-slate-500 font-medium">({vehicle.speed})</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="px-6 py-4 bg-slate-50/60 border-t border-slate-100 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100/80 font-semibold text-xs flex items-center gap-1.5 transition cursor-pointer"
            >
              <MdEdit size={15} />
              <span>Edit Vehicle</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-blue-600 text-white font-semibold text-xs hover:bg-blue-700 active:bg-blue-800 transition cursor-pointer shadow-xs"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default VehicleDetailsModal;
