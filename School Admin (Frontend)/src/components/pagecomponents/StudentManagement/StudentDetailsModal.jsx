import React from 'react';
import { MdPersonOutline, MdEdit } from 'react-icons/md';
import Modal from '../../common/Modal';

const StudentDetailsModal = ({ student, isOpen, onClose, onEdit }) => {
  if (!isOpen || !student) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      icon={<MdPersonOutline size={20} />}
      title={student.name}
      subtitle={`Student ID: ${student.id} • ${student.class}`}
      maxWidth="max-w-md"
    >
      <div>
        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto custom-scrollbar">
          <div className="bg-slate-50/70 rounded-xl border border-slate-200/80 p-4 grid grid-cols-2 gap-4">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">
                Class / Grade
              </span>
              <span className="text-xs font-semibold text-slate-900 block">{student.class}</span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">
                Current Status
              </span>
              <span className="text-xs font-semibold text-slate-900 block">{student.status}</span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">
                Assigned Route
              </span>
              <span className="text-xs font-semibold text-slate-900 block">{student.route}</span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">
                Assigned Vehicle
              </span>
              <span className="text-xs font-semibold text-slate-900 block">{student.vehicle}</span>
            </div>
            {student.address && (
              <div className="col-span-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">
                  Residential Address
                </span>
                <span className="text-xs text-slate-700 block">{student.address}</span>
              </div>
            )}
            {student.parentName && (
              <div className="col-span-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">
                  Parent / Guardian Contact
                </span>
                <span className="text-xs text-slate-700 block">
                  {student.parentName} {student.relationship ? `(${student.relationship})` : ''}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="px-6 py-4 bg-slate-50/60 border-t border-slate-100 flex items-center justify-between">
          <button
            type="button"
            onClick={() => {
              if (onEdit) onEdit(student);
              onClose();
            }}
            className="px-4 py-2 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100/80 font-semibold text-xs flex items-center gap-1.5 transition cursor-pointer"
          >
            <MdEdit size={15} />
            <span>Edit Student</span>
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

export default StudentDetailsModal;
