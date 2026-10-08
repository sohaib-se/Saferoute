import React, { useState } from 'react';

export const initialNotificationsData = [
  {
    id: 1,
    title: 'Bus 12 picked up students',
    borderLeft: 'border-l-blue-600',
    iconBg: 'bg-blue-50 text-blue-600',
    category: 'Pickup',
    badgeText: 'Delivered (18/18 Parents)',
    badgeStyle: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    content: 'Bus 12 has picked up 18 students from Green Valley route on time. Driver: Muhammad Ali.',
    subInfo: 'Route 1 (Bus 12) • SMS + Mobile App Notification',
    timestamp: 'Today, 08:12 AM',
    actionType: 'links',
    link1: 'View Details',
    link2: 'Resend',
    unread: true,
  },
  {
    id: 2,
    title: 'Bus 07 reached school',
    borderLeft: 'border-l-emerald-500',
    iconBg: 'bg-emerald-50 text-emerald-600',
    category: 'Drop',
    badgeText: 'Completed',
    badgeStyle: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    content: 'All onboard students safely arrived at Main Campus gate. Attendance verified by Conductor Tariq.',
    subInfo: 'Route 2 (Model Town) • Mobile App Push',
    timestamp: 'Today, 08:05 AM',
    actionType: 'link',
    link1: 'Attendance Sheet',
    unread: true,
  },
  {
    id: 3,
    title: 'Route delay on Bus 15',
    borderLeft: 'border-l-amber-500',
    iconBg: 'bg-amber-50 text-amber-600',
    category: 'Delay',
    badgeText: 'Urgent Alert',
    badgeStyle: 'bg-amber-100/70 text-amber-800 border-amber-200',
    content: 'Bus 15 delayed by 15 mins near Canal Road due to heavy traffic. Estimated arrival 08:35 AM. 22 Parents informed.',
    subInfo: 'Route 5 (Canal Road) • Automated Traffic Detection',
    timestamp: 'Today, 07:50 AM',
    actionType: 'button',
    buttonText: 'Broadcast Update',
    buttonStyle: 'bg-amber-600 hover:bg-amber-700 text-white',
    unread: true,
  },
  {
    id: 4,
    title: 'Emergency alert from Bus 09',
    borderLeft: 'border-l-rose-500',
    iconBg: 'bg-rose-50 text-rose-500',
    category: 'Emergency',
    badgeText: 'High Priority / Resolved',
    badgeStyle: 'bg-rose-100 text-rose-800 border-rose-200',
    content: 'Engine overheating warning triggered near Johar Town. Backup vehicle Bus 18 dispatched. All students transferred safely.',
    subInfo: 'Incident #INC-2024-89 • Assigned to Admin Team',
    timestamp: 'Today, 07:35 AM',
    actionType: 'arrowLink',
    link1: 'View Incident Log',
    unread: false,
  },
  {
    id: 5,
    title: 'Monthly Transport Fee Reminder Broadcasted',
    borderLeft: 'border-l-indigo-400',
    iconBg: 'bg-indigo-50 text-indigo-600',
    category: 'System & Fee',
    badgeText: 'Billing Broadcast',
    badgeStyle: 'bg-slate-100 text-slate-700 border-slate-200',
    content: 'Automated payment reminder sent to 28 parents with pending fee balance for October 2024 billing cycle.',
    subInfo: '28 Recipients (WhatsApp & SMS) • Fee Management System',
    timestamp: 'Yesterday, 04:30 PM',
    actionType: 'link',
    link1: 'Fee Records',
    unread: false,
  },
  {
    id: 6,
    title: 'Driver replacement for Route 4',
    borderLeft: 'border-l-purple-400',
    iconBg: 'bg-purple-50 text-purple-600',
    category: 'System & Fee',
    badgeText: 'Schedule Change',
    badgeStyle: 'bg-slate-100 text-slate-700 border-slate-200',
    content: 'Driver Usman Tariq assigned to replace Bilal Ahmed on Bus 10 for afternoon shift due to emergency leave.',
    subInfo: 'Route 4 • Bus 10 • Notified 14 Parents',
    timestamp: 'Yesterday, 02:15 PM',
    actionType: 'link',
    link1: 'View Roster',
    unread: false,
  },
];

