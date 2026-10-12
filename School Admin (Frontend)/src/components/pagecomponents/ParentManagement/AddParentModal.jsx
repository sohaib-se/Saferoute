import React, { useState, useEffect, useMemo } from 'react';
import {
  MdPeople,
  MdAdd,
  MdClose,
  MdSearch,
  MdCheck,
  MdSchool,
  MdPersonAdd,
} from 'react-icons/md';
import Modal from '../../common/Modal';
import { getStudents } from '../../../services/studentsService';

const DEFAULT_FALLBACK_STUDENTS = [
  { dbId: 'm1', id: '#ST-9041', name: 'Ayesha Khan', class: 'Grade 5', initials: 'AK', avatarBg: 'bg-rose-100 text-rose-500', route: 'Route 1', vehicle: 'Bus 12' },
  { dbId: 'm2', id: '#ST-8822', name: 'Muhammad Ali', class: 'Grade 6', initials: 'MA', avatarBg: 'bg-blue-100 text-blue-600', route: 'Route 2', vehicle: 'Bus 07' },
  { dbId: 'm3', id: '#ST-7721', name: 'Sara Khan', class: 'Grade 7', initials: 'SK', avatarBg: 'bg-amber-100 text-amber-600', route: 'Route 3', vehicle: 'Bus 09' },
  { dbId: 'm4', id: '#ST-9055', name: 'Hassan Ali', class: 'Grade 5', initials: 'HA', avatarBg: 'bg-teal-100 text-teal-600', route: 'Route 1', vehicle: 'Bus 12' },
  { dbId: 'm5', id: '#ST-6643', name: 'Fatima Noor', class: 'Grade 6', initials: 'FN', avatarBg: 'bg-indigo-100 text-indigo-600', route: 'Route 2', vehicle: 'Bus 15' },
  { dbId: 'm6', id: '#ST-7128', name: 'Bilal Ahmed', class: 'Grade 7', initials: 'BA', avatarBg: 'bg-purple-100 text-purple-600', route: 'Route 4', vehicle: 'Bus 18' },
  { dbId: 'm7', id: '#ST-9080', name: 'Zoya Malik', class: 'Grade 5', initials: 'ZM', avatarBg: 'bg-pink-100 text-pink-600', route: 'Route 1', vehicle: 'Bus 12' },
  { dbId: 'm8', id: '#ST-8109', name: 'Hamza Tariq', class: 'Grade 8', initials: 'HT', avatarBg: 'bg-emerald-100 text-emerald-600', route: 'Route 5', vehicle: 'Bus 05' },
];

