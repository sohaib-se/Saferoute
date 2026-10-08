import React, { useState } from 'react';

const SendNotificationModal = ({ isOpen, onClose, onSendNotification }) => {
  const [formData, setFormData] = useState({
    title: '',
    category: 'Pickup',
    recipients: 'All Parents',
    route: 'All Routes',
    message: '',
    sendSms: true,
    sendPush: true,
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.message) return;

    const categoryStyles = {
      Pickup: { border: 'border-l-blue-600', iconBg: 'bg-blue-50 text-blue-600', badge: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
      Drop: { border: 'border-l-emerald-500', iconBg: 'bg-emerald-50 text-emerald-600', badge: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
      Delay: { border: 'border-l-amber-500', iconBg: 'bg-amber-50 text-amber-600', badge: 'bg-amber-100/70 text-amber-800 border-amber-200' },
      Emergency: { border: 'border-l-rose-500', iconBg: 'bg-rose-50 text-rose-500', badge: 'bg-rose-100 text-rose-800 border-rose-200' },
      'System & Fee': { border: 'border-l-indigo-400', iconBg: 'bg-indigo-50 text-indigo-600', badge: 'bg-slate-100 text-slate-700 border-slate-200' },
    };

    const style = categoryStyles[formData.category] || categoryStyles['Pickup'];

    const newNotification = {
      id: Date.now(),
      title: formData.title,
      borderLeft: style.border,
      iconBg: style.iconBg,
      category: formData.category,
      badgeText: 'Delivered',
      badgeStyle: style.badge,
      content: formData.message,
      subInfo: `${formData.route} • ${formData.recipients}`,
      timestamp: 'Just now',
      actionType: 'links',
      link1: 'View Details',
      link2: 'Resend',
      unread: true,
    };

    if (onSendNotification) {
      onSendNotification(newNotification);
    }

    setFormData({
      title: '',
      category: 'Pickup',
      recipients: 'All Parents',
      route: 'All Routes',
      message: '',
      sendSms: true,
      sendPush: true,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 w-full max-w-lg overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
            <h3 className="text-base font-bold text-slate-900">Send New Notification</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-200 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          <div className="space-y-1">
            <label className="font-semibold text-slate-700 uppercase tracking-wide">Title *</label>
            <input
              type="text"
              required
              placeholder="e.g. Bus 12 Route Delay Notice"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:bg-white"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="font-semibold text-slate-700 uppercase tracking-wide">Category</label>
              <select
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                <option value="Pickup">Pickup</option>
                <option value="Drop">Drop</option>
                <option value="Delay">Delay</option>
                <option value="Emergency">Emergency</option>
                <option value="System & Fee">System & Fee</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="font-semibold text-slate-700 uppercase tracking-wide">Recipients</label>
              <select
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
                value={formData.recipients}
                onChange={(e) => setFormData({ ...formData, recipients: e.target.value })}
              >
                <option value="All Parents">All Parents</option>
                <option value="Route 1 Parents">Route 1 Parents</option>
                <option value="Route 2 Parents">Route 2 Parents</option>
                <option value="All Drivers">All Drivers</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-slate-700 uppercase tracking-wide">Message Content *</label>
            <textarea
              required
              rows={3}
              placeholder="Enter broadcast announcement text..."
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:bg-white resize-none"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            />
          </div>

          <div className="flex items-center gap-6 pt-1">
            <label className="inline-flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                checked={formData.sendSms}
                onChange={(e) => setFormData({ ...formData, sendSms: e.target.checked })}
              />
              <span className="text-slate-700 font-medium">Send SMS</span>
            </label>
            <label className="inline-flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                checked={formData.sendPush}
                onChange={(e) => setFormData({ ...formData, sendPush: e.target.checked })}
              />
              <span className="text-slate-700 font-medium">Send App Push</span>
            </label>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors shadow-sm cursor-pointer"
            >
              Broadcast Notification
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SendNotificationModal;
