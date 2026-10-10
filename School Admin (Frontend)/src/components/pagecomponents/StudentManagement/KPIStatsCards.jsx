import React from 'react';
import { MdSchool, MdDirectionsBus, MdCheckCircle, MdSchedule, MdHome } from 'react-icons/md';

const KPIStatsCards = ({ stats }) => {
  const defaultStats = {
    totalStudents: 312,
    onRoute: 142,
    pickedUp: 88,
    waitingPickup: 18,
    droppedSafely: 64,
    ...stats,
  };

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {/* Card 1: TOTAL STUDENTS */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex items-start justify-between">
        <div>
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Total Students
          </p>
          <h3 className="text-2xl font-bold text-slate-900 mt-1">{defaultStats.totalStudents}</h3>
          <p className="text-xs font-medium text-slate-500 mt-2">Active enrollments</p>
        </div>
        <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
          <MdSchool size={20} />
        </div>
      </div>

      {/* Card 2: ON ROUTE */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex items-start justify-between">
        <div>
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            On Route
          </p>
          <h3 className="text-2xl font-bold text-slate-900 mt-1">{defaultStats.onRoute}</h3>
          <p className="text-xs font-medium text-emerald-600 mt-2 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Transit in progress</span>
          </p>
        </div>
        <div className="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
          <MdDirectionsBus size={20} />
        </div>
      </div>

      {/* Card 3: PICKED UP */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex items-start justify-between">
        <div>
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Picked Up
          </p>
          <h3 className="text-2xl font-bold text-slate-900 mt-1">{defaultStats.pickedUp}</h3>
          <p className="text-xs font-medium text-blue-600 mt-2">Boarded safely</p>
        </div>
        <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
          <MdCheckCircle size={20} />
        </div>
      </div>

      {/* Card 4: WAITING PICKUP */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex items-start justify-between">
        <div>
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Waiting Pickup
          </p>
          <h3 className="text-2xl font-bold text-slate-900 mt-1">{defaultStats.waitingPickup}</h3>
          <p className="text-xs font-medium text-amber-600 mt-2">At bus stops</p>
        </div>
        <div className="w-11 h-11 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 shrink-0">
          <MdSchedule size={20} />
        </div>
      </div>

      {/* Card 5: DROPPED SAFELY */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex items-start justify-between">
        <div>
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Dropped Safely
          </p>
          <h3 className="text-2xl font-bold text-slate-900 mt-1">{defaultStats.droppedSafely}</h3>
          <p className="text-xs font-medium text-slate-500 mt-2">Reached destination</p>
        </div>
        <div className="w-11 h-11 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 shrink-0">
          <MdHome size={20} />
        </div>
      </div>
    </section>
  );
};

export default KPIStatsCards;
