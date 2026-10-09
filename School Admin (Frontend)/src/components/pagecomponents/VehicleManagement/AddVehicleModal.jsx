import React, { useState } from 'react';

const AddVehicleModal = ({ isOpen, onClose, onAddVehicle }) => {
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    regNo: '',
    model: '',
    capacitySeats: '30 Seats',
    driverName: '',
    driverPhone: '',
    driverInitials: '',
    route: 'Route 1',
    routeSub: '',
    status: 'Running',
  });

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
          badge: 'bg-emerald-50 text-emerald-600 border-emerald-200/70',
          dot: 'bg-emerald-500',
        };
      case 'On Route':
        return {
          badge: 'bg-blue-50 text-blue-600 border-blue-200/70',
          dot: 'bg-blue-500',
        };
      case 'Idle':
      case 'Standby':
        return {
          badge: 'bg-amber-50 text-amber-600 border-amber-200/70',
          dot: 'bg-amber-500',
        };
      case 'Maintenance':
      default:
        return {
          badge: 'bg-rose-50 text-rose-600 border-rose-200/70',
          dot: 'bg-rose-500',
        };
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.regNo) return;

    const styles = getStatusStyles(formData.status);
    const busCode = formData.code || formData.name.replace(/[^0-9]/g, '') || '01';

    const newVehicle = {
      ...formData,
      code: busCode,
      badgeStyle: 'bg-blue-50 border-blue-100 text-blue-600',
      capacitySub: '0 Filled (Ready)',
      driverInitials: getInitials(formData.driverName),
      speed: formData.status === 'Running' || formData.status === 'On Route' ? '30 km/h' : '0 km/h',
      speedDot: styles.dot,
      signalSub: formData.status === 'Maintenance' ? 'Telemetry Disconnected' : 'Signal: Strong 5G',
      statusBadgeStyle: styles.badge,
      statusDotStyle: styles.dot,
    };

    if (onAddVehicle) {
      onAddVehicle(newVehicle);
    }

    setFormData({
      name: '',
      code: '',
      regNo: '',
      model: '',
      capacitySeats: '30 Seats',
      driverName: '',
      driverPhone: '',
      driverInitials: '',
      route: 'Route 1',
      routeSub: '',
      status: 'Running',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 w-full max-w-lg overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M8 7h8m-8 4h8m-9 9a2 2 0 01-2-2V6a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2M5 20v2m14-2v2M4 14h16" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
            <h3 className="text-base font-bold text-slate-900">Add New Vehicle</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-200 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="font-semibold text-slate-700 uppercase tracking-wide">Vehicle Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Bus-25"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:bg-white"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="space-y-1">
              <label className="font-semibold text-slate-700 uppercase tracking-wide">Registration No *</label>
              <input
                type="text"
                required
                placeholder="e.g. LHR-9988"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:bg-white"
                value={formData.regNo}
                onChange={(e) => setFormData({ ...formData, regNo: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="font-semibold text-slate-700 uppercase tracking-wide">Vehicle Model</label>
              <input
                type="text"
                placeholder="e.g. Toyota Coaster 2024"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:bg-white"
                value={formData.model}
                onChange={(e) => setFormData({ ...formData, model: e.target.value })}
              />
            </div>
            <div className="space-y-1">
              <label className="font-semibold text-slate-700 uppercase tracking-wide">Seating Capacity</label>
              <input
                type="text"
                placeholder="e.g. 30 Seats"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:bg-white"
                value={formData.capacitySeats}
                onChange={(e) => setFormData({ ...formData, capacitySeats: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="font-semibold text-slate-700 uppercase tracking-wide">Assigned Driver</label>
              <input
                type="text"
                placeholder="e.g. Ali Raza"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:bg-white"
                value={formData.driverName}
                onChange={(e) => setFormData({ ...formData, driverName: e.target.value })}
              />
            </div>
            <div className="space-y-1">
              <label className="font-semibold text-slate-700 uppercase tracking-wide">Driver Phone</label>
              <input
                type="text"
                placeholder="e.g. 0300 1234567"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:bg-white"
                value={formData.driverPhone}
                onChange={(e) => setFormData({ ...formData, driverPhone: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="font-semibold text-slate-700 uppercase tracking-wide">Assigned Route</label>
              <input
                type="text"
                placeholder="e.g. Route 1"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:bg-white"
                value={formData.route}
                onChange={(e) => setFormData({ ...formData, route: e.target.value })}
              />
            </div>
            <div className="space-y-1">
              <label className="font-semibold text-slate-700 uppercase tracking-wide">Status</label>
              <select
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                <option value="Running">Running</option>
                <option value="On Route">On Route</option>
                <option value="Idle">Idle</option>
                <option value="Maintenance">Maintenance</option>
              </select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors shadow-sm cursor-pointer"
            >
              Save Vehicle
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddVehicleModal;
