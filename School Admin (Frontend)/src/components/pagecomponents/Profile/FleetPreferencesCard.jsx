import React, { useState } from 'react';
import {
  MdNotificationsActive,
  MdWarning,
  MdSms,
  MdSave,
  MdCheckCircle,
} from 'react-icons/md';

const FleetPreferencesCard = ({ preferences, onSavePreferences }) => {
  const [formData, setFormData] = useState({
    parentSmsAlerts: preferences?.parentSmsAlerts ?? true,
    sosEmergencyBroadcast: preferences?.sosEmergencyBroadcast ?? true,
    autoExportManifest: preferences?.autoExportManifest ?? true,
    telematicsInterval: preferences?.telematicsInterval || '10s',
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSavePreferences) {
      onSavePreferences(formData);
    }
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div
      className="bg-white rounded-2xl border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] p-6 font-sans space-y-5"
      data-purpose="fleet-preferences-card"
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 border border-teal-100 flex items-center justify-center shrink-0">
            <MdNotificationsActive size={22} />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
              Dispatch &amp; Safety Preferences
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Automated parent alerts, telemetry sync intervals, and emergency protocols
            </p>
          </div>
        </div>

        {savedSuccess && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 border border-emerald-200 rounded-full text-xs font-semibold animate-in fade-in">
            <MdCheckCircle size={15} />
            <span>Preferences Saved</span>
          </span>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="divide-y divide-slate-100">
          {/* Toggle 1: Parent SMS Notifications */}
          <div className="py-3 flex items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                <MdSms size={16} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800">
                  Instant Parent SMS &amp; Mobile Notifications
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Send automated alerts when students board, disembark, or when a bus is delayed.
                </p>
              </div>
            </div>

            <label className="relative inline-flex items-center cursor-pointer shrink-0">
              <input
                type="checkbox"
                checked={formData.parentSmsAlerts}
                onChange={(e) =>
                  setFormData({ ...formData, parentSmsAlerts: e.target.checked })
                }
                className="sr-only peer"
              />
              <div className="w-10 h-5.5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4.5 after:w-4.5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          {/* Toggle 2: SOS Emergency Protocol */}
          <div className="py-3 flex items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 mt-0.5">
                <MdWarning size={16} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800">
                  SOS Distress Beacon Direct Escalation
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Instantly broadcast distress alarms to the central dashboard and dispatch rescue units.
                </p>
              </div>
            </div>

            <label className="relative inline-flex items-center cursor-pointer shrink-0">
              <input
                type="checkbox"
                checked={formData.sosEmergencyBroadcast}
                onChange={(e) =>
                  setFormData({ ...formData, sosEmergencyBroadcast: e.target.checked })
                }
                className="sr-only peer"
              />
              <div className="w-10 h-5.5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4.5 after:w-4.5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          {/* Telemetry Interval */}
          <div className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <p className="text-xs font-bold text-slate-800">
                GPS Telematics Ping Frequency
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Rate at which active buses transmit coordinates and speed telematics.
              </p>
            </div>

            <select
              value={formData.telematicsInterval}
              onChange={(e) =>
                setFormData({ ...formData, telematicsInterval: e.target.value })
              }
              className="px-3.5 py-2 bg-slate-50/70 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white font-sans cursor-pointer"
            >
              <option value="5s">Real-time (Every 5 seconds)</option>
              <option value="10s">Standard (Every 10 seconds)</option>
              <option value="30s">Battery Saver (Every 30 seconds)</option>
            </select>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end pt-3 border-t border-slate-100 gap-3">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-xl shadow-xs transition-all cursor-pointer"
          >
            <MdSave size={16} />
            <span>Save Preferences</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default FleetPreferencesCard;
