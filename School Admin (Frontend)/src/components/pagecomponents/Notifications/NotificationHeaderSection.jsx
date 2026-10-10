import React from 'react';
import { MdCheck, MdTune, MdAdd } from 'react-icons/md';

const NotificationHeaderSection = ({
  totalCount = 48,
  unreadCount = 3,
  onMarkAllAsRead,
  onOpenSendModal,
}) => {
  return (
    <div className="space-y-3 font-sans">
      {/* Page Heading & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Notifications</h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-600 border border-blue-100">
              {totalCount} Total • {unreadCount} Unread
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={onMarkAllAsRead}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold bg-white text-slate-700 border border-slate-200 rounded-xl shadow-2xs hover:bg-slate-50 transition cursor-pointer"
          >
            <MdCheck size={16} className="text-slate-500" />
            <span>Mark All as Read</span>
          </button>
          <button
            type="button"
            onClick={onOpenSendModal}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold bg-blue-600 text-white rounded-xl shadow-xs hover:bg-blue-700 active:bg-blue-800 transition cursor-pointer"
          >
            <MdAdd size={16} />
            <span>Send Notification</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationHeaderSection;
