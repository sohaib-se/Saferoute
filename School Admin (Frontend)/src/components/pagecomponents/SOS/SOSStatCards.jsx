import React from 'react';
import { MdErrorOutline, MdAccessTime, MdCheckCircleOutline, MdMic } from 'react-icons/md';

const SOSStatCards = () => {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" data-purpose="kpi-metrics-grid">
      {/* Card 1: Active Distress Signals */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex flex-col justify-between">
        <div className="flex items-start justify-between">
          <div>
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Active Distress Signals
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-bold text-slate-900">1 Open</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-50 text-rose-600 border border-rose-200 tracking-wide">
                P-0 Critical
              </span>
            </div>
          </div>
          <div className="w-11 h-11 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
            <MdErrorOutline size={22} />
          </div>
        </div>
        <div className="mt-2 flex items-center gap-1.5 text-xs text-rose-600 font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-600 animate-pulse"></span>
          <span>Bus 09 Panic Signal (Active)</span>
        </div>
      </div>

      {/* Card 2: Avg Response Velocity */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex flex-col justify-between">
        <div className="flex items-start justify-between">
          <div>
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Avg Response Velocity
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-bold text-slate-900">1.4 mins</span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 border border-blue-100">
                -45s SLA
              </span>
            </div>
          </div>
          <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <MdAccessTime size={22} />
          </div>
        </div>
        <div className="mt-2 text-xs text-slate-500 font-medium">
          Faster than 3.0m target SLA
        </div>
      </div>

      {/* Card 3: Resolved Cases Today */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex flex-col justify-between">
        <div className="flex items-start justify-between">
          <div>
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Resolved Cases Today
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-bold text-slate-900">4 Cases</span>
              <span className="text-[10px] font-semibold text-emerald-600">100% Closed</span>
            </div>
          </div>
          <div className="w-11 h-11 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
            <MdCheckCircleOutline size={22} />
          </div>
        </div>
        <div className="mt-2 text-xs text-slate-500 font-medium">
          3 Parent alerts, 1 depot check
        </div>
      </div>

      {/* Card 4: Emergency Dispatchers */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex flex-col justify-between">
        <div className="flex items-start justify-between">
          <div>
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Emergency Dispatchers
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-bold text-slate-900">6 On-Duty</span>
              <span className="text-[10px] font-semibold text-blue-600">100% Ready</span>
            </div>
          </div>
          <div className="w-11 h-11 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
            <MdMic size={22} />
          </div>
        </div>
        <div className="mt-2 text-xs text-slate-500 font-medium">
          Dual radio + cellular uplink intact
        </div>
      </div>
    </section>
  );
};

export default SOSStatCards;
