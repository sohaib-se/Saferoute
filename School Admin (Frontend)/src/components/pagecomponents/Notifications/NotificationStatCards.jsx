import React from 'react';
import { MdChat, MdCheckCircle, MdWarning, MdEmergency } from 'react-icons/md';

const NotificationStatCards = ({
  monthlyBroadcasts = '1,240',
  deliveryRate = '99.4%',
  activeAlerts = '1 Delay',
  activeAlertSub = 'Bus 15 Canal Road',
  emergencySos = '0 Pending',
}) => {
  return (
    <section aria-label="Notification Statistics" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Stat Card 1 */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex items-start justify-between">
        <div>
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Broadcasts (Month)
          </span>
          <div className="text-2xl font-bold text-slate-900 mt-1">{monthlyBroadcasts}</div>
          <div className="text-xs font-medium text-emerald-600 mt-2 flex items-center gap-1">
            <span>↑ +14.2%</span> <span className="text-slate-400 font-normal">vs last month</span>
          </div>
        </div>
        <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
          <MdChat size={20} />
        </div>
      </div>

      {/* Stat Card 2 */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex items-start justify-between">
        <div>
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Delivery Rate
          </span>
          <div className="text-2xl font-bold text-slate-900 mt-1">{deliveryRate}</div>
          <div className="text-xs text-slate-500 font-medium mt-2">
            SMS &amp; Push combined
          </div>
        </div>
        <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
          <MdCheckCircle size={20} />
        </div>
      </div>

      {/* Stat Card 3 */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex items-start justify-between">
        <div>
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Active Alerts
          </span>
          <div className="text-2xl font-bold text-amber-600 mt-1">{activeAlerts}</div>
          <div className="text-xs text-slate-500 font-medium mt-2">
            {activeAlertSub}
          </div>
        </div>
        <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
          <MdWarning size={20} />
        </div>
      </div>

      {/* Stat Card 4 */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex items-start justify-between">
        <div>
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Emergency SOS
          </span>
          <div className="text-2xl font-bold text-slate-900 mt-1">{emergencySos}</div>
          <div className="text-xs font-medium text-emerald-600 mt-2">
            All incidents resolved
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
