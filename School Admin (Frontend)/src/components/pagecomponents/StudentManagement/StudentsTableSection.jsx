import { useState } from 'react';

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
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-emerald-50 text-emerald-600 border border-emerald-100">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          On Route
        </span>
      );
    case 'Picked Up':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-blue-50 text-blue-600 border border-blue-100">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
          Picked Up
        </span>
      );
    case 'Waiting':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-amber-50 text-amber-600 border border-amber-100">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
          Waiting
        </span>
      );
    case 'Dropped':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-slate-100 text-slate-600 border border-slate-200">
          <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
          Dropped
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-slate-100 text-slate-600 border border-slate-200">
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

  // Filter students based on search and dropdown selections
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
    <section className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
      {/* Card Header / Filters */}
      <div className="p-6 border-b border-slate-100 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Title & Enrolled Counter */}
          <div className="flex items-center space-x-3">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">Students</h2>
            <span className="text-xs font-medium text-slate-500 bg-slate-100/90 border border-slate-200/70 px-2.5 py-1 rounded-full">
              312 enrolled
            </span>
          </div>

          {/* Top Right Actions: Search, Filter, Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Search Student Input */}
            <div className="relative w-64">
              <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
              <input
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-white text-slate-700 rounded-lg border border-slate-200 focus:outline-none focus:border-blue-500 placeholder:text-slate-400"
                placeholder="Search student..."
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* All Classes Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsClassDropdownOpen(!isClassDropdownOpen)}
                className="inline-flex items-center text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg px-3 py-1.5 hover:bg-slate-50 cursor-pointer"
              >
                <span>{selectedClass}</span>
                <i className="fa-solid fa-chevron-down text-[10px] ml-2 text-slate-400"></i>
              </button>

              {isClassDropdownOpen && (
                <div className="absolute right-0 mt-1 w-36 bg-white border border-slate-200 rounded-lg shadow-lg py-1 z-30">
                  {['All Classes', 'Grade 5', 'Grade 6', 'Grade 7', 'Grade 8'].map((c) => (
                    <button
                      key={c}
                      onClick={() => {
                        setSelectedClass(c);
                        setIsClassDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs transition hover:bg-slate-50 ${
                        selectedClass === c ? 'font-bold text-blue-600 bg-blue-50/50' : 'text-slate-700'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Add Student Button */}
            <button
              onClick={onAddStudentClick}
              className="inline-flex items-center text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg px-4 py-2 transition shadow-sm space-x-1.5 cursor-pointer"
            >
              <i className="fa-solid fa-plus text-xs"></i>
              <span>Add Student</span>
            </button>

            {/* Export Button */}
            <button
              onClick={handleExport}
              className="inline-flex items-center text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg px-3 py-2 hover:bg-slate-50 transition space-x-1.5 cursor-pointer"
            >
              <i className="fa-solid fa-download text-xs text-slate-500"></i>
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* Second Filter Row (All Routes) */}
        <div className="flex items-center">
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsRouteDropdownOpen(!isRouteDropdownOpen)}
              className="inline-flex items-center text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg px-3 py-1.5 hover:bg-slate-50 cursor-pointer"
            >
              <span>{selectedRoute}</span>
              <i className="fa-solid fa-chevron-down text-[10px] ml-2.5 text-slate-400"></i>
            </button>

            {isRouteDropdownOpen && (
              <div className="absolute left-0 mt-1 w-36 bg-white border border-slate-200 rounded-lg shadow-lg py-1 z-30">
                {['All Routes', 'Route 1', 'Route 2', 'Route 3', 'Route 4', 'Route 5'].map((r) => (
                  <button
                    key={r}
                    onClick={() => {
                      setSelectedRoute(r);
                      setIsRouteDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs transition hover:bg-slate-50 ${
                      selectedRoute === r ? 'font-bold text-blue-600 bg-blue-50/50' : 'text-slate-700'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              <th className="py-3 px-6 text-center w-12" scope="col">#</th>
              <th className="py-3 px-4 w-16" scope="col">PHOTO</th>
              <th className="py-3 px-6" scope="col">NAME</th>
              <th className="py-3 px-6" scope="col">CLASS</th>
              <th className="py-3 px-6" scope="col">ROUTE</th>
              <th className="py-3 px-6" scope="col">VEHICLE</th>
              <th className="py-3 px-6" scope="col">STATUS</th>
              <th className="py-3 px-6 text-center" scope="col">ACTION</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs">
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student, idx) => (
                <tr key={student.id + idx} className="hover:bg-slate-50/50 transition">
                  <td className="py-3.5 px-6 text-center text-slate-500 font-medium">
                    {student.num || idx + 1}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className={`w-8 h-8 rounded-full ${student.avatarBg} font-semibold flex items-center justify-center text-xs`}>
                      {student.initials}
                    </div>
                  </td>
                  <td className="py-3.5 px-6">
                    <div className="font-bold text-slate-900 text-xs">{student.name}</div>
                    <div className="text-[11px] text-slate-400">ID: {student.id}</div>
                  </td>
                  <td className="py-3.5 px-6 text-slate-600 font-medium">{student.class}</td>
                  <td className="py-3.5 px-6 text-slate-600 font-medium">{student.route}</td>
                  <td className="py-3.5 px-6 text-slate-600 font-medium">{student.vehicle}</td>
                  <td className="py-3.5 px-6">{renderStatusBadge(student.status)}</td>
                  <td className="py-3.5 px-6 text-center">
                    <div className="flex items-center justify-center space-x-3 text-slate-400">
                      <button
                        onClick={() => onEditStudent && onEditStudent(student)}
                        className="hover:text-slate-600 cursor-pointer transition"
                        title="Edit Student"
                      >
                        <i className="fa-regular fa-pen-to-square text-[13px]"></i>
                      </button>
                      <button
                        onClick={() => onViewStudent && onViewStudent(student)}
                        className="hover:text-slate-600 cursor-pointer transition"
                        title="View Details"
                      >
                        <i className="fa-regular fa-eye text-[13px]"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="py-8 text-center text-slate-400 text-xs">
                  No students found matching filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Bar */}
      <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between">
        <span className="text-xs text-slate-500">
          Showing <span className="font-semibold text-slate-700">1-{filteredStudents.length}</span> of <span className="font-semibold text-slate-700">312</span>
        </span>
        <div className="flex items-center space-x-1">
          {/* Previous */}
          <button
            onClick={() => setActivePage(Math.max(1, activePage - 1))}
            className="w-7 h-7 flex items-center justify-center text-slate-400 hover:text-slate-600 rounded border border-slate-200 text-xs cursor-pointer transition"
          >
            <i className="fa-solid fa-chevron-left text-[10px]"></i>
          </button>

          {/* Pages */}
          {[1, 2, 3, 4, 5].map((page) => (
            <button
              key={page}
              onClick={() => setActivePage(page)}
              className={`w-7 h-7 flex items-center justify-center rounded text-xs transition cursor-pointer ${
                activePage === page
                  ? 'bg-blue-600 text-white font-medium'
                  : 'text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {page}
            </button>
          ))}

          {/* Next */}
          <button
            onClick={() => setActivePage(Math.min(5, activePage + 1))}
            className="w-7 h-7 flex items-center justify-center text-slate-400 hover:text-slate-600 rounded border border-slate-200 text-xs cursor-pointer transition"
          >
            <i className="fa-solid fa-chevron-right text-[10px]"></i>
          </button>
        </div>
      </div>
    </section>
  );
};

export default StudentsTableSection;