const AddParentModal = ({ isOpen, onClose, onAddParent, availableStudents = [] }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  const [selectedStudents, setSelectedStudents] = useState([]);
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [rosterStudents, setRosterStudents] = useState([]);
  const [isLoadingStudents, setIsLoadingStudents] = useState(false);

  // Load students roster whenever modal opens
  useEffect(() => {
    if (!isOpen) return;

    if (availableStudents && availableStudents.length > 0) {
      setRosterStudents(availableStudents);
      return;
    }

    let isMounted = true;
    const fetchRoster = async () => {
      try {
        setIsLoadingStudents(true);
        const data = await getStudents();
        if (isMounted) {
          if (data && data.length > 0) {
            setRosterStudents(data);
          } else {
            setRosterStudents(DEFAULT_FALLBACK_STUDENTS);
          }
        }
      } catch (err) {
        if (isMounted) {
          console.warn('Using default student fallback in modal:', err);
          setRosterStudents(DEFAULT_FALLBACK_STUDENTS);
        }
      } finally {
        if (isMounted) {
          setIsLoadingStudents(false);
        }
      }
    };

    fetchRoster();

    return () => {
      isMounted = false;
    };
  }, [isOpen, availableStudents]);

  // Filter students based on search term
  const filteredStudents = useMemo(() => {
    const term = searchQuery.toLowerCase().trim();
    if (!term) return rosterStudents;

    return rosterStudents.filter((st) => {
      const name = (st.name || '').toLowerCase();
      const code = (st.id || st.student_code || '').toLowerCase();
      const grade = (st.class || st.class_grade || '').toLowerCase();
      return name.includes(term) || code.includes(term) || grade.includes(term);
    });
  }, [rosterStudents, searchQuery]);

  const isStudentSelected = (student) => {
    return selectedStudents.some(
      (item) =>
        (item.dbId && student.dbId && item.dbId === student.dbId) ||
        (item.id && student.id && item.id === student.id)
    );
  };

  const handleToggleStudent = (student) => {
    if (isStudentSelected(student)) {
      setSelectedStudents((prev) =>
        prev.filter(
          (item) =>
            !(
              (item.dbId && student.dbId && item.dbId === student.dbId) ||
              (item.id && student.id && item.id === student.id)
            )
        )
      );
    } else {
      setSelectedStudents((prev) => [...prev, student]);
    }
  };

  const handleRemoveStudent = (studentId) => {
    setSelectedStudents((prev) =>
      prev.filter((item) => (item.dbId || item.id) !== studentId)
    );
  };

  const handleSelectAllFiltered = () => {
    const newSelected = [...selectedStudents];
    filteredStudents.forEach((st) => {
      const already = newSelected.some(
        (item) =>
          (item.dbId && st.dbId && item.dbId === st.dbId) ||
          (item.id && st.id && item.id === st.id)
      );
      if (!already) {
        newSelected.push(st);
      }
    });
    setSelectedStudents(newSelected);
  };

  const handleClearSelection = () => {
    setSelectedStudents([]);
  };

  const handleClose = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      address: '',
    });
    setSelectedStudents([]);
    setIsPickerOpen(false);
    setSearchQuery('');
    onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) return;

    const names = formData.name.trim().split(' ');
    const initials =
      names.length >= 2
        ? `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase()
        : formData.name.slice(0, 2).toUpperCase();

    const childrenArray = selectedStudents.map((st) => ({
      id: st.dbId || st.id,
      name: st.name,
      grade: st.class || st.class_grade || 'Grade 5',
      code: st.id || st.student_code || '',
    }));

    const selectedStudentIds = selectedStudents
      .map((st) => st.dbId || st.id)
      .filter((id) => id && typeof id === 'string' && id.length > 20);

    onAddParent({
      ...formData,
      initials,
      avatarBg: 'bg-blue-100 text-blue-600',
      children: childrenArray,
      selectedStudentIds,
      selectedStudents,
      route: selectedStudents[0]?.route || 'Route 1 (Green Valley)',
      bus: selectedStudents[0]?.vehicle || 'Bus 12',
      status: 'Active',
    });

    handleClose();
  };

  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      icon={<MdPeople size={20} />}
      title="Add New Parent"
      subtitle="Register a student guardian into the school transport system"
      maxWidth="max-w-xl"
    >
      <form onSubmit={handleSubmit}>
        <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto custom-scrollbar">
          {/* Parent Full Name */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Parent Full Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Sana Ahmed"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/10 transition-all font-sans"
            />
          </div>

          {/* Email & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                placeholder="sana.ahmed@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/10 transition-all font-sans"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Phone Number <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="+92 300 1234567"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/10 transition-all font-sans"
              />
            </div>
          </div>

          {/* ADD CHILDREN SECTION */}
          <div className="pt-1">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <label className="block text-xs font-semibold text-slate-700">
                  Linked Children
                </label>
                {selectedStudents.length > 0 && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-600 border border-blue-200">
                    {selectedStudents.length} selected
                  </span>
                )}
              </div>

              {/* Add Children Button */}
              <button
                type="button"
                onClick={() => setIsPickerOpen(!isPickerOpen)}
                className="inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 border border-blue-200 rounded-lg transition cursor-pointer"
              >
                <MdAdd size={15} />
                <span>{isPickerOpen ? 'Done' : 'Add Children'}</span>
              </button>
            </div>

            {/* Selected Children Chips */}
            {selectedStudents.length > 0 && (
              <div className="space-y-1.5 mb-2.5 max-h-40 overflow-y-auto custom-scrollbar p-0.5">
                {selectedStudents.map((child) => (
                  <div
                    key={child.dbId || child.id}
                    className="flex items-center justify-between px-3 py-2 bg-blue-50/60 border border-blue-100 rounded-xl"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div
                        className={`w-7 h-7 rounded-full ${
                          child.avatarBg || 'bg-blue-100 text-blue-600'
                        } font-bold flex items-center justify-center text-[10px] shrink-0`}
                      >
                        {child.initials || 'ST'}
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-slate-800 flex items-center gap-2 truncate">
                          <span className="truncate">{child.name}</span>
                          <span className="px-1.5 py-0.2 bg-blue-100 text-blue-700 rounded text-[10px] font-medium shrink-0">
                            {child.class || child.class_grade || 'Grade 5'}
                          </span>
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono truncate">
                          {child.id || child.student_code || 'ID: ST-001'}
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveStudent(child.dbId || child.id)}
                      className="text-slate-400 hover:text-rose-500 hover:bg-rose-50 p-1 rounded-lg transition shrink-0 ml-2 cursor-pointer"
                      title="Remove student"
                    >
                      <MdClose size={15} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Empty State when no children selected and picker is closed */}
            {selectedStudents.length === 0 && !isPickerOpen && (
              <div
                onClick={() => setIsPickerOpen(true)}
                className="w-full py-4 px-4 border-2 border-dashed border-slate-200 hover:border-blue-300 rounded-xl flex flex-col items-center justify-center gap-1.5 text-center bg-slate-50/50 hover:bg-blue-50/30 transition cursor-pointer group"
              >
                <div className="w-9 h-9 rounded-full bg-blue-50 text-blue-600 group-hover:bg-blue-100 flex items-center justify-center transition">
                  <MdPersonAdd size={18} />
                </div>
                <div className="text-xs font-semibold text-slate-700 group-hover:text-blue-600 transition">
                  Click to Add Children
                </div>
                <p className="text-[11px] text-slate-400">
                  Select from existing registered students in the system
                </p>
              </div>
            )}

            {/* Student Picker Panel (Toggled by "Add Children") */}
            {isPickerOpen && (
              <div className="p-3 bg-slate-50/90 border border-slate-200 rounded-xl space-y-2.5 animate-in fade-in duration-150">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                    Select Students ({selectedStudents.length} selected)
                  </span>
                  <div className="flex items-center gap-2">
                    {filteredStudents.length > 0 && (
                      <button
                        type="button"
                        onClick={handleSelectAllFiltered}
                        className="text-[11px] text-blue-600 hover:underline font-semibold cursor-pointer"
                      >
                        Select All
                      </button>
                    )}
                    {selectedStudents.length > 0 && (
                      <button
                        type="button"
                        onClick={handleClearSelection}
                        className="text-[11px] text-rose-500 hover:underline font-semibold cursor-pointer"
                      >
                        Clear
                      </button>
                    )}
                  </div>
                </div>

                {/* Search Box */}
                <div className="relative">
                  <MdSearch className="w-4 h-4 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search student by name, grade, ID..."
                    className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 font-sans text-slate-800 placeholder-slate-400"
                  />
                </div>

                {/* Students List */}
                <div className="max-h-48 overflow-y-auto space-y-1 custom-scrollbar">
                  {isLoadingStudents ? (
                    <div className="py-4 text-center text-xs text-slate-400">
                      Loading registered students...
                    </div>
                  ) : filteredStudents.length > 0 ? (
                    filteredStudents.map((st) => {
                      const selected = isStudentSelected(st);
                      return (
                        <div
                          key={st.dbId || st.id}
                          onClick={() => handleToggleStudent(st)}
                          className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition text-xs select-none ${
                            selected
                              ? 'bg-blue-100/70 border border-blue-200 text-blue-900 font-semibold'
                              : 'bg-white hover:bg-slate-100/80 border border-slate-100 text-slate-700'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div
                              className={`w-4 h-4 rounded flex items-center justify-center border transition ${
                                selected
                                  ? 'bg-blue-600 border-blue-600 text-white'
                                  : 'border-slate-300 bg-white'
                              }`}
                            >
                              {selected && <MdCheck size={12} />}
                            </div>
                            <div
                              className={`w-6 h-6 rounded-full ${
                                st.avatarBg || 'bg-blue-100 text-blue-600'
                              } font-bold flex items-center justify-center text-[10px] shrink-0`}
                            >
                              {st.initials || 'ST'}
                            </div>
                            <div className="min-w-0">
                              <div className="text-xs font-semibold leading-tight truncate">
                                {st.name}
                              </div>
                              <div className="text-[10px] text-slate-400 font-mono truncate">
                                {st.id || st.student_code}
                              </div>
                            </div>
                          </div>
                          <span className="text-[10px] text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded font-normal shrink-0 ml-2">
                            {st.class || st.class_grade || 'Grade 5'}
                          </span>
                        </div>
                      );
                    })
                  ) : (
                    <div className="py-4 text-center text-xs text-slate-400">
                      {rosterStudents.length === 0
                        ? 'No students found in the school system.'
                        : 'No students matching search.'}
                    </div>
                  )}
                </div>

                <div className="flex justify-end pt-1">
                  <button
                    type="button"
                    onClick={() => setIsPickerOpen(false)}
                    className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition cursor-pointer"
                  >
                    Done Selecting
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Residential Address */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Residential Address
            </label>
            <input
              type="text"
              placeholder="e.g. House #12, Street 4, Model Town, Lahore"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/10 transition-all font-sans"
            />
          </div>
        </div>

        {/* Unified Modal Footer */}
        <div className="px-6 py-4 bg-slate-50/60 border-t border-slate-100 flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={handleClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-xl shadow-xs transition cursor-pointer"
          >
            Save Parent
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddParentModal;
