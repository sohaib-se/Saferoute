import React, { useState } from 'react';
import {
  MdVpnKey,
  MdContentCopy,
  MdCheck,
  MdVisibility,
  MdVisibilityOff,
  MdPhone,
  MdPhoneAndroid,
  MdSecurity,
} from 'react-icons/md';
import Modal from './Modal';

const AppCredentialsModal = ({
  isOpen,
  onClose,
  entity, // parent or driver object
  userType = 'parent', // 'parent' or 'driver'
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [copiedId, setCopiedId] = useState(false);
  const [copiedPassword, setCopiedPassword] = useState(false);
  const [copiedAll, setCopiedAll] = useState(false);

  if (!isOpen || !entity) return null;

  const credentials = entity.credentials || {
    loginId: '1000',
    password: '1000',
  };

  const loginId = credentials.loginId || '1000';
  const password = credentials.password || loginId;
  const isDriver = userType === 'driver';
  const portalName = isDriver ? 'SafeRoute Driver App' : 'SafeRoute Parent App';

  const handleCopyId = () => {
    navigator.clipboard.writeText(loginId);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  const handleCopyPassword = () => {
    navigator.clipboard.writeText(password);
    setCopiedPassword(true);
    setTimeout(() => setCopiedPassword(false), 2000);
  };

  const handleCopyAll = () => {
    const text = [
      `SafeRoute Mobile App Login Credentials`,
      `Portal: ${portalName}`,
      `Name: ${entity.name}`,
      `Phone: ${entity.phone || 'N/A'}`,
      `Login ID: ${loginId}`,
      `Password: ${password}`,
      `Note: Use these 4 digits to log in on the SafeRoute Mobile App.`,
    ].join('\n');

    navigator.clipboard.writeText(text);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2500);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      icon={<MdVpnKey size={20} className="text-amber-600" />}
      title="App Login Credentials"
      subtitle={`Mobile portal access credentials for ${isDriver ? 'Driver' : 'Parent'}`}
      maxWidth="max-w-md"
    >
      <div className="p-6 space-y-5">
        {/* User Card */}
        <div className="flex items-center gap-3.5 p-3.5 bg-slate-50 border border-slate-200/80 rounded-2xl">
          <div
            className={`w-11 h-11 rounded-xl ${
              entity.avatarBg || entity.initialsStyle || 'bg-blue-100 text-blue-700'
            } font-bold flex items-center justify-center text-sm shrink-0`}
          >
            {entity.initials || 'SR'}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-2">
              <h4 className="text-sm font-bold text-slate-900 truncate">
                {entity.name}
              </h4>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                  isDriver
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-blue-100 text-blue-800'
                }`}
              >
                {isDriver ? 'Driver' : 'Parent'}
              </span>
            </div>
            {entity.phone && (
              <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5 font-medium">
                <MdPhone size={13} className="text-slate-400" />
                <span>{entity.phone}</span>
              </div>
            )}
          </div>
        </div>

        {/* Credentials Display Box */}
        <div className="bg-gradient-to-br from-amber-50/50 via-slate-50 to-blue-50/40 border border-amber-200/70 rounded-2xl p-4.5 space-y-3.5 shadow-xs">
          <div className="flex items-center justify-between pb-2 border-b border-amber-100">
            <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <MdPhoneAndroid size={16} className="text-amber-600" />
              <span>Mobile Portal Access</span>
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              Active
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* 4-Digit Login ID */}
            <div className="bg-white p-3 rounded-xl border border-slate-200/90 shadow-2xs">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                4-Digit Login ID
              </div>
              <div className="text-2xl font-mono font-extrabold text-slate-900 tracking-wider">
                {loginId}
              </div>
              <button
                type="button"
                onClick={handleCopyId}
                className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-blue-600 hover:text-blue-700 transition cursor-pointer"
              >
                {copiedId ? (
                  <>
                    <MdCheck size={13} className="text-emerald-600" />
                    <span className="text-emerald-600">Copied</span>
                  </>
                ) : (
                  <>
                    <MdContentCopy size={13} />
                    <span>Copy ID</span>
                  </>
                )}
              </button>
            </div>

            {/* 4-Digit Password */}
            <div className="bg-white p-3 rounded-xl border border-slate-200/90 shadow-2xs">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                4-Digit Password
              </div>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-mono font-extrabold text-slate-900 tracking-wider">
                  {showPassword ? password : '••••'}
                </div>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="p-1 text-slate-400 hover:text-slate-600 rounded transition cursor-pointer"
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <MdVisibilityOff size={16} />
                  ) : (
                    <MdVisibility size={16} />
                  )}
                </button>
              </div>
              <button
                type="button"
                onClick={handleCopyPassword}
                className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-blue-600 hover:text-blue-700 transition cursor-pointer"
              >
                {copiedPassword ? (
                  <>
                    <MdCheck size={13} className="text-emerald-600" />
                    <span className="text-emerald-600">Copied</span>
                  </>
                ) : (
                  <>
                    <MdContentCopy size={13} />
                    <span>Copy Password</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Explanation note */}
          <div className="flex items-start gap-2 pt-1 text-[11px] text-slate-500 leading-relaxed">
            <MdSecurity size={16} className="text-amber-500 shrink-0 mt-0.5" />
            <p>
              The Login ID and initial Password are the exact same 4-digit code.
              Share this with the {isDriver ? 'driver' : 'parent'} to log in to the
              SafeRoute mobile application.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={handleCopyAll}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition shadow-2xs cursor-pointer"
        >
          {copiedAll ? (
            <>
              <MdCheck size={15} className="text-emerald-600" />
              <span className="text-emerald-600 font-bold">Copied All Details!</span>
            </>
          ) : (
            <>
              <MdContentCopy size={15} className="text-slate-500" />
              <span>Copy All Details</span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={onClose}
          className="px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-xl shadow-xs transition cursor-pointer"
        >
          Done
        </button>
      </div>
    </Modal>
  );
};

export default AppCredentialsModal;
