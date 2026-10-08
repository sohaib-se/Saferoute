import { useState } from 'react';

const CardStudentPhoto = ({ photoUrl, onPhotoChange, onRemovePhoto }) => {
  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm flex items-center gap-6">
      {/* Upload Circular Area */}
      <label className="w-24 h-24 rounded-full bg-blue-100/70 border-2 border-dashed border-blue-200 flex flex-col items-center justify-center text-blue-600 flex-shrink-0 cursor-pointer hover:bg-blue-100 transition-colors overflow-hidden relative group">
        {photoUrl ? (
          <img src={photoUrl} alt="Student Photograph" className="w-full h-full object-cover" />
        ) : (
          <>
            <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
              <circle cx="12" cy="13" r="4"></circle>
            </svg>
            <span className="text-[11px] font-medium mt-1">Upload</span>
          </>
        )}
        <input type="file" accept="image/*" className="hidden" onChange={onPhotoChange} />
      </label>

      {/* Photograph Info & Controls */}
      <div className="flex-1">
        <h3 className="text-sm font-semibold text-slate-800">Student Photograph</h3>
        <p className="text-xs text-slate-500 mt-1 leading-relaxed max-w-sm">
          Upload recent portrait for bus pass credential and facial verification. Allowed formats: PNG, JPG (Max 2MB).
        </p>
        <div className="flex items-center gap-4 mt-3">
          <label className="text-xs font-semibold text-blue-600 hover:text-blue-700 cursor-pointer">
            Choose File
            <input type="file" accept="image/*" className="hidden" onChange={onPhotoChange} />
          </label>
          {photoUrl && (
            <button
              type="button"
              onClick={onRemovePhoto}
              className="text-xs font-semibold text-red-500 hover:text-red-600 cursor-pointer"
            >
              Remove
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardStudentPhoto;
