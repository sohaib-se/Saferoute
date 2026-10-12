import React from 'react';
import { MdRoute, MdCheckCircle, MdCloudDone } from 'react-icons/md';

const RouteKPICards = ({
  totalRoutes = 0,
}) => {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-3 gap-4" data-purpose="kpi-metrics-grid">
      {/* Card 1: Total Routes */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex items-start justify-between">
        <div>
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Total Routes
          </span>
          <div className="text-2xl font-bold text-slate-900 mt-1">
            {totalRoutes}
          </div>
          <div className="mt-2 text-xs text-slate-500 font-medium">
            Registered school transport routes
          </div>
        </div>
        <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
          <MdRoute size={22} />
        </div>
      </div>

      {/* Card 2: Active Transport */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex items-start justify-between">
        <div>
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Active Routes
          </span>
          <div className="text-2xl font-bold text-slate-900 mt-1">
            {totalRoutes}
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-xs text-emerald-600 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Available for fleet assignment</span>
          </div>
        </div>
        <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
          <MdCheckCircle size={22} />
        </div>
      </div>

      {/* Card 3: Cloud Database Sync */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex items-start justify-between">
        <div>
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Database Sync
          </span>
          <div className="text-2xl font-bold text-slate-900 mt-1">
            100%
          </div>
          <div className="mt-2 text-xs text-emerald-600 font-medium">
            Isolated school database
          </div>
        </div>
        <div className="w-11 h-11 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
          <MdCloudDone size={22} />
        </div>
      </div>
    </section>
  );
};

export default RouteKPICards;
