
import { MdAccessTime } from 'react-icons/md';

const IncidentTimeline = ({ activeAlert, onViewArchive }) => {
  const isDriver = activeAlert?.sender_type === 'driver';
  const initiator = activeAlert?.sender_name || (isDriver ? 'Staff Driver' : 'Parent');
  const vehicle = activeAlert?.vehicle_name || 'Vehicle';
  const lat = Number(activeAlert?.latitude || 33.6844);
  const lng = Number(activeAlert?.longitude || 73.0479);
  const timeStr = activeAlert?.created_at
    ? new Date(activeAlert.created_at).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
    : '';

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
      <div className="flex items-center justify-between pb-3.5 border-b border-slate-100 mb-4">
        <h3 className="text-xs font-bold text-slate-900">Incident Dispatch Timeline</h3>
        {activeAlert ? (
          <span className="text-[11px] text-red-600 font-bold">
            Case #SOS-{activeAlert.id.slice(0, 4).toUpperCase()}
          </span>
        ) : (
          <span className="text-[11px] text-slate-400 font-medium">No Open Incidents</span>
        )}
      </div>

      {/* Vertical Timeline Structure */}
      {activeAlert ? (
        <div className="relative pl-6 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
          {/* Item 1: SOS Beacon Dispatched */}
          <div className="relative">
            <span className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-red-600 ring-4 ring-white animate-pulse"></span>
            <div className="text-[11px]">
              <div className="flex items-center justify-between font-bold text-slate-800">
                <span>{timeStr} — Distress Signal Triggered</span>
              </div>
              <p className="text-slate-500 mt-0.5 leading-snug">
                Distress beacon initiated from mobile app by {initiator} ({vehicle}).
              </p>
            </div>
          </div>

          {/* Item 2: Telemetry Pin */}
          <div className="relative">
            <span className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-blue-600 ring-4 ring-white"></span>
            <div className="text-[11px]">
              <div className="flex items-center justify-between font-bold text-slate-800">
                <span>Coordinates Registered</span>
              </div>
              <p className="text-slate-500 mt-0.5 leading-snug">
                GPS telemetry pinned at {lat.toFixed(4)}° N, {lng.toFixed(4)}° E. High-alert notification sent to admin desk.
              </p>
            </div>
          </div>

          {/* Item 3: Parent Notifications */}
          <div className="relative">
            <span className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-blue-600 ring-4 ring-white"></span>
            <div className="text-[11px]">
              <div className="flex items-center justify-between font-bold text-slate-800">
                <span>{isDriver ? 'Parents Notified' : 'Admin Alert Dispatched'}</span>
              </div>
              <p className="text-slate-500 mt-0.5 leading-snug">
                {isDriver
                  ? 'Emergency notification rows created for all guardians on route.'
                  : 'Emergency alert sent directly to School Administration.'}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="py-6 text-center text-slate-400 text-xs italic">
          Standing by for active telemetry pings. All routes operating safely.
        </div>
      )}

      {/* Action Button: Diagnostic Telemetry */}
      <button
        onClick={onViewArchive}
        className="w-full mt-5 py-2.5 px-3 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer border border-blue-100 shadow-xs"
      >
        <MdAccessTime className="w-4 h-4 text-blue-600" />
        Sync Real-Time Logs
      </button>
    </div>
  );
};

export default IncidentTimeline;
