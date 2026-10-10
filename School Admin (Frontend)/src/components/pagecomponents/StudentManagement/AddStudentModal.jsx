import React, { useState } from 'react';
import { MdPersonAdd, MdCameraAlt } from 'react-icons/md';
import Modal from '../../common/Modal';

const AddStudentModal = ({ isOpen, onClose, onAddStudent }) => {
  const [formData, setFormData] = useState({
    name: '',
    id: 'ST-9041',
    class: 'Grade 5',
    section: 'A',
    rollNo: '',
    dob: '2014-05-12',
    bloodGroup: 'O+',
    gender: 'Female',
    
    // Parent info
    parentName: '',
    relationship: 'Father',
    parentPhone: '',
    parentEmail: '',

    // Route & Fleet info
    route: 'Route 1',
    vehicle: 'Bus 12',
    serviceMode: 'Two-Way',
    allocatedSeat: 'Seat #18',
    status: 'Waiting',

    // Residence & Geofence
    address: '',
    instructions: '',
    
    // Image
    photoUrl: null,
  });

  if (!isOpen) return null;

  const handleGenderSelect = (gender) => {
    setFormData((prev) => ({ ...prev, gender }));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, photoUrl: url }));
    }
  };

  const handleRemovePhoto = () => {
    setFormData((prev) => ({ ...prev, photoUrl: null }));
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if (!formData.name) return;

    const names = formData.name.trim().split(' ');
    const calculatedInitials = names.length >= 2
      ? `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase()
      : formData.name.slice(0, 2).toUpperCase();
    
    const formattedId = formData.id.startsWith('#') ? formData.id : `#${formData.id}`;

    onAddStudent({
      ...formData,
      name: formData.name,
      id: formattedId,
      class: formData.class,
      route: formData.route,
      vehicle: formData.vehicle,
      status: formData.status || 'Waiting',
      initials: calculatedInitials,
      avatarBg: 'bg-rose-100 text-rose-500',
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      icon={<MdPersonAdd size={20} />}
      title="Add New Student"
      subtitle="Register student credentials, guardian contacts, and bus route"
      maxWidth="max-w-2xl"
    >
      <form onSubmit={handleSubmit}>
        <div className="p-6 space-y-5 max-h-[72vh] overflow-y-auto custom-scrollbar">
          {/* Photo & Basic Details */}
          <div className="flex flex-col sm:flex-row items-center gap-5 p-4 bg-slate-50/70 rounded-xl border border-slate-200/80">
            <label className="w-20 h-20 rounded-full bg-blue-100/70 border-2 border-dashed border-blue-300 flex flex-col items-center justify-center text-blue-600 shrink-0 cursor-pointer hover:bg-blue-100 transition-colors overflow-hidden relative">
              {formData.photoUrl ? (
                <img src={formData.photoUrl} alt="Student" className="w-full h-full object-cover" />
              ) : (
                <>
                  <MdCameraAlt size={22} />
                  <span className="text-[10px] font-semibold mt-0.5">Photo</span>
                </>
              )}
              <input type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
            </label>
            <div className="flex-1 text-center sm:text-left">
              <h4 className="text-xs font-bold text-slate-800">Student Photograph</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Upload clear portrait for digital bus pass identification.
              </p>
              <div className="flex items-center justify-center sm:justify-start gap-3 mt-2">
                <label className="text-xs font-semibold text-blue-600 hover:text-blue-700 cursor-pointer">
                  Choose Photo
                  <input type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
                </label>
                {formData.photoUrl && (
                  <button
                    type="button"
                    onClick={handleRemovePhoto}
                    className="text-xs font-semibold text-rose-500 hover:text-rose-600 cursor-pointer"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Student Profile */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Full Legal Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Ayesha Khan"
                className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/10 transition-all font-sans"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Student ID <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="ST-9041"
                className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/10 transition-all font-sans"
                value={formData.id}
                onChange={(e) => setFormData({ ...formData, id: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Class / Grade
              </label>
              <select
                className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/10 transition-all font-sans cursor-pointer"
                value={formData.class}
                onChange={(e) => setFormData({ ...formData, class: e.target.value })}
              >
                <option value="Grade 5">Grade 5</option>
                <option value="Grade 6">Grade 6</option>
                <option value="Grade 7">Grade 7</option>
                <option value="Grade 8">Grade 8</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Section
              </label>
              <input
                type="text"
                placeholder="A"
                className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/10 transition-all font-sans"
                value={formData.section}
                onChange={(e) => setFormData({ ...formData, section: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Gender
              </label>
              <div className="flex gap-2">
                {['Male', 'Female'].map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => handleGenderSelect(g)}
                    className={`flex-1 py-2 text-xs font-semibold rounded-xl border transition cursor-pointer ${
                      formData.gender === g
                        ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                        : 'bg-slate-50/70 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Parent Guardian Information */}
          <div className="pt-2 border-t border-slate-100">
            <h4 className="text-xs font-bold text-slate-800 mb-3 uppercase tracking-wider text-[10px] text-slate-400">
              Parent / Guardian Contact
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Parent Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tariq Khan"
                  className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/10 transition-all font-sans"
                  value={formData.parentName}
                  onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Phone Number (SMS alerts) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="+92 312 9876543"
                  className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/10 transition-all font-sans"
                  value={formData.parentPhone}
                  onChange={(e) => setFormData({ ...formData, parentPhone: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Fleet Assignment */}
          <div className="pt-2 border-t border-slate-100">
            <h4 className="text-xs font-bold text-slate-800 mb-3 uppercase tracking-wider text-[10px] text-slate-400">
              Fleet &amp; Route Assignment
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Assigned Route
                </label>
                <input
                  type="text"
                  placeholder="e.g. Route 1"
                  className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/10 transition-all font-sans"
                  value={formData.route}
                  onChange={(e) => setFormData({ ...formData, route: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Assigned Vehicle
                </label>
                <input
                  type="text"
                  placeholder="e.g. Bus 12"
                  className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/10 transition-all font-sans"
                  value={formData.vehicle}
                  onChange={(e) => setFormData({ ...formData, vehicle: e.target.value })}
                />
              </div>
            </div>
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
            Save Student
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddStudentModal;
