const ParentStatCards = ({ stats }) => {
  const defaultStats = {
    totalParents: 248,
    activePupils: 312,
    ...stats,
  };

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 gap-5" data-purpose="kpi-cards">
      {/* Card 1: TOTAL PARENTS */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm flex items-center justify-between">
        <div>
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Parents</div>
          <div className="text-2xl font-extrabold text-slate-900 mt-1">{defaultStats.totalParents}</div>
          <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600 mt-2">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
              <polyline points="17 6 23 6 23 12"></polyline>
            </svg>
            <span>+12 this month</span>
          </div>
        </div>
        <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"></path>
          </svg>
        </div>
      </div>

      {/* Card 2: ACTIVE LINKED PUPILS */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm flex items-center justify-between">
        <div>
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Active Linked Pupils</div>
          <div className="text-2xl font-extrabold text-slate-900 mt-1">{defaultStats.activePupils}</div>
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-blue-600 mt-2">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a10.912 10.912 0 01.35 6.5C4.063 15.115 3 16.42 3 18a1 1 0 001 1h12a1 1 0 001-1c0-1.58-1.063-2.885-2.6-3.449a10.912 10.912 0 01.35-6.5l2.644-1.131a1 1 0 000-1.84l-7-3z"></path>
            </svg>
            <span>Enrolled across routes</span>
          </div>
        </div>
        <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-500 flex items-center justify-center">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path clipRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" fillRule="evenodd"></path>
          </svg>
        </div>
      </div>
    </section>
  );
};

export default ParentStatCards;
