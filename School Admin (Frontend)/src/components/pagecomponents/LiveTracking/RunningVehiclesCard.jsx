import React from 'react';
import {
  MdDirectionsBus,
  MdLocationOn,
  MdPhone,
  MdChat,
  MdWarning,
  MdInfoOutline,
} from 'react-icons/md';

const RunningVehiclesCard = ({
  runningVehicles = [],
  selectedVehicle,
  onSelectVehicle,
  onCallDriver,
  onSendMessage,
  onTriggerSOS,
}) => {
  const hasRunningVehicles = runningVehicles.length > 0;

  return (
    <section
      className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-sm space-y-4 font-sans"
      data-purpose="running-vehicles-panel"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-slate-900 tracking-tight">
            Running Vehicles
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Actively in pickup or drop-off transit
          </p>
        </div>
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
            hasRunningVehicles
              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
              : 'bg-slate-100 text-slate-500 border border-slate-200'
          }`}
        >
          <span
            className={`w-2 h-2 rounded-full ${
              hasRunningVehicles ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'
            }`}
          ></span>
          <span>
            {hasRunningVehicles
              ? `${runningVehicles.length} Active`
              : '0 In Transit'}
          </span>
        </span>
      </div>

      {/* Empty State when no vehicles have a running trip */}
      {!hasRunningVehicles ? (
        <div className="py-12 px-4 flex flex-col items-center justify-center text-center space-y-3 bg-slate-50/70 border border-dashed border-slate-200 rounded-xl">
          <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-400">
            <MdDirectionsBus size={28} />
          </div>
          <div className="max-w-xs space-y-1">
            <h3 className="text-sm font-bold text-slate-800">
              No Vehicles with Running Trip
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Vehicles will be displayed here in real-time as soon as drivers start an active pickup or drop-off shift.
            </p>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white rounded-full border border-slate-200 text-[11px] font-medium text-slate-500 shadow-xs">
            <MdInfoOutline size={13} className="text-blue-500" />
            <span>Telemetry standing by</span>
          </div>
        </div>
      ) : (
        /* List of currently running vehicles */
        <div className="space-y-3">
          {runningVehicles.map((vehicle) => {
            const isSelected = selectedVehicle?.name === vehicle.name;
            const tripTypeBadge =
              vehicle.tripType === 'dropoff' || vehicle.tripPhase === 'dropoff_active'
                ? 'Afternoon Drop-off'
                : 'Morning Pickup';

            return (
              <div
                key={vehicle.id || vehicle.name}
                className={`p-4 rounded-xl border transition-all duration-200 space-y-3 cursor-pointer ${
                  isSelected
                    ? 'border-blue-500 bg-blue-50/30 shadow-xs ring-2 ring-blue-500/20'
                    : 'border-slate-200/80 bg-white hover:border-slate-300 hover:shadow-xs'
                }`}
                onClick={() => onSelectVehicle && onSelectVehicle(vehicle)}
              >
                {/* Top Row: Vehicle Name, Plate & Trip Type Badge */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-sm shrink-0 ${
                        isSelected ? 'bg-blue-600' : 'bg-slate-700'
                      }`}
                    >
                      <MdDirectionsBus size={20} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-extrabold text-sm text-slate-900">
                          {vehicle.name}
                        </h4>
                        <span className="text-[11px] font-mono font-semibold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
                          {vehicle.plate || 'Active'}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Route: <span className="font-semibold text-slate-700">{vehicle.route}</span>
                      </p>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100/80 text-emerald-800 border border-emerald-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                    {tripTypeBadge}
                  </span>
                </div>

                {/* Driver Info & Status */}
                <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-100">
                  <span className="text-slate-500">
                    Driver: <span className="font-bold text-slate-800">{vehicle.driver}</span>
                  </span>
                  <span className="text-[11px] font-medium text-emerald-600 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    Live GPS Streaming
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 pt-1" onClick={(e) => e.stopPropagation()}>
                  <button
                    type="button"
                    onClick={() => onSelectVehicle && onSelectVehicle(vehicle)}
                    className="flex-1 py-1.5 px-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
                  >
                    <MdLocationOn size={14} />
                    <span>Focus on Map</span>
                  </button>

                  {onCallDriver && (
                    <button
                      type="button"
                      onClick={() => onCallDriver(vehicle)}
                      title="Call Driver"
                      className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition cursor-pointer"
                    >
                      <MdPhone size={16} />
                    </button>
                  )}

                  {onSendMessage && (
                    <button
                      type="button"
                      onClick={() => onSendMessage(vehicle)}
                      title="Send Message"
                      className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition cursor-pointer"
                    >
                      <MdChat size={16} />
                    </button>
                  )}

                  {onTriggerSOS && (
                    <button
                      type="button"
                      onClick={() => onTriggerSOS(vehicle)}
                      title="Trigger Alert"
                      className="p-1.5 bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 rounded-lg transition cursor-pointer"
                    >
                      <MdWarning size={16} />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default RunningVehiclesCard;

