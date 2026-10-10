import React, { useState } from 'react';
import {
  MdPerson,
  MdEmail,
  MdPhone,
  MdShield,
  MdCheckCircle,
  MdSave,
} from 'react-icons/md';

const AdminDetailsCard = ({ adminData, onSaveAdminProfile }) => {
  const [formData, setFormData] = useState({
    name: adminData?.name || 'Admin',
    email: adminData?.email || 'admin@saferoute.com',
    phone: adminData?.phone || '0300 1234567',
    role: adminData?.role || 'Super Admin (Fleet Director)',
    department: adminData?.department || 'Transport & Student Safety Department',
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  const initial = formData.name?.charAt(0).toUpperCase() || 'A';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSaveAdminProfile) {
      onSaveAdminProfile(formData);
    }
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div
      className="bg-white rounded-2xl border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] p-6 font-sans space-y-6"
      data-purpose="admin-profile-card"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 border border-purple-100 flex items-center justify-center shrink-0">
            <MdPerson size={22} />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
              Administrator Personal Account
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Personal credentials and contact points for system notifications
            </p>
          </div>
        </div>

        {savedSuccess && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 border border-emerald-200 rounded-full text-xs font-semibold animate-in fade-in">
            <MdCheckCircle size={15} />
            <span>Details Updated</span>
          </span>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Avatar & Display Name Overview */}
        <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50/70 border border-slate-100">
          <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white font-bold text-xl flex items-center justify-center shadow-md shadow-blue-500/20 shrink-0">
            {initial}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-bold text-slate-800 truncate">
                {formData.name}
              </h4>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-600 border border-blue-100 shrink-0">
                Primary Master Admin
              </span>
            </div>
            <p className="text-xs text-slate-500 truncate mt-0.5">{formData.email}</p>
            <p className="text-[11px] text-slate-400 mt-0.5">{formData.department}</p>
          </div>
        </div>

        {/* Input Fields Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Administrator Full Name <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <MdPerson className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Zeeshan Malik"
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white font-sans transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Admin Login Email <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <MdEmail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="e.g. admin@saferoute.com"
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white font-sans transition-all"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Direct Phone Number
            </label>
            <div className="relative">
              <MdPhone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="e.g. 0300 1234567"
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white font-sans transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Portal Access Role
            </label>
            <div className="relative">
              <MdShield className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white font-sans transition-all"
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end pt-3 border-t border-slate-100 gap-3">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-xl shadow-xs transition-all cursor-pointer"
          >
            <MdSave size={16} />
            <span>Save Personal Details</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminDetailsCard;
