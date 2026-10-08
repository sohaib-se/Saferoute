import React, { useState } from 'react';

export const initialDriversData = [
  {
    num: 1,
    initials: 'MA',
    initialsStyle: 'bg-primary-container/15 text-primary',
    name: 'Muhammad Ali',
    license: 'LIC-PK-98214',
    licenseType: 'Heavy Transport',
    phone: '0300 1112233',
    vehicle: 'Bus 12',
    route: 'Route 1',
    routeSub: 'Green Valley',
    status: 'Online',
    statusBadgeStyle: 'bg-tertiary-fixed/20 text-tertiary',
    statusDotStyle: 'bg-tertiary-fixed-dim',
  },
  {
    num: 2,
    initials: 'UK',
    initialsStyle: 'bg-tertiary-fixed/25 text-tertiary',
    name: 'Usman Khan',
    license: 'LIC-PK-43110',
    licenseType: 'Heavy Transport',
    phone: '0321 3344556',
    vehicle: 'Bus 07',
    route: 'Route 2',
    routeSub: 'Model Town',
    status: 'Online',
    statusBadgeStyle: 'bg-tertiary-fixed/20 text-tertiary',
    statusDotStyle: 'bg-tertiary-fixed-dim',
  },
  {
    num: 3,
    initials: 'BA',
    initialsStyle: 'bg-surface-container-high text-secondary',
    name: 'Bilal Ahmed',
    license: 'LIC-PK-77402',
    licenseType: 'Heavy Transport',
    phone: '0333 5566778',
    vehicle: 'Bus 09',
    route: 'Route 3',
    routeSub: 'University',
    status: 'Offline',
    statusBadgeStyle: 'bg-surface-container text-secondary',
    statusDotStyle: 'bg-outline',
  },
  {
    num: 4,
    initials: 'RM',
    initialsStyle: 'bg-secondary-container/70 text-on-secondary-container',
    name: 'Rashid Mehmood',
    license: 'LIC-PK-32098',
    licenseType: 'Heavy Transport',
    phone: '0345 7788990',
    vehicle: 'Bus 15',
    route: 'Route 4',
    routeSub: 'Johar Town',
    status: 'Online',
    statusBadgeStyle: 'bg-tertiary-fixed/20 text-tertiary',
    statusDotStyle: 'bg-tertiary-fixed-dim',
  },
  {
    num: 5,
    initials: 'FA',
    initialsStyle: 'bg-surface-container-highest text-on-primary-fixed',
    name: 'Farhan Ali',
    license: 'LIC-PK-19034',
    licenseType: 'Heavy Transport',
    phone: '0311 2233445',
    vehicle: 'Bus 18',
    route: 'Route 5',
    routeSub: 'Canal Road',
    status: 'Online',
    statusBadgeStyle: 'bg-tertiary-fixed/20 text-tertiary',
    statusDotStyle: 'bg-tertiary-fixed-dim',
  },
  {
    num: 6,
    initials: 'TJ',
    initialsStyle: 'bg-secondary-fixed/50 text-on-secondary-fixed-variant',
    name: 'Tariq Jameel',
    license: 'LIC-PK-88901',
    licenseType: 'Heavy Transport',
    phone: '0301 9988776',
    vehicle: 'Bus 04',
    route: 'Route 1',
    routeSub: 'Green Valley (Shift 2)',
    status: 'Idle / Break',
    statusBadgeStyle: 'bg-secondary-container text-on-secondary-container',
    statusDotStyle: 'bg-secondary',
  },
  {
    num: 7,
    initials: 'HR',
    initialsStyle: 'bg-primary-fixed-dim/40 text-on-primary-fixed',
    name: 'Hamza Rauf',
    license: 'LIC-PK-62544',
    licenseType: 'Heavy Transport',
    phone: '0322 4455667',
    vehicle: 'Bus 22',
    route: 'Route 2',
    routeSub: 'Model Town (Express)',
    status: 'Online',
    statusBadgeStyle: 'bg-tertiary-fixed/20 text-tertiary',
    statusDotStyle: 'bg-tertiary-fixed-dim',
  },
  {
    num: 8,
    initials: 'SN',
    initialsStyle: 'bg-error-container text-on-error-container',
    name: 'Shahzad Noor',
    license: 'LIC-PK-55129',
    licenseType: 'Heavy Transport',
    phone: '0334 6677889',
    vehicle: 'Bus 11',
    route: 'Standby Fleet',
    routeSub: 'Reserve Support',
    status: 'Standby',
    statusBadgeStyle: 'bg-secondary-container text-on-secondary-container',
    statusDotStyle: 'bg-secondary',
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
    <section className="bg-surface-container-lowest rounded-xl shadow-[0_1px_4px_rgba(0,0,0,0.04)] flex flex-col overflow-hidden">
      {/* Top Bar: Title, Action Buttons & Search Input */}
      <div className="p-gutter-lg pb-space-lg flex flex-col gap-space-md border-b border-surface-container-high/40">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-md">
          <div className="flex items-center gap-space-md">
            <h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
              Drivers Management
            </h2>
            <span className="px-3 py-1 rounded-full bg-surface-container-high text-primary font-label-sm text-label-sm font-semibold tracking-wide">
              {driversList.length} Total Drivers
            </span>
          </div>

          {/* Export & Add Driver Actions on the Right */}
          <div className="flex items-center gap-space-sm">
            {/* Export Action */}
            <button
              type="button"
              onClick={handleExport}
              className="h-9 px-space-md rounded-lg bg-surface-container-low hover:bg-surface-container-high text-on-surface font-label-md text-label-md font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px] text-outline">
                file_download
              </span>
              <span>Export</span>
            </button>

            {/* Add Driver Action */}
            <button
              type="button"
              onClick={onAddDriverClick}
              className="h-9 px-space-lg rounded-lg bg-primary-container hover:bg-primary text-on-primary font-label-md text-label-md font-semibold flex items-center justify-center gap-1 shadow-sm transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
              <span>Add Driver</span>
            </button>
          </div>
        </div>

        {/* Search Field under Drivers Management */}
        <div className="relative max-w-md w-full">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px]">
            search
          </span>
          <input
            id="driver-search-input"
            type="text"
            className="w-full pl-9 pr-space-md py-1.5 h-9 bg-surface-container-low text-on-surface placeholder:text-outline rounded-lg font-body-sm text-body-sm focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary shadow-inner"
            placeholder="Search driver by name, phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Data Table View */}
      <div className="w-full overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container-low text-outline font-label-sm text-label-sm uppercase tracking-wider">
              <th className="py-3 px-space-lg text-center w-12 font-semibold">#</th>
              <th className="py-3 px-space-lg font-semibold">Driver Name &amp; License</th>
              <th className="py-3 px-space-lg font-semibold">Phone</th>
              <th className="py-3 px-space-lg font-semibold">Vehicle</th>
              <th className="py-3 px-space-lg font-semibold">Route</th>
              <th className="py-3 px-space-lg font-semibold">Status</th>
              <th className="py-3 px-space-lg font-semibold text-center">Action</th>
            </tr>
          </thead>
          <tbody
            id="driver-roster-body"
            className="divide-y divide-surface-container-high/50 font-body-sm text-body-sm text-on-surface"
          >
            {filteredDrivers.length > 0 ? (
              filteredDrivers.map((driver, index) => (
                <tr
                  key={driver.num || index}
                  className="hover:bg-surface-container-low/60 transition-colors"
                >
                  <td className="py-3.5 px-space-lg text-center font-label-md text-outline">
                    {driver.num || index + 1}
                  </td>
                  <td className="py-3.5 px-space-lg">
                    <div className="flex items-center gap-space-md">
                      <div
                        className={`w-9 h-9 rounded-full ${driver.initialsStyle} font-label-md font-bold flex items-center justify-center shrink-0`}
                      >
                        {driver.initials}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="font-label-lg text-label-lg text-on-surface font-semibold truncate">
                          {driver.name}
                        </span>
                        <span className="font-code-sm text-code-sm text-outline truncate">
                          {driver.license} • {driver.licenseType || 'Heavy Transport'}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-space-lg whitespace-nowrap text-on-surface-variant font-code-sm text-code-sm">
                    <div className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px] text-outline">
                        call
                      </span>
                      <span>{driver.phone}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-space-lg whitespace-nowrap">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-surface-container-low text-on-surface font-label-md text-label-md">
                      <span className="material-symbols-outlined text-[16px] text-outline">
                        directions_bus
                      </span>
                      {driver.vehicle}
                    </span>
                  </td>
                  <td className="py-3.5 px-space-lg">
                    <div className="flex flex-col">
                      <span className="font-label-md text-label-md text-on-surface font-medium">
                        {driver.route}
                      </span>
                      <span className="font-body-sm text-body-sm text-outline">
                        {driver.routeSub}
                      </span>
                    </div>
                  </td>
                  <td className="py-3.5 px-space-lg whitespace-nowrap">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full ${driver.statusBadgeStyle} font-label-sm text-label-sm font-semibold`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${driver.statusDotStyle}`}></span>
                      {driver.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-space-lg text-center whitespace-nowrap">
                    <div className="inline-flex items-center gap-space-xs text-outline">
                      <button
                        type="button"
                        onClick={() => onEditDriver && onEditDriver(driver)}
                        className="p-1 rounded hover:bg-surface-container hover:text-primary transition-colors cursor-pointer"
                        title="Edit Driver"
                      >
                        <span className="material-symbols-outlined text-[18px]">edit</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => onViewDriver && onViewDriver(driver)}
                        className="p-1 rounded hover:bg-surface-container hover:text-primary transition-colors cursor-pointer"
                        title="View Details"
                      >
                        <span className="material-symbols-outlined text-[18px]">visibility</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="py-8 text-center text-outline font-body-sm">
                  No drivers found matching the filter criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Bottom Pagination Section */}
      <div className="p-space-lg flex flex-col sm:flex-row items-center justify-between gap-space-md bg-surface-container-lowest border-t border-surface-container-high/40">
        <span className="font-body-sm text-body-sm text-outline">
          Showing <span className="font-semibold text-on-surface">1</span> to{' '}
          <span className="font-semibold text-on-surface">{filteredDrivers.length}</span> of{' '}
          <span className="font-semibold text-on-surface">{driversList.length}</span> drivers
        </span>
        <div className="flex items-center gap-1">
          <button
            type="button"
            disabled={activePage === 1}
            onClick={() => setActivePage((prev) => Math.max(1, prev - 1))}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-outline hover:bg-surface-container hover:text-on-surface transition-colors disabled:opacity-50 cursor-pointer"
            title="Previous Page"
          >
            <span className="material-symbols-outlined text-[18px]">chevron_left</span>
          </button>
          {[1, 2, 3, 4].map((page) => (
            <button
              key={page}
              type="button"
              onClick={() => setActivePage(page)}
              className={`w-8 h-8 rounded-lg font-label-md text-label-md font-semibold flex items-center justify-center cursor-pointer transition-colors ${
                activePage === page
                  ? 'bg-primary text-on-primary shadow-sm'
                  : 'text-on-surface hover:bg-surface-container-low'
              }`}
            >
              {page}
            </button>
          ))}
          <button
            type="button"
            disabled={activePage === 4}
            onClick={() => setActivePage((prev) => Math.min(4, prev + 1))}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-outline hover:bg-surface-container hover:text-on-surface transition-colors disabled:opacity-50 cursor-pointer"
            title="Next Page"
          >
            <span className="material-symbols-outlined text-[18px]">chevron_right</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default DriversTableSection;
