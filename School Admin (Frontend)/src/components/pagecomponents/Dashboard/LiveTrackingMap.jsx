import { MdOpenInNew, MdAdd, MdRemove, MdFlag, MdDirectionsBus } from 'react-icons/md';

const LiveTrackingMap = () => {
  return (
    <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] overflow-hidden flex flex-col" data-purpose="live-tracking-card">
      <div className="p-5 pb-4 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-slate-800">Live Tracking</h3>
          <p className="text-xs text-slate-400 mt-0.5">Real-time GPS telematics fleet monitoring</p>
        </div>
        <a className="text-xs font-semibold text-[#2563EB] hover:text-blue-700 flex items-center gap-1" href="#">
          Full Map <MdOpenInNew className="text-[10px]" />
        </a>
      </div>
      
      {/* Stylized Map Canvas Container */}
      <div className="relative bg-[#EAF0F6] h-[310px] w-full overflow-hidden flex-1 select-none">
        {/* Road Vector Network Simulation */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern height="60" id="grid" patternUnits="userSpaceOnUse" width="60">
              <path d="M 60 0 L 0 0 0 60" fill="none" opacity="0.5" stroke="#E2E8F0" strokeWidth="0.8"></path>
            </pattern>
          </defs>
          <rect fill="url(#grid)" height="100%" width="100%"></rect>
          {/* Major Highways / Roadways */}
          <path d="M-50,150 Q180,140 280,210 T560,120 T800,160" fill="none" stroke="#FFFFFF" strokeLinecap="round" strokeWidth="16"></path>
          <path d="M-50,150 Q180,140 280,210 T560,120 T800,160" fill="none" stroke="#DDE7F0" strokeLinecap="round" strokeWidth="12"></path>
          <path d="M220,-20 L280,210 L320,360" fill="none" stroke="#FFFFFF" strokeLinecap="round" strokeWidth="14"></path>
          <path d="M220,-20 L280,210 L320,360" fill="none" stroke="#DDE7F0" strokeLinecap="round" strokeWidth="10"></path>
          <path d="M40,280 Q240,270 380,180 T680,80" fill="none" stroke="#FFFFFF" strokeLinecap="round" strokeWidth="12"></path>
          <path d="M40,280 Q240,270 380,180 T680,80" fill="none" stroke="#DDE7F0" strokeLinecap="round" strokeWidth="8"></path>
          {/* Active Route Path Line (Blue dotted trail) */}
          <path d="M50,230 Q160,235 240,225 T380,215 T480,220" fill="none" stroke="#2563EB" strokeDasharray="2 6" strokeLinecap="round" strokeWidth="3.5"></path>
          <path d="M240,225 L380,215" fill="none" stroke="#2563EB" strokeLinecap="round" strokeWidth="3"></path>
        </svg>

        {/* Map Markers */}
        {/* Marker Green (School / Origin) */}
        <div className="absolute left-[110px] top-[140px] -translate-x-1/2 -translate-y-1/2">
          <div className="w-7 h-7 rounded-full bg-[#10B981] ring-4 ring-emerald-100 flex items-center justify-center text-white text-xs shadow-md">
            <MdFlag className="text-[10px]" />
          </div>
        </div>

        {/* Marker Blue Active (Bus No. 12) */}
        <div className="absolute left-[285px] top-[170px] -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="relative flex items-center justify-center">
            <span className="animate-ping absolute inline-flex h-9 w-9 rounded-full bg-blue-400 opacity-40"></span>
            <div className="w-9 h-9 rounded-full bg-[#2563EB] ring-4 ring-blue-200/80 flex items-center justify-center text-white text-sm shadow-lg">
              <MdDirectionsBus size={14} />
            </div>
          </div>
        </div>

        {/* Marker Orange (Upcoming Station / Bus 07) */}
        <div className="absolute left-[380px] top-[200px] -translate-x-1/2 -translate-y-1/2">
          <div className="w-7 h-7 rounded-full bg-[#F59E0B] ring-4 ring-amber-100 flex items-center justify-center text-white text-xs shadow-md">
            <MdDirectionsBus className="text-[10px]" />
          </div>
        </div>

        {/* Floating Card Tooltip for Bus No. 12 */}
        <div className="absolute left-[150px] top-[18px] bg-white rounded-xl shadow-lg border border-slate-100 p-3.5 w-60 z-20">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center gap-1.5 font-bold text-xs text-slate-800">
              <span className="w-2 h-2 rounded-full bg-[#10B981]"></span>
              <span>Bus No. 12</span>
            </div>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#ECFDF5] text-[#10B981]">
              On Route
            </span>
          </div>
          <div className="mt-2.5 space-y-1 text-[11px]">
            <div className="flex justify-between items-center text-slate-500">
              <span>Driver:</span>
              <span className="font-semibold text-slate-700">Muhammad Ali</span>
            </div>
            <div className="flex justify-between items-center text-slate-500">
              <span>Speed:</span>
              <span className="font-bold text-slate-800">38 km/h</span>
            </div>
            <div className="flex justify-between items-center text-slate-500">
              <span>Last Update:</span>
              <span className="text-slate-400">2 min ago</span>
            </div>
          </div>
        </div>

        {/* Zoom Controls */}
        <div className="absolute right-3.5 bottom-3.5 flex flex-col bg-white rounded-lg shadow-md border border-slate-200 overflow-hidden">
          <button className="w-7 h-7 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors border-b border-slate-100">
            <MdAdd size={14} />
          </button>
          <button className="w-7 h-7 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors">
            <MdRemove size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LiveTrackingMap;
