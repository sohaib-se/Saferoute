import React, { useState, useEffect } from 'react';
import {
  MdPeople,
  MdEdit,
  MdCall,
  MdEmail,
  MdDirectionsBus,
  MdSchool,
  MdVpnKey,
  MdHome,
} from 'react-icons/md';
import Modal from '../../common/Modal';

const ParentDetailsModal = ({
  parent,
  isOpen,
  onClose,
  onSave,
  onEditClick,
  mode = 'view', // 'view' or 'edit'
}) => {
  const [isEditing, setIsEditing] = useState(mode === 'edit');
  const [formData, setFormData] = useState(parent || {});

  useEffect(() => {
    setFormData(parent || {});
    setIsEditing(mode === 'edit');
  }, [parent, mode, isOpen]);

  if (!isOpen || !parent) return null;

  const handleSave = (e) => {
    e.preventDefault();
    if (onSave) {
      onSave(formData);
    }
    onClose();
  };

  const loginId = parent.credentials?.loginId || '1000';
  const password = parent.credentials?.password || loginId;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      icon={<MdPeople size={20} />}
      title={isEditing ? 'Edit Parent Details' : parent.name}
      subtitle={
        isEditing
          ? 'Update contact details, address, or assigned route'
          : `${parent.phone} • ${parent.status || 'Active'}`
      }
      maxWidth="max-w-lg"
    >
      {isEditing ? (
        <form onSubmit={handleSave}>
          <div className="p-6 space-y-4 max-h-[72vh] overflow-y-auto custom-scrollbar">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Parent Full Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/10 transition-all font-sans"
              />
            </div>

            {/* Email & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email || ''}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/10 transition-all font-sans"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Phone Number <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.phone || ''}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/10 transition-all font-sans"
                />
              </div>
            </div>

            {/* Route & Bus */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Assigned Route
                </label>
                <input
                  type="text"
                  value={formData.route || ''}
                  onChange={(e) => setFormData({ ...formData, route: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/10 transition-all font-sans"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Assigned Bus
                </label>
                <input
                  type="text"
                  value={formData.bus || ''}
                  onChange={(e) => setFormData({ ...formData, bus: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/10 transition-all font-sans"
                />
              </div>
            </div>

            {/* Status */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Account Status
              </label>
              <select
                value={formData.status || 'Active'}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/10 transition-all font-sans cursor-pointer"
              >
                <option value="Active">Active</option>
                <option value="Pending">Pending</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            {/* Residential Address */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Residential Address
              </label>
              <textarea
                rows={2}
                value={formData.address || ''}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/10 transition-all font-sans"
              />
            </div>
          </div>

          {/* Edit Footer */}
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
          <div className="p-6 space-y-4.5 max-h-[72vh] overflow-y-auto custom-scrollbar">
            {/* Header profile card */}
            <div className="flex items-center gap-3.5 p-3.5 bg-slate-50/80 border border-slate-200/80 rounded-2xl">
              <div
                className={`w-12 h-12 rounded-xl ${
                  parent.avatarBg || 'bg-blue-100 text-blue-600'
                } font-bold flex items-center justify-center text-sm shrink-0`}
              >
                {parent.initials || 'PA'}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-sm font-bold text-slate-900 truncate">
                    {parent.name}
                  </h4>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      parent.status === 'Active'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}
                  >
                    {parent.status || 'Active'}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 mt-1">
                  <span className="flex items-center gap-1">
                    <MdCall size={13} className="text-slate-400" />
                    {parent.phone}
                  </span>
                  {parent.email && parent.email !== 'N/A' && (
                    <span className="flex items-center gap-1">
                      <MdEmail size={13} className="text-slate-400" />
                      {parent.email}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Address & Fleet Information */}
            <div className="bg-slate-50/60 rounded-xl border border-slate-200/80 p-4 grid grid-cols-2 gap-4">
              <div>
                <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider mb-0.5">
                  Assigned Route
                </span>
                <span className="text-xs text-slate-900 font-semibold block">
                  {parent.route || 'Route 1'}
                </span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider mb-0.5">
                  Assigned Vehicle
                </span>
                <span className="text-xs text-blue-600 font-semibold flex items-center gap-1">
                  <MdDirectionsBus size={13} />
                  {parent.bus || 'Bus 01'}
                </span>
              </div>
              {parent.address && (
                <div className="col-span-2 pt-1 border-t border-slate-200/60">
                  <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider mb-0.5">
                    Residential Address
                  </span>
                  <span className="text-xs text-slate-700 flex items-center gap-1.5 font-medium">
                    <MdHome size={14} className="text-slate-400 shrink-0" />
                    {parent.address}
                  </span>
                </div>
              )}
            </div>

            {/* Linked Children Section */}
            <div className="bg-white rounded-xl border border-slate-200/80 p-4 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <MdSchool size={16} className="text-blue-600" />
                  <span>Linked Children</span>
                </span>
                <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                  {(parent.children || []).length} Enrolled
                </span>
              </div>

              {(parent.children || []).length > 0 ? (
                <div className="space-y-1.5">
                  {parent.children.map((child, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between px-3 py-2 bg-slate-50 rounded-lg text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <MdSchool size={15} className="text-blue-600" />
                        <span className="font-semibold text-slate-800">
                          {child.name}
                        </span>
                      </div>
                      <span className="text-[11px] font-medium text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                        {child.grade}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-400 italic py-1">
                  No children currently linked to this guardian.
                </p>
              )}
            </div>

            {/* Mobile App Credentials Card */}
            <div className="bg-amber-50/70 rounded-xl border border-amber-200/80 p-4 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                  <MdVpnKey size={15} className="text-amber-600" />
                  <span>Parent Mobile App Credentials</span>
                </span>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-full">
                  Active
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white p-2.5 rounded-xl border border-amber-200/70 shadow-2xs">
                  <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider mb-0.5">
                    4-Digit Login ID
                  </span>
                  <span className="text-lg font-mono font-bold text-slate-900 tracking-wider">
                    {loginId}
                  </span>
                </div>
                <div className="bg-white p-2.5 rounded-xl border border-amber-200/70 shadow-2xs">
                  <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider mb-0.5">
                    4-Digit Password
                  </span>
                  <span className="text-lg font-mono font-bold text-slate-900 tracking-wider">
                    {password}
                  </span>
                </div>
              </div>
              <p className="text-[11px] text-amber-800/80 leading-relaxed">
                Parents use these 4 digits to sign in to the SafeRoute Guardian Mobile App.
              </p>
            </div>
          </div>

          {/* View Footer */}
          <div className="px-6 py-4 bg-slate-50/60 border-t border-slate-100 flex items-center justify-between">
            <button
              type="button"
              onClick={() => {
                if (onEditClick) {
                  onEditClick(parent);
                } else {
                  setIsEditing(true);
                }
              }}
              className="px-4 py-2 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100/80 font-semibold text-xs flex items-center gap-1.5 transition cursor-pointer"
            >
              <MdEdit size={15} />
              <span>Edit Parent</span>
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

export default ParentDetailsModal;
