import React from 'react';
import { MdBadge, MdEdit, MdVpnKey } from 'react-icons/md';
import Modal from '../../common/Modal';

const DriverDetailsModal = ({ driver, isOpen, onClose, onEdit }) => {
  if (!isOpen || !driver) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      icon={<MdBadge size={20} />}
      title={driver.name}
      subtitle={`${driver.license} • ${driver.licenseType || 'Heavy Transport'}`}
      maxWidth="max-w-lg"
    >
      <div>
        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto custom-scrollbar">
          {/* Summary Card */}
          <div className="bg-slate-50/70 rounded-xl border border-slate-200/80 p-4 grid grid-cols-2 gap-4">
            <div>
              <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider mb-0.5">
                Phone Number
              </span>
              <span className="text-xs text-slate-900 font-semibold block">
                {driver.phone}
              </span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider mb-0.5">
                Assigned Vehicle
              </span>
              <span className="text-xs text-slate-900 font-semibold block">
                {driver.vehicle || 'Unassigned'}
              </span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider mb-0.5">
                Assigned Route
              </span>
              <span className="text-xs text-slate-900 font-semibold block">
                {driver.routeSub ? `${driver.route} (${driver.routeSub})` : (driver.route || 'Unassigned')}
              </span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider mb-0.5">
                Current Status
              </span>
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full ${
                  driver.statusBadgeStyle || 'bg-emerald-50 text-emerald-700'
                } text-[10px] font-bold mt-0.5`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    driver.statusDotStyle || 'bg-emerald-500'
                  }`}
                ></span>
                {driver.status}
              </span>
            </div>
          </div>

          {/* App Credentials Card */}
          <div className="bg-amber-50/70 rounded-xl border border-amber-200/80 p-4 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                <MdVpnKey size={15} className="text-amber-600" />
                <span>Driver Mobile App Credentials</span>
              </span>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-full">
                Active
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white p-2.5 rounded-xl border border-amber-200/70 shadow-2xs">
                <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider mb-0.5">
                  4-Digit Login ID
                </span>
                <span className="text-lg font-mono font-bold text-slate-900 tracking-wider">
                  {driver.credentials?.loginId || '1000'}
                </span>
              </div>
              <div className="bg-white p-2.5 rounded-xl border border-amber-200/70 shadow-2xs">
                <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider mb-0.5">
                  4-Digit Password
                </span>
                <span className="text-lg font-mono font-bold text-slate-900 tracking-wider">
                  {driver.credentials?.password || driver.credentials?.loginId || '1000'}
                </span>
              </div>
            </div>
            <p className="text-[11px] text-amber-800/80 leading-relaxed">
              Use these 4 digits to sign in to the SafeRoute Driver Mobile App.
            </p>
          </div>
        </div>

        <div className="px-6 py-4 bg-slate-50/60 border-t border-slate-100 flex items-center justify-between">
          <button
            type="button"
            onClick={() => {
              if (onEdit) onEdit(driver);
              onClose();
            }}
            className="px-4 py-2 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100/80 font-semibold text-xs flex items-center gap-1.5 transition cursor-pointer"
          >
            <MdEdit size={15} />
            <span>Edit Driver</span>
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
    </Modal>
  );
};

export default DriverDetailsModal;
