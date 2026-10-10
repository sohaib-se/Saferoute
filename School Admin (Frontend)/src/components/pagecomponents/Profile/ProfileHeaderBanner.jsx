import React from 'react';
import {
  MdSchool,
  MdDirectionsBus,
  MdPeople,
  MdCheckCircle,
  MdOutlineCloudDone,
} from 'react-icons/md';

const ProfileHeaderBanner = ({
  schoolName = 'SafeRoute International Academy',
  campusName = 'Main Campus - Gulberg III',
  adminName = 'Admin',
  totalBuses = 25,
  totalStudents = 340,
  activeDrivers = 18,
}) => {
  return (
    <div
      className="bg-white rounded-2xl border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] p-6 font-sans relative overflow-hidden"
      data-purpose="profile-header-banner"
    >
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 w-96 h-40 bg-gradient-to-l from-blue-50/80 to-transparent pointer-events-none rounded-2xl" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        {/* Left: School Identity & Crest */}
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/20 shrink-0">
            <MdSchool size={32} />
          </div>

          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                {schoolName}
              </h2>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-200">
                <MdCheckCircle size={13} />
                <span>Verified School</span>
              </span>
            </div>

            <p className="text-xs text-slate-500 mt-1 flex items-center gap-2">
              <span className="font-semibold text-slate-700">{campusName}</span>
              <span>•</span>
              <span>Managed by <span className="font-medium text-blue-600">{adminName}</span></span>
            </p>
          </div>
        </div>

        {/* Right: Quick Metric Badges */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="px-4 py-2 bg-slate-50 border border-slate-200/70 rounded-xl flex items-center gap-2.5">
            <MdDirectionsBus className="text-blue-600" size={18} />
            <div>
              <p className="text-xs font-bold text-slate-800 leading-none">{totalBuses}</p>
              <p className="text-[10px] text-slate-400 font-medium leading-none mt-1">Fleet Buses</p>
            </div>
          </div>

          <div className="px-4 py-2 bg-slate-50 border border-slate-200/70 rounded-xl flex items-center gap-2.5">
            <MdPeople className="text-purple-600" size={18} />
            <div>
              <p className="text-xs font-bold text-slate-800 leading-none">{totalStudents}</p>
              <p className="text-[10px] text-slate-400 font-medium leading-none mt-1">Students</p>
            </div>
          </div>

          <div className="px-4 py-2 bg-slate-50 border border-slate-200/70 rounded-xl flex items-center gap-2.5">
            <MdPeople className="text-emerald-600" size={18} />
            <div>
              <p className="text-xs font-bold text-slate-800 leading-none">{activeDrivers}</p>
              <p className="text-[10px] text-slate-400 font-medium leading-none mt-1">Active Drivers</p>
            </div>
          </div>

          <div className="px-3.5 py-2 bg-emerald-50 border border-emerald-200/70 rounded-xl flex items-center gap-2 text-emerald-700 text-xs font-semibold">
            <MdOutlineCloudDone size={16} />
            <span>Synced</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeaderBanner;
