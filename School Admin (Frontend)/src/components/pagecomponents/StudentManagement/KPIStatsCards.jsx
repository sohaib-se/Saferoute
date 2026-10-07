const KPIStatsCards = ({ stats }) => {
  // Default values matching code.html if props not provided
  const defaultStats = {
    totalStudents: 312,
    onRoute: 142,
    pickedUp: 88,
    waitingPickup: 18,
    droppedSafely: 64,
    ...stats,
  };

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {/* Card 1: TOTAL STUDENTS */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm flex items-center justify-between">
        <div>
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">TOTAL STUDENTS</p>
          <h3 className="text-2xl font-bold text-slate-900 mt-1">{defaultStats.totalStudents}</h3>
        </div>
        <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
          <i className="fa-solid fa-user-graduate text-lg"></i>
        </div>
      </div>

      {/* Card 2: ON ROUTE */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm flex items-center justify-between">
        <div>
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">ON ROUTE</p>
          <h3 className="text-2xl font-bold text-emerald-600 mt-1">{defaultStats.onRoute}</h3>
        </div>
        <div className="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-500">
          <span className="w-3.5 h-3.5 rounded-full bg-emerald-500"></span>
        </div>
      </div>

      {/* Card 3: PICKED UP */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm flex items-center justify-between">
        <div>
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">PICKED UP</p>
          <h3 className="text-2xl font-bold text-blue-600 mt-1">{defaultStats.pickedUp}</h3>
        </div>
        <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
          <i className="fa-solid fa-check text-lg font-bold"></i>
        </div>
      </div>

      {/* Card 4: WAITING PICKUP */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm flex items-center justify-between">
        <div>
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">WAITING PICKUP</p>
          <h3 className="text-2xl font-bold text-amber-500 mt-1">{defaultStats.waitingPickup}</h3>
        </div>
        <div className="w-11 h-11 rounded-xl bg-amber-50 flex items-center justify-center text-amber-500">
          <i className="fa-regular fa-clock text-lg"></i>
        </div>
      </div>

      {/* Card 5: DROPPED SAFELY */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm flex items-center justify-between">
        <div>
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">DROPPED SAFELY</p>
          <h3 className="text-2xl font-bold text-slate-800 mt-1">{defaultStats.droppedSafely}</h3>
        </div>
        <div className="w-11 h-11 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600">
          <i className="fa-solid fa-house text-base"></i>
        </div>
      </div>
    </section>
  );
};

export default KPIStatsCards;
