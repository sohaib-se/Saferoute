import React, { useState } from 'react';
import {
  MdSearch,
  MdFileDownload,
  MdAdd,
  MdCall,
  MdDirectionsBus,
  MdEdit,
  MdVisibility,
  MdChevronLeft,
  MdChevronRight,
} from 'react-icons/md';

export const initialDriversData = [
  {
    num: 1,
    initials: 'MA',
    initialsStyle: 'bg-blue-100 text-blue-700',
    name: 'Muhammad Ali',
    license: 'LIC-PK-98214',
    licenseType: 'Heavy Transport',
    phone: '0300 1112233',
    vehicle: 'Bus 12',
    route: 'Route 1',
    routeSub: 'Green Valley',
    status: 'Online',
    statusBadgeStyle: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    statusDotStyle: 'bg-emerald-500',
  },
  {
    num: 2,
    initials: 'UK',
    initialsStyle: 'bg-emerald-100 text-emerald-700',
    name: 'Usman Khan',
    license: 'LIC-PK-43110',
    licenseType: 'Heavy Transport',
    phone: '0321 3344556',
    vehicle: 'Bus 07',
    route: 'Route 2',
    routeSub: 'Model Town',
    status: 'Online',
    statusBadgeStyle: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    statusDotStyle: 'bg-emerald-500',
  },
  {
    num: 3,
    initials: 'BA',
    initialsStyle: 'bg-slate-100 text-slate-700',
    name: 'Bilal Ahmed',
    license: 'LIC-PK-77402',
    licenseType: 'Heavy Transport',
    phone: '0333 5566778',
    vehicle: 'Bus 09',
    route: 'Route 3',
    routeSub: 'University',
    status: 'Offline',
    statusBadgeStyle: 'bg-slate-100 text-slate-600 border border-slate-200',
    statusDotStyle: 'bg-slate-400',
  },
  {
    num: 4,
    initials: 'RM',
    initialsStyle: 'bg-purple-100 text-purple-700',
    name: 'Rashid Mehmood',
    license: 'LIC-PK-32098',
    licenseType: 'Heavy Transport',
    phone: '0345 7788990',
    vehicle: 'Bus 15',
    route: 'Route 4',
    routeSub: 'Johar Town',
    status: 'Online',
    statusBadgeStyle: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    statusDotStyle: 'bg-emerald-500',
  },
  {
    num: 5,
    initials: 'FA',
    initialsStyle: 'bg-indigo-100 text-indigo-700',
    name: 'Farhan Ali',
    license: 'LIC-PK-19034',
    licenseType: 'Heavy Transport',
    phone: '0311 2233445',
    vehicle: 'Bus 18',
    route: 'Route 5',
    routeSub: 'Canal Road',
    status: 'Online',
    statusBadgeStyle: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    statusDotStyle: 'bg-emerald-500',
  },
  {
    num: 6,
    initials: 'TJ',
    initialsStyle: 'bg-amber-100 text-amber-700',
    name: 'Tariq Jameel',
    license: 'LIC-PK-88901',
    licenseType: 'Heavy Transport',
    phone: '0301 9988776',
    vehicle: 'Bus 04',
    route: 'Route 1',
    routeSub: 'Green Valley (Shift 2)',
    status: 'Idle / Break',
    statusBadgeStyle: 'bg-amber-50 text-amber-700 border border-amber-200',
    statusDotStyle: 'bg-amber-500',
  },
  {
    num: 7,
    initials: 'HR',
    initialsStyle: 'bg-teal-100 text-teal-700',
    name: 'Hamza Rauf',
    license: 'LIC-PK-62544',
    licenseType: 'Heavy Transport',
    phone: '0322 4455667',
    vehicle: 'Bus 22',
    route: 'Route 2',
    routeSub: 'Model Town (Express)',
    status: 'Online',
    statusBadgeStyle: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    statusDotStyle: 'bg-emerald-500',
  },
  {
    num: 8,
    initials: 'SN',
    initialsStyle: 'bg-[#fee2e2] text-red-700',
    name: 'Shahzad Noor',
    license: 'LIC-PK-55129',
    licenseType: 'Heavy Transport',
    phone: '0334 6677889',
    vehicle: 'Bus 11',
    route: 'Standby Fleet',
    routeSub: 'Reserve Support',
    status: 'Standby',
    statusBadgeStyle: 'bg-amber-50 text-amber-700 border border-amber-200',
    statusDotStyle: 'bg-amber-500',
  },
];

