import {
  MdPerson,
  MdMap,
  MdLocationOn,
  MdPeople,
  MdWifi,
  MdAccessTime,
  MdShield,
  MdVideocam,
  MdSms,
  MdDirectionsBus,
} from 'react-icons/md';

const CriticalAlertBanner = ({
  onDeployEMS,
  onOpenVideo,
  onSmsParents,
  onBusStandby,
}) => {
  return (
    <section className="bg-red-50/70 border border-red-200 rounded-2xl p-6 relative" data-purpose="active-incident-banner">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-4">
          {/* Header status row */}
          <div className="flex items-center gap-3 flex-wrap">
            <span className="bg-[#b91c1c] text-white text-xs font-extrabold px-2.5 py-1 rounded tracking-wide">
              ! CRITICAL CODE RED
            </span>
            <span className="text-red-700 font-bold text-sm">
              Driver Emergency Panic Signal Triggered
            </span>
          </div>

          {/* Bus badge and Log ID */}
          <div className="flex items-center gap-3">
            <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-0.5 rounded">
              Bus 09
            </span>
            <span className="text-xs font-medium text-slate-600">
              Logged ID: <strong className="text-slate-900 font-bold">#SOS-9042</strong>
            </span>
          </div>

          {/* Four Subcolumns details */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-1">
            <div>
              <span className="text-[11px] text-slate-500 font-medium block">
                Driver in Command
              </span>
              <div className="flex items-center gap-1.5 mt-0.5 font-bold text-slate-900 text-xs">
                <MdPerson className="w-3.5 h-3.5 text-slate-400" />
                Bilal Ahmed
              </div>
            </div>
            <div>
              <span className="text-[11px] text-slate-500 font-medium block">
                Assigned Route
              </span>
              <div className="flex items-center gap-1.5 mt-0.5 font-bold text-slate-900 text-xs">
                <MdMap className="w-3.5 h-3.5 text-blue-500" />
                Route 3 • Univ Express
              </div>
            </div>
            <div>
              <span className="text-[11px] text-slate-500 font-medium block">
                GPS Coordinates
              </span>
              <div className="flex items-center gap-1.5 mt-0.5 font-bold text-slate-900 text-xs">
                <MdLocationOn className="w-3.5 h-3.5 text-red-500" />
                Near Beaconhouse Crossing
              </div>
            </div>
            <div>
              <span className="text-[11px] text-slate-500 font-medium block">
                Passengers at Risk
              </span>
              <div className="flex items-center gap-1.5 mt-0.5 font-bold text-red-600 text-xs">
                <MdPeople className="w-3.5 h-3.5" />
                28 Students Onboard
              </div>
            </div>
          </div>

          {/* Real-time bullet updates */}
          <div className="flex items-center gap-4 text-xs font-medium text-slate-600 flex-wrap pt-2">
            <span className="flex items-center gap-1.5 text-red-700 font-bold">
              <span className="w-2 h-2 rounded-full bg-red-600"></span>
              Vehicle Halted • Hazard Flashers Engaged
            </span>
            <span className="text-slate-300">•</span>
            <span className="flex items-center gap-1.5 text-slate-600">
              <MdWifi className="w-3.5 h-3.5 text-blue-600" />
              Live Telemetry Satellite Ping: 2s ago
            </span>
            <span className="text-slate-300">•</span>
            <span className="flex items-center gap-1.5 text-slate-700 font-medium">
              <MdAccessTime className="w-3.5 h-3.5 text-slate-500" />
              Triggered at 07:35:12 AM (8 mins elapsed)
            </span>
          </div>
        </div>

        {/* Action buttons right */}
        <div className="flex flex-col gap-2.5 min-w-[200px] justify-center">
          <button
            onClick={onDeployEMS}
            className="w-full py-2.5 px-4 bg-[#b91c1c] hover:bg-red-800 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-sm shadow-red-900/20 transition-all cursor-pointer"
          >
            <MdShield className="w-4 h-4" />
            Deploy 911 / EMS Link
          </button>
          <button
            onClick={onOpenVideo}
            className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
          >
            <MdVideocam className="w-4 h-4 text-slate-300" />
            Open Live Cabin Video
          </button>
          {/* Secondary row */}
          <div className="grid grid-cols-2 gap-2 mt-1">
            <button
              onClick={onSmsParents}
              className="py-2 px-3 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold rounded-lg text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <MdSms className="w-3.5 h-3.5 text-slate-400" />
              SMS Parents
            </button>
            <button
              onClick={onBusStandby}
              className="py-2 px-3 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold rounded-lg text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <MdDirectionsBus className="w-3.5 h-3.5 text-slate-400" />
              Bus 15 Standby
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CriticalAlertBanner;
