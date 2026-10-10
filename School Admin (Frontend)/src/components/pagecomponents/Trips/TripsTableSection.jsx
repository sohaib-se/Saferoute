import React, { useState } from 'react';
import {
  MdSearch,
  MdAdd,
  MdFileDownload,
  MdKeyboardArrowDown,
  MdLocationOn,
  MdEdit,
  MdChevronLeft,
  MdChevronRight,
} from 'react-icons/md';

const TripsTableSection = ({
  tripsList = [],
  onScheduleTripClick,
  onLocateTrip,
  onViewEditTrip,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('All Dates');
  const [shiftFilter, setShiftFilter] = useState('All Shifts');
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [currentPageNum, setCurrentPageNum] = useState(1);
  const itemsPerPage = 8;

  // Filtering
  const filteredTrips = tripsList.filter((trip) => {
    const term = searchTerm.toLowerCase().trim();
    const matchesSearch =
      !term ||
      trip.id?.toLowerCase().includes(term) ||
      trip.tripCode?.toLowerCase().includes(term) ||
      trip.busName?.toLowerCase().includes(term) ||
      trip.busCode?.toLowerCase().includes(term) ||
      trip.driverName?.toLowerCase().includes(term) ||
      trip.route?.toLowerCase().includes(term) ||
      trip.sector?.toLowerCase().includes(term);

    const matchesDate =
      dateFilter === 'All Dates' ||
      trip.date?.toLowerCase().includes(dateFilter.toLowerCase());

    const matchesShift =
      shiftFilter === 'All Shifts' ||
      (shiftFilter === 'Morning Shift Only' && (trip.shift?.includes('Morning') || trip.shiftType === 'Morning')) ||
      (shiftFilter === 'Afternoon Shift Only' && (trip.shift?.includes('Afternoon') || trip.shiftType === 'Afternoon'));

    const matchesStatus =
      statusFilter === 'All Statuses' ||
      trip.status?.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesDate && matchesShift && matchesStatus;
  });

  // Pagination calculation
  const totalItems = filteredTrips.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const currentSafePage = Math.min(currentPageNum, totalPages);
  const startIndex = (currentSafePage - 1) * itemsPerPage;
  const paginatedTrips = filteredTrips.slice(startIndex, startIndex + itemsPerPage);

  const handleExport = () => {
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(filteredTrips, null, 2)
    )}`;
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', jsonString);
    downloadAnchor.setAttribute(
      'download',
      `trips_manifest_${new Date().toISOString().slice(0, 10)}.json`
    );
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <section
      className="bg-white border border-slate-200/80 rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.03)] overflow-hidden font-sans"
      data-purpose="trips-table-container"
    >
      {/* Header Toolbar */}
      <div className="p-6 border-b border-slate-100">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-bold text-slate-900 tracking-tight">
                Trips Management
              </h2>
              <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-600 border border-blue-100 text-xs font-semibold">
                {tripsList.length} Total Trips Today
              </span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={handleExport}
              className="px-3.5 py-2 border border-slate-200 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 rounded-xl flex items-center gap-2 transition-colors shadow-2xs cursor-pointer"
            >
              <MdFileDownload size={16} className="text-slate-500" />
              <span>Export Manifest</span>
            </button>
            <button
              type="button"
              onClick={onScheduleTripClick}
              className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-xs font-semibold text-white rounded-xl flex items-center gap-2 transition-colors shadow-xs cursor-pointer"
            >
              <MdAdd size={16} />
              <span>Schedule Trip</span>
            </button>
          </div>
        </div>

        {/* Filters Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-5">
          {/* Search Table */}
          <div className="relative">
            <MdSearch className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPageNum(1);
              }}
              placeholder="Search trip, bus, driver..."
              className="w-full text-xs bg-slate-50/70 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-slate-700 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-blue-500 font-sans transition-all"
            />
          </div>

          {/* Date Picker Select */}
          <div className="relative">
            <select
              value={dateFilter}
              onChange={(e) => {
                setDateFilter(e.target.value);
                setCurrentPageNum(1);
              }}
              className="w-full text-xs bg-slate-50/70 border border-slate-200 rounded-xl px-3 pr-8 py-2 text-slate-700 appearance-none focus:outline-none focus:bg-white focus:border-blue-500 cursor-pointer font-medium"
            >
              <option value="All Dates">All Dates</option>
              <option value="Today">Today (24 May 2026)</option>
              <option value="Tomorrow">Tomorrow (25 May 2026)</option>
              <option value="Yesterday">Yesterday (23 May 2026)</option>
            </select>
            <MdKeyboardArrowDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>

          {/* Shifts Filter */}
          <div className="relative">
            <select
              value={shiftFilter}
              onChange={(e) => {
                setShiftFilter(e.target.value);
                setCurrentPageNum(1);
              }}
              className="w-full text-xs bg-slate-50/70 border border-slate-200 rounded-xl px-3 pr-8 py-2 text-slate-700 appearance-none focus:outline-none focus:bg-white focus:border-blue-500 cursor-pointer font-medium"
            >
              <option value="All Shifts">All Shifts (Morning &amp; Afternoon)</option>
              <option value="Morning Shift Only">Morning Shift Only</option>
              <option value="Afternoon Shift Only">Afternoon Shift Only</option>
            </select>
            <MdKeyboardArrowDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPageNum(1);
              }}
              className="w-full text-xs bg-slate-50/70 border border-slate-200 rounded-xl px-3 pr-8 py-2 text-slate-700 appearance-none focus:outline-none focus:bg-white focus:border-blue-500 cursor-pointer font-medium"
            >
              <option value="All Statuses">All Statuses (Active, Delayed, Done)</option>
              <option value="On Route">On Route</option>
              <option value="Picked Up">Picked Up</option>
              <option value="Arrived">Arrived</option>
              <option value="Delayed">Delayed</option>
              <option value="Pending">Pending</option>
            </select>
            <MdKeyboardArrowDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-50/60 border-b border-slate-100 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              <th className="py-3.5 px-4 w-12 text-center" scope="col">#</th>
              <th className="py-3.5 px-4 font-bold" scope="col">TRIP DETAILS</th>
              <th className="py-3.5 px-4 font-bold" scope="col">BUS NO.</th>
              <th className="py-3.5 px-4 font-bold" scope="col">ASSIGNED ROUTE</th>
              <th className="py-3.5 px-4 font-bold" scope="col">DRIVER</th>
              <th className="py-3.5 px-4 font-bold" scope="col">SCHEDULE / TIMINGS</th>
              <th className="py-3.5 px-4 font-bold" scope="col">STUDENTS BOARDED</th>
              <th className="py-3.5 px-4 font-bold text-center" scope="col">STATUS</th>
              <th className="py-3.5 px-4 font-bold text-center" scope="col">ACTION</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
            {paginatedTrips.length > 0 ? (
              paginatedTrips.map((trip, idx) => {
                const rowNumber = startIndex + idx + 1;
                const percent = Math.min(
                  100,
                  Math.round(((trip.studentsBoarded || 0) / (trip.totalCapacity || 1)) * 100)
                );

                // Dynamic progress bar styling
                let progressColor = 'bg-blue-600';
                if (trip.status === 'Arrived' || percent === 100) {
                  progressColor = 'bg-emerald-500';
                } else if (trip.status === 'Delayed') {
                  progressColor = 'bg-amber-500';
                } else if (trip.status === 'Picked Up') {
                  progressColor = 'bg-cyan-500';
                } else if (trip.status === 'Pending') {
                  progressColor = 'bg-slate-300';
                }

                // Dynamic ETA note styling
                let etaColor = 'text-slate-500';
                if (trip.etaStatus === 'on-time' || trip.etaStatus === 'arrived') {
                  etaColor = 'text-emerald-600';
                } else if (trip.etaStatus === 'delayed') {
                  etaColor = 'text-amber-600';
                }

                return (
                  <tr
                    key={trip.id || idx}
                    className="hover:bg-slate-50/60 transition-colors"
                  >
                    {/* Index */}
                    <td className="py-3.5 px-4 text-center text-slate-400 font-medium">
                      {rowNumber}
                    </td>

                    {/* Trip Details */}
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900 leading-tight">
                        {trip.id}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        {trip.shift} • {trip.sector}
                      </div>
                    </td>

                    {/* Bus No */}
                    <td className="py-3.5 px-4">
                      <div
                        className={`w-9 h-9 rounded-xl border flex flex-col items-center justify-center font-bold leading-none ${
                          trip.busBadgeStyle || 'bg-blue-100/80 border-blue-200 text-blue-700'
                        }`}
                      >
                        <span className="text-[9px] uppercase font-semibold">Bus</span>
                        <span className="text-xs">{trip.busCode}</span>
                      </div>
                    </td>

                    {/* Route */}
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-800 leading-tight">
                        {trip.route}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        {trip.routeSub}
                      </div>
                    </td>

                    {/* Driver */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-700 shrink-0">
                          {trip.driverInitials}
                        </div>
                        <div>
                          <div className="font-semibold text-slate-800 leading-tight">
                            {trip.driverName}
                          </div>
                          <div className="text-[10px] text-slate-400 leading-tight mt-0.5">
                            {trip.driverPhone}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Schedule / Timings */}
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-800 leading-tight">
                        {trip.timings}
                      </div>
                      <div className={`text-[11px] font-medium mt-0.5 ${etaColor}`}>
                        {trip.etaNote}
                      </div>
                    </td>

                    {/* Students Boarded */}
                    <td className="py-3.5 px-4 w-44">
                      <div className="flex items-center justify-between text-[11px] mb-1">
                        <span className="font-semibold text-slate-800">
                          {trip.studentsBoarded}/{trip.totalCapacity}
                        </span>
                        <span className="text-slate-400 font-medium text-[10px]">
                          {trip.status === 'Arrived' ? (
                            <span className="text-emerald-600 font-semibold">100% Drop</span>
                          ) : (
                            `${percent}%`
                          )}
                        </span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                        <div
                          className={`h-1.5 rounded-full transition-all duration-300 ${progressColor}`}
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4 text-center">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                          trip.statusBadgeStyle || 'bg-slate-100 text-slate-700 border border-slate-200'
                        }`}
                      >
                        {trip.status === 'Arrived' ? (
                          <>✓ Arrived</>
                        ) : (
                          <>
                            <span
                              className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                                trip.statusDotColor || 'bg-blue-500'
                              }`}
                            />
                            {trip.status}
                          </>
                        )}
                      </span>
                    </td>

                    {/* Action */}
                    <td className="py-3.5 px-4 text-center">
                      <div className="flex items-center justify-center gap-1.5 text-slate-400">
                        {/* Locate Button (Available for active or in-transit trips) */}
                        <button
                          type="button"
                          onClick={() => onLocateTrip && onLocateTrip(trip)}
                          className="p-1.5 rounded-lg hover:text-blue-600 hover:bg-slate-100 transition-colors cursor-pointer"
                          title="Locate Trip on Map"
                        >
                          <MdLocationOn size={16} />
                        </button>

                        {/* Edit / Details Button */}
                        <button
                          type="button"
                          onClick={() => onViewEditTrip && onViewEditTrip(trip)}
                          className="p-1.5 rounded-lg hover:text-blue-600 hover:bg-slate-100 transition-colors cursor-pointer"
                          title="View / Edit Trip"
                        >
                          <MdEdit size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan={9}
                  className="py-10 text-center text-slate-400 text-xs font-normal"
                >
                  No trips found matching the specified filters or search term.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="px-6 py-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
        <div>
          Showing{' '}
          <span className="font-semibold text-slate-800">
            {totalItems > 0 ? startIndex + 1 : 0}
          </span>{' '}
          to{' '}
          <span className="font-semibold text-slate-800">
            {Math.min(startIndex + itemsPerPage, totalItems)}
          </span>{' '}
          of <span className="font-semibold text-slate-800">{totalItems}</span> trips
        </div>

        <div className="flex items-center gap-1 select-none">
          <button
            type="button"
            disabled={currentSafePage === 1}
            onClick={() => setCurrentPageNum((p) => Math.max(1, p - 1))}
            className="w-7 h-7 rounded-lg border border-slate-200 bg-white flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-50 disabled:opacity-40 transition-colors cursor-pointer"
            title="Previous page"
          >
            <MdChevronLeft size={16} />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              type="button"
              onClick={() => setCurrentPageNum(page)}
              className={`w-7 h-7 rounded-lg font-medium flex items-center justify-center transition-colors cursor-pointer ${
                currentSafePage === page
                  ? 'bg-blue-600 text-white font-bold shadow-xs'
                  : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
              }`}
            >
              {page}
            </button>
          ))}

          <button
            type="button"
            disabled={currentSafePage === totalPages}
            onClick={() => setCurrentPageNum((p) => Math.min(totalPages, p + 1))}
            className="w-7 h-7 rounded-lg border border-slate-200 bg-white flex items-center justify-center text-slate-500 hover:text-slate-700 hover:bg-slate-50 disabled:opacity-40 transition-colors cursor-pointer"
            title="Next page"
          >
            <MdChevronRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TripsTableSection;
