import React, { useState } from 'react';
import { MdSchedule } from 'react-icons/md';
import Modal from '../../common/Modal';

const busOptions = [
  { code: '12', name: 'Bus 12', badgeStyle: 'bg-blue-100/80 border-blue-200 text-blue-700' },
  { code: '07', name: 'Bus 07', badgeStyle: 'bg-sky-100/80 border-sky-200 text-sky-700' },
  { code: '09', name: 'Bus 09', badgeStyle: 'bg-indigo-100/80 border-indigo-200 text-indigo-700' },
  { code: '15', name: 'Bus 15', badgeStyle: 'bg-amber-100/80 border-amber-200 text-amber-700' },
  { code: '18', name: 'Bus 18', badgeStyle: 'bg-rose-100/80 border-rose-200 text-rose-700' },
  { code: '04', name: 'Bus 04', badgeStyle: 'bg-sky-100/80 border-sky-200 text-sky-700' },
  { code: '22', name: 'Bus 22', badgeStyle: 'bg-indigo-100/80 border-indigo-200 text-indigo-700' },
  { code: '05', name: 'Bus 05', badgeStyle: 'bg-slate-100 border-slate-200 text-slate-700' },
];

const routeOptions = [
  { route: 'Route 1 - Green Valley', sub: 'Central Depot → North Campus' },
  { route: 'Route 2 - Model Town', sub: 'West Terminal → South Academy' },
  { route: 'Route 3 - University', sub: 'Main Bypass → University Gates' },
  { route: 'Route 4 - Johar Town', sub: 'South Depot → Johar Central' },
  { route: 'Route 5 - Canal Road', sub: 'Canal View → Junior Wing' },
  { route: 'Route 6 - Gulberg Express', sub: 'Main Market → Sports Wing' },
  { route: 'Route 7 - DHA Phase 5', sub: 'DHA Commercial → School Gate 2' },
];

