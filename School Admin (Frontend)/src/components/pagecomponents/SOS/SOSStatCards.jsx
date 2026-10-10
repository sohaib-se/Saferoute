import { MdErrorOutline, MdAccessTime, MdCheckCircleOutline, MdMic } from 'react-icons/md';

const SOSStatCards = () => {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" data-purpose="kpi-metrics-grid">
      {/* Card 1: Active Distress Signals */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs relative overflow-hidden flex flex-col justify-between">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500">Active Distress Signals</p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-xl font-bold text-slate-900">1 Open</span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-red-600 text-white tracking-wide">
                P-0 CRITICAL
              </span>
            </div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
            <MdErrorOutline size={20} />
          </div>
        </div>
        <div className="mt-3 flex items-center gap-1.5 text-xs text-red-600 font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>
          Bus 09 Panic Signal (8 mins active)
        </div>
      </div>

      {/* Card 2: Avg Response Velocity */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs relative overflow-hidden flex flex-col justify-between">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500">Avg Response Velocity</p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-xl font-bold text-slate-900">1.4 mins</span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-50 text-blue-600 flex items-center">
                ~-45s
              </span>
            </div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <MdAccessTime size={20} />
          </div>
        </div>
        <div className="mt-3 text-xs text-slate-500">
          Faster than 3.0m target SLA
        </div>
      </div>

      {/* Card 3: Resolved Cases Today */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs relative overflow-hidden flex flex-col justify-between">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500">Resolved Cases Today</p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-xl font-bold text-slate-900">4 Cases</span>
              <span className="text-[10px] font-semibold text-emerald-600">100% Closed</span>
            </div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
            <MdCheckCircleOutline size={20} />
          </div>
        </div>
        <div className="mt-3 text-xs text-slate-500">
          3 Parent alerts, 1 depot check
        </div>
      </div>

      {/* Card 4: Emergency Dispatchers */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs relative overflow-hidden flex flex-col justify-between">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500">Emergency Dispatchers</p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-xl font-bold text-slate-900">6 On-Duty</span>
              <span className="text-[10px] font-bold text-blue-600">100% Sat</span>
            </div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <MdMic size={20} />
          </div>
        </div>
        <div className="mt-3 text-xs text-slate-500">
          Dual radio + cellular uplink intact
        </div>
      </div>
    </section>
  );
};

export default SOSStatCards;
