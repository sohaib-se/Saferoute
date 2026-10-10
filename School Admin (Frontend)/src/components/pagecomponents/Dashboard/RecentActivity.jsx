import { MdDirectionsBus, MdPersonAdd, MdSchool } from 'react-icons/md';

const RecentActivity = () => {
  return (
    <div className="lg:col-span-6 bg-white rounded-2xl p-5 border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex flex-col justify-between" data-purpose="recent-activity-card">
      <div>
        <h3 className="text-sm font-bold text-slate-800">Recent Activity</h3>
        <div className="mt-4 space-y-3.5">
          {/* Activity Item 1 */}
          <div className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50/70 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#EFF6FF] flex items-center justify-center text-[#2563EB] flex-shrink-0">
                <MdDirectionsBus size={18} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-800 leading-tight">Bus 12 picked up students</h4>
                <p className="text-[11px] text-slate-400 mt-0.5 leading-tight">Stop: Gulberg Green Station 4</p>
              </div>
            </div>
            <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
              08:12 AM
            </span>
          </div>
          
          {/* Activity Item 2 */}
          <div className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50/70 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#F5F3FF] flex items-center justify-center text-[#7C3AED] flex-shrink-0">
                <MdPersonAdd size={18} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-800 leading-tight">New parent registered</h4>
                <p className="text-[11px] text-slate-400 mt-0.5 leading-tight">Parent ID: #PR-8921 (Sana Ahmed)</p>
              </div>
            </div>
            <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
              08:00 AM
            </span>
          </div>
          
          {/* Activity Item 3 */}
          <div className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50/70 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#ECFDF5] flex items-center justify-center text-[#10B981] flex-shrink-0">
                <MdSchool size={18} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-800 leading-tight">Driver arrived at school</h4>
                <p className="text-[11px] text-slate-400 mt-0.5 leading-tight">Bus 04 • Rashid Mehmood</p>
              </div>
            </div>
            <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
              07:58 AM
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentActivity;
