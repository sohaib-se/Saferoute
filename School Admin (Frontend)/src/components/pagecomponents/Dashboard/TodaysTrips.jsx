import { MdChevronRight, MdDirectionsBus } from 'react-icons/md';

const TodaysTrips = () => {
  return (
    <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between" data-purpose="todays-trips-card">
      <div className="p-5 pb-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-800">Today's Trips</h3>
            <p className="text-xs text-slate-400 mt-0.5">Active and upcoming school schedules</p>
          </div>
          <a className="text-xs font-semibold text-[#2563EB] hover:text-blue-700" href="#">View All</a>
        </div>
        
        {/* Trips Table */}
        <div className="mt-4">
          <div className="grid grid-cols-12 text-[10px] font-bold text-slate-400 uppercase tracking-wider pb-2 border-b border-slate-100 px-2">
            <div className="col-span-4">BUS NO.</div>
            <div className="col-span-4">ROUTE</div>
            <div className="col-span-4 text-right">STATUS</div>
          </div>
          
          <div className="divide-y divide-slate-50 text-xs">
            {/* Row 1 */}
            <div className="grid grid-cols-12 items-center py-3.5 px-2 hover:bg-slate-50/70 rounded-lg transition-colors cursor-pointer group">
              <div className="col-span-4 flex items-center gap-2 font-semibold text-slate-700">
                <span className="w-2 h-2 rounded-full bg-[#10B981]"></span>
                <span>Bus-12</span>
              </div>
              <div className="col-span-4 text-slate-600 font-medium truncate">Green Valley</div>
              <div className="col-span-4 flex items-center justify-end gap-2">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#ECFDF5] text-[#10B981]">
                  <span className="text-[8px]">●</span> On Route
                </span>
                <MdChevronRight className="text-[14px] text-slate-300 group-hover:text-slate-500 transition-colors" />
              </div>
            </div>
            
            {/* Row 2 */}
            <div className="grid grid-cols-12 items-center py-3.5 px-2 hover:bg-slate-50/70 rounded-lg transition-colors cursor-pointer group">
              <div className="col-span-4 flex items-center gap-2 font-semibold text-slate-700">
                <span className="w-2 h-2 rounded-full bg-[#2563EB]"></span>
                <span>Bus-07</span>
              </div>
              <div className="col-span-4 text-slate-600 font-medium truncate">Model Town</div>
              <div className="col-span-4 flex items-center justify-end gap-2">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#EFF6FF] text-[#2563EB]">
                  <span className="text-[8px]">●</span> Picked Up
                </span>
                <MdChevronRight className="text-[14px] text-slate-300 group-hover:text-slate-500 transition-colors" />
              </div>
            </div>
            
            {/* Row 3 */}
            <div className="grid grid-cols-12 items-center py-3.5 px-2 hover:bg-slate-50/70 rounded-lg transition-colors cursor-pointer group">
              <div className="col-span-4 flex items-center gap-2 font-semibold text-slate-700">
                <span className="w-2 h-2 rounded-full bg-[#10B981]"></span>
                <span>Bus-09</span>
              </div>
              <div className="col-span-4 text-slate-600 font-medium truncate">University</div>
              <div className="col-span-4 flex items-center justify-end gap-2">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#ECFDF5] text-[#10B981]">
                  <span className="text-[8px]">●</span> On Route
                </span>
                <MdChevronRight className="text-[14px] text-slate-300 group-hover:text-slate-500 transition-colors" />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Card Banner */}
      <div className="mx-5 mb-5 p-4 rounded-xl bg-[#091124] text-white flex items-center gap-3.5 shadow-sm">
        <div className="w-9 h-9 rounded-lg bg-[#2563EB] flex items-center justify-center text-white text-base">
          <MdDirectionsBus size={18} />
        </div>
        <div>
          <p className="text-xs font-bold leading-tight tracking-tight">School Transport</p>
          <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">ADMIN FLEET PORTAL</p>
        </div>
      </div>
    </div>
  );
};

export default TodaysTrips;
