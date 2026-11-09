import React from 'react';
import { MdPeople, MdSchool, MdTrendingUp } from 'react-icons/md';

const ParentStatCards = ({ stats }) => {
  const defaultStats = {
    totalParents: 0,
    activePupils: 0,
    ...stats,
  };

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 gap-4" data-purpose="kpi-cards">
      {/* Card 1: TOTAL PARENTS */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex items-start justify-between">
        <div>
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Total Parents
          </span>
          <div className="text-2xl font-bold text-slate-900 mt-1">{defaultStats.totalParents}</div>
          <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500 mt-2">
            <MdPeople size={14} className="text-blue-600" />
            <span>
              {defaultStats.totalParents > 0
                ? `${defaultStats.totalParents} registered guardian${defaultStats.totalParents === 1 ? '' : 's'}`
                : 'No parents registered yet'}
            </span>
          </div>
        </div>
        <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
          <MdPeople size={22} />
        </div>
      </div>

      {/* Card 2: ACTIVE LINKED PUPILS */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex items-start justify-between">
        <div>
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Active Linked Pupils
          </span>
          <div className="text-2xl font-bold text-slate-900 mt-1">{defaultStats.activePupils}</div>
          <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500 mt-2">
            <MdSchool size={14} className="text-indigo-600" />
            <span>
              {defaultStats.activePupils > 0
                ? `${defaultStats.activePupils} student${defaultStats.activePupils === 1 ? '' : 's'} linked to parents`
                : 'No linked students yet'}
            </span>
          </div>
        </div>
        <div className="w-11 h-11 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
          <MdSchool size={22} />
        </div>
      </div>
    </section>
  );
};

export default ParentStatCards;
