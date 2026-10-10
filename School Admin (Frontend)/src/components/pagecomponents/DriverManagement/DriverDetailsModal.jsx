import React, { useState, useEffect } from 'react';
import { MdBadge, MdEdit } from 'react-icons/md';
import Modal from '../../common/Modal';

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
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      icon={<MdBadge size={20} />}
      title={isEditing ? 'Edit Driver Information' : driver.name}
      subtitle={
        isEditing
          ? 'Update driver license, contact, or route assignment'
          : `${driver.license} • ${driver.licenseType || 'Heavy Transport'}`
      }
      maxWidth="max-w-lg"
    >
      {isEditing ? (
        <form onSubmit={handleSave}>
          <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto custom-scrollbar">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Driver Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/10 transition-all font-sans"
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Phone Number <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/10 transition-all font-sans"
                  value={formData.phone || ''}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Assigned Vehicle
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/10 transition-all font-sans"
                  value={formData.vehicle || ''}
                  onChange={(e) => setFormData({ ...formData, vehicle: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Assigned Route
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/10 transition-all font-sans"
                  value={formData.route || ''}
                  onChange={(e) => setFormData({ ...formData, route: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Route Area
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/10 transition-all font-sans"
                  value={formData.routeSub || ''}
                  onChange={(e) => setFormData({ ...formData, routeSub: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Duty Status
              </label>
              <select
                className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/10 transition-all font-sans cursor-pointer"
                value={formData.status || 'Online'}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                <option value="Online">Online</option>
                <option value="Idle / Break">Idle / Break</option>
                <option value="Standby">Standby</option>
                <option value="Offline">Offline</option>
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
            {/* Summary Card */}
            <div className="bg-slate-50/70 rounded-xl border border-slate-200/80 p-4 grid grid-cols-2 gap-4">
              <div>
                <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider mb-0.5">
                  Phone Number
                </span>
                <span className="text-xs text-slate-900 font-semibold block">
                  {driver.phone}
                </span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider mb-0.5">
                  Assigned Vehicle
                </span>
                <span className="text-xs text-slate-900 font-semibold block">
                  {driver.vehicle}
                </span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider mb-0.5">
                  Assigned Route
                </span>
                <span className="text-xs text-slate-900 font-semibold block">
                  {driver.route} ({driver.routeSub})
                </span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider mb-0.5">
                  Current Status
                </span>
                <span
                  className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full ${
                    driver.statusBadgeStyle || 'bg-emerald-50 text-emerald-700'
                  } text-[10px] font-bold mt-0.5`}
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
          </div>

          <div className="px-6 py-4 bg-slate-50/60 border-t border-slate-100 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100/80 font-semibold text-xs flex items-center gap-1.5 transition cursor-pointer"
            >
              <MdEdit size={15} />
              <span>Edit Driver</span>
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

export default DriverDetailsModal;
