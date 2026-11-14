import React from 'react';
import { MdChat, MdCheckCircle, MdDirectionsBus, MdEmergency } from 'react-icons/md';

const NotificationStatCards = ({ notificationsList = [] }) => {
  const totalCount = notificationsList.length;
  const pickupCount = notificationsList.filter((n) => n.category === 'Pickup').length;
  const dropCount = notificationsList.filter((n) => n.category === 'Drop').length;
  const sosCount = notificationsList.filter((n) => n.category === 'Emergency').length;

  return (
    <section aria-label="Notification Statistics" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-sans">
      {/* Stat Card 1: Total Alerts */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex items-start justify-between">
        <div>
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Total Activity Logs
          </span>
          <div className="text-2xl font-bold text-slate-900 mt-1">{totalCount}</div>
          <div className="text-xs font-medium text-emerald-600 mt-2 flex items-center gap-1">
            <span>Live Sync</span> <span className="text-slate-400 font-normal">• Supabase Telemetry</span>
          </div>
        </div>
        <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
          <MdChat size={20} />
        </div>
      </div>

      {/* Stat Card 2: Pickups */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex items-start justify-between">
        <div>
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Pickups Recorded
          </span>
          <div className="text-2xl font-bold text-slate-900 mt-1">{pickupCount}</div>
          <div className="text-xs text-slate-500 font-medium mt-2">
            Boarded fleet vehicles
          </div>
        </div>
        <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
          <MdDirectionsBus size={20} />
        </div>
      </div>

      {/* Stat Card 3: Drops */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex items-start justify-between">
        <div>
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Drops Completed
          </span>
          <div className="text-2xl font-bold text-emerald-600 mt-1">{dropCount}</div>
          <div className="text-xs text-slate-500 font-medium mt-2">
            Safely arrived at destination
          </div>
        </div>
        <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
          <MdCheckCircle size={20} />
        </div>
      </div>

      {/* Stat Card 4: SOS & Emergencies */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex items-start justify-between">
        <div>
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Emergency Distress
          </span>
          <div className={`text-2xl font-bold mt-1 ${sosCount > 0 ? 'text-rose-600' : 'text-slate-900'}`}>
            {sosCount}
          </div>
          <div className={`text-xs font-medium mt-2 ${sosCount > 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
            {sosCount === 0 ? 'All clear • 0 active emergencies' : 'High priority distress alert'}
          </div>
        </div>
        <div className="w-11 h-11 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center shrink-0">
          <MdEmergency size={20} />
        </div>
      </div>
    </section>
  );
};

export default NotificationStatCards;
