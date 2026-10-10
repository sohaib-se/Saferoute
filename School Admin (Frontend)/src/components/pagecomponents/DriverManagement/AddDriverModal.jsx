import React, { useState } from 'react';
import { MdBadge, MdClose } from 'react-icons/md';

const AddDriverModal = ({ isOpen, onClose, onAddDriver }) => {
  const [formData, setFormData] = useState({
    name: '',
    license: '',
    licenseType: 'Heavy Transport',
    phone: '',
    vehicle: 'Bus 01',
    route: 'Route 1',
    routeSub: 'Green Valley',
    status: 'Online',
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
      case 'Online':
        return {
          badge: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
          dot: 'bg-emerald-500',
          initials: 'bg-blue-100 text-blue-700',
        };
      case 'Idle / Break':
      case 'Standby':
        return {
          badge: 'bg-amber-50 text-amber-700 border border-amber-200',
          dot: 'bg-amber-500',
          initials: 'bg-amber-100 text-amber-700',
        };
      case 'Offline':
      default:
        return {
          badge: 'bg-slate-100 text-slate-600 border border-slate-200',
          dot: 'bg-slate-400',
          initials: 'bg-slate-100 text-slate-700',
        };
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.license) return;

    const styles = getStatusStyles(formData.status);
    const newDriver = {
      ...formData,
      initials: getInitials(formData.name),
      initialsStyle: styles.initials,
      statusBadgeStyle: styles.badge,
      statusDotStyle: styles.dot,
    };

    if (onAddDriver) {
      onAddDriver(newDriver);
    }

    setFormData({
      name: '',
      license: '',
      licenseType: 'Heavy Transport',
      phone: '',
      vehicle: 'Bus 01',
      route: 'Route 1',
      routeSub: 'Green Valley',
      status: 'Online',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <MdBadge size={18} />
            </div>
            <h3 className="text-base font-bold text-slate-900">Add New Driver</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 w-8 h-8 rounded-lg flex items-center justify-center hover:bg-slate-100 transition cursor-pointer"
          >
            <MdClose size={18} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-slate-700">
              Driver Full Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Muhammad Ali"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 focus:bg-white text-slate-800"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-700">
                License Number *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. LIC-PK-98214"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 focus:bg-white text-slate-800 font-mono"
                value={formData.license}
                onChange={(e) => setFormData({ ...formData, license: e.target.value })}
              />
            </div>
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-700">
                Phone Number *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. 0300 1112233"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 focus:bg-white text-slate-800 font-mono"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-700">
                Assigned Vehicle
              </label>
              <select
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 text-slate-800 cursor-pointer"
                value={formData.vehicle}
                onChange={(e) => setFormData({ ...formData, vehicle: e.target.value })}
              >
                <option value="Bus 01">Bus 01</option>
                <option value="Bus 04">Bus 04</option>
                <option value="Bus 07">Bus 07</option>
                <option value="Bus 09">Bus 09</option>
                <option value="Bus 11">Bus 11</option>
                <option value="Bus 12">Bus 12</option>
                <option value="Bus 15">Bus 15</option>
                <option value="Bus 18">Bus 18</option>
                <option value="Bus 22">Bus 22</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-700">
                Duty Status
              </label>
              <select
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 text-slate-800 cursor-pointer"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                <option value="Online">Online</option>
                <option value="Idle / Break">Idle / Break</option>
                <option value="Standby">Standby</option>
                <option value="Offline">Offline</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-700">
                Assigned Route
              </label>
              <input
                type="text"
                placeholder="e.g. Route 1"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 focus:bg-white text-slate-800"
                value={formData.route}
                onChange={(e) => setFormData({ ...formData, route: e.target.value })}
              />
            </div>
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-700">
                Area / Sub Route
              </label>
              <input
                type="text"
                placeholder="e.g. Green Valley"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 focus:bg-white text-slate-800"
                value={formData.routeSub}
                onChange={(e) => setFormData({ ...formData, routeSub: e.target.value })}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition shadow-xs cursor-pointer"
            >
              Save Driver
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDriverModal;
