import React, { useState, useEffect } from 'react';

const VehicleDetailsModal = ({ vehicle, isOpen, onClose, onSave, mode = 'view' }) => {
  const [isEditing, setIsEditing] = useState(mode === 'edit');
  const [formData, setFormData] = useState(vehicle || {});

  useEffect(() => {
    setIsEditing(mode === 'edit');
    setFormData(vehicle || {});
  }, [vehicle, mode, isOpen]);

  if (!isOpen || !vehicle) return null;

  const handleSave = (e) => {
    e.preventDefault();
    if (onSave) {
      onSave(formData);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 w-full max-w-lg overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`w-9 h-9 rounded-lg ${vehicle.badgeStyle} font-semibold flex items-center justify-center text-xs flex-shrink-0`}>
              {vehicle.code}
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                {isEditing ? 'Edit Vehicle Information' : vehicle.name}
              </h3>
              <p className="text-xs text-slate-400">
                {vehicle.regNo} • {vehicle.model}
              </p>
            </div>
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

        {/* Form or Details */}
        {isEditing ? (
          <form onSubmit={handleSave} className="p-6 space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-semibold text-slate-700 uppercase tracking-wide">Vehicle Name</label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:bg-white"
                  value={formData.name || ''}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="space-y-1">
                <label className="font-semibold text-slate-700 uppercase tracking-wide">Registration No</label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:bg-white"
                  value={formData.regNo || ''}
                  onChange={(e) => setFormData({ ...formData, regNo: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-semibold text-slate-700 uppercase tracking-wide">Assigned Driver</label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:bg-white"
                  value={formData.driverName || ''}
                  onChange={(e) => setFormData({ ...formData, driverName: e.target.value })}
                />
              </div>
              <div className="space-y-1">
                <label className="font-semibold text-slate-700 uppercase tracking-wide">Driver Phone</label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:bg-white"
                  value={formData.driverPhone || ''}
                  onChange={(e) => setFormData({ ...formData, driverPhone: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-semibold text-slate-700 uppercase tracking-wide">Assigned Route</label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:bg-white"
                  value={formData.route || ''}
                  onChange={(e) => setFormData({ ...formData, route: e.target.value })}
                />
              </div>
              <div className="space-y-1">
                <label className="font-semibold text-slate-700 uppercase tracking-wide">Status</label>
                <select
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
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

            <div className="pt-4 border-t border-slate-200 flex items-center justify-end space-x-3">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors shadow-sm cursor-pointer"
              >
                Save Changes
              </button>
            </div>
          </form>
        ) : (
          <div className="p-6 space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200/80">
              <div>
                <span className="font-semibold text-slate-400 block uppercase tracking-wide text-[10px]">
                  Assigned Driver
                </span>
                <span className="font-bold text-slate-900 mt-0.5 block">
                  {vehicle.driverName} ({vehicle.driverPhone})
                </span>
              </div>
              <div>
                <span className="font-semibold text-slate-400 block uppercase tracking-wide text-[10px]">
                  Assigned Route
                </span>
                <span className="font-bold text-slate-900 mt-0.5 block">
                  {vehicle.route} ({vehicle.routeSub})
                </span>
              </div>
              <div>
                <span className="font-semibold text-slate-400 block uppercase tracking-wide text-[10px]">
                  Seating &amp; Capacity
                </span>
                <span className="font-bold text-slate-900 mt-0.5 block">
                  {vehicle.capacitySeats} - {vehicle.capacitySub}
                </span>
              </div>
              <div>
                <span className="font-semibold text-slate-400 block uppercase tracking-wide text-[10px]">
                  Current Status &amp; Telematics
                </span>
                <div className="flex items-center space-x-2 mt-1">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium ${vehicle.statusBadgeStyle}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${vehicle.statusDotStyle} mr-1.5`}></span>
                    {vehicle.status}
                  </span>
                  <span className="text-slate-500 font-medium">({vehicle.speed})</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600 font-semibold flex items-center space-x-1.5 transition-colors cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
                <span>Edit Vehicle</span>
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VehicleDetailsModal;
