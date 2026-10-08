import { useState } from 'react';

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
    <section className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden" data-purpose="parents-management-container">
      {/* Table Top Control Bar */}
      <div className="p-6 border-b border-slate-200/80">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-bold text-slate-900">Parents Management</h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-600 border border-blue-100">
              248 Registered
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Export Button */}
            <button
              onClick={handleExport}
              className="inline-flex items-center gap-2 px-3.5 py-2 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 transition shadow-sm cursor-pointer"
            >
              <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" x2="12" y1="15" y2="3"></line>
              </svg>
              <span>Export</span>
            </button>

            {/* Add Parent Primary Button */}
            <button
              onClick={onAddParentClick}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold transition shadow-sm cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <line x1="12" x2="12" y1="5" y2="19"></line>
                <line x1="5" x2="19" y1="12" y2="12"></line>
              </svg>
              <span>Add Parent</span>
            </button>
          </div>
        </div>

        {/* Filters Row */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          {/* Search Bar */}
          <div className="relative w-full sm:w-80 md:w-96">
            <svg className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" x2="16.65" y1="21" y2="16.65"></line>
            </svg>
            <input
              type="text"
              className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:bg-white text-slate-800 placeholder-slate-400"
              placeholder="Search parent by name, phone, or child..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Table Responsive Wrapper */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50/75 border-b border-slate-200 text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
            <tr>
              <th className="py-3 px-4 w-12 text-center" scope="col">#</th>
              <th className="py-3 px-4" scope="col">Profile</th>
              <th className="py-3 px-4" scope="col">Name & Email</th>
              <th className="py-3 px-4" scope="col">Phone Number</th>
              <th className="py-3 px-4" scope="col">Linked Children</th>
              <th className="py-3 px-4" scope="col">Assigned Route & Bus</th>
              <th className="py-3 px-4 text-center" scope="col">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-normal">
            {filteredParents.length > 0 ? (
              filteredParents.map((parent, idx) => (
                <tr key={parent.phone + idx} className="hover:bg-slate-50/50 transition">
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
                    <div className="text-slate-400 text-[11px]">{parent.email}</div>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600">
                    <div className="flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                      </svg>
                      <span>{parent.phone}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex flex-col gap-1">
                      {parent.children.map((child, cIdx) => (
                        <span key={cIdx} className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] bg-slate-100 text-slate-700 max-w-fit">
                          <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3z"></path>
                          </svg>
                          {child.name} <span className="text-slate-400 font-normal">({child.grade})</span>
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-medium text-slate-800">{parent.route}</div>
                    <div className="flex items-center gap-1 text-blue-600 font-semibold text-[11px] mt-0.5">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <rect height="14" rx="2" width="18" x="3" y="4"></rect>
                        <path d="M7 15h.01M17 15h.01M4 9h16"></path>
                      </svg>
                      {parent.bus}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <div className="flex items-center justify-center gap-2 text-slate-400">
                      <button className="hover:text-blue-600 transition p-1 cursor-pointer" title="Edit Parent">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                      </button>
                      <button className="hover:text-blue-600 transition p-1 cursor-pointer" title="View Details">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                          <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="py-8 text-center text-slate-400 text-xs">
                  No parents found matching the specified filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Table Footer / Pagination */}
      <div className="p-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="text-slate-500">
          Showing <span className="font-semibold text-slate-700">1</span> to <span className="font-semibold text-slate-700">{filteredParents.length}</span> of <span className="font-semibold text-slate-700">248</span> parents
        </div>
        <div className="inline-flex items-center gap-1">
          <button
            onClick={() => setActivePage(Math.max(1, activePage - 1))}
            className="w-8 h-8 rounded border border-slate-200 text-slate-400 hover:bg-slate-50 flex items-center justify-center cursor-pointer"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>

          {[1, 2, 3, 4, 5].map((page) => (
            <button
              key={page}
              onClick={() => setActivePage(page)}
              className={`w-8 h-8 rounded font-semibold flex items-center justify-center transition cursor-pointer ${
                activePage === page
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => setActivePage(Math.min(5, activePage + 1))}
            className="w-8 h-8 rounded border border-slate-200 text-slate-400 hover:bg-slate-50 flex items-center justify-center cursor-pointer"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ParentsTableSection;