const NotificationsListSection = ({
  notificationsList = initialNotificationsData,
  activeTab = 'All',
}) => {
  const [activePage, setActivePage] = useState(1);

  // Filter based on selected category tab
  const filteredNotifications = notificationsList.filter((item) => {
    if (activeTab === 'All') return true;
    return item.category === activeTab;
  });

  return (
    <div className="space-y-6">
      {/* BEGIN: Notifications List */}
      <section aria-label="Notifications List" className="space-y-3.5">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((item) => (
            <article
              key={item.id}
              className={`bg-white rounded-xl border border-slate-200 shadow-xs hover:shadow-md transition-shadow relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between p-4 pl-5 border-l-4 ${item.borderLeft} gap-4`}
            >
              <div className="flex items-start gap-3.5">
                {/* Icon */}
                <div className={`w-10 h-10 rounded-full ${item.iconBg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                  {item.category === 'Pickup' && (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                      <rect height="12" rx="2" width="18" x="3" y="6"></rect>
                      <circle cx="7" cy="18" r="2"></circle>
                      <circle cx="17" cy="18" r="2"></circle>
                    </svg>
                  )}
                  {item.category === 'Drop' && (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                      <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                  )}
                  {item.category === 'Delay' && (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                      <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                  )}
                  {item.category === 'Emergency' && (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="9"></circle>
                      <path d="M12 8v4m0 4h.01" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                  )}
                  {item.category === 'System & Fee' && item.title.includes('Fee') && (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                      <path d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                  )}
                  {item.category === 'System & Fee' && !item.title.includes('Fee') && (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                      <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                  )}
                </div>

                {/* Details */}
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-sm font-bold text-slate-900">{item.title}</h2>
                    <span className={`px-2 py-0.5 rounded text-[11px] font-semibold border ${item.badgeStyle}`}>
                      {item.badgeText}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-600">
                      {item.category}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 font-normal">
                    {item.content}
                  </p>
                  <div className="text-[11px] text-slate-400 font-normal pt-0.5 flex items-center gap-2">
                    <span>{item.subInfo}</span>
                  </div>
                </div>
              </div>

              {/* Right side timestamp and action */}
              <div className="flex md:flex-col items-center md:items-end justify-between md:justify-center gap-1.5 flex-shrink-0 pl-14 md:pl-0">
                <span className="text-xs font-semibold text-slate-800">{item.timestamp}</span>

                {item.actionType === 'links' && (
                  <div className="text-xs font-medium text-slate-500 flex items-center gap-1">
                    <a className="text-blue-600 hover:text-blue-700" href="#">{item.link1}</a>
                    <span>•</span>
                    <a className="hover:text-slate-700" href="#">{item.link2}</a>
                  </div>
                )}

                {item.actionType === 'link' && (
                  <a className="text-xs font-medium text-blue-600 hover:text-blue-700" href="#">
                    {item.link1}
                  </a>
                )}

                {item.actionType === 'button' && (
                  <button
                    type="button"
                    className={`px-3 py-1.5 rounded text-xs font-semibold shadow-xs transition-colors cursor-pointer ${item.buttonStyle}`}
                  >
                    {item.buttonText}
                  </button>
                )}

                {item.actionType === 'arrowLink' && (
                  <a className="text-xs font-semibold text-rose-600 hover:text-rose-700 flex items-center gap-1" href="#">
                    <span>{item.link1}</span>
                    <span>→</span>
                  </a>
                )}
              </div>
            </article>
          ))
        ) : (
          <div className="bg-white rounded-xl p-8 text-center text-slate-400 text-xs border border-slate-200">
            No notifications found in this category.
          </div>
        )}
      </section>

      {/* BEGIN: Pagination Section */}
      <footer className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200 text-xs text-slate-500">
        <div>
          Showing <span className="font-semibold text-slate-700">1</span> to <span className="font-semibold text-slate-700">{filteredNotifications.length}</span> of <span className="font-semibold text-slate-700">{notificationsList.length}</span> notifications
        </div>
        <div className="flex items-center gap-1">
          {/* Prev Button */}
          <button
            type="button"
            disabled={activePage === 1}
            onClick={() => setActivePage((prev) => Math.max(1, prev - 1))}
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-400 hover:bg-slate-50 transition-colors disabled:opacity-50 cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
          </button>
          {[1, 2, 3, 4, 5].map((page) => (
            <button
              key={page}
              type="button"
              onClick={() => setActivePage(page)}
              className={`w-8 h-8 flex items-center justify-center rounded-lg font-medium transition-colors cursor-pointer ${
                activePage === page
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
              }`}
            >
              {page}
            </button>
          ))}
          {/* Next Button */}
          <button
            type="button"
            disabled={activePage === 5}
            onClick={() => setActivePage((prev) => Math.min(5, prev + 1))}
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition-colors disabled:opacity-50 cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
          </button>
        </div>
      </footer>
    </div>
  );
};

export default NotificationsListSection;
