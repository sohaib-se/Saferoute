import React from 'react';
import {
  MdCalendarToday,
  MdBolt,
  MdCheckCircle,
  MdAccessTime,
} from 'react-icons/md';

const TripStatCards = ({
  totalScheduled = 0,
  inTransit = 0,
  completed = 0,
  pending = 0,
  pickupDone = 0,
  loading = false,
}) => {
  return (
    <section
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      data-purpose="kpi-metric-cards"
    >
      {/* Card 1: Total Trips */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex justify-between items-start transition-all hover:shadow-md">
        <div className="space-y-1">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Total Trips Created
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-slate-900 tracking-tight">
              {loading ? '...' : totalScheduled}
            </span>
            <span className="text-xs text-slate-400 font-medium">Recorded</span>
          </div>
          <p className="text-xs text-slate-500 font-medium pt-0.5">
            Driver-initiated daily routes
          </p>
        </div>
        <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center shrink-0">
          <MdCalendarToday size={20} />
        </div>
      </div>

      {/* Card 2: In Transit / Live */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex justify-between items-start transition-all hover:shadow-md">
        <div className="space-y-1">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            In Transit / Live
          </span>
          <div className="flex items-center gap-2">
            <span className="text-3xl font-bold text-slate-900 tracking-tight">
              {loading ? '...' : inTransit}
            </span>
            {inTransit > 0 && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-600 border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 animate-pulse" />
                Live
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 font-medium pt-0.5 flex items-center gap-1.5">
            <span className={`w-2 h-2 rounded-full ${inTransit > 0 ? 'bg-emerald-500 animate-ping' : 'bg-slate-300'}`} />
            <span>Active GPS Broadcasting</span>
          </p>
        </div>
        <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center shrink-0">
          <MdBolt size={22} />
        </div>
      </div>

      {/* Card 3: Completed Trips */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex justify-between items-start transition-all hover:shadow-md">
        <div className="space-y-1">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Completed Trips
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-slate-900 tracking-tight">
              {loading ? '...' : completed}
            </span>
            <span className="text-xs text-slate-400 font-medium">Finished</span>
          </div>
          <p className="text-xs text-emerald-600 font-medium pt-0.5">
            Both shifts safely concluded
          </p>
        </div>
        <div className="w-11 h-11 rounded-xl bg-purple-50 text-purple-600 border border-purple-100 flex items-center justify-center shrink-0">
          <MdCheckCircle size={22} />
        </div>
      </div>

      {/* Card 4: Pending / At School */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex justify-between items-start transition-all hover:shadow-md">
        <div className="space-y-1">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            At School / Pending
          </span>
          <div className="flex items-center gap-2">
            <span className="text-3xl font-bold text-slate-900 tracking-tight">
              {loading ? '...' : pending + pickupDone}
            </span>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-teal-50 text-teal-700 border border-teal-200">
              {pickupDone} At School
            </span>
          </div>
          <p className="text-xs text-slate-500 font-medium pt-0.5">
            {pending} awaiting pickup start
          </p>
        </div>
        <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 border border-amber-100 flex items-center justify-center shrink-0">
          <MdAccessTime size={22} />
        </div>
      </div>
    </section>
  );
};

export default TripStatCards;
