import React from 'react';
import { MdBadge, MdTimelapse, MdSchedule, MdBlock } from 'react-icons/md';

const DriverKPICards = ({
  totalDrivers = 28,
  activeDrivers = 18,
  standbyDrivers = 7,
  offDutyDrivers = 3,
}) => {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4" data-purpose="kpi-metrics-grid">
      {/* Card 1: Total Drivers */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex items-start justify-between">
        <div>
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Total Drivers
          </span>
          <div className="text-2xl font-bold text-slate-900 mt-1">
            {totalDrivers}
          </div>
          <div className="mt-2 text-xs text-slate-500 font-medium">
            Registered fleet personnel
          </div>
        </div>
        <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
          <MdBadge size={22} />
        </div>
      </div>

      {/* Card 2: On Duty / Active */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex items-start justify-between">
        <div>
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            On Duty / Active
          </span>
          <div className="text-2xl font-bold text-slate-900 mt-1">
            {activeDrivers}
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-xs text-emerald-600 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Currently driving routes</span>
          </div>
        </div>
        <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
          <MdTimelapse size={22} />
        </div>
      </div>

      {/* Card 3: Standby / Idle */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex items-start justify-between">
        <div>
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Standby / Idle
          </span>
          <div className="text-2xl font-bold text-slate-900 mt-1">
            {standbyDrivers}
          </div>
          <div className="mt-2 text-xs text-amber-600 font-medium">
            Available for backup shifts
          </div>
        </div>
        <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
          <MdSchedule size={22} />
        </div>
      </div>

      {/* Card 4: On Leave / Off-Duty */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex items-start justify-between">
        <div>
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            On Leave / Off-Duty
          </span>
          <div className="text-2xl font-bold text-slate-900 mt-1">
            {offDutyDrivers}
          </div>
          <div className="mt-2 text-xs text-slate-500 font-medium">
            Scheduled off-duty
          </div>
        </div>
        <div className="w-11 h-11 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
          <MdBlock size={22} />
        </div>
      </div>
    </section>
  );
};

export default DriverKPICards;
