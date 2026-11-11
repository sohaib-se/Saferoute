import React from 'react';
import { MdErrorOutline, MdAccessTime, MdCheckCircleOutline } from 'react-icons/md';

const SOSStatCards = ({ alerts = [] }) => {
  const activeAlerts = alerts.filter((a) => a.status === 'active');
  const activeCount = activeAlerts.length;
  const resolvedCount = alerts.filter((a) => a.status === 'resolved').length;
  const latestActive = activeAlerts[0];

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" data-purpose="kpi-metrics-grid">
      {/* Card 1: Active Distress Signals */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex flex-col justify-between">
        <div className="flex items-start justify-between">
          <div>
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Active Distress Signals
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-bold text-slate-900">
                {activeCount} {activeCount === 1 ? 'Open' : 'Open'}
              </span>
              {activeCount > 0 ? (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-50 text-rose-600 border border-rose-200 tracking-wide">
                  P-0 Critical
                </span>
              ) : (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 tracking-wide">
                  All Clear
                </span>
              )}
            </div>
          </div>
          <div
            className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
              activeCount > 0 ? 'bg-rose-50 text-rose-600' : 'bg-emerald-50 text-emerald-600'
            }`}
          >
            <MdErrorOutline size={22} />
          </div>
        </div>
        <div className="mt-2 flex items-center gap-1.5 text-xs font-medium">
          {activeCount > 0 ? (
            <>
              <span className="w-1.5 h-1.5 rounded-full bg-rose-600 animate-pulse"></span>
              <span className="text-rose-600 font-bold">
                {latestActive?.vehicle_name || 'Vehicle'} ({latestActive?.sender_name || 'Active SOS'})
              </span>
            </>
          ) : (
            <>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <span className="text-slate-500">Zero active emergency signals</span>
            </>
          )}
        </div>
      </div>

      {/* Card 2: Total Recorded Incidents */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex flex-col justify-between">
        <div className="flex items-start justify-between">
          <div>
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Total Logged Incidents
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-bold text-slate-900">{alerts.length} Incidents</span>
            </div>
          </div>
          <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <MdAccessTime size={22} />
          </div>
        </div>
        <div className="mt-2 text-xs text-slate-500 font-medium">
          Logged in database
        </div>
      </div>

      {/* Card 3: Resolved Cases */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex flex-col justify-between">
        <div className="flex items-start justify-between">
          <div>
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Resolved Cases
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-bold text-slate-900">{resolvedCount} Cases</span>
              <span className="text-[10px] font-semibold text-emerald-600">
                {alerts.length > 0
                  ? `${Math.round((resolvedCount / alerts.length) * 100)}% Closed`
                  : '100% Closed'}
              </span>
            </div>
          </div>
          <div className="w-11 h-11 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
            <MdCheckCircleOutline size={22} />
          </div>
        </div>
        <div className="mt-2 text-xs text-slate-500 font-medium">
          Marked resolved by administration
        </div>
      </div>
    </section>
  );
};

export default SOSStatCards;