const ScheduleTripModal = ({ isOpen, onClose, onScheduleTrip, currentCount = 8 }) => {
  const nextTripId = `#TRP-${100 + currentCount + 1}`;

  const [formData, setFormData] = useState({
    id: nextTripId,
    shift: 'Morning Pickup',
    sector: 'Sector A',
    busCode: '12',
    route: 'Route 1 - Green Valley',
    routeSub: 'Central Depot → North Campus',
    driverName: 'Muhammad Ali',
    driverPhone: '0300 1112233',
    startTime: '07:30 AM',
    endTime: '08:30 AM',
    totalCapacity: 30,
    studentsBoarded: 0,
    status: 'Pending',
    date: 'Today (24 May 2026)',
  });

  if (!isOpen) return null;

  const getInitials = (name) => {
    if (!name) return 'DR';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  const handleRouteChange = (selectedRouteName) => {
    const found = routeOptions.find((r) => r.route === selectedRouteName);
    setFormData((prev) => ({
      ...prev,
      route: selectedRouteName,
      routeSub: found ? found.sub : prev.routeSub,
    }));
  };

  const handleBusChange = (selectedBusCode) => {
    const found = busOptions.find((b) => b.code === selectedBusCode);
    setFormData((prev) => ({
      ...prev,
      busCode: selectedBusCode,
      busName: found ? found.name : `Bus ${selectedBusCode}`,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const selectedBus = busOptions.find((b) => b.code === formData.busCode) || busOptions[0];

    let statusBadgeStyle = 'bg-slate-100 text-slate-600 border border-slate-200';
    let statusDotColor = 'bg-slate-400';
    let etaStatus = 'pending';
    let etaNote = `Starts at ${formData.startTime}`;

    if (formData.status === 'On Route') {
      statusBadgeStyle = 'bg-emerald-50 text-emerald-600 border border-emerald-200';
      statusDotColor = 'bg-emerald-500';
      etaStatus = 'on-time';
      etaNote = `ETA: ${formData.endTime} (On Time)`;
    } else if (formData.status === 'Picked Up') {
      statusBadgeStyle = 'bg-teal-50 text-teal-700 border border-teal-200';
      statusDotColor = 'bg-teal-500';
      etaStatus = 'in-progress';
      etaNote = 'Stops in progress';
    }

    const newTrip = {
      ...formData,
      tripCode: formData.id.replace('#', ''),
      shiftType: formData.shift.includes('Afternoon') ? 'Afternoon' : 'Morning',
      busName: `Bus ${formData.busCode}`,
      busBadgeStyle: selectedBus.badgeStyle,
      driverInitials: getInitials(formData.driverName),
      timings: `${formData.startTime} - ${formData.endTime}`,
      etaNote,
      etaStatus,
      completionRate: Math.round(((formData.studentsBoarded || 0) / (formData.totalCapacity || 1)) * 100),
      statusBadgeStyle,
      statusDotColor,
      currentLocation: formData.routeSub.split('→')[0].trim() || 'Central Depot',
      speed: formData.status === 'On Route' ? '32 km/h' : '0 km/h',
      nextStop: formData.routeSub.split('→')[1]?.trim() || 'First Pickup Stop',
    };

    if (onScheduleTrip) {
      onScheduleTrip(newTrip);
    }

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      icon={<MdSchedule size={20} />}
      title="Schedule New Trip"
      subtitle="Dispatch school transport roster for morning or afternoon shifts"
      maxWidth="max-w-xl"
    >
      <form onSubmit={handleSubmit}>
        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto custom-scrollbar">
          {/* Row 1: Trip ID & Shift */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Trip Identifier <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.id}
                onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                placeholder="e.g. #TRP-109"
                className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white font-sans transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Shift Type <span className="text-rose-500">*</span>
              </label>
              <select
                value={formData.shift}
                onChange={(e) => setFormData({ ...formData, shift: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white font-sans cursor-pointer"
              >
                <option value="Morning Pickup">Morning Pickup</option>
                <option value="Morning Shift">Morning Shift</option>
                <option value="Afternoon Shift">Afternoon Shift (Return)</option>
                <option value="Campus Express">Campus Express</option>
                <option value="Special Activity">Special Activity / Sports</option>
              </select>
            </div>
          </div>

          {/* Row 2: Sector & Bus */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Sector / Wing Note
              </label>
              <input
                type="text"
                value={formData.sector}
                onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                placeholder="e.g. Sector A, High School"
                className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white font-sans transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Assign Vehicle <span className="text-rose-500">*</span>
              </label>
              <select
                value={formData.busCode}
                onChange={(e) => handleBusChange(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white font-sans cursor-pointer"
              >
                {busOptions.map((b) => (
                  <option key={b.code} value={b.code}>
                    {b.name} (Code: {b.code})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Row 3: Assigned Route & Waypoints */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Assigned Route <span className="text-rose-500">*</span>
              </label>
              <select
                value={formData.route}
                onChange={(e) => handleRouteChange(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white font-sans cursor-pointer"
              >
                {routeOptions.map((r) => (
                  <option key={r.route} value={r.route}>
                    {r.route}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Route Origin &amp; Destination
              </label>
              <input
                type="text"
                value={formData.routeSub}
                onChange={(e) => setFormData({ ...formData, routeSub: e.target.value })}
                placeholder="e.g. Central Depot → North Campus"
                className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white font-sans transition-all"
              />
            </div>
          </div>

          {/* Row 4: Driver Name & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Assigned Driver <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.driverName}
                onChange={(e) => setFormData({ ...formData, driverName: e.target.value })}
                placeholder="e.g. Muhammad Ali"
                className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white font-sans transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Driver Contact
              </label>
              <input
                type="text"
                value={formData.driverPhone}
                onChange={(e) => setFormData({ ...formData, driverPhone: e.target.value })}
                placeholder="e.g. 0300 1112233"
                className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white font-sans transition-all"
              />
            </div>
          </div>

          {/* Row 5: Schedule Timings */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Departure Time
              </label>
              <input
                type="text"
                value={formData.startTime}
                onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                placeholder="e.g. 07:15 AM"
                className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white font-sans transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Arrival / Drop Time
              </label>
              <input
                type="text"
                value={formData.endTime}
                onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                placeholder="e.g. 08:15 AM"
                className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white font-sans transition-all"
              />
            </div>
          </div>

          {/* Row 6: Capacity & Initial Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Student Capacity Seats
              </label>
              <input
                type="number"
                min="10"
                max="60"
                value={formData.totalCapacity}
                onChange={(e) =>
                  setFormData({ ...formData, totalCapacity: parseInt(e.target.value, 10) || 30 })
                }
                className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white font-sans transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Initial Trip Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white font-sans cursor-pointer"
              >
                <option value="Pending">Pending (Not Started)</option>
                <option value="On Route">On Route (In Transit)</option>
                <option value="Picked Up">Picked Up (Boarding)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-50/60 border-t border-slate-100 flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-xl shadow-xs transition cursor-pointer"
          >
            Schedule Trip
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ScheduleTripModal;
