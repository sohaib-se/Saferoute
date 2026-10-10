import React, { useState } from 'react';
import {
  MdDirectionsBus,
  MdCheckCircle,
  MdWarning,
  MdEmergency,
  MdReceipt,
  MdPerson,
  MdChevronLeft,
  MdChevronRight,
  MdArrowForward,
} from 'react-icons/md';

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

  const filteredNotifications = notificationsList.filter((item) => {
    if (activeTab === 'All') return true;
    return item.category === activeTab;
  });

  const getCategoryIcon = (category, title) => {
    switch (category) {
      case 'Pickup':
        return <MdDirectionsBus size={20} />;
      case 'Drop':
        return <MdCheckCircle size={20} />;
      case 'Delay':
        return <MdWarning size={20} />;
      case 'Emergency':
        return <MdEmergency size={20} />;
      case 'System & Fee':
        return title.includes('Fee') ? <MdReceipt size={20} /> : <MdPerson size={20} />;
      default:
        return <MdDirectionsBus size={20} />;
    }
  };

  return (
    <div className="space-y-6 font-sans">
      <section aria-label="Notifications List" className="space-y-3.5">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((item) => (
            <article
              key={item.id}
              className={`bg-white rounded-2xl border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] hover:shadow-md transition-shadow relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between p-5 border-l-4 ${item.borderLeft} gap-4`}
            >
              <div className="flex items-start gap-3.5 min-w-0">
                {/* Icon */}
                <div className={`w-11 h-11 rounded-xl ${item.iconBg} flex items-center justify-center shrink-0 mt-0.5`}>
                  {getCategoryIcon(item.category, item.title)}
                </div>

                {/* Details */}
                <div className="space-y-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-sm font-bold text-slate-900">{item.title}</h3>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${item.badgeStyle}`}>
                      {item.badgeText}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-600">
                      {item.category}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 font-normal leading-relaxed">
                    {item.content}
                  </p>
                  <div className="text-[11px] text-slate-400 font-medium pt-0.5">
                    <span>{item.subInfo}</span>
                  </div>
                </div>
              </div>

              {/* Right side timestamp and action */}
              <div className="flex md:flex-col items-center md:items-end justify-between md:justify-center gap-2 shrink-0 pl-14 md:pl-0">
                <span className="text-xs font-semibold text-slate-700">{item.timestamp}</span>

                {item.actionType === 'links' && (
                  <div className="text-xs font-medium text-slate-500 flex items-center gap-1.5">
                    <a className="text-blue-600 hover:text-blue-700 font-semibold" href="#">{item.link1}</a>
                    <span>•</span>
                    <a className="hover:text-slate-700" href="#">{item.link2}</a>
                  </div>
                )}

                {item.actionType === 'link' && (
                  <a className="text-xs font-semibold text-blue-600 hover:text-blue-700" href="#">
                    {item.link1}
                  </a>
                )}

                {item.actionType === 'button' && (
                  <button
                    type="button"
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold shadow-xs transition cursor-pointer ${item.buttonStyle}`}
                  >
                    {item.buttonText}
                  </button>
                )}

                {item.actionType === 'arrowLink' && (
                  <a className="text-xs font-semibold text-rose-600 hover:text-rose-700 flex items-center gap-1" href="#">
                    <span>{item.link1}</span>
                    <MdArrowForward size={14} />
                  </a>
                )}
              </div>
            </article>
          ))
        ) : (
          <div className="bg-white rounded-2xl p-8 text-center text-slate-400 text-xs border border-slate-200/80 font-normal">
            No notifications found in this category.
          </div>
        )}
      </section>

      {/* Pagination Section */}
      <footer className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 text-xs text-slate-500">
        <div>
          Showing <span className="font-semibold text-slate-700">1</span> to <span className="font-semibold text-slate-700">{filteredNotifications.length}</span> of <span className="font-semibold text-slate-700">{notificationsList.length}</span> notifications
        </div>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            disabled={activePage === 1}
            onClick={() => setActivePage((prev) => Math.max(1, prev - 1))}
            className="w-7 h-7 flex items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-400 hover:text-slate-700 hover:bg-slate-50 transition disabled:opacity-50 cursor-pointer"
          >
            <MdChevronLeft size={16} />
          </button>
          {[1, 2, 3, 4, 5].map((page) => (
            <button
              key={page}
              type="button"
              onClick={() => setActivePage(page)}
              className={`w-7 h-7 flex items-center justify-center rounded-lg text-xs font-semibold transition cursor-pointer ${
                activePage === page
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-100'
              }`}
            >
              {page}
            </button>
          ))}
          <button
            type="button"
            disabled={activePage === 5}
            onClick={() => setActivePage((prev) => Math.min(5, prev + 1))}
            className="w-7 h-7 flex items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-400 hover:text-slate-700 hover:bg-slate-50 transition disabled:opacity-50 cursor-pointer"
          >
            <MdChevronRight size={16} />
          </button>
        </div>
      </footer>
    </div>
  );
};

export default NotificationsListSection;
