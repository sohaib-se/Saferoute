import React, { useState, useEffect } from 'react';
import {
  MdDirectionsBus,
  MdLocationOn,
  MdEdit,
} from 'react-icons/md';
import Modal from '../../common/Modal';

const TripDetailsModal = ({
  trip,
  isOpen,
  onClose,
  onSaveTrip,
  mode = 'view',
  onLocate,
}) => {
  const [currentMode, setCurrentMode] = useState(mode);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    setCurrentMode(mode);
  }, [mode]);

  useEffect(() => {
    if (trip) {
      setFormData({
        ...trip,
      });
    }
  }, [trip]);

  if (!isOpen || !trip) return null;

  const handleSave = (e) => {
    e.preventDefault();

    let statusBadgeStyle = formData.statusBadgeStyle;
    let statusDotColor = formData.statusDotColor;
    let etaStatus = formData.etaStatus;

    if (formData.status === 'On Route') {
      statusBadgeStyle = 'bg-emerald-50 text-emerald-600 border border-emerald-200';
      statusDotColor = 'bg-emerald-500';
      etaStatus = 'on-time';
    } else if (formData.status === 'Picked Up') {
      statusBadgeStyle = 'bg-teal-50 text-teal-700 border border-teal-200';
      statusDotColor = 'bg-teal-500';
      etaStatus = 'in-progress';
    } else if (formData.status === 'Arrived') {
      statusBadgeStyle = 'bg-slate-100 text-slate-700 border border-slate-200';
      statusDotColor = 'bg-emerald-500';
      etaStatus = 'arrived';
    } else if (formData.status === 'Delayed') {
      statusBadgeStyle = 'bg-amber-100 text-amber-800 border border-amber-300';
      statusDotColor = 'bg-amber-500';
      etaStatus = 'delayed';
    } else if (formData.status === 'Pending') {
      statusBadgeStyle = 'bg-slate-100 text-slate-600 border border-slate-200';
      statusDotColor = 'bg-slate-400';
      etaStatus = 'pending';
    }

    const updated = {
      ...formData,
      statusBadgeStyle,
      statusDotColor,
      etaStatus,
      completionRate: Math.min(
        100,
        Math.round(((formData.studentsBoarded || 0) / (formData.totalCapacity || 1)) * 100)
      ),
    };

    if (onSaveTrip) {
      onSaveTrip(updated);
    }
    onClose();
  };

  const percent = Math.min(
    100,
    Math.round(((formData.studentsBoarded || 0) / (formData.totalCapacity || 1)) * 100)
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      icon={<MdDirectionsBus size={20} />}
      title={currentMode === 'edit' ? `Edit Trip ${trip.id}` : `Trip Manifest ${trip.id}`}
      subtitle={`${trip.shift} • ${trip.sector}`}
      maxWidth="max-w-xl"
    >
      {currentMode === 'view' ? (
        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto custom-scrollbar">
          {/* Top Info Banner */}
          <div className="bg-slate-50/80 rounded-2xl p-4 border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div
                className={`w-12 h-12 rounded-xl border flex flex-col items-center justify-center font-bold text-sm shrink-0 ${
                  trip.busBadgeStyle || 'bg-blue-100/80 border-blue-200 text-blue-700'
                }`}
              >
                <span className="text-[10px] uppercase font-semibold">Bus</span>
                <span>{trip.busCode}</span>
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">{trip.route}</h4>
                <p className="text-xs text-slate-500 mt-0.5">{trip.routeSub}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                  trip.statusBadgeStyle || 'bg-slate-100 text-slate-700 border border-slate-200'
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full mr-2 ${
                    trip.statusDotColor || 'bg-blue-500'
                  }`}
                />
                {trip.status}
              </span>
            </div>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="p-3.5 bg-white border border-slate-200/80 rounded-xl shadow-2xs">
              <span className="text-[10px] font-semibold uppercase text-slate-400 block tracking-wider">
                Schedule Timings
              </span>
              <p className="text-xs font-bold text-slate-800 mt-1">{trip.timings}</p>
              <p className="text-[11px] text-slate-500 mt-0.5">{trip.etaNote}</p>
            </div>

            <div className="p-3.5 bg-white border border-slate-200/80 rounded-xl shadow-2xs">
              <span className="text-[10px] font-semibold uppercase text-slate-400 block tracking-wider">
                Students Boarded
              </span>
              <p className="text-xs font-bold text-slate-800 mt-1">
                {trip.studentsBoarded} / {trip.totalCapacity} ({percent}%)
              </p>
              <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden mt-1.5">
                <div
                  className="bg-blue-600 h-1.5 rounded-full"
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>

            <div className="p-3.5 bg-white border border-slate-200/80 rounded-xl shadow-2xs col-span-2 sm:col-span-1">
              <span className="text-[10px] font-semibold uppercase text-slate-400 block tracking-wider">
                Current Speed / GPS
              </span>
              <p className="text-xs font-bold text-slate-800 mt-1">{trip.speed || '30 km/h'}</p>
              <p className="text-[11px] text-emerald-600 font-medium mt-0.5">Telemetry Connected</p>
            </div>
          </div>

          {/* Driver & Telematics Details */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Assigned Personnel &amp; Vehicle
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 bg-slate-50/70 border border-slate-100 rounded-xl flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-xs shrink-0">
                  {trip.driverInitials}
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800">{trip.driverName}</p>
                  <p className="text-[11px] text-slate-500">{trip.driverPhone}</p>
                  <span className="inline-block mt-1 text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                    Licensed &amp; Verified
                  </span>
                </div>
              </div>

              <div className="p-3.5 bg-slate-50/70 border border-slate-100 rounded-xl flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-200/80 text-slate-700 flex items-center justify-center text-xs shrink-0">
                  <MdDirectionsBus size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800">{trip.busName}</p>
                  <p className="text-[11px] text-slate-500">Capacity: {trip.totalCapacity} Seats</p>
                  <span className="inline-block mt-1 text-[10px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                    Active GPS Tracker
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Current Stop & Live Transit Notes */}
          <div className="p-4 bg-blue-50/40 border border-blue-100 rounded-xl space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-blue-900">
              <MdLocationOn className="text-blue-600" size={16} />
              <span>Current Transit Telematics</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-slate-400 block text-[11px]">Last Logged Location:</span>
                <span className="font-semibold text-slate-800">
                  {trip.currentLocation || 'Depot Central Station'}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Upcoming Stop / Status:</span>
                <span className="font-semibold text-slate-800">
                  {trip.nextStop || 'In Progress'}
                </span>
              </div>
            </div>
          </div>

          {/* Modal View Footer */}
          <div className="pt-2 flex items-center justify-between border-t border-slate-100">
            <button
              type="button"
              onClick={() => onLocate && onLocate(trip)}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-xl transition cursor-pointer"
            >
              <MdLocationOn size={16} />
              <span>Track Live on Map</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setCurrentMode('edit')}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl transition cursor-pointer"
              >
                <MdEdit size={14} />
                <span>Edit Trip</span>
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Edit Mode Form */
        <form onSubmit={handleSave}>
          <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto custom-scrollbar">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Trip Status <span className="text-rose-500">*</span>
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white font-sans cursor-pointer"
                >
                  <option value="On Route">On Route (In Transit)</option>
                  <option value="Picked Up">Picked Up (Boarding)</option>
                  <option value="Arrived">Arrived (Completed)</option>
                  <option value="Delayed">Delayed (Bottleneck)</option>
                  <option value="Pending">Pending (Not Started)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Timings Window
                </label>
                <input
                  type="text"
                  value={formData.timings || ''}
                  onChange={(e) => setFormData({ ...formData, timings: e.target.value })}
                  placeholder="07:15 AM - 08:15 AM"
                  className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white font-sans"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  ETA / Status Note
                </label>
                <input
                  type="text"
                  value={formData.etaNote || ''}
                  onChange={(e) => setFormData({ ...formData, etaNote: e.target.value })}
                  placeholder="ETA: 08:12 AM (On Time)"
                  className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white font-sans"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Students Boarded Count
                </label>
                <input
                  type="number"
                  min="0"
                  max={formData.totalCapacity || 50}
                  value={formData.studentsBoarded || 0}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      studentsBoarded: parseInt(e.target.value, 10) || 0,
                    })
                  }
                  className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white font-sans"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Assigned Driver
                </label>
                <input
                  type="text"
                  value={formData.driverName || ''}
                  onChange={(e) => setFormData({ ...formData, driverName: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white font-sans"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Driver Phone
                </label>
                <input
                  type="text"
                  value={formData.driverPhone || ''}
                  onChange={(e) => setFormData({ ...formData, driverPhone: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white font-sans"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Current Location Telematics
              </label>
              <input
                type="text"
                value={formData.currentLocation || ''}
                onChange={(e) => setFormData({ ...formData, currentLocation: e.target.value })}
                placeholder="e.g. Sector A-3 Main Boulevard"
                className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white font-sans"
              />
            </div>
          </div>

          <div className="px-6 py-4 bg-slate-50/60 border-t border-slate-100 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={() => setCurrentMode('view')}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-xl shadow-xs transition cursor-pointer"
            >
              Save Changes
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
};

export default TripDetailsModal;
