import React, { useState } from 'react';
import {
  MdLock,
  MdVisibility,
  MdVisibilityOff,
  MdCheckCircle,
  MdErrorOutline,
  MdKey,
  MdSecurity,
} from 'react-icons/md';

const ChangePasswordCard = ({ onUpdatePassword }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  // Compute password strength
  const calculateStrength = (pass) => {
    if (!pass) return { score: 0, label: '', color: 'bg-slate-200' };
    let score = 0;
    if (pass.length >= 8) score += 1;
    if (/[A-Z]/.test(pass) || /[a-z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;

    if (score <= 1) return { score: 25, label: 'Weak', color: 'bg-rose-500' };
    if (score === 2) return { score: 50, label: 'Fair', color: 'bg-amber-500' };
    if (score === 3) return { score: 75, label: 'Good', color: 'bg-blue-500' };
    return { score: 100, label: 'Strong', color: 'bg-emerald-500' };
  };

  const strength = calculateStrength(newPassword);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!currentPassword) {
      setError('Please enter your current administrator password.');
      return;
    }

    if (newPassword.length < 8) {
      setError('New password must be at least 8 characters long.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('New password and confirm password do not match.');
      return;
    }

    if (currentPassword === newPassword) {
      setError('New password cannot be the same as your current password.');
      return;
    }

    setLoading(true);

    // Simulate API call / save
    setTimeout(() => {
      setLoading(false);
      setSuccess('Administrator password updated successfully! Please use this password for your next login.');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');

      if (onUpdatePassword) {
        onUpdatePassword({ currentPassword, newPassword });
      }

      setTimeout(() => setSuccess(''), 5000);
    }, 600);
  };

  return (
    <div
      className="bg-white rounded-2xl border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] p-6 font-sans space-y-5"
      data-purpose="change-password-card"
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 border border-amber-100 flex items-center justify-center shrink-0">
            <MdSecurity size={22} />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
              Security &amp; Change Password
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Keep your administrator portal account secure with a strong password
            </p>
          </div>
        </div>

        <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 bg-slate-50 text-slate-600 border border-slate-200/80 rounded-full text-[11px] font-semibold">
          <MdLock size={13} className="text-slate-400" />
          <span>Encrypted Credentials</span>
        </span>
      </div>

      {/* Alert Messages */}
      {error && (
        <div className="flex items-center gap-2.5 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-xs font-medium animate-in fade-in">
          <MdErrorOutline size={16} className="shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="flex items-center gap-2.5 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-medium animate-in fade-in">
          <MdCheckCircle size={16} className="shrink-0 text-emerald-600" />
          <span>{success}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Current Password Field */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Current Password <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <MdKey className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type={showCurrent ? 'text' : 'password'}
              required
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Enter current password"
              className="w-full pl-9 pr-10 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white font-sans transition-all"
            />
            <button
              type="button"
              onClick={() => setShowCurrent(!showCurrent)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors p-1"
              title={showCurrent ? 'Hide password' : 'Show password'}
            >
              {showCurrent ? <MdVisibilityOff size={16} /> : <MdVisibility size={16} />}
            </button>
          </div>
        </div>

        {/* New Password & Confirm Password */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              New Password <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <MdLock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type={showNew ? 'text' : 'password'}
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Minimum 8 characters"
                className="w-full pl-9 pr-10 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white font-sans transition-all"
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors p-1"
                title={showNew ? 'Hide password' : 'Show password'}
              >
                {showNew ? <MdVisibilityOff size={16} /> : <MdVisibility size={16} />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Confirm New Password <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <MdLock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type={showConfirm ? 'text' : 'password'}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter new password"
                className="w-full pl-9 pr-10 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white font-sans transition-all"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors p-1"
                title={showConfirm ? 'Hide password' : 'Show password'}
              >
                {showConfirm ? <MdVisibilityOff size={16} /> : <MdVisibility size={16} />}
              </button>
            </div>
          </div>
        </div>

        {/* Strength Indicator */}
        {newPassword && (
          <div className="p-3 bg-slate-50/70 rounded-xl border border-slate-100 space-y-2">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-500 font-medium">Password Strength:</span>
              <span className={`font-bold ${
                strength.label === 'Strong' ? 'text-emerald-600' :
                strength.label === 'Good' ? 'text-blue-600' :
                strength.label === 'Fair' ? 'text-amber-600' : 'text-rose-500'
              }`}>
                {strength.label}
              </span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
              <div
                className={`h-1.5 rounded-full transition-all duration-300 ${strength.color}`}
                style={{ width: `${strength.score}%` }}
              />
            </div>
          </div>
        )}

        {/* Password Requirements Checklist */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] text-slate-500 pt-1">
          <div className="flex items-center gap-1.5">
            <span className={`w-1.5 h-1.5 rounded-full ${newPassword.length >= 8 ? 'bg-emerald-500' : 'bg-slate-300'}`} />
            <span>At least 8 characters</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className={`w-1.5 h-1.5 rounded-full ${/[0-9]/.test(newPassword) ? 'bg-emerald-500' : 'bg-slate-300'}`} />
            <span>Contains numbers</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className={`w-1.5 h-1.5 rounded-full ${newPassword && newPassword === confirmPassword ? 'bg-emerald-500' : 'bg-slate-300'}`} />
            <span>Passwords match</span>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex items-center justify-end pt-3 border-t border-slate-100 gap-3">
          <button
            type="button"
            onClick={() => {
              setCurrentPassword('');
              setNewPassword('');
              setConfirmPassword('');
              setError('');
            }}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition cursor-pointer"
          >
            Clear Fields
          </button>
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-xl shadow-xs transition-all cursor-pointer disabled:opacity-50"
          >
            <MdLock size={15} />
            <span>{loading ? 'Updating Password...' : 'Update Password'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePasswordCard;
