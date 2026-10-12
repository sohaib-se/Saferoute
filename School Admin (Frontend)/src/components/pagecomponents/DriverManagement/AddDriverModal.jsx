import React, { useState, useEffect } from 'react';
import { MdBadge } from 'react-icons/md';
import Modal from '../../common/Modal';

const AddDriverModal = ({
  isOpen,
  onClose,
  onAddDriver,
  onUpdateDriver,
  driver = null,
}) => {
  const isEditMode = Boolean(driver);

  const [formData, setFormData] = useState({
    name: '',
    license: '',
    licenseType: 'Heavy Transport',
    phone: '',
    status: 'Online',
  });

  useEffect(() => {
    if (driver) {
      setFormData({
        name: driver.name || '',
        license: driver.license || '',
        licenseType: driver.licenseType || 'Heavy Transport',
        phone: driver.phone || '',
        status: driver.status || 'Online',
      });
    } else {
      setFormData({
        name: '',
        license: '',
        licenseType: 'Heavy Transport',
        phone: '',
        status: 'Online',
      });
    }
  }, [driver, isOpen]);

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
    const driverPayload = {
      ...(driver || {}),
      ...formData,
      vehicle: driver?.vehicle || 'Unassigned',
      route: driver?.route || 'Unassigned',
      initials: getInitials(formData.name),
      initialsStyle: styles.initials,
      statusBadgeStyle: styles.badge,
      statusDotStyle: styles.dot,
    };

    if (isEditMode) {
      if (onUpdateDriver) {
        onUpdateDriver(driverPayload);
      }
    } else {
      if (onAddDriver) {
        onAddDriver(driverPayload);
      }
    }

    setFormData({
      name: '',
      license: '',
      licenseType: 'Heavy Transport',
      phone: '',
      status: 'Online',
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      icon={<MdBadge size={20} />}
      title={isEditMode ? 'Edit Driver Information' : 'Add New Driver'}
      subtitle={
        isEditMode
          ? 'Update driver license, contact, or duty status'
          : 'Enroll transport personnel into the active driver roster'
      }
      maxWidth="max-w-lg"
    >
      <form onSubmit={handleSubmit}>
        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto custom-scrollbar">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Driver Full Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Muhammad Ali"
              className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/10 transition-all font-sans"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                License Number <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. LIC-PK-98214"
                className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/10 transition-all font-sans"
                value={formData.license}
                onChange={(e) => setFormData({ ...formData, license: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Phone Number <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. 0300 1112233"
                className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/10 transition-all font-sans"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Duty Status
            </label>
            <select
              className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/10 transition-all font-sans cursor-pointer"
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
            {isEditMode ? 'Save Changes' : 'Save Driver'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddDriverModal;
