import React, { useState } from 'react';
import {
  MdSearch,
  MdAdd,
  MdFileDownload,
  MdCall,
  MdDirectionsBus,
  MdEdit,
  MdVisibility,
  MdChevronLeft,
  MdChevronRight,
  MdSchool,
} from 'react-icons/md';

const initialParents = [
  {
    num: 1,
    initials: 'SA',
    avatarBg: 'bg-blue-100 text-blue-600',
    name: 'Sana Ahmed',
    email: 'sana.ahmed@example.com',
    phone: '+92 300 1234567',
    children: [
      { name: 'Ayesha Khan', grade: 'Grade 5' },
      { name: 'Zoya Malik', grade: 'Grade 5' },
    ],
    route: 'Route 1 (Green Valley)',
    bus: 'Bus 12',
    status: 'Active',
  },
  {
    num: 2,
    initials: 'AR',
    avatarBg: 'bg-emerald-100 text-emerald-600',
    name: 'Ali Raza',
    email: 'ali.raza@example.com',
    phone: '+92 312 9876543',
    children: [{ name: 'Muhammad Ali', grade: 'Grade 6' }],
    route: 'Route 2 (Model Town)',
    bus: 'Bus 07',
    status: 'Active',
  },
  {
    num: 3,
    initials: 'FK',
    avatarBg: 'bg-purple-100 text-purple-600',
    name: 'Fatima Khan',
    email: 'fatima.k@example.com',
    phone: '+92 321 7654321',
    children: [
      { name: 'Sara Khan', grade: 'Grade 7' },
      { name: 'Hamza Khan', grade: 'Grade 3' },
    ],
    route: 'Route 3 (University)',
    bus: 'Bus 09',
    status: 'Active',
  },
  {
    num: 4,
    initials: 'US',
    avatarBg: 'bg-amber-100 text-amber-600',
    name: 'Usman Shah',
    email: 'usman.shah@example.com',
    phone: '+92 345 1112233',
    children: [{ name: 'Hassan Ali', grade: 'Grade 5' }],
    route: 'Route 1 (Green Valley)',
    bus: 'Bus 12',
    status: 'Active',
  },
  {
    num: 5,
    initials: 'AM',
    avatarBg: 'bg-rose-100 text-rose-600',
    name: 'Ayesha Malik',
    email: 'ayesha.m@example.com',
    phone: '+92 301 4567890',
    children: [
      { name: 'Fatima Noor', grade: 'Grade 6' },
      { name: 'Bilal Noor', grade: 'Grade 4' },
    ],
    route: 'Route 2 (Model Town)',
    bus: 'Bus 15',
    status: 'Active',
  },
  {
    num: 6,
    initials: 'TA',
    avatarBg: 'bg-teal-100 text-teal-600',
    name: 'Tariq Ahmed',
    email: 'tariq.a@example.com',
    phone: '+92 333 5566778',
    children: [{ name: 'Bilal Ahmed', grade: 'Grade 7' }],
    route: 'Route 4 (Johar Town)',
    bus: 'Bus 18',
    status: 'Active',
  },
  {
    num: 7,
    initials: 'RN',
    avatarBg: 'bg-orange-100 text-orange-600',
    name: 'Rashid Nadeem',
    email: 'r.nadeem@example.com',
    phone: '+92 305 8899001',
    children: [{ name: 'Hamza Tariq', grade: 'Grade 8' }],
    route: 'Route 5 (Canal Road)',
    bus: 'Bus 05',
    status: 'Pending',
  },
  {
    num: 8,
    initials: 'ZH',
    avatarBg: 'bg-emerald-100 text-emerald-600',
    name: 'Zainab Hassan',
    email: 'zainab.h@example.com',
    phone: '+92 344 2233445',
    children: [{ name: 'Omer Hassan', grade: 'Grade 4' }],
    route: 'Route 1 (Green Valley)',
    bus: 'Bus 12',
    status: 'Active',
  },
];

