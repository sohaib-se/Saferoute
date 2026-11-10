import React, { useState, useEffect } from 'react';
import {
  MdDirectionsBus,
  MdLocationOn,
  MdCheckCircle,
  MdClose,
  MdOutlineAccessTime,
} from 'react-icons/md';
import Modal from '../../common/Modal';
import { getTripAttendance } from '../../../services/tripsService';

const TripDetailsModal = ({
  trip,
  isOpen,
  onClose,
  onLocate,
}) => {
  const [attendanceList, setAttendanceList] = useState([]);
  const [loadingAttendance, setLoadingAttendance] = useState(false);

  useEffect(() => {
    if (isOpen && trip?.id) {
      setLoadingAttendance(true);
      getTripAttendance(trip.id)
        .then(setAttendanceList)
        .catch((err) => {
          console.error('Failed to load trip attendance:', err);
          setAttendanceList([]);
        })
        .finally(() => setLoadingAttendance(false));
    } else {
      setAttendanceList([]);
    }
  }, [isOpen, trip?.id]);

  if (!isOpen || !trip) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      icon={<MdDirectionsBus size={20} />}
      title={`Trip Manifest ${trip.displayId || trip.id}`}
      subtitle={`${trip.vehicleName} • ${trip.route} • Date: ${trip.tripDate}`}
      maxWidth="max-w-3xl"
    >
      <div className="p-6 space-y-5 max-h-[80vh] overflow-y-auto custom-scrollbar">
        {/* Top Summary Banner */}
        <div className="bg-slate-50/80 rounded-2xl p-4 border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 font-bold text-sm flex flex-col items-center justify-center shrink-0 border border-blue-200">
              <span className="text-[10px] uppercase font-semibold">Bus</span>
              <span>{trip.vehicleName}</span>
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">{trip.route}</h4>
              <p className="text-xs text-slate-500 mt-0.5">
                Driver: <span className="font-semibold text-slate-700">{trip.driverName}</span> • Date: {trip.tripDate}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                trip.overallBadge?.style || 'bg-slate-100 text-slate-700 border border-slate-200'
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full mr-2 ${
                  trip.overallBadge?.dot || 'bg-blue-500'
                }`}
              />
              {trip.overallBadge?.label || trip.overallStatus}
            </span>
          </div>
        </div>

        {/* Sub-Trips Two-Phase Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Pickup Sub-trip */}
          <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-2xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-800">1. Morning Pickup</span>
              <span className={`px-2 py-0.5 rounded-md text-[10.5px] font-semibold ${trip.pickupBadge?.style}`}>
                {trip.pickupBadge?.label}
              </span>
            </div>
            <div className="text-xs text-slate-600 space-y-1">
              <p>• Students Picked: <span className="font-semibold text-emerald-600">{trip.studentsPicked}</span> / {trip.totalStudents}</p>
              <p>• Absent Students: <span className="font-semibold text-rose-600">{trip.studentsAbsent}</span></p>
              {trip.pickupStartedAt && (
                <p className="text-[11px] text-slate-400">
                  Started: {new Date(trip.pickupStartedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              )}
            </div>
          </div>

          {/* Dropoff Sub-trip */}
          <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-2xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-800">2. Afternoon Drop-off</span>
              <span className={`px-2 py-0.5 rounded-md text-[10.5px] font-semibold ${trip.dropoffBadge?.style}`}>
                {trip.dropoffBadge?.label}
              </span>
            </div>
            <div className="text-xs text-slate-600 space-y-1">
              <p>• Students Dropped Home: <span className="font-semibold text-blue-600">{trip.studentsDropped}</span> / {trip.studentsPicked}</p>
              <p>• In Transit / Remaining: <span className="font-semibold text-amber-600">{Math.max(0, trip.studentsPicked - trip.studentsDropped)}</span></p>
              {trip.dropoffStartedAt && (
                <p className="text-[11px] text-slate-400">
                  Started: {new Date(trip.dropoffStartedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Student Attendance Manifest Table */}
        <div className="border border-slate-200/80 rounded-xl overflow-hidden bg-white">
          <div className="p-3 bg-slate-50/70 border-b border-slate-200/80 flex items-center justify-between">
            <h5 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Student Attendance Manifest ({attendanceList.length})
            </h5>
            {loadingAttendance && (
              <span className="text-xs text-blue-600 font-medium">Loading records...</span>
            )}
          </div>

          <div className="overflow-x-auto max-h-60">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100 text-[10.5px] font-semibold uppercase text-slate-400">
                  <th className="py-2 px-3 w-10 text-center">#</th>
                  <th className="py-2 px-3">Student</th>
                  <th className="py-2 px-3">Stop Address</th>
                  <th className="py-2 px-3 text-center">Pickup Status</th>
                  <th className="py-2 px-3 text-center">Drop-off Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {attendanceList.length > 0 ? (
                  attendanceList.map((st, i) => (
                    <tr key={st.id || i} className="hover:bg-slate-50/40">
                      <td className="py-2.5 px-3 text-center text-slate-400">{i + 1}</td>
                      <td className="py-2.5 px-3">
                        <div className="font-bold text-slate-900">{st.studentName}</div>
                        <div className="text-[10px] text-slate-400">{st.classGrade} {st.section ? `• ${st.section}` : ''}</div>
                      </td>
                      <td className="py-2.5 px-3 text-slate-600 max-w-[180px] truncate">
                        {st.address}
                      </td>
                      <td className="py-2.5 px-3 text-center">
                        <span
                          className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold ${
                            st.pickupStatus === 'picked_up'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : st.pickupStatus === 'absent'
                              ? 'bg-rose-50 text-rose-700 border border-rose-200'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {st.pickupStatus === 'picked_up'
                            ? `Picked ${st.pickedUpAt ? `(${st.pickedUpAt})` : ''}`
                            : st.pickupStatus === 'absent'
                            ? 'Absent'
                            : 'Pending'}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-center">
                        <span
                          className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold ${
                            st.dropoffStatus === 'dropped'
                              ? 'bg-blue-50 text-blue-700 border border-blue-200'
                              : st.dropoffStatus === 'skipped'
                              ? 'bg-slate-100 text-slate-500'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {st.dropoffStatus === 'dropped'
                            ? `Dropped ${st.droppedAt ? `(${st.droppedAt})` : ''}`
                            : st.dropoffStatus === 'skipped'
                            ? 'Skipped'
                            : 'Pending'}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="py-6 text-center text-slate-400 text-xs">
                      {loadingAttendance ? 'Loading manifest...' : 'No student records attached to this trip.'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
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
            <span>Track Live GPS on Map</span>
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
    </Modal>
  );
};

export default TripDetailsModal;
