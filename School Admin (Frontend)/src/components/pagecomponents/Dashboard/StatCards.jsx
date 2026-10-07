import { MdDirectionsBus, MdLocationOn, MdPerson, MdVerifiedUser, MdTrendingUp } from 'react-icons/md';

const StatCards = () => {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5" data-purpose="kpi-cards">
      {/* Card 1: TOTAL VEHICLES */}
      <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex items-start justify-between">
        <div>
          <span className="text-[11px] font-bold text-slate-400 tracking-wider uppercase">TOTAL VEHICLES</span>
          <div className="text-3xl font-bold text-slate-900 mt-1 mb-2">25</div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#10B981]">
            <MdTrendingUp className="text-[11px]" />
            <span>100% operational</span>
          </div>
        </div>
        <div className="w-12 h-12 rounded-xl bg-[#EFF6FF] flex items-center justify-center text-[#2563EB]">
          <MdDirectionsBus size={20} />
        </div>
      </div>

      {/* Card 2: ACTIVE TRIPS */}
      <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex items-start justify-between">
        <div>
          <span className="text-[11px] font-bold text-slate-400 tracking-wider uppercase">ACTIVE TRIPS</span>
          <div className="text-3xl font-bold text-slate-900 mt-1 mb-2">12</div>
          <div className="flex items-center gap-1.5 text-xs font-medium text-slate-600">
            <span className="w-2 h-2 rounded-full bg-[#10B981]"></span>
            <span>In progress now</span>
          </div>
        </div>
        <div className="w-12 h-12 rounded-xl bg-[#ECFDF5] flex items-center justify-center text-[#10B981]">
          <MdLocationOn size={20} />
        </div>
      </div>

      {/* Card 3: DRIVERS ONLINE */}
      <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex items-start justify-between">
        <div>
          <span className="text-[11px] font-bold text-slate-400 tracking-wider uppercase">DRIVERS ONLINE</span>
          <div className="text-3xl font-bold text-slate-900 mt-1 mb-2">18</div>
          <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
            <MdPerson className="text-[11px] text-blue-600" />
            <span>Shift 1 Active</span>
          </div>
        </div>
        <div className="w-12 h-12 rounded-xl bg-[#EEF2FF] flex items-center justify-center text-[#4F46E5]">
          <MdPerson size={20} />
        </div>
      </div>

      {/* Card 4: STUDENTS ONBOARD */}
      <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex items-start justify-between">
        <div>
          <span className="text-[11px] font-bold text-slate-400 tracking-wider uppercase">STUDENTS ONBOARD</span>
          <div className="text-3xl font-bold text-slate-900 mt-1 mb-2">312</div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#10B981]">
            <MdVerifiedUser className="text-[11px]" />
            <span>RFID Checked-in</span>
          </div>
        </div>
        <div className="w-12 h-12 rounded-xl bg-[#F0FDFA] flex items-center justify-center text-[#0D9488]">
          <MdVerifiedUser size={20} />
        </div>
      </div>
    </section>
  );
};

export default StatCards;
