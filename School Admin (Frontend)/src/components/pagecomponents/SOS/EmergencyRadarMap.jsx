import { MdDirectionsBus } from 'react-icons/md';

const EmergencyRadarMap = ({ activeAlert }) => {
  const isDriver = activeAlert?.sender_type === 'driver';
  const vehicle = activeAlert?.vehicle_name || (isDriver ? 'Bus Unit' : 'Parent Beacon');
  const lat = Number(activeAlert?.latitude || 33.6844);
  const lng = Number(activeAlert?.longitude || 73.0479);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] overflow-hidden">
      <div className="p-4 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {activeAlert ? (
            <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping"></span>
          ) : (
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
          )}
          <h3 className="text-xs font-bold text-slate-900">Emergency Geolocation Radar</h3>
        </div>
        <span className="px-2.5 py-0.5 bg-blue-50 text-blue-700 font-bold text-[10px] rounded-full border border-blue-100 tracking-wide">
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

        {activeAlert ? (
          <>
            {/* Active Distress Marker */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10">
              <div className="relative">
                <span className="absolute -inset-2 rounded-full bg-red-500/30 animate-ping"></span>
                <div className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg ring-4 ring-white">
                  <MdDirectionsBus size={22} />
                </div>
              </div>
              <div className="mt-1 bg-slate-900 text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded shadow">
                {vehicle} • Distress Active
              </div>
              <div className="text-[9px] font-mono text-red-700 font-bold bg-white/90 px-1.5 py-0.5 rounded mt-0.5 shadow-xs">
                {lat.toFixed(4)}, {lng.toFixed(4)}
              </div>
            </div>

            {/* Bottom Status */}
            <div className="relative flex items-center justify-between w-full z-10 pt-36">
              <div className="bg-white/95 backdrop-blur-xs border border-slate-300 rounded-lg px-2 py-1 shadow-sm text-[10px]">
                <span className="font-bold text-slate-800 block">Distress Coordinates</span>
                <span className="text-red-600 font-bold">{lat.toFixed(4)}° N, {lng.toFixed(4)}° E</span>
              </div>
              <div className="bg-red-600 text-white rounded-lg px-2 py-1 shadow-sm text-[10px] font-bold">
                Active Telemetry
              </div>
            </div>
          </>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center z-10 text-center p-4">
            <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-2">
              <MdDirectionsBus size={22} />
            </div>
            <span className="text-xs font-bold text-slate-800">Fleet Scanning • Normal</span>
            <span className="text-[11px] text-slate-500 mt-0.5">
              No active distress coordinates reported
            </span>
          </div>
        )}
      </div>

      {/* Subcard Statuses */}
      <div className="grid grid-cols-2 divide-x divide-slate-100 border-t border-slate-100 bg-slate-50/50 p-2.5 text-xs">
        <div className="px-2">
          <span className="text-[10px] text-slate-400 font-semibold block">Beacon Telemetry</span>
          <span className={`font-bold ${activeAlert ? 'text-red-600' : 'text-emerald-600'}`}>
            {activeAlert ? 'Distress Transmitting' : 'Idle / Standby'}
          </span>
        </div>
        <div className="px-2">
          <span className="text-[10px] text-slate-400 font-semibold block">Channel Status</span>
          <span className="font-bold text-slate-800">
            Online <span className="text-[11px] font-normal text-emerald-600">(100%)</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default EmergencyRadarMap;
