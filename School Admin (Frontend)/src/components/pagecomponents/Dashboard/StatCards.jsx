import React from 'react';
import { MdDirectionsBus, MdLocationOn, MdPerson, MdVerifiedUser, MdTrendingUp } from 'react-icons/md';

const StatCards = () => {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" data-purpose="kpi-cards">
      {/* Card 1: TOTAL VEHICLES */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex items-start justify-between">
        <div>
          <span className="text-[11px] font-semibold text-slate-400 tracking-wider uppercase">
            Total Vehicles
          </span>
          <div className="text-2xl font-bold text-slate-900 mt-1">25</div>
          <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-600 mt-2">
            <MdTrendingUp size={14} />
            <span>100% operational</span>
          </div>
        </div>
        <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
          <MdDirectionsBus size={20} />
        </div>
      </div>

      {/* Card 2: ACTIVE TRIPS */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex items-start justify-between">
        <div>
          <span className="text-[11px] font-semibold text-slate-400 tracking-wider uppercase">
            Active Trips
          </span>
          <div className="text-2xl font-bold text-slate-900 mt-1">12</div>
          <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500 mt-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>In progress now</span>
          </div>
        </div>
        <div className="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
          <MdLocationOn size={20} />
        </div>
      </div>

      {/* Card 3: DRIVERS ONLINE */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex items-start justify-between">
        <div>
          <span className="text-[11px] font-semibold text-slate-400 tracking-wider uppercase">
            Drivers Online
          </span>
          <div className="text-2xl font-bold text-slate-900 mt-1">18</div>
          <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500 mt-2">
            <MdPerson size={14} className="text-blue-600" />
            <span>Shift 1 Active</span>
          </div>
        </div>
        <div className="w-11 h-11 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0">
          <MdPerson size={20} />
        </div>
      </div>

      {/* Card 4: STUDENTS ONBOARD */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex items-start justify-between">
        <div>
          <span className="text-[11px] font-semibold text-slate-400 tracking-wider uppercase">
            Students Onboard
          </span>
          <div className="text-2xl font-bold text-slate-900 mt-1">312</div>
          <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-600 mt-2">
            <MdVerifiedUser size={14} />
            <span>RFID Checked-in</span>
          </div>
        </div>
        <div className="w-11 h-11 rounded-xl bg-teal-50 flex items-center justify-center text-teal-600 shrink-0">
          <MdVerifiedUser size={20} />
        </div>
      </div>
    </section>
  );
};

export default StatCards;
