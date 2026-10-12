import React from 'react';
import { MdDirectionsBus, MdEdit } from 'react-icons/md';
import Modal from '../../common/Modal';

const VehicleDetailsModal = ({ vehicle, isOpen, onClose, onEdit }) => {
  if (!isOpen || !vehicle) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      icon={<MdDirectionsBus size={20} />}
      title={vehicle.name}
      subtitle={`${vehicle.regNo || ''}${vehicle.model ? ` • ${vehicle.model}` : ''}`}
      maxWidth="max-w-lg"
    >
      <div>
        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto custom-scrollbar">
          <div className="bg-slate-50/70 rounded-xl border border-slate-200/80 p-4 grid grid-cols-2 gap-4">
            <div>
              <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider mb-0.5">
                Assigned Driver
              </span>
              <span className="text-xs text-slate-900 font-semibold block">
                {vehicle.driverPhone
                  ? `${vehicle.driverName} (${vehicle.driverPhone})`
                  : vehicle.driverName || 'Unassigned'}
              </span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider mb-0.5">
                Assigned Route
              </span>
              <span className="text-xs text-slate-900 font-semibold block">
                {vehicle.routeSub
                  ? `${vehicle.route} (${vehicle.routeSub})`
                  : vehicle.route || 'Route 1'}
              </span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider mb-0.5">
                Seating Capacity
              </span>
              <span className="text-xs text-slate-900 font-semibold block">
                {vehicle.capacitySub
                  ? `${vehicle.capacitySeats} - ${vehicle.capacitySub}`
                  : vehicle.capacitySeats || '30 Seats'}
              </span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider mb-0.5">
                Telematics &amp; Status
              </span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                    vehicle.statusBadgeStyle ||
                    'bg-emerald-50 text-emerald-600 border border-emerald-200/70'
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      vehicle.statusDotStyle || 'bg-emerald-500'
                    } mr-1.5`}
                  ></span>
                  {vehicle.status || 'Running'}
                </span>
                {vehicle.speed && (
                  <span className="text-xs text-slate-500 font-medium">({vehicle.speed})</span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 bg-slate-50/60 border-t border-slate-100 flex items-center justify-between">
          <button
            type="button"
            onClick={() => {
              if (onEdit) onEdit(vehicle);
              onClose();
            }}
            className="px-4 py-2 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100/80 font-semibold text-xs flex items-center gap-1.5 transition cursor-pointer"
          >
            <MdEdit size={15} />
            <span>Edit Vehicle</span>
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

export default VehicleDetailsModal;
