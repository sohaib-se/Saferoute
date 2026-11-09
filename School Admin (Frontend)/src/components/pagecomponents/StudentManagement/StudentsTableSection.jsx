import React, { useState } from 'react';
import {
  MdSearch,
  MdAdd,
  MdFileDownload,
  MdChevronLeft,
  MdChevronRight,
  MdEdit,
  MdVisibility,
  MdDeleteOutline,
} from 'react-icons/md';



const renderStatusBadge = (status) => {
  switch (status) {
    case 'On Route':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-600 border border-emerald-100">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          On Route
        </span>
      );
    case 'Picked Up':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 text-blue-600 border border-blue-100">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
          Picked Up
        </span>
      );
    case 'Waiting':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-600 border border-amber-100">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
          Waiting
        </span>
      );
    case 'Dropped':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-600 border border-slate-200">
          <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
          Dropped
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-600 border border-slate-200">
          <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
          {status}
        </span>
      );
  }
};

const StudentsTableSection = ({
  onAddStudentClick,
  onViewStudent,
  onEditStudent,
  onDeleteStudent,
  studentsList = [],
  isLoading = false,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activePage, setActivePage] = useState(1);

  const filteredStudents = (studentsList || []).filter((student) => {
    const term = searchTerm.toLowerCase().trim();
    if (!term) return true;
    return (
      (student.name || '').toLowerCase().includes(term) ||
      (student.id || '').toLowerCase().includes(term) ||
      (student.studentCode || '').toLowerCase().includes(term) ||
      (student.vehicle || '').toLowerCase().includes(term) ||
      (student.driver || '').toLowerCase().includes(term)
    );
  });

  const handleExport = () => {
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(filteredStudents, null, 2)
    )}`;
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', jsonString);
    downloadAnchor.setAttribute('download', 'students_export.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <section className="bg-white rounded-2xl border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] overflow-hidden font-sans">
      {/* Card Header & Controls */}
      <div className="p-6 border-b border-slate-100">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Left Side: Title & Search Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex items-center gap-3">
              <h3 className="text-lg font-bold text-slate-900 tracking-tight whitespace-nowrap">Students Directory</h3>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-600 border border-blue-100 whitespace-nowrap">
                {filteredStudents.length} Enrolled
              </span>
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-base" />
              <input
                className="w-full pl-9 pr-3.5 py-2 text-xs bg-slate-50/70 text-slate-800 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 focus:bg-white placeholder:text-slate-400 transition-all font-sans"
                placeholder="Search by student, ID..."
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Right Side: Action Buttons in 1 Horizontal Row */}
          <div className="flex flex-wrap items-center justify-end gap-2.5">
            {/* Export Button */}
            <button
              type="button"
              onClick={handleExport}
              className="inline-flex items-center text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl px-3.5 py-2 hover:bg-slate-50 transition shadow-2xs gap-1.5 cursor-pointer"
            >
              <MdFileDownload size={16} className="text-slate-500" />
              <span>Export</span>
            </button>

            {/* Add Student Button */}
            <button
              type="button"
              onClick={onAddStudentClick}
              className="inline-flex items-center text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-xl px-4 py-2 transition shadow-xs gap-1.5 cursor-pointer"
            >
              <MdAdd size={16} />
              <span>Add Student</span>
            </button>
          </div>
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/60 border-b border-slate-100 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              <th className="py-3.5 px-6 text-center w-12" scope="col">#</th>
              <th className="py-3.5 px-4 w-16" scope="col">PHOTO</th>
              <th className="py-3.5 px-6" scope="col">NAME</th>
              <th className="py-3.5 px-6" scope="col">CLASS</th>
              <th className="py-3.5 px-6" scope="col">ROUTE</th>
              <th className="py-3.5 px-6" scope="col">VEHICLE</th>
              <th className="py-3.5 px-6" scope="col">STATUS</th>
              <th className="py-3.5 px-6 text-center" scope="col">ACTION</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs">
            {isLoading ? (
              <tr>
                <td colSpan={8} className="py-12 text-center text-slate-400 text-xs font-normal">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-slate-500 font-medium">Fetching students roster from database...</span>
                  </div>
                </td>
              </tr>
            ) : filteredStudents.length > 0 ? (
              filteredStudents.map((student, idx) => (
                <tr key={student.id + idx} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3.5 px-6 text-center text-slate-400 font-medium">
                    {student.num || idx + 1}
                  </td>
                  <td className="py-3.5 px-4">
                    {student.photoUrl ? (
                      <img
                        src={student.photoUrl}
                        alt={student.name}
                        className="w-8 h-8 rounded-full object-cover border border-slate-200"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    ) : (
                      <div className={`w-8 h-8 rounded-full ${student.avatarBg} font-bold flex items-center justify-center text-xs`}>
                        {student.initials}
                      </div>
                    )}
                  </td>
                  <td className="py-3.5 px-6">
                    <div className="font-bold text-slate-900 text-xs leading-tight">{student.name}</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">ID: {student.id}</div>
                  </td>
                  <td className="py-3.5 px-6 text-slate-600 font-medium">{student.class}</td>
                  <td className="py-3.5 px-6 text-slate-600 font-medium">{student.route}</td>
                  <td className="py-3.5 px-6 text-slate-600 font-medium">{student.vehicle}</td>
                  <td className="py-3.5 px-6">{renderStatusBadge(student.status)}</td>
                  <td className="py-3.5 px-6 text-center">
                    <div className="flex items-center justify-center gap-1.5 text-slate-400">
                      <button
                        type="button"
                        onClick={() => onEditStudent && onEditStudent(student)}
                        className="p-1 rounded-lg hover:text-blue-600 hover:bg-slate-100 transition cursor-pointer"
                        title="Edit Student"
                      >
                        <MdEdit size={16} />
                      </button>
                      <button
                        type="button"
                        onClick={() => onViewStudent && onViewStudent(student)}
                        className="p-1 rounded-lg hover:text-blue-600 hover:bg-slate-100 transition cursor-pointer"
                        title="View Details"
                      >
                        <MdVisibility size={16} />
                      </button>
                      {onDeleteStudent && (
                        <button
                          type="button"
                          onClick={() => onDeleteStudent(student)}
                          className="p-1 rounded-lg hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                          title="Delete Student"
                        >
                          <MdDeleteOutline size={16} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="py-8 text-center text-slate-400 text-xs font-normal">
                  No students found matching filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Bar */}
      <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <span>
          Showing <span className="font-semibold text-slate-700">{filteredStudents.length > 0 ? 1 : 0}-{filteredStudents.length}</span> of <span className="font-semibold text-slate-700">{studentsList.length}</span> students
        </span>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setActivePage(Math.max(1, activePage - 1))}
            className="w-7 h-7 flex items-center justify-center text-slate-400 hover:text-slate-700 rounded-lg border border-slate-200 hover:bg-slate-50 transition cursor-pointer"
          >
            <MdChevronLeft size={16} />
          </button>

          {[1, 2, 3, 4, 5].map((page) => (
            <button
              key={page}
              onClick={() => setActivePage(page)}
              className={`w-7 h-7 flex items-center justify-center rounded-lg text-xs transition cursor-pointer font-medium ${
                activePage === page
                  ? 'bg-blue-600 text-white font-bold shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => setActivePage(Math.min(5, activePage + 1))}
            className="w-7 h-7 flex items-center justify-center text-slate-400 hover:text-slate-700 rounded-lg border border-slate-200 hover:bg-slate-50 transition cursor-pointer"
          >
            <MdChevronRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default StudentsTableSection;
