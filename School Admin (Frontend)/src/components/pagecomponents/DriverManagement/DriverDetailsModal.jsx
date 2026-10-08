import React, { useState, useEffect } from 'react';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-on-background/50 backdrop-blur-sm p-4 animate-fadeIn">
      <div className="bg-surface-container-lowest rounded-2xl shadow-xl border border-surface-container-high w-full max-w-lg overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 bg-surface-container-low border-b border-surface-container-high/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`w-9 h-9 rounded-full ${driver.initialsStyle} font-label-md font-bold flex items-center justify-center shrink-0`}
            >
              {driver.initials}
            </div>
            <div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface">
                {isEditing ? 'Edit Driver Information' : driver.name}
              </h3>
              <p className="font-code-sm text-code-sm text-outline">
                {driver.license} • {driver.licenseType || 'Heavy Transport'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-surface-container-high text-outline hover:text-on-surface transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Content */}
        {isEditing ? (
          <form onSubmit={handleSave} className="p-6 space-y-4">
            <div className="space-y-1">
              <label className="font-label-sm text-label-sm text-outline uppercase font-semibold">
                Driver Name
              </label>
              <input
                type="text"
                required
                className="w-full px-3.5 py-2 bg-surface-container-low border border-outline-variant/60 rounded-lg text-body-sm focus:outline-none focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest"
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-label-sm text-label-sm text-outline uppercase font-semibold">
                  Phone
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-3.5 py-2 bg-surface-container-low border border-outline-variant/60 rounded-lg text-body-sm focus:outline-none focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest font-code-sm"
                  value={formData.phone || ''}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
              <div className="space-y-1">
                <label className="font-label-sm text-label-sm text-outline uppercase font-semibold">
                  Vehicle
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-3.5 py-2 bg-surface-container-low border border-outline-variant/60 rounded-lg text-body-sm focus:outline-none focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest"
                  value={formData.vehicle || ''}
                  onChange={(e) => setFormData({ ...formData, vehicle: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-label-sm text-label-sm text-outline uppercase font-semibold">
                  Route
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-3.5 py-2 bg-surface-container-low border border-outline-variant/60 rounded-lg text-body-sm focus:outline-none focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest"
                  value={formData.route || ''}
                  onChange={(e) => setFormData({ ...formData, route: e.target.value })}
                />
              </div>
              <div className="space-y-1">
                <label className="font-label-sm text-label-sm text-outline uppercase font-semibold">
                  Route Area
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-3.5 py-2 bg-surface-container-low border border-outline-variant/60 rounded-lg text-body-sm focus:outline-none focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest"
                  value={formData.routeSub || ''}
                  onChange={(e) => setFormData({ ...formData, routeSub: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-label-sm text-label-sm text-outline uppercase font-semibold">
                Status
              </label>
              <select
                className="w-full px-3.5 py-2 bg-surface-container-low border border-outline-variant/60 rounded-lg text-body-sm focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
                value={formData.status || 'Online'}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                <option value="Online">Online</option>
                <option value="Idle / Break">Idle / Break</option>
                <option value="Standby">Standby</option>
                <option value="Offline">Offline</option>
              </select>
            </div>

            <div className="pt-4 border-t border-surface-container-high/60 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 rounded-lg bg-surface-container-low hover:bg-surface-container-high text-on-surface font-label-md text-label-md font-medium transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-lg bg-primary text-on-primary hover:bg-primary-container font-label-md text-label-md font-semibold transition-colors shadow-sm cursor-pointer"
              >
                Save Changes
              </button>
            </div>
          </form>
        ) : (
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4 bg-surface-container-low/60 p-4 rounded-xl border border-surface-container-high/50">
              <div>
                <span className="font-label-sm text-label-sm text-outline block uppercase font-semibold">
                  Phone Number
                </span>
                <span className="font-code-sm text-code-sm text-on-surface font-medium">
                  {driver.phone}
                </span>
              </div>
              <div>
                <span className="font-label-sm text-label-sm text-outline block uppercase font-semibold">
                  Assigned Vehicle
                </span>
                <span className="font-label-md text-label-md text-on-surface font-semibold">
                  {driver.vehicle}
                </span>
              </div>
              <div>
                <span className="font-label-sm text-label-sm text-outline block uppercase font-semibold">
                  Assigned Route
                </span>
                <span className="font-label-md text-label-md text-on-surface font-semibold">
                  {driver.route} ({driver.routeSub})
                </span>
              </div>
              <div>
                <span className="font-label-sm text-label-sm text-outline block uppercase font-semibold">
                  Current Status
                </span>
                <span
                  className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full ${driver.statusBadgeStyle} font-label-sm text-label-sm font-semibold mt-1`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${driver.statusDotStyle}`}></span>
                  {driver.status}
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-surface-container-high/60 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 rounded-lg bg-surface-container-low hover:bg-surface-container-high text-primary font-label-md text-label-md font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">edit</span>
                <span>Edit Driver</span>
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2 rounded-lg bg-primary text-on-primary font-label-md text-label-md font-semibold transition-colors cursor-pointer"
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
