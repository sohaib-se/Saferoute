import {
  MdPerson,
  MdLocationOn,
  MdDirectionsBus,
  MdCheckCircle,
} from 'react-icons/md';

const CriticalAlertBanner = ({
  activeAlert,
  onResolveAlert,
}) => {
  // If no active emergency alert, do not render any banner/card
  if (!activeAlert) {
    return null;
  }

  // Active Alert Display
  const isDriver = activeAlert.sender_type === 'driver';
  const alertId = `SOS-${activeAlert.id.slice(0, 4).toUpperCase()}`;
  const vehicle = activeAlert.vehicle_name || (isDriver ? 'Driver Van' : 'Parent Beacon');
  const lat = Number(activeAlert.latitude || 33.6844);
  const lng = Number(activeAlert.longitude || 73.0479);
  const timeStr = activeAlert.created_at
    ? new Date(activeAlert.created_at).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
    : 'Just now';

  return (
    <section
      className="bg-red-50/80 border border-red-300 rounded-2xl p-6 relative shadow-sm"
      data-purpose="active-incident-banner"
    >
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-4">
          {/* Header status row */}
          <div className="flex items-center gap-3 flex-wrap">
            <span className="bg-[#b91c1c] text-white text-xs font-extrabold px-2.5 py-1 rounded tracking-wide animate-pulse">
              ! CRITICAL CODE RED
            </span>
            <span className="text-red-700 font-bold text-sm">
              {isDriver
                ? 'Driver Emergency Panic Signal Triggered'
                : 'Parent Emergency Distress Signal Triggered'}
            </span>
          </div>

          {/* Bus badge and Log ID */}
          <div className="flex items-center gap-3">
            <span className="bg-red-100 text-red-800 text-xs font-bold px-2.5 py-0.5 rounded border border-red-200">
              {vehicle}
            </span>
            <span className="text-xs font-medium text-slate-600">
              Logged ID: <strong className="text-slate-900 font-bold">#{alertId}</strong>
            </span>
          </div>

          {/* Subcolumns details */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-1">
            <div>
              <span className="text-[11px] text-slate-500 font-medium block">
                {isDriver ? 'Driver in Command' : 'Initiating Parent'}
              </span>
              <div className="flex items-center gap-1.5 mt-0.5 font-bold text-slate-900 text-xs">
                <MdPerson className="w-3.5 h-3.5 text-slate-400" />
                {activeAlert.sender_name || 'Initiator'}
              </div>
            </div>
            <div>
              <span className="text-[11px] text-slate-500 font-medium block">
                GPS Coordinates
              </span>
              <div className="flex items-center gap-1.5 mt-0.5 font-bold text-red-600 text-xs">
                <MdLocationOn className="w-3.5 h-3.5 text-red-500" />
                {lat.toFixed(4)}° N, {lng.toFixed(4)}° E
              </div>
            </div>
            <div>
              <span className="text-[11px] text-slate-500 font-medium block">
                Time Dispatched
              </span>
              <div className="flex items-center gap-1.5 mt-0.5 font-bold text-slate-900 text-xs">
                <MdDirectionsBus className="w-3.5 h-3.5 text-blue-500" />
                {timeStr}
              </div>
            </div>
          </div>

          {/* Real-time bullet updates */}
          <div className="flex items-center gap-4 text-xs font-medium text-slate-600 flex-wrap pt-2">
            <span className="flex items-center gap-1.5 text-red-700 font-bold">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-ping"></span>
              Distress Beacon Active • Authorities Notified
            </span>
            <span className="text-slate-300">•</span>
            <span className="flex items-center gap-1.5 text-slate-700 font-medium">
              Real-time telemetry uplink active
            </span>
          </div>
        </div>

        {/* Action buttons right */}
        {/* Action button right */}
        {onResolveAlert && (
          <div className="flex items-center justify-end min-w-[210px]">
            <button
              onClick={() => onResolveAlert(activeAlert.id)}
              className="w-full sm:w-auto py-3 px-5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
            >
              <MdCheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
              Mark Incident as Resolved
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default CriticalAlertBanner;
