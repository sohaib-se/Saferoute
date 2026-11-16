import React, { useRef } from 'react';
import {
  MdSchool,
  MdCheckCircle,
  MdCameraAlt,
  MdDeleteOutline,
} from 'react-icons/md';

const ProfileHeaderBanner = ({
  schoolName = 'SafeRoute International Academy',
  campusName = 'Main Campus - Gulberg III',
  logoUrl = null,
  onUploadLogo,
  onRemoveLogo,
  isUploadingLogo = false,
}) => {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file && onUploadLogo) {
      onUploadLogo(file);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleTriggerUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div
      className="bg-white rounded-2xl border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] p-6 font-sans relative overflow-hidden"
      data-purpose="profile-header-banner"
    >
      {/* Hidden file input for logo selection */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg,image/jpg,image/webp,image/svg+xml"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 w-96 h-40 bg-gradient-to-l from-blue-50/80 to-transparent pointer-events-none rounded-2xl" />

      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        {/* Left: School Identity, Crest & Logo Upload */}
        <div className="flex items-center gap-4.5 min-w-0">
          {/* Logo / Crest Avatar with Hover Overlay */}
          <div className="relative group shrink-0">
            <div className="w-18 h-18 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white flex items-center justify-center shadow-lg shadow-blue-500/20 overflow-hidden border-2 border-white ring-2 ring-slate-100">
              {logoUrl ? (
                <img
                  src={logoUrl}
                  alt={schoolName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <MdSchool size={36} className="text-white drop-shadow-sm" />
              )}

              {/* Uploading Spinner Overlay */}
              {isUploadingLogo && (
                <div className="absolute inset-0 bg-slate-900/60 flex flex-col items-center justify-center text-white text-[10px] font-semibold">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mb-1" />
                  <span>Uploading</span>
                </div>
              )}
            </div>

            {/* Hover Action Button to Change Logo */}
            <button
              type="button"
              onClick={handleTriggerUpload}
              disabled={isUploadingLogo}
              title="Upload / Change School Logo"
              className="absolute -bottom-1 -right-1 w-7 h-7 bg-white text-slate-700 border border-slate-200 shadow-md rounded-xl flex items-center justify-center hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all cursor-pointer group-hover:scale-105"
            >
              <MdCameraAlt size={15} />
            </button>
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2.5">
              <h2 className="text-xl font-bold text-slate-900 tracking-tight truncate">
                {schoolName}
              </h2>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-200">
                <MdCheckCircle size={13} />
                <span>Verified School</span>
              </span>
            </div>

            <p className="text-xs text-slate-500 mt-1 flex flex-wrap items-center gap-2">
              <span className="font-semibold text-slate-700">{campusName}</span>
            </p>

            {/* Quick Logo actions row */}
            <div className="flex items-center gap-2 mt-2">
              <button
                type="button"
                onClick={handleTriggerUpload}
                disabled={isUploadingLogo}
                className="text-[11px] font-semibold text-blue-600 hover:text-blue-700 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <MdCameraAlt size={13} />
                <span>{logoUrl ? 'Change School Logo' : 'Upload School Logo'}</span>
              </button>

              {logoUrl && onRemoveLogo && (
                <>
                  <span className="text-slate-300">•</span>
                  <button
                    type="button"
                    onClick={onRemoveLogo}
                    disabled={isUploadingLogo}
                    className="text-[11px] font-medium text-rose-500 hover:text-rose-700 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <MdDeleteOutline size={13} />
                    <span>Remove Logo</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeaderBanner;
