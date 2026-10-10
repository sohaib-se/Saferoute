import React from 'react';
import {
  MdLocationOn,
  MdPhone,
  MdDirectionsBus,
  MdBolt,
  MdArrowForward,
} from 'react-icons/md';
import Modal from '../../common/Modal';

const TripLocateModal = ({
  trip,
  isOpen,
  onClose,
  onNavigateToLiveTracking,
}) => {
  if (!isOpen || !trip) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      icon={<MdLocationOn size={20} />}
      title={`Live Telematics • ${trip.busName} (${trip.id})`}
      subtitle={`${trip.route} — ${trip.sector}`}
      maxWidth="max-w-2xl"
    >
      <div className="p-6 space-y-5">
        {/* Radar Map Preview Simulator */}
        <div className="relative w-full h-56 rounded-2xl overflow-hidden border border-slate-200 radar-map-bg flex items-center justify-center shadow-inner">
          {/* Subtle Grid Rings */}
          <div className="absolute w-44 h-44 rounded-full border border-blue-500/20 animate-ping opacity-30" />
          <div className="absolute w-32 h-32 rounded-full border border-blue-500/30" />
          <div className="absolute w-16 h-16 rounded-full border border-blue-500/40" />

          {/* Central Bus Marker Pin */}
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-xl shadow-blue-500/30 ring-4 ring-white animate-bounce">
              <MdDirectionsBus size={24} />
            </div>
            <div className="mt-2 px-3 py-1 bg-slate-900/90 backdrop-blur-xs text-white rounded-full text-[11px] font-bold shadow-md flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{trip.busName}</span>
              <span className="text-slate-400 font-normal">({trip.speed || '34 km/h'})</span>
            </div>
          </div>

          {/* Map Overlay Badges */}
          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs px-3 py-1.5 rounded-xl border border-slate-200/80 text-[11px] font-semibold text-slate-700 shadow-2xs">
            📍 {trip.currentLocation || 'Main Sector Corridor'}
          </div>

          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs px-3 py-1.5 rounded-xl border border-slate-200/80 text-[11px] font-semibold text-emerald-600 shadow-2xs flex items-center gap-1">
            <MdBolt size={14} />
            <span>GPS 5G Live</span>
          </div>

          <div className="absolute bottom-3 left-3 right-3 bg-white/90 backdrop-blur-xs px-3 py-2 rounded-xl border border-slate-200/80 text-[11px] flex items-center justify-between text-slate-700 shadow-2xs">
            <div>
              <span className="text-slate-400 text-[10px] uppercase font-bold mr-1.5">
                Next Stop:
              </span>
              <span className="font-semibold text-slate-800">
                {trip.nextStop || 'Intermediate Station'}
              </span>
            </div>
            <span className="text-blue-600 font-bold">{trip.etaNote}</span>
          </div>
        </div>

        {/* Telematics Metrics Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3 bg-slate-50/70 border border-slate-100 rounded-xl">
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
              Driver
            </span>
            <p className="text-xs font-bold text-slate-800 mt-0.5 truncate">{trip.driverName}</p>
            <p className="text-[10px] text-slate-400 truncate">{trip.driverPhone}</p>
          </div>

          <div className="p-3 bg-slate-50/70 border border-slate-100 rounded-xl">
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
              Transit Speed
            </span>
            <p className="text-xs font-bold text-slate-800 mt-0.5">{trip.speed || '34 km/h'}</p>
            <p className="text-[10px] text-emerald-600 font-semibold">Normal Driving</p>
          </div>

          <div className="p-3 bg-slate-50/70 border border-slate-100 rounded-xl">
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
              Students
            </span>
            <p className="text-xs font-bold text-slate-800 mt-0.5">
              {trip.studentsBoarded} / {trip.totalCapacity}
            </p>
            <p className="text-[10px] text-blue-600 font-semibold">{trip.completionRate}% Filled</p>
          </div>

          <div className="p-3 bg-slate-50/70 border border-slate-100 rounded-xl">
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
              Current Status
            </span>
            <p className="text-xs font-bold text-slate-800 mt-0.5">{trip.status}</p>
            <p className="text-[10px] text-slate-400">{trip.shift}</p>
          </div>
        </div>

        {/* Action Row */}
        <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <a
            href={`tel:${trip.driverPhone}`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 border border-slate-200 text-xs font-semibold rounded-xl text-slate-700 bg-white hover:bg-slate-50 transition cursor-pointer"
          >
            <MdPhone size={15} className="text-slate-500" />
            <span>Call Driver ({trip.driverPhone})</span>
          </a>

          <div className="w-full sm:w-auto flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 sm:flex-none px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition cursor-pointer"
            >
              Close
            </button>
            <button
              type="button"
              onClick={() => {
                onClose();
                if (onNavigateToLiveTracking) {
                  onNavigateToLiveTracking('Live Tracking');
                }
              }}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs transition cursor-pointer"
            >
              <span>View Full Live Map</span>
              <MdArrowForward size={14} />
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default TripLocateModal;
