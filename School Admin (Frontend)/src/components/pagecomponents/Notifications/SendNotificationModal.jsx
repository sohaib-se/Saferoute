import React, { useState } from 'react';
import { MdNotifications } from 'react-icons/md';
import Modal from '../../common/Modal';

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
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      icon={<MdNotifications size={20} />}
      title="Send New Notification"
      subtitle="Broadcast announcement to parents, drivers, or route groups"
      maxWidth="max-w-lg"
    >
      <form onSubmit={handleSubmit}>
        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto custom-scrollbar">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Notification Title <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Bus 12 Route Delay Notice"
              className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/10 transition-all font-sans"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Category
              </label>
              <select
                className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/10 transition-all font-sans cursor-pointer"
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
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Target Recipients
              </label>
              <select
                className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/10 transition-all font-sans cursor-pointer"
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

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Message Content <span className="text-rose-500">*</span>
            </label>
            <textarea
              required
              rows={3}
              placeholder="Enter broadcast announcement text..."
              className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/10 transition-all font-sans resize-none"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            />
          </div>

          <div className="flex items-center gap-6 pt-1">
            <label className="inline-flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-4 h-4 cursor-pointer"
                checked={formData.sendSms}
                onChange={(e) => setFormData({ ...formData, sendSms: e.target.checked })}
              />
              <span className="text-xs text-slate-700 font-medium">Send SMS Alert</span>
            </label>
            <label className="inline-flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-4 h-4 cursor-pointer"
                checked={formData.sendPush}
                onChange={(e) => setFormData({ ...formData, sendPush: e.target.checked })}
              />
              <span className="text-xs text-slate-700 font-medium">Send App Push</span>
            </label>
          </div>
        </div>

        {/* Unified Modal Footer */}
        <div className="px-6 py-4 bg-slate-50/60 border-t border-slate-100 flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-xl shadow-xs transition cursor-pointer"
          >
            Broadcast Notification
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default SendNotificationModal;
