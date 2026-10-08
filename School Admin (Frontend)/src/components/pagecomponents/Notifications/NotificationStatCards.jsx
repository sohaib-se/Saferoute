import React from 'react';

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
      <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm flex items-center justify-between">
        <div>
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">BROADCASTS (MONTH)</span>
          <div className="text-2xl font-bold text-slate-900 mt-1">{monthlyBroadcasts}</div>
          <div className="text-[11px] font-medium text-emerald-600 mt-1 flex items-center gap-0.5">
            <span>↑ +14.2%</span> <span className="text-slate-400 font-normal">vs last month</span>
          </div>
        </div>
        <div className="w-11 h-11 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
        </div>
      </div>

      {/* Stat Card 2 */}
      <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm flex items-center justify-between">
        <div>
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">DELIVERY RATE</span>
          <div className="text-2xl font-bold text-slate-900 mt-1">{deliveryRate}</div>
          <div className="text-[11px] text-slate-500 font-normal mt-1">
            SMS &amp; Push combined
          </div>
        </div>
        <div className="w-11 h-11 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
        </div>
      </div>

      {/* Stat Card 3 */}
      <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm flex items-center justify-between">
        <div>
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">ACTIVE ALERTS</span>
          <div className="text-2xl font-bold text-amber-600 mt-1">{activeAlerts}</div>
          <div className="text-[11px] text-slate-500 font-normal mt-1">
            {activeAlertSub}
          </div>
        </div>
        <div className="w-11 h-11 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
        </div>
      </div>

      {/* Stat Card 4 */}
      <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm flex items-center justify-between">
        <div>
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">EMERGENCY SOS</span>
          <div className="text-2xl font-bold text-slate-900 mt-1">{emergencySos}</div>
          <div className="text-[11px] font-medium text-emerald-600 mt-1">
            All incidents resolved
          </div>
        </div>
        <div className="w-11 h-11 rounded-lg bg-rose-50 text-rose-500 flex items-center justify-center flex-shrink-0">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="9"></circle>
            <path d="M12 3v4m0 10v4m9-9h-4M7 12H3" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
        </div>
      </div>
    </section>
  );
};

export default NotificationStatCards;
