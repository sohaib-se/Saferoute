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
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs relative overflow-hidden flex flex-col justify-between">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Total Drivers
            </p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-bold text-slate-900">
                {totalDrivers}
              </span>
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <MdBadge size={22} />
          </div>
        </div>
        <div className="mt-3 text-xs text-slate-500 font-medium">
          Registered personnel
        </div>
      </div>

      {/* Card 2: On Duty / Active */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs relative overflow-hidden flex flex-col justify-between">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              On Duty / Active
            </p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-bold text-slate-900">
                {activeDrivers}
              </span>
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <MdTimelapse size={22} />
          </div>
        </div>
        <div className="mt-3 flex items-center gap-1.5 text-xs text-emerald-600 font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
          Currently driving routes
        </div>
      </div>

      {/* Card 3: Standby / Idle */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs relative overflow-hidden flex flex-col justify-between">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Standby / Idle
            </p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-bold text-slate-900">
                {standbyDrivers}
              </span>
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <MdSchedule size={22} />
          </div>
        </div>
        <div className="mt-3 text-xs text-slate-500 font-medium">
          Available for backup/shift
        </div>
      </div>

      {/* Card 4: On Leave / Off-Duty */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs relative overflow-hidden flex flex-col justify-between">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              On Leave / Off-Duty
            </p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-bold text-slate-900">
                {offDutyDrivers}
              </span>
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
            <MdBlock size={22} />
          </div>
        </div>
        <div className="mt-3 text-xs text-slate-500 font-medium">
          Scheduled off-duty
        </div>
      </div>
    </section>
  );
};

export default DriverKPICards;
