import React from 'react';

const NotificationHeaderSection = ({
  totalCount = 48,
  unreadCount = 3,
  onMarkAllAsRead,
  onOpenSendModal,
}) => {
  return (
    <div className="space-y-4">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-medium text-slate-400">
        <a className="hover:text-slate-600 transition-colors" href="#">Communication</a>
        <span>/</span>
        <span className="text-slate-800 font-semibold">Notifications</span>
      </nav>

      {/* Page Heading & Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Notifications</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-600 border border-blue-100">
              {totalCount} Total • {unreadCount} Unread
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl font-normal">
            Manage broadcasts, alert history, student pickup confirmations, and instant announcements.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={onMarkAllAsRead}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium bg-white text-slate-700 border border-slate-200 rounded-lg shadow-sm hover:bg-slate-50 transition-colors cursor-pointer"
          >
            <svg className="w-3.5 h-3.5 text-slate-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
            Mark All as Read
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium bg-white text-slate-700 border border-slate-200 rounded-lg shadow-sm hover:bg-slate-50 transition-colors cursor-pointer"
          >
            <svg className="w-3.5 h-3.5 text-slate-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
            Templates &amp; Rules
          </button>
          <button
            type="button"
            onClick={onOpenSendModal}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold bg-blue-600 text-white rounded-lg shadow-sm hover:bg-blue-700 transition-colors cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M12 4v16m8-8H4" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
            + Send New Notification
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationHeaderSection;
