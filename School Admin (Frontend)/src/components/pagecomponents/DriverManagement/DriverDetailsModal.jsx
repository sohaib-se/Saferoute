import React, { useState, useEffect } from 'react';
import { MdClose, MdEdit } from 'react-icons/md';

const DriverDetailsModal = ({ driver, isOpen, onClose, onSave, mode = 'view' }) => {
  const [isEditing, setIsEditing] = useState(mode === 'edit');
  const [formData, setFormData] = useState(driver || {});

  useEffect(() => {
    setIsEditing(mode === 'edit');
    setFormData(driver || {});
  }, [driver, mode, isOpen]);

  if (!isOpen || !driver) return null;

  const handleSave = (e) => {
    e.preventDefault();
    if (onSave) {
      onSave(formData);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`w-9 h-9 rounded-full ${driver.initialsStyle || 'bg-blue-100 text-blue-700'} font-bold text-xs flex items-center justify-center shrink-0`}
            >
              {driver.initials}
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                {isEditing ? 'Edit Driver Information' : driver.name}
              </h3>
              <p className="text-xs text-slate-500 font-mono">
                {driver.license} • {driver.licenseType || 'Heavy Transport'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 w-8 h-8 rounded-lg flex items-center justify-center hover:bg-slate-100 transition cursor-pointer"
          >
            <MdClose size={18} />
          </button>
        </div>

        {/* Content */}
        {isEditing ? (
          <form onSubmit={handleSave} className="p-6 space-y-4 text-xs">
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-700">
                Driver Name
              </label>
              <input
                type="text"
                required
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white"
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-slate-700">
                  Phone
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-mono focus:outline-none focus:border-blue-500 focus:bg-white"
                  value={formData.phone || ''}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-slate-700">
                  Vehicle
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white"
                  value={formData.vehicle || ''}
                  onChange={(e) => setFormData({ ...formData, vehicle: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-slate-700">
                  Route
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white"
                  value={formData.route || ''}
                  onChange={(e) => setFormData({ ...formData, route: e.target.value })}
                />
              </div>
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-slate-700">
                  Route Area
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white"
                  value={formData.routeSub || ''}
                  onChange={(e) => setFormData({ ...formData, routeSub: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-700">
                Status
              </label>
              <select
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-blue-500 cursor-pointer"
                value={formData.status || 'Online'}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                <option value="Online">Online</option>
                <option value="Idle / Break">Idle / Break</option>
                <option value="Standby">Standby</option>
                <option value="Offline">Offline</option>
              </select>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-end space-x-2">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition shadow-xs cursor-pointer"
              >
                Save Changes
              </button>
            </div>
          </form>
        ) : (
          <div className="p-6 space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-4 bg-slate-50/80 p-4 rounded-xl border border-slate-200">
              <div>
                <span className="text-[11px] font-bold text-slate-400 block uppercase">
                  Phone Number
                </span>
                <span className="font-mono text-slate-900 font-semibold mt-0.5 block">
                  {driver.phone}
                </span>
              </div>
              <div>
                <span className="text-[11px] font-bold text-slate-400 block uppercase">
                  Assigned Vehicle
                </span>
                <span className="text-slate-900 font-semibold mt-0.5 block">
                  {driver.vehicle}
                </span>
              </div>
              <div>
                <span className="text-[11px] font-bold text-slate-400 block uppercase">
                  Assigned Route
                </span>
                <span className="text-slate-900 font-semibold mt-0.5 block">
                  {driver.route} ({driver.routeSub})
                </span>
              </div>
              <div>
                <span className="text-[11px] font-bold text-slate-400 block uppercase">
                  Current Status
                </span>
                <span
                  className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full ${
                    driver.statusBadgeStyle || 'bg-emerald-50 text-emerald-700'
                  } text-[10px] font-bold mt-1`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      driver.statusDotStyle || 'bg-emerald-500'
                    }`}
                  ></span>
                  {driver.status}
                </span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 font-semibold text-xs flex items-center gap-1.5 transition cursor-pointer"
              >
                <MdEdit size={16} />
                <span>Edit Driver</span>
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2 rounded-lg bg-blue-600 text-white font-semibold text-xs hover:bg-blue-700 transition cursor-pointer"
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

export default DriverDetailsModal;
