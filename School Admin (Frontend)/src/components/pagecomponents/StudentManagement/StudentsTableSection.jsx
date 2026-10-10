import React, { useState, useRef, useEffect } from 'react';
import {
  MdSearch,
  MdAdd,
  MdFileDownload,
  MdKeyboardArrowDown,
  MdChevronLeft,
  MdChevronRight,
  MdEdit,
  MdVisibility,
} from 'react-icons/md';

const initialStudents = [
  {
    id: '#ST-9041',
    num: 1,
    name: 'Ayesha Khan',
    class: 'Grade 5',
    route: 'Route 1',
    vehicle: 'Bus 12',
    status: 'On Route',
    initials: 'AK',
    avatarBg: 'bg-rose-100 text-rose-500',
  },
  {
    id: '#ST-8822',
    num: 2,
    name: 'Muhammad Ali',
    class: 'Grade 6',
    route: 'Route 2',
    vehicle: 'Bus 07',
    status: 'Picked Up',
    initials: 'MA',
    avatarBg: 'bg-blue-100 text-blue-600',
  },
  {
    id: '#ST-7721',
    num: 3,
    name: 'Sara Khan',
    class: 'Grade 7',
    route: 'Route 3',
    vehicle: 'Bus 09',
    status: 'Waiting',
    initials: 'SK',
    avatarBg: 'bg-amber-100 text-amber-600',
  },
  {
    id: '#ST-9055',
    num: 4,
    name: 'Hassan Ali',
    class: 'Grade 5',
    route: 'Route 1',
    vehicle: 'Bus 12',
    status: 'On Route',
    initials: 'HA',
    avatarBg: 'bg-teal-100 text-teal-600',
  },
  {
    id: '#ST-6643',
    num: 5,
    name: 'Fatima Noor',
    class: 'Grade 6',
    route: 'Route 2',
    vehicle: 'Bus 15',
    status: 'Dropped',
    initials: 'FN',
    avatarBg: 'bg-indigo-100 text-indigo-600',
  },
  {
    id: '#ST-7128',
    num: 6,
    name: 'Bilal Ahmed',
    class: 'Grade 7',
    route: 'Route 4',
    vehicle: 'Bus 18',
    status: 'Picked Up',
    initials: 'BA',
    avatarBg: 'bg-purple-100 text-purple-600',
  },
  {
    id: '#ST-9080',
    num: 7,
    name: 'Zoya Malik',
    class: 'Grade 5',
    route: 'Route 1',
    vehicle: 'Bus 12',
    status: 'On Route',
    initials: 'ZM',
    avatarBg: 'bg-pink-100 text-pink-600',
  },
  {
    id: '#ST-5510',
    num: 8,
    name: 'Hamza Tariq',
    class: 'Grade 8',
    route: 'Route 5',
    vehicle: 'Bus 05',
    status: 'Waiting',
    initials: 'HT',
    avatarBg: 'bg-cyan-100 text-cyan-700',
  },
];

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
  studentsList = initialStudents,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('All Classes');
  const [selectedRoute, setSelectedRoute] = useState('All Routes');
  const [activePage, setActivePage] = useState(1);
  const [isClassDropdownOpen, setIsClassDropdownOpen] = useState(false);
  const [isRouteDropdownOpen, setIsRouteDropdownOpen] = useState(false);

  const classDropdownRef = useRef(null);
  const routeDropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (classDropdownRef.current && !classDropdownRef.current.contains(event.target)) {
        setIsClassDropdownOpen(false);
      }
      if (routeDropdownRef.current && !routeDropdownRef.current.contains(event.target)) {
        setIsRouteDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredStudents = studentsList.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.vehicle.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesClass =
      selectedClass === 'All Classes' || student.class === selectedClass;

    const matchesRoute =
      selectedRoute === 'All Routes' || student.route === selectedRoute;

    return matchesSearch && matchesClass && matchesRoute;
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

          {/* Right Side: 4 Action Buttons in 1 Horizontal Row */}
          <div className="flex flex-wrap items-center justify-end gap-2.5">
            {/* Class Filter */}
            <div className="relative" ref={classDropdownRef}>
              <button
                type="button"
                onClick={() => {
                  setIsClassDropdownOpen(!isClassDropdownOpen);
                  setIsRouteDropdownOpen(false);
                }}
                className="inline-flex items-center text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-xl px-3.5 py-2 hover:bg-slate-50 cursor-pointer transition shadow-2xs gap-1.5"
              >
                <span>{selectedClass}</span>
                <MdKeyboardArrowDown className="text-slate-400 text-sm" />
              </button>

              {isClassDropdownOpen && (
                <div className="absolute right-0 mt-1 w-36 bg-white border border-slate-200 rounded-xl shadow-lg py-1.5 z-30 animate-in fade-in zoom-in-95 duration-150">
                  {['All Classes', 'Grade 5', 'Grade 6', 'Grade 7', 'Grade 8'].map((c) => (
                    <button
                      key={c}
                      onClick={() => {
                        setSelectedClass(c);
                        setIsClassDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3.5 py-1.5 text-xs transition hover:bg-slate-50 ${
                        selectedClass === c ? 'font-bold text-blue-600 bg-blue-50/50' : 'text-slate-700'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Route Filter */}
            <div className="relative" ref={routeDropdownRef}>
              <button
                type="button"
                onClick={() => {
                  setIsRouteDropdownOpen(!isRouteDropdownOpen);
                  setIsClassDropdownOpen(false);
                }}
                className="inline-flex items-center text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-xl px-3.5 py-2 hover:bg-slate-50 cursor-pointer transition shadow-2xs gap-1.5"
              >
                <span>{selectedRoute}</span>
                <MdKeyboardArrowDown className="text-slate-400 text-sm" />
              </button>

              {isRouteDropdownOpen && (
                <div className="absolute right-0 mt-1 w-36 bg-white border border-slate-200 rounded-xl shadow-lg py-1.5 z-30 animate-in fade-in zoom-in-95 duration-150">
                  {['All Routes', 'Route 1', 'Route 2', 'Route 3', 'Route 4', 'Route 5'].map((r) => (
                    <button
                      key={r}
                      onClick={() => {
                        setSelectedRoute(r);
                        setIsRouteDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3.5 py-1.5 text-xs transition hover:bg-slate-50 ${
                        selectedRoute === r ? 'font-bold text-blue-600 bg-blue-50/50' : 'text-slate-700'
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              )}
            </div>

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
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student, idx) => (
                <tr key={student.id + idx} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3.5 px-6 text-center text-slate-400 font-medium">
                    {student.num || idx + 1}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className={`w-8 h-8 rounded-full ${student.avatarBg} font-bold flex items-center justify-center text-xs`}>
                      {student.initials}
                    </div>
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
                    <div className="flex items-center justify-center gap-2 text-slate-400">
                      <button
                        onClick={() => onEditStudent && onEditStudent(student)}
                        className="p-1 rounded-lg hover:text-blue-600 hover:bg-slate-100 transition cursor-pointer"
                        title="Edit Student"
                      >
                        <MdEdit size={16} />
                      </button>
                      <button
                        onClick={() => onViewStudent && onViewStudent(student)}
                        className="p-1 rounded-lg hover:text-blue-600 hover:bg-slate-100 transition cursor-pointer"
                        title="View Details"
                      >
                        <MdVisibility size={16} />
                      </button>
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
          Showing <span className="font-semibold text-slate-700">1-{filteredStudents.length}</span> of <span className="font-semibold text-slate-700">312</span>
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
