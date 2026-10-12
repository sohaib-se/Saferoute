import React, { useState } from 'react';
import { MdRoute } from 'react-icons/md';
import Modal from '../../common/Modal';

const AddRouteModal = ({
  isOpen,
  onClose,
  onAddRoute,
}) => {
  const [name, setName] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      setSubmitting(true);
      if (onAddRoute) {
        await onAddRoute({ name: name.trim() });
      }
      setName('');
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      icon={<MdRoute size={20} />}
      title="Add New Route"
      subtitle="Enter route name to register it for school transport"
      maxWidth="max-w-md"
    >
      <form onSubmit={handleSubmit}>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Route Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              autoFocus
              placeholder="e.g. Route 1 (Green Valley)"
              className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/10 transition-all font-sans"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>

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
            disabled={submitting || !name.trim()}
            className="px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:opacity-50 rounded-xl shadow-xs transition cursor-pointer"
          >
            {submitting ? 'Creating...' : 'Create Route'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddRouteModal;