const DriversTableSection = ({
  driversList = initialDriversData,
  onAddDriverClick,
  onViewDriver,
  onEditDriver,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activePage, setActivePage] = useState(1);

  // Filter drivers based on search term
  const filteredDrivers = driversList.filter((driver) => {
    const term = searchTerm.toLowerCase().trim();
    if (!term) return true;
    return (
      driver.name.toLowerCase().includes(term) ||
      driver.phone.toLowerCase().includes(term) ||
      driver.license.toLowerCase().includes(term) ||
      driver.vehicle.toLowerCase().includes(term) ||
      driver.route.toLowerCase().includes(term) ||
      driver.routeSub.toLowerCase().includes(term)
    );
  });

  const handleExport = () => {
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(filteredDrivers, null, 2)
    )}`;
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', jsonString);
    downloadAnchor.setAttribute('download', 'drivers_export.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <section className="bg-white rounded-xl border border-slate-200 shadow-xs flex flex-col overflow-hidden">
      {/* Top Bar: Title, Action Buttons & Search Input */}
      <div className="p-5 pb-4 flex flex-col gap-3 border-b border-slate-100">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-slate-900 tracking-tight">
              Drivers Management
            </h2>
            <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 font-bold text-[11px]">
              {driversList.length} Total Drivers
            </span>
          </div>

          {/* Export & Add Driver Actions on the Right */}
          <div className="flex items-center gap-2">
            {/* Export Action */}
            <button
              type="button"
              onClick={handleExport}
              className="px-3.5 py-2 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <MdFileDownload className="w-4 h-4 text-slate-500" />
              <span>Export</span>
            </button>

            {/* Add Driver Action */}
            <button
              type="button"
              onClick={onAddDriverClick}
              className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
            >
              <MdAdd className="w-4 h-4" />
              <span>Add Driver</span>
            </button>
          </div>
        </div>

        {/* Search Field under Drivers Management */}
        <div className="relative max-w-md w-full">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
            <MdSearch className="w-4 h-4" />
          </span>
          <input
            id="driver-search-input"
            type="text"
            className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 text-slate-800 placeholder:text-slate-400 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Search driver by name, phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Data Table View */}
      <div className="w-full overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50/75 border-b border-slate-200/80 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              <th className="py-3 px-4 text-center w-10 font-bold">#</th>
              <th className="py-3 px-4 font-bold">Driver Name &amp; License</th>
              <th className="py-3 px-4 font-bold">Phone</th>
              <th className="py-3 px-4 font-bold">Vehicle</th>
              <th className="py-3 px-4 font-bold">Route</th>
              <th className="py-3 px-4 font-bold">Status</th>
              <th className="py-3 px-4 font-bold text-center">Action</th>
            </tr>
          </thead>
          <tbody
            id="driver-roster-body"
            className="divide-y divide-slate-100 text-slate-800"
          >
            {filteredDrivers.length > 0 ? (
              filteredDrivers.map((driver, index) => (
                <tr
                  key={driver.num || index}
                  className="hover:bg-slate-50/80 transition-colors"
                >
                  <td className="py-3 px-4 text-center font-bold text-slate-400">
                    {driver.num || index + 1}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-8 h-8 rounded-full ${driver.initialsStyle} font-bold text-[11px] flex items-center justify-center shrink-0`}
                      >
                        {driver.initials}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="font-bold text-slate-900 truncate">
                          {driver.name}
                        </span>
                        <span className="text-[10px] text-slate-500 font-mono truncate">
                          {driver.license} • {driver.licenseType || 'Heavy Transport'}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap text-slate-600 font-mono text-[11px]">
                    <div className="flex items-center gap-1.5">
                      <MdCall className="w-3.5 h-3.5 text-slate-400" />
                      <span>{driver.phone}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 text-slate-800 font-medium text-[11px]">
                      <MdDirectionsBus className="w-3.5 h-3.5 text-slate-500" />
                      {driver.vehicle}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-900">
                        {driver.route}
                      </span>
                      <span className="text-[10px] text-slate-500">
                        {driver.routeSub}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full ${
                        driver.statusBadgeStyle || 'bg-emerald-50 text-emerald-700'
                      } text-[10px] font-bold`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          driver.statusDotStyle || 'bg-emerald-500'
                        }`}
                      ></span>
                      {driver.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center whitespace-nowrap">
                    <div className="inline-flex items-center gap-1 text-slate-400">
                      <button
                        type="button"
                        onClick={() => onEditDriver && onEditDriver(driver)}
                        className="p-1 rounded hover:bg-slate-100 hover:text-blue-600 transition-colors cursor-pointer"
                        title="Edit Driver"
                      >
                        <MdEdit className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onViewDriver && onViewDriver(driver)}
                        className="p-1 rounded hover:bg-slate-100 hover:text-blue-600 transition-colors cursor-pointer"
                        title="View Details"
                      >
                        <MdVisibility className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="py-8 text-center text-slate-400 italic">
                  No drivers found matching the filter criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Bottom Pagination Section */}
      <div className="p-3.5 flex flex-col sm:flex-row items-center justify-between gap-3 bg-white border-t border-slate-100 text-xs text-slate-500">
        <span>
          Showing <span className="font-semibold text-slate-900">1</span> to{' '}
          <span className="font-semibold text-slate-900">{filteredDrivers.length}</span> of{' '}
          <span className="font-semibold text-slate-900">{driversList.length}</span> drivers
        </span>
        <div className="flex items-center gap-1 font-medium">
          <button
            type="button"
            disabled={activePage === 1}
            onClick={() => setActivePage((prev) => Math.max(1, prev - 1))}
            className="w-7 h-7 rounded border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 disabled:opacity-50 cursor-pointer"
            title="Previous Page"
          >
            <MdChevronLeft className="w-4 h-4" />
          </button>
          {[1, 2, 3, 4].map((page) => (
            <button
              key={page}
              type="button"
              onClick={() => setActivePage(page)}
              className={`w-7 h-7 rounded font-semibold text-xs flex items-center justify-center cursor-pointer transition-colors ${
                activePage === page
                  ? 'bg-blue-600 text-white font-bold'
                  : 'border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {page}
            </button>
          ))}
          <button
            type="button"
            disabled={activePage === 4}
            onClick={() => setActivePage((prev) => Math.min(4, prev + 1))}
            className="w-7 h-7 rounded border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 disabled:opacity-50 cursor-pointer"
            title="Next Page"
          >
            <MdChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default DriversTableSection;
