import React from 'react';

const VehicleStatCards = ({
  totalVehicles = 25,
  runningVehicles = 18,
  idleVehicles = 5,
  maintenanceVehicles = 2,
}) => {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" data-purpose="kpi-metric-cards">
      {/* Card 1: Total Vehicles */}
      <div className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex justify-between items-start">
        <div className="space-y-1">
          <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">TOTAL VEHICLES</p>
          <div className="flex items-baseline space-x-2 pt-0.5">
            <span className="text-2xl font-bold text-slate-900 leading-none">{totalVehicles}</span>
            <span className="text-xs text-slate-500 font-normal">Registered</span>
          </div>
          <p className="text-[11px] font-semibold text-emerald-600 pt-1">100% Inspected &amp; Ready</p>
        </div>
        <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M8 7h8m-8 4h8m-9 9a2 2 0 01-2-2V6a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2M5 20v2m14-2v2M4 14h16" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
        </div>
      </div>

      {/* Card 2: Running / On Route */}
      <div className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex justify-between items-start">
        <div className="space-y-1">
          <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">RUNNING / ON ROUTE</p>
          <div className="flex items-baseline space-x-2 pt-0.5">
            <span className="text-2xl font-bold text-slate-900 leading-none">{runningVehicles}</span>
            <span className="text-xs text-emerald-600 font-semibold">72% Active</span>
          </div>
          <p className="text-[11px] text-slate-400 font-normal pt-1">GPS Telematics Live</p>
        </div>
        <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-500 flex items-center justify-center flex-shrink-0">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
            <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
        </div>
      </div>

      {/* Card 3: Idle / Standby */}
      <div className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex justify-between items-start">
        <div className="space-y-1">
          <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">IDLE / STANDBY</p>
          <div className="flex items-baseline space-x-2 pt-0.5">
            <span className="text-2xl font-bold text-slate-900 leading-none">{idleVehicles}</span>
            <span className="text-xs text-amber-500 font-medium">Depot/School</span>
          </div>
          <p className="text-[11px] text-slate-400 font-normal pt-1">Available for Afternoon</p>
        </div>
        <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center flex-shrink-0">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="9"></circle>
            <path d="M12 7v5l3 3" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
        </div>
      </div>

      {/* Card 4: Maintenance */}
      <div className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex justify-between items-start">
        <div className="space-y-1">
          <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">MAINTENANCE</p>
          <div className="flex items-baseline space-x-2 pt-0.5">
            <span className="text-2xl font-bold text-slate-900 leading-none">{maintenanceVehicles}</span>
            <span className="text-xs text-rose-500 font-medium">In Garage</span>
          </div>
          <p className="text-[11px] text-slate-400 font-normal pt-1">Routine Oil &amp; Brake Check</p>
        </div>
        <div className="w-11 h-11 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center flex-shrink-0">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
        </div>
      </div>
    </section>
  );
};

export default VehicleStatCards;
