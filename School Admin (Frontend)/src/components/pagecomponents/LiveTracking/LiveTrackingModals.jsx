import React, { useState } from 'react';
import {
  MdClose,
  MdPhone,
  MdSend,
  MdWarning,
  MdDirectionsBus,
} from 'react-icons/md';

export const CallDriverModal = ({ isOpen, onClose, vehicle, onCallSuccess }) => {
  if (!isOpen || !vehicle) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-150 font-sans">
      <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <MdPhone size={18} />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Call Driver</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100"
          >
            <MdClose size={18} />
          </button>
        </div>

        <div className="text-center py-2 space-y-2">
          <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-700 font-extrabold text-xl flex items-center justify-center mx-auto shadow-sm">
            {vehicle.driver.charAt(0)}
          </div>
          <div>
            <h4 className="font-bold text-base text-slate-900">{vehicle.driver}</h4>
            <p className="text-xs text-slate-500 font-mono mt-0.5">{vehicle.driverPhone}</p>
            <p className="text-[11px] text-emerald-600 font-medium mt-1">
              Currently driving {vehicle.name} • {vehicle.speed} km/h
            </p>
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2 px-3 border border-slate-200 text-slate-600 text-xs font-semibold rounded-xl hover:bg-slate-50"
          >
            Cancel
          </button>
          <a
            href={`tel:${vehicle.driverPhone}`}
            onClick={() => {
              if (onCallSuccess) onCallSuccess(`Dialing ${vehicle.driver} (${vehicle.driverPhone})...`);
              onClose();
            }}
            className="flex-1 py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl shadow-sm flex items-center justify-center gap-1.5"
          >
            <MdPhone size={14} />
            <span>Call Now</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export const SendMessageModal = ({ isOpen, onClose, vehicle, onSendSuccess }) => {
  const [message, setMessage] = useState('');

  if (!isOpen || !vehicle) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    if (onSendSuccess) {
      onSendSuccess(`Message dispatched to ${vehicle.driver}: "${message.slice(0, 30)}..."`);
    }
    setMessage('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-150 font-sans">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <MdSend size={16} />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Send Dispatch Note</h3>
              <p className="text-[11px] text-slate-400">To {vehicle.driver} ({vehicle.name})</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100"
          >
            <MdClose size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Advisory / Instructions
            </label>
            <textarea
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="e.g. Traffic ahead at St. John Academic Way. Use alternate bypass route."
              className="w-full p-3 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-800"
              required
            />
          </div>

          <div className="flex items-center justify-between gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="py-2 px-4 border border-slate-200 text-slate-600 text-xs font-semibold rounded-xl hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="py-2 px-5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl shadow-sm flex items-center gap-1.5"
            >
              <MdSend size={13} />
              <span>Send Message</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export const SOSAlertModal = ({ isOpen, onClose, vehicle, onConfirmSOS }) => {
  if (!isOpen || !vehicle) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-150 font-sans">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-rose-200 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
            <MdWarning size={22} />
          </div>
          <div>
            <h3 className="font-extrabold text-slate-900 text-base">
              Trigger SOS / Depot Alert
            </h3>
            <p className="text-xs text-slate-500">
              Immediate distress broadcast for {vehicle.name}
            </p>
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 text-xs text-amber-900 space-y-1">
          <p className="font-bold">⚠️ Warning: Critical Telematics Notification</p>
          <p className="text-[11px] leading-relaxed text-amber-800">
            This will sound the alarm in the central transport control room, notify emergency contacts, and dispatch nearest supervisor unit to coordinates ({vehicle.coordinates?.lat}, {vehicle.coordinates?.lng}).
          </p>
        </div>

        <div className="flex gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 px-4 border border-slate-200 text-slate-600 text-xs font-semibold rounded-xl hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              if (onConfirmSOS) onConfirmSOS(vehicle);
              onClose();
            }}
            className="flex-1 py-2.5 px-4 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl shadow-md flex items-center justify-center gap-1.5"
          >
            <MdWarning size={16} />
            <span>Confirm Emergency Alert</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export const VehicleDetailsModal = ({ isOpen, onClose, vehicle }) => {
  if (!isOpen || !vehicle) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-150 font-sans">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md">
              <MdDirectionsBus size={22} />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-base">{vehicle.name}</h3>
              <p className="text-xs text-slate-400 font-mono">Plate: {vehicle.plate} • {vehicle.shift}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100"
          >
            <MdClose size={18} />
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-center">
            <span className="text-[10px] uppercase font-bold text-slate-400">SPEED</span>
            <p className="text-base font-extrabold text-slate-800 mt-0.5">{vehicle.speed} km/h</p>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-center">
            <span className="text-[10px] uppercase font-bold text-slate-400">FUEL</span>
            <p className="text-base font-extrabold text-emerald-600 mt-0.5">{vehicle.fuel}%</p>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-center">
            <span className="text-[10px] uppercase font-bold text-slate-400">STUDENTS</span>
            <p className="text-base font-extrabold text-blue-600 mt-0.5">{vehicle.studentsOnboard} / {vehicle.totalCapacity}</p>
          </div>
        </div>

        {/* Info Rows */}
        <div className="space-y-2 text-xs">
          <div className="flex justify-between py-1.5 border-b border-slate-100">
            <span className="text-slate-400">Assigned Driver:</span>
            <span className="font-semibold text-slate-800">{vehicle.driver} ({vehicle.driverPhone})</span>
          </div>
          <div className="flex justify-between py-1.5 border-b border-slate-100">
            <span className="text-slate-400">Designated Route:</span>
            <span className="font-semibold text-slate-800">{vehicle.route}</span>
          </div>
          <div className="flex justify-between py-1.5 border-b border-slate-100">
            <span className="text-slate-400">Current GPS Coordinates:</span>
            <span className="font-mono text-slate-700">{vehicle.coordinates?.lat}, {vehicle.coordinates?.lng}</span>
          </div>
          <div className="flex justify-between py-1.5 border-b border-slate-100">
            <span className="text-slate-400">Hardware Gateway:</span>
            <span className="font-semibold text-emerald-600">5G Dual-Band OBD-II Telematics Active</span>
          </div>
          <div className="flex justify-between py-1.5">
            <span className="text-slate-400">Last Telematics Ping:</span>
            <span className="text-slate-600">{vehicle.lastUpdate}</span>
          </div>
        </div>

        <div className="pt-2">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
};
