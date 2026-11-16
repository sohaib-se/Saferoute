import React, { useState, useEffect } from 'react';
import {
  MdSchool,
  MdLocationOn,
  MdEmail,
  MdPhone,
  MdLanguage,
  MdSchedule,
  MdCheckCircle,
  MdSave,
  MdErrorOutline,
  MdPerson,
} from 'react-icons/md';

const SchoolProfileCard = ({ schoolData, onSaveSchoolProfile, isLoading = false }) => {
  const [formData, setFormData] = useState({
    schoolName: '',
    campusName: '',
    schoolEmail: '',
    phone: '',
    principalName: '',
    website: '',
    address: '',
    morningStartTime: '',
    afternoonDismissal: '',
  });

  const [savedSuccess, setSavedSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Sync state whenever schoolData loads from Supabase
  useEffect(() => {
    if (schoolData) {
      setFormData({
        schoolName: schoolData.schoolName || '',
        campusName: schoolData.campusName || '',
        schoolEmail: schoolData.schoolEmail || '',
        phone: schoolData.phone || '',
        principalName: schoolData.principalName || '',
        website: schoolData.website || '',
        address: schoolData.address || '',
        morningStartTime: schoolData.morningStartTime || '',
        afternoonDismissal: schoolData.afternoonDismissal || '',
      });
    }
  }, [schoolData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsSaving(true);

    try {
      if (onSaveSchoolProfile) {
        await onSaveSchoolProfile(formData);
      }
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3500);
    } catch (err) {
      setErrorMessage(err.message || 'Failed to update school profile in database.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div
      className="bg-white rounded-2xl border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] p-6 font-sans space-y-6"
      data-purpose="school-profile-card"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center shrink-0">
            <MdSchool size={22} />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
              School Institution Profile
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Official school records, location, and administrative contact information
            </p>
          </div>
        </div>

        {savedSuccess && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 border border-emerald-200 rounded-full text-xs font-semibold animate-in fade-in">
            <MdCheckCircle size={15} />
            <span>Saved to Database</span>
          </span>
        )}
      </div>

      {errorMessage && (
        <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-xs font-medium animate-in fade-in">
          <MdErrorOutline className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Row 1: School Name & Campus */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Official School Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              disabled={isLoading || isSaving}
              value={formData.schoolName}
              onChange={(e) => setFormData({ ...formData, schoolName: e.target.value })}
              placeholder="e.g. Jhagra Model School"
              className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white font-sans transition-all disabled:opacity-60"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Branch / Campus Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              disabled={isLoading || isSaving}
              value={formData.campusName}
              onChange={(e) => setFormData({ ...formData, campusName: e.target.value })}
              placeholder="e.g. Main Campus - Khatme Nabuwat"
              className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white font-sans transition-all disabled:opacity-60"
            />
          </div>
        </div>

        {/* Row 2: Official Email & Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Official School Email <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <MdEmail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                disabled={isLoading || isSaving}
                value={formData.schoolEmail}
                onChange={(e) => setFormData({ ...formData, schoolEmail: e.target.value })}
                placeholder="jhagra@gmail.com"
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white font-sans transition-all disabled:opacity-60"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              School Phone / Reception <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <MdPhone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                disabled={isLoading || isSaving}
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="03198224949"
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white font-sans transition-all disabled:opacity-60"
              />
            </div>
          </div>
        </div>

        {/* Row 3: Principal & Website */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Principal / Head Director
            </label>
            <div className="relative">
              <MdPerson className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                disabled={isLoading || isSaving}
                value={formData.principalName}
                onChange={(e) => setFormData({ ...formData, principalName: e.target.value })}
                placeholder="e.g. Dr. Tariq Mansoor"
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white font-sans transition-all disabled:opacity-60"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              School Website Portal
            </label>
            <div className="relative">
              <MdLanguage className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="url"
                disabled={isLoading || isSaving}
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                placeholder="https://jhagramodel.edu.pk"
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white font-sans transition-all disabled:opacity-60"
              />
            </div>
          </div>
        </div>

        {/* Row 4: Physical Address */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Campus Physical Address <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <MdLocationOn className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <textarea
              rows={2}
              required
              disabled={isLoading || isSaving}
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              placeholder="Khatme Nabuwat Chowk, Ghari Rashida"
              className="w-full pl-9 pr-3 py-2 bg-slate-50/70 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white font-sans transition-all resize-none disabled:opacity-60"
            />
          </div>
        </div>

        {/* Row 5: Shift Operating Timings */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Morning Shift Assembly Time
            </label>
            <div className="relative">
              <MdSchedule className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                disabled={isLoading || isSaving}
                value={formData.morningStartTime}
                onChange={(e) => setFormData({ ...formData, morningStartTime: e.target.value })}
                placeholder="e.g. 07:30 AM"
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white font-sans transition-all disabled:opacity-60"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Afternoon Dismissal Time
            </label>
            <div className="relative">
              <MdSchedule className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                disabled={isLoading || isSaving}
                value={formData.afternoonDismissal}
                onChange={(e) => setFormData({ ...formData, afternoonDismissal: e.target.value })}
                placeholder="e.g. 02:15 PM"
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white font-sans transition-all disabled:opacity-60"
              />
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex items-center justify-end pt-3 border-t border-slate-100 gap-3">
          <button
            type="submit"
            disabled={isLoading || isSaving}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-xl shadow-xs transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSaving ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Saving to Database...</span>
              </>
            ) : (
              <>
                <MdSave size={16} />
                <span>Save School Profile</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SchoolProfileCard;
