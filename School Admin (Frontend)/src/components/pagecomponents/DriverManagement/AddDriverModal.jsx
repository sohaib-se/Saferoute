import React, { useState } from 'react';

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
          badge: 'bg-tertiary-fixed/20 text-tertiary',
          dot: 'bg-tertiary-fixed-dim',
          initials: 'bg-primary-container/15 text-primary',
        };
      case 'Idle / Break':
      case 'Standby':
        return {
          badge: 'bg-secondary-container text-on-secondary-container',
          dot: 'bg-secondary',
          initials: 'bg-secondary-container/70 text-on-secondary-container',
        };
      case 'Offline':
      default:
        return {
          badge: 'bg-surface-container text-secondary',
          dot: 'bg-outline',
          initials: 'bg-surface-container-high text-secondary',
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-on-background/50 backdrop-blur-sm p-4 animate-fadeIn">
      <div className="bg-surface-container-lowest rounded-2xl shadow-xl border border-surface-container-high w-full max-w-lg overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 bg-surface-container-low border-b border-surface-container-high/60 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[22px]">badge</span>
            <h3 className="font-headline-sm text-headline-sm text-on-surface">Add New Driver</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-surface-container-high text-outline hover:text-on-surface transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="space-y-1">
            <label className="font-label-sm text-label-sm text-outline uppercase font-semibold">
              Driver Full Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Muhammad Ali"
              className="w-full px-3.5 py-2 bg-surface-container-low border border-outline-variant/60 rounded-lg text-body-sm focus:outline-none focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="font-label-sm text-label-sm text-outline uppercase font-semibold">
                License Number *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. LIC-PK-98214"
                className="w-full px-3.5 py-2 bg-surface-container-low border border-outline-variant/60 rounded-lg text-body-sm focus:outline-none focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest font-code-sm"
                value={formData.license}
                onChange={(e) => setFormData({ ...formData, license: e.target.value })}
              />
            </div>
            <div className="space-y-1">
              <label className="font-label-sm text-label-sm text-outline uppercase font-semibold">
                Phone Number *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. 0300 1112233"
                className="w-full px-3.5 py-2 bg-surface-container-low border border-outline-variant/60 rounded-lg text-body-sm focus:outline-none focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest font-code-sm"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="font-label-sm text-label-sm text-outline uppercase font-semibold">
                Assigned Vehicle
              </label>
              <select
                className="w-full px-3.5 py-2 bg-surface-container-low border border-outline-variant/60 rounded-lg text-body-sm focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
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
              <label className="font-label-sm text-label-sm text-outline uppercase font-semibold">
                Duty Status
              </label>
              <select
                className="w-full px-3.5 py-2 bg-surface-container-low border border-outline-variant/60 rounded-lg text-body-sm focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="font-label-sm text-label-sm text-outline uppercase font-semibold">
                Assigned Route
              </label>
              <input
                type="text"
                placeholder="e.g. Route 1"
                className="w-full px-3.5 py-2 bg-surface-container-low border border-outline-variant/60 rounded-lg text-body-sm focus:outline-none focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest"
                value={formData.route}
                onChange={(e) => setFormData({ ...formData, route: e.target.value })}
              />
            </div>
            <div className="space-y-1">
              <label className="font-label-sm text-label-sm text-outline uppercase font-semibold">
                Area / Sub Route
              </label>
              <input
                type="text"
                placeholder="e.g. Green Valley"
                className="w-full px-3.5 py-2 bg-surface-container-low border border-outline-variant/60 rounded-lg text-body-sm focus:outline-none focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest"
                value={formData.routeSub}
                onChange={(e) => setFormData({ ...formData, routeSub: e.target.value })}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-surface-container-high/60 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-surface-container-low hover:bg-surface-container-high text-on-surface font-label-md text-label-md font-medium transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-primary text-on-primary hover:bg-primary-container font-label-md text-label-md font-semibold transition-colors shadow-sm cursor-pointer"
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
