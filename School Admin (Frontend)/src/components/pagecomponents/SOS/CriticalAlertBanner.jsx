import {
  MdPerson,
  MdLocationOn,
  MdDirectionsBus,
  MdCheckCircle,
  MdDeleteOutline,
} from 'react-icons/md';

const CriticalAlertBanner = ({
  activeAlert,
  onResolveAlert,
  onCheckLocation,
  onDeleteAlert,
}) => {
  // If no active emergency alert, do not render any banner/card
  if (!activeAlert) {
    return null;
  }

  // Active Alert Display
  const isDriver = activeAlert.sender_type === 'driver';
  const alertId = `SOS-${activeAlert.id.slice(0, 4).toUpperCase()}`;
  const vehicle = activeAlert.vehicle_name || (isDriver ? 'Driver Van' : 'Parent Beacon');

  const lat = activeAlert.latitude != null ? Number(activeAlert.latitude) : null;
  const lng = activeAlert.longitude != null ? Number(activeAlert.longitude) : null;
  const hasDriverCoords =
    isDriver && lat != null && lng != null && !isNaN(lat) && !isNaN(lng) && lat !== 0;

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

            {/* Location column: Check Location button for Driver SOS; No coordinates for Parent SOS */}
            <div>
              <span className="text-[11px] text-slate-500 font-medium block">
                {isDriver ? 'Driver Location' : 'Location Telemetry'}
              </span>
              {hasDriverCoords ? (
                <button
                  type="button"
                  onClick={() => onCheckLocation && onCheckLocation(activeAlert)}
                  className="mt-1 inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg shadow-sm transition-all cursor-pointer"
                  title="View driver live location on map"
                >
                  <MdLocationOn className="w-3.5 h-3.5" />
                  <span>Check Location</span>
                </button>
              ) : isDriver ? (
                <div className="flex items-center gap-1.5 mt-1 font-medium text-slate-500 text-xs">
                  <MdLocationOn className="w-3.5 h-3.5 text-slate-400" />
                  <span>No GPS Fix Reported</span>
                </div>
              ) : (
                <div className="flex items-center gap-1.5 mt-1 font-medium text-slate-600 text-xs">
                  <MdPerson className="w-3.5 h-3.5 text-slate-400" />
                  <span>Direct Parent Alert</span>
                </div>
              )}
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
              {isDriver && hasDriverCoords
                ? 'Real-time GPS telemetry uplink active'
                : 'Direct emergency safety alert registered'}
            </span>
          </div>
        </div>

        {/* Action buttons right */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-2.5 min-w-[210px]">
          {hasDriverCoords && onCheckLocation && (
            <button
              type="button"
              onClick={() => onCheckLocation(activeAlert)}
              className="py-3 px-4 bg-white border border-blue-300 hover:bg-blue-50 text-blue-700 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-2xs transition-all cursor-pointer"
            >
              <MdLocationOn className="w-4 h-4 text-blue-600" />
              <span>Check Location</span>
            </button>
          )}

          {onResolveAlert && (
            <button
              type="button"
              onClick={() => onResolveAlert(activeAlert.id)}
              className="py-3 px-5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
            >
              <MdCheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Mark Incident as Resolved</span>
            </button>
          )}

          {onDeleteAlert && (
            <button
              type="button"
              onClick={() => {
                if (window.confirm(`Delete active SOS incident #${alertId}?`)) {
                  onDeleteAlert(activeAlert.id);
                }
              }}
              className="py-3 px-3.5 bg-white border border-slate-200 hover:bg-rose-50 hover:border-rose-200 text-slate-400 hover:text-rose-600 rounded-xl transition-all cursor-pointer shadow-2xs flex items-center justify-center"
              title="Delete SOS Alert"
            >
              <MdDeleteOutline className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default CriticalAlertBanner;
