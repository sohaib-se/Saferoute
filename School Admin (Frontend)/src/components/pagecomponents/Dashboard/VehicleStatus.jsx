const VehicleStatus = () => {
  return (
    <div className="lg:col-span-6 bg-white rounded-2xl p-5 border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex flex-col justify-between" data-purpose="vehicle-status-card">
      <div>
        <h3 className="text-sm font-bold text-slate-800">Vehicle Status</h3>
        <p className="text-xs text-slate-400 mt-0.5">Current availability &amp; maintenance split</p>
        
        <div className="mt-4 flex items-center justify-around flex-wrap gap-6 py-2">
          {/* Donut Chart */}
          <div className="relative w-36 h-36 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              {/* Background Ring */}
              <circle cx="50" cy="50" fill="none" r="38" stroke="#F1F5F9" strokeWidth="13"></circle>
              {/* Arc: Running (18/25 = 72% -> ~171.7) */}
              <circle cx="50" cy="50" fill="none" r="38" stroke="#2563EB" strokeDasharray="171.7 238.7" strokeDashoffset="0" strokeWidth="13"></circle>
              {/* Arc: Idle (5/25 = 20% -> ~47.7) */}
              <circle cx="50" cy="50" fill="none" r="38" stroke="#38BDF8" strokeDasharray="47.7 238.7" strokeDashoffset="-173" strokeWidth="13"></circle>
              {/* Arc: Maintenance (2/25 = 8% -> ~19.1) */}
              <circle cx="50" cy="50" fill="none" r="38" stroke="#F59E0B" strokeDasharray="19.1 238.7" strokeDashoffset="-222" strokeWidth="13"></circle>
            </svg>
            {/* Center Text inside Donut */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-2xl font-extrabold text-slate-800 leading-none">25</span>
              <span className="text-[9px] font-bold text-slate-400 tracking-wider mt-0.5 uppercase">TOTAL</span>
            </div>
          </div>
          
          {/* Legend List */}
          <div className="space-y-3.5 min-w-[170px]">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-slate-600 font-medium">
                <span className="w-2.5 h-2.5 rounded-full bg-[#2563EB]"></span>
                <span>Running</span>
              </div>
              <span className="font-bold text-slate-800">18</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-slate-600 font-medium">
                <span className="w-2.5 h-2.5 rounded-full bg-[#38BDF8]"></span>
                <span>Idle</span>
              </div>
              <span className="font-bold text-slate-800">5</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-slate-600 font-medium">
                <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]"></span>
                <span>Maintenance</span>
              </div>
              <span className="font-bold text-slate-800">2</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleStatus;
