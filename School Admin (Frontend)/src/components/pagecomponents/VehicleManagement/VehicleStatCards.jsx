import React from 'react';
import { MdDirectionsBus, MdBolt, MdSchedule, MdBuild } from 'react-icons/md';

const VehicleStatCards = ({
  totalVehicles = 25,
  runningVehicles = 18,
  idleVehicles = 5,
  maintenanceVehicles = 2,
}) => {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" data-purpose="kpi-metric-cards">
      {/* Card 1: Total Vehicles */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex justify-between items-start">
        <div>
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Total Vehicles
          </span>
          <div className="text-2xl font-bold text-slate-900 mt-1">{totalVehicles}</div>
          <div className="mt-2 text-xs font-medium text-emerald-600">
            100% Inspected &amp; Ready
          </div>
        </div>
        <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
          <MdDirectionsBus size={22} />
        </div>
      </div>

      {/* Card 2: Running / On Route */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex justify-between items-start">
        <div>
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Running / On Route
          </span>
          <div className="text-2xl font-bold text-slate-900 mt-1">{runningVehicles}</div>
          <div className="mt-2 flex items-center gap-1.5 text-xs font-medium text-emerald-600">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>GPS Telematics Live</span>
          </div>
        </div>
        <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
          <MdBolt size={22} />
        </div>
      </div>

      {/* Card 3: Idle / Standby */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex justify-between items-start">
        <div>
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Idle / Standby
          </span>
          <div className="text-2xl font-bold text-slate-900 mt-1">{idleVehicles}</div>
          <div className="mt-2 text-xs font-medium text-amber-600">
            Available at Depot
          </div>
        </div>
        <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
          <MdSchedule size={22} />
        </div>
      </div>

      {/* Card 4: Maintenance */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex justify-between items-start">
        <div>
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Maintenance
          </span>
          <div className="text-2xl font-bold text-slate-900 mt-1">{maintenanceVehicles}</div>
          <div className="mt-2 text-xs font-medium text-rose-500">
            Scheduled Workshop Check
          </div>
        </div>
        <div className="w-11 h-11 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center shrink-0">
          <MdBuild size={20} />
        </div>
      </div>
    </section>
  );
};

export default VehicleStatCards;
