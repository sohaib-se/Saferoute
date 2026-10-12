import React, { useState, useEffect } from 'react';
import { MdRoute, MdEdit } from 'react-icons/md';
import Modal from '../../common/Modal';

const RouteDetailsModal = ({
  route,
  isOpen,
  onClose,
  onSave,
  mode = 'view',
}) => {
  const [isEditing, setIsEditing] = useState(mode === 'edit');
  const [name, setName] = useState(route?.name || '');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setIsEditing(mode === 'edit');
    setName(route?.name || '');
  }, [route, mode, isOpen]);

  if (!isOpen || !route) return null;

  const handleSave = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      setSubmitting(true);
      if (onSave) {
        await onSave({ ...route, name: name.trim() });
      }
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
      title={isEditing ? 'Edit Route' : route.name}
      subtitle={isEditing ? 'Update the route name identifier' : `Registered Route • ${route.formattedDate || 'Active'}`}
      maxWidth="max-w-md"
    >
      {isEditing ? (
        <form onSubmit={handleSave}>
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Route Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                autoFocus
                className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/10 transition-all font-sans"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

          <div className="px-6 py-4 bg-slate-50/60 border-t border-slate-100 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting || !name.trim()}
              className="px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:opacity-50 rounded-xl shadow-xs transition cursor-pointer"
            >
              {submitting ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      ) : (
        <div>
          <div className="p-6 space-y-4">
            <div className="bg-slate-50/70 rounded-xl border border-slate-200/80 p-4 space-y-3">
              <div>
                <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider mb-0.5">
                  Route Name
                </span>
                <span className="text-sm text-slate-900 font-bold block">
                  {route.name}
                </span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider mb-0.5">
                  Date Registered
                </span>
                <span className="text-xs text-slate-600 font-medium block">
                  {route.formattedDate || 'Standard Route'}
                </span>
              </div>
            </div>
          </div>

          <div className="px-6 py-4 bg-slate-50/60 border-t border-slate-100 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100/80 font-semibold text-xs flex items-center gap-1.5 transition cursor-pointer"
            >
              <MdEdit size={15} />
              <span>Edit Route Name</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-blue-600 text-white font-semibold text-xs hover:bg-blue-700 active:bg-blue-800 transition cursor-pointer shadow-xs"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default RouteDetailsModal;