const ParentsTableSection = ({ onAddParentClick, parentsList = initialParents }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activePage, setActivePage] = useState(1);

  const filteredParents = parentsList.filter((parent) => {
    return (
      parent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      parent.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      parent.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      parent.children.some((c) => c.name.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  const handleExport = () => {
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(filteredParents, null, 2)
    )}`;
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', jsonString);
    downloadAnchor.setAttribute('download', 'parents_export.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <section className="bg-white rounded-2xl border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] overflow-hidden font-sans" data-purpose="parents-management-container">
      {/* Table Top Toolbar */}
      <div className="p-6 border-b border-slate-100">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-bold text-slate-900 tracking-tight">Parents Directory</h3>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-600 border border-blue-100">
              {parentsList.length} Registered
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <MdSearch className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                className="w-full pl-9 pr-3.5 py-2 text-xs bg-slate-50/70 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white text-slate-800 placeholder-slate-400 transition-all font-sans"
                placeholder="Search parent, phone, child..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Export Button */}
            <button
              onClick={handleExport}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 transition shadow-2xs cursor-pointer"
            >
              <MdFileDownload size={16} className="text-slate-500" />
              <span>Export</span>
            </button>

            {/* Add Parent Primary Button */}
            <button
              onClick={onAddParentClick}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-xl text-xs font-semibold transition shadow-xs cursor-pointer"
            >
              <MdAdd size={16} />
              <span>Add Parent</span>
            </button>
          </div>
        </div>
      </div>

      {/* Table Responsive Wrapper */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-50/60 border-b border-slate-100 text-slate-400 font-semibold uppercase tracking-wider text-[11px]">
              <th className="py-3.5 px-4 w-12 text-center" scope="col">#</th>
              <th className="py-3.5 px-4" scope="col">PROFILE</th>
              <th className="py-3.5 px-4" scope="col">NAME &amp; EMAIL</th>
              <th className="py-3.5 px-4" scope="col">PHONE NUMBER</th>
              <th className="py-3.5 px-4" scope="col">LINKED CHILDREN</th>
              <th className="py-3.5 px-4" scope="col">ASSIGNED ROUTE &amp; BUS</th>
              <th className="py-3.5 px-4 text-center" scope="col">ACTION</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
            {filteredParents.length > 0 ? (
              filteredParents.map((parent, idx) => (
                <tr key={parent.phone + idx} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3.5 px-4 text-center text-slate-400 font-medium">
                    {parent.num || idx + 1}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className={`w-8 h-8 rounded-full ${parent.avatarBg} font-bold flex items-center justify-center text-xs`}>
                      {parent.initials}
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-900 leading-tight">{parent.name}</div>
                    <div className="text-slate-400 text-[11px] mt-0.5">{parent.email}</div>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600">
                    <div className="flex items-center gap-1.5 font-medium">
                      <MdCall className="text-slate-400" size={14} />
                      <span>{parent.phone}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex flex-col gap-1">
                      {parent.children.map((child, cIdx) => (
                        <span key={cIdx} className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] bg-slate-100/80 text-slate-700 max-w-fit font-medium">
                          <MdSchool className="text-blue-600" size={13} />
                          {child.name} <span className="text-slate-400 font-normal">({child.grade})</span>
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-slate-800">{parent.route}</div>
                    <div className="flex items-center gap-1 text-blue-600 font-semibold text-[11px] mt-0.5">
                      <MdDirectionsBus size={13} />
                      <span>{parent.bus}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <div className="flex items-center justify-center gap-2 text-slate-400">
                      <button className="p-1 rounded-lg hover:text-blue-600 hover:bg-slate-100 transition cursor-pointer" title="Edit Parent">
                        <MdEdit size={16} />
                      </button>
                      <button className="p-1 rounded-lg hover:text-blue-600 hover:bg-slate-100 transition cursor-pointer" title="View Details">
                        <MdVisibility size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="py-8 text-center text-slate-400 text-xs font-normal">
                  No parents found matching the specified search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Table Pagination Footer */}
      <div className="px-6 py-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
        <div>
          Showing <span className="font-semibold text-slate-700">1</span> to <span className="font-semibold text-slate-700">{filteredParents.length}</span> of <span className="font-semibold text-slate-700">{parentsList.length}</span> parents
        </div>
        <div className="inline-flex items-center gap-1.5">
          <button
            onClick={() => setActivePage(Math.max(1, activePage - 1))}
            className="w-7 h-7 rounded-lg border border-slate-200 text-slate-400 hover:text-slate-700 hover:bg-slate-50 flex items-center justify-center transition cursor-pointer"
          >
            <MdChevronLeft size={16} />
          </button>

          {[1, 2, 3, 4, 5].map((page) => (
            <button
              key={page}
              onClick={() => setActivePage(page)}
              className={`w-7 h-7 rounded-lg text-xs transition cursor-pointer font-medium ${
                activePage === page
                  ? 'bg-blue-600 text-white font-bold shadow-xs'
                  : 'border border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => setActivePage(Math.min(5, activePage + 1))}
            className="w-7 h-7 rounded-lg border border-slate-200 text-slate-400 hover:text-slate-700 hover:bg-slate-50 flex items-center justify-center transition cursor-pointer"
          >
            <MdChevronRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ParentsTableSection;
