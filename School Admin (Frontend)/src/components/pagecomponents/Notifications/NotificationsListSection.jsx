import React, { useState } from 'react';
import {
  MdDirectionsBus,
  MdCheckCircle,
  MdWarning,
  MdEmergency,
  MdPerson,
  MdChevronLeft,
  MdChevronRight,
  MdArrowForward,
  MdNotificationsOff,
  MdDeleteOutline,
} from 'react-icons/md';

export const initialNotificationsData = [];

const PAGE_SIZE = 10;

const NotificationsListSection = ({
  notificationsList = [],
  activeTab = 'All',
  onDeleteNotification,
}) => {
  const [activePage, setActivePage] = useState(1);

  const filteredNotifications = notificationsList.filter((item) => {
    if (activeTab === 'All') return true;
    return item.category === activeTab;
  });

  const totalPages = Math.max(1, Math.ceil(filteredNotifications.length / PAGE_SIZE));
  const currentPage = Math.min(activePage, totalPages);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const paginatedNotifications = filteredNotifications.slice(startIndex, startIndex + PAGE_SIZE);

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
      case 'System':
        return <MdPerson size={20} />;
      default:
        return <MdDirectionsBus size={20} />;
    }
  };

  return (
    <div className="space-y-6 font-sans">
      <section aria-label="Notifications List" className="space-y-3.5">
        {paginatedNotifications.length > 0 ? (
          paginatedNotifications.map((item) => (
            <article
              key={item.id}
              className={`bg-white rounded-2xl border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] hover:shadow-md transition-shadow relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between p-5 border-l-4 ${item.borderLeft || 'border-l-blue-600'} gap-4`}
            >
              <div className="flex items-start gap-3.5 min-w-0">
                {/* Icon */}
                <div className={`w-11 h-11 rounded-xl ${item.iconBg || 'bg-blue-50 text-blue-600'} flex items-center justify-center shrink-0 mt-0.5`}>
                  {getCategoryIcon(item.category, item.title)}
                </div>

                {/* Details */}
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-slate-900">{item.title}</h3>
                  </div>
                  <p className="text-xs text-slate-600 font-normal leading-relaxed">
                    {item.content}
                  </p>
                  <div className="text-[11px] text-slate-400 font-medium pt-0.5">
                    <span>{item.subInfo}</span>
                  </div>
                </div>
              </div>

              {/* Right side timestamp & delete action */}
              <div className="flex items-center gap-3 shrink-0 pl-14 md:pl-0">
                <span className="text-xs font-semibold text-slate-700">{item.timestamp}</span>
                {onDeleteNotification && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (window.confirm('Delete this notification for all participants?')) {
                        onDeleteNotification(item.id);
                      }
                    }}
                    title="Delete notification for all participants"
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                  >
                    <MdDeleteOutline size={18} />
                  </button>
                )}
              </div>
            </article>
          ))
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200/80 shadow-2xs">
            <div className="w-12 h-12 rounded-2xl bg-slate-50 text-slate-400 flex items-center justify-center mx-auto mb-3">
              <MdNotificationsOff size={24} />
            </div>
            <h4 className="text-sm font-bold text-slate-800">No Notifications Recorded</h4>
            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
              Live updates will appear here in real time as drivers pick up and drop off students, or when emergency alerts are triggered.
            </p>
          </div>
        )}
      </section>

      {/* Pagination Section */}
      {filteredNotifications.length > 0 && (
        <footer className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 text-xs text-slate-500">
          <div>
            Showing <span className="font-semibold text-slate-700">{startIndex + 1}</span> to <span className="font-semibold text-slate-700">{Math.min(startIndex + PAGE_SIZE, filteredNotifications.length)}</span> of <span className="font-semibold text-slate-700">{filteredNotifications.length}</span> notifications
          </div>
          {totalPages > 1 && (
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => setActivePage((prev) => Math.max(1, prev - 1))}
                className="w-7 h-7 flex items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-400 hover:text-slate-700 hover:bg-slate-50 transition disabled:opacity-50 cursor-pointer"
              >
                <MdChevronLeft size={16} />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  type="button"
                  onClick={() => setActivePage(page)}
                  className={`w-7 h-7 flex items-center justify-center rounded-lg text-xs font-semibold transition cursor-pointer ${
                    currentPage === page
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                type="button"
                disabled={currentPage === totalPages}
                onClick={() => setActivePage((prev) => Math.min(totalPages, prev + 1))}
                className="w-7 h-7 flex items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-400 hover:text-slate-700 hover:bg-slate-50 transition disabled:opacity-50 cursor-pointer"
              >
                <MdChevronRight size={16} />
              </button>
            </div>
          )}
        </footer>
      )}
    </div>
  );
};

export default NotificationsListSection;
