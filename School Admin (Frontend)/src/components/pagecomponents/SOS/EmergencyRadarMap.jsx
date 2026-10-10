import { MdDirectionsBus } from 'react-icons/md';

const EmergencyRadarMap = () => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
      <div className="p-3.5 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping"></span>
          <h3 className="text-xs font-bold text-slate-900">Emergency Geolocation Radar</h3>
        </div>
        <span className="px-2 py-0.5 bg-blue-50 text-blue-700 font-bold text-[10px] rounded tracking-wide">
          Live GPS Feed
        </span>
      </div>

      {/* Simulated Map Container */}
      <div className="relative h-60 w-full radar-map-bg overflow-hidden p-3 select-none flex flex-col justify-between">
        {/* Map road overlay lines simulated via svg */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none opacity-40 stroke-slate-400"
          fill="none"
          strokeWidth="2.5"
        >
          <path d="M-20 40 Q 140 60 220 130 T 450 160" />
          <path d="M120 -20 L 140 260" />
          <path d="M30 220 L 380 40" strokeDasharray="4 4" />
        </svg>

        {/* Standby Unit Marker */}
        <div className="relative self-end bg-white/95 backdrop-blur-xs border border-slate-300 rounded-lg shadow-sm px-2.5 py-1 text-[11px] font-semibold text-slate-700 flex items-center gap-1.5 z-10">
          <span className="w-2 h-2 rounded-full bg-blue-600"></span>
          Bus 15 Standby (3.2 km away)
        </div>

        {/* Main Red Alert Bus Marker (Center) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10">
          <div className="relative">
            <span className="absolute -inset-2 rounded-full bg-red-500/30 animate-ping"></span>
            <div className="w-9 h-9 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg ring-4 ring-white">
              <MdDirectionsBus size={20} />
            </div>
          </div>
          <div className="mt-1 bg-slate-900 text-white text-[10px] font-extrabold px-2 py-0.5 rounded shadow">
            Bus 09 • Distress Active
          </div>
        </div>

        {/* Bottom Hospital / Landmark & Precision status */}
        <div className="relative flex items-center justify-between w-full z-10 pt-16">
          <div className="bg-white/95 backdrop-blur-xs border border-slate-300 rounded-lg px-2 py-1 shadow-sm text-[10px]">
            <span className="font-bold text-slate-800 block">Memorial Trauma Center</span>
            <span className="text-slate-500">1.8 km (4 mins)</span>
          </div>
          <div className="bg-blue-600 text-white rounded-lg px-2 py-1 shadow-sm text-[10px] font-bold">
            Telemetry High Precision
          </div>
        </div>
      </div>

      {/* Subcard Sensor Statuses */}
      <div className="grid grid-cols-2 divide-x divide-slate-100 border-t border-slate-100 bg-slate-50/50 p-2.5 text-xs">
        <div className="px-2">
          <span className="text-[10px] text-slate-400 font-semibold block">Engine Status</span>
          <span className="font-bold text-red-600">Idling / Stop Engaged</span>
        </div>
        <div className="px-2">
          <span className="text-[10px] text-slate-400 font-semibold block">Cabin Temperature</span>
          <span className="font-bold text-slate-800">
            22.4°C <span className="text-[11px] font-normal text-emerald-600">(Normal)</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default EmergencyRadarMap;
