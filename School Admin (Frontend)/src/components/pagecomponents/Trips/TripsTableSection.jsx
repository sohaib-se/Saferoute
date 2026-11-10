import React, { useState } from 'react';
import {
  MdSearch,
  MdFileDownload,
  MdKeyboardArrowDown,
  MdLocationOn,
  MdVisibility,
  MdDeleteOutline,
  MdRefresh,
  MdChevronLeft,
  MdChevronRight,
} from 'react-icons/md';

const TripsTableSection = ({
  tripsList = [],
  loading = false,
  onLocateTrip,
  onViewTrip,
  onDeleteTrip,
  onRefresh,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('All Dates');
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [currentPageNum, setCurrentPageNum] = useState(1);
  const itemsPerPage = 8;

  // Filtering
  const filteredTrips = tripsList.filter((trip) => {
    const term = searchTerm.toLowerCase().trim();
    const matchesSearch =
      !term ||
      trip.id?.toLowerCase().includes(term) ||
      trip.displayId?.toLowerCase().includes(term) ||
      trip.vehicleName?.toLowerCase().includes(term) ||
      trip.driverName?.toLowerCase().includes(term) ||
      trip.route?.toLowerCase().includes(term);

    const matchesDate =
      dateFilter === 'All Dates' ||
      (dateFilter === 'Today' && trip.tripDate === new Date().toISOString().slice(0, 10)) ||
      trip.tripDate?.includes(dateFilter);

    const matchesStatus =
      statusFilter === 'All Statuses' ||
      trip.overallStatus === statusFilter;

    return matchesSearch && matchesDate && matchesStatus;
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
                {tripsList.length} Total Recorded
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-600 border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 animate-pulse" />
                Live DB Sync
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Live monitoring of trips initiated and managed directly by drivers
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2.5 shrink-0">
            {onRefresh && (
              <button
                type="button"
                onClick={onRefresh}
                className="px-3.5 py-2 border border-slate-200 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 rounded-xl flex items-center gap-2 transition-colors shadow-2xs cursor-pointer"
                title="Refresh from Database"
              >
                <MdRefresh size={16} className={`text-slate-500 ${loading ? 'animate-spin' : ''}`} />
                <span>Refresh</span>
              </button>
            )}
            <button
              type="button"
              onClick={handleExport}
              className="px-3.5 py-2 border border-slate-200 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 rounded-xl flex items-center gap-2 transition-colors shadow-2xs cursor-pointer"
            >
              <MdFileDownload size={16} className="text-slate-500" />
              <span>Export Manifest</span>
            </button>
          </div>
        </div>

        {/* Filters Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-5">
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
              placeholder="Search trip ID, driver, vehicle, route..."
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
              <option value="Today">Today Only</option>
            </select>
            <MdKeyboardArrowDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>

          {/* Overall Status Filter */}
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPageNum(1);
              }}
              className="w-full text-xs bg-slate-50/70 border border-slate-200 rounded-xl px-3 pr-8 py-2 text-slate-700 appearance-none focus:outline-none focus:bg-white focus:border-blue-500 cursor-pointer font-medium"
            >
              <option value="All Statuses">All Statuses</option>
              <option value="pending">Pending (Not Started)</option>
              <option value="pickup_active">Pickup Active</option>
              <option value="pickup_done">At School (Pickup Done)</option>
              <option value="dropoff_active">Dropoff Active</option>
              <option value="completed">Completed</option>
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
              <th className="py-3.5 px-4 font-bold" scope="col">VEHICLE</th>
              <th className="py-3.5 px-4 font-bold" scope="col">ROUTE</th>
              <th className="py-3.5 px-4 font-bold" scope="col">DRIVER</th>
              <th className="py-3.5 px-4 font-bold" scope="col">1. PICKUP SUB-TRIP</th>
              <th className="py-3.5 px-4 font-bold" scope="col">2. DROP-OFF SUB-TRIP</th>
              <th className="py-3.5 px-4 font-bold text-center" scope="col">OVERALL STATUS</th>
              <th className="py-3.5 px-4 font-bold text-center" scope="col">ACTION</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
            {paginatedTrips.length > 0 ? (
              paginatedTrips.map((trip, idx) => {
                const rowNumber = startIndex + idx + 1;

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
                        {trip.displayId}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        Date: {trip.tripDate}
                      </div>
                    </td>

                    {/* Bus / Vehicle */}
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-800">
                        {trip.vehicleName}
                      </div>
                    </td>

                    {/* Route */}
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-800 leading-tight">
                        {trip.route}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        {trip.totalStudents} assigned students
                      </div>
                    </td>

                    {/* Driver */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-blue-50 border border-blue-200 text-blue-700 flex items-center justify-center text-[10px] font-bold shrink-0">
                          {trip.driverInitials}
                        </div>
                        <div className="font-semibold text-slate-800 leading-tight">
                          {trip.driverName}
                        </div>
                      </div>
                    </td>

                    {/* Pickup Sub-trip */}
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10.5px] font-semibold ${
                          trip.pickupBadge?.style || 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {trip.pickupBadge?.label || trip.pickupStatus}
                      </span>
                      <div className="text-[10px] text-slate-500 mt-0.5">
                        {trip.studentsPicked}/{trip.totalStudents} picked • {trip.studentsAbsent} absent
                      </div>
                    </td>

                    {/* Drop-off Sub-trip */}
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10.5px] font-semibold ${
                          trip.dropoffBadge?.style || 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {trip.dropoffBadge?.label || trip.dropoffStatus}
                      </span>
                      <div className="text-[10px] text-slate-500 mt-0.5">
                        {trip.studentsDropped}/{trip.studentsPicked} dropped home
                      </div>
                    </td>

                    {/* Overall Status */}
                    <td className="py-3.5 px-4 text-center">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                          trip.overallBadge?.style || 'bg-slate-100 text-slate-700 border border-slate-200'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                            trip.overallBadge?.dot || 'bg-blue-500'
                          }`}
                        />
                        {trip.overallBadge?.label || trip.overallStatus}
                      </span>
                    </td>

                    {/* Action */}
                    <td className="py-3.5 px-4 text-center">
                      <div className="flex items-center justify-center gap-1.5 text-slate-400">
                        {/* Locate Button */}
                        <button
                          type="button"
                          onClick={() => onLocateTrip && onLocateTrip(trip)}
                          className="p-1.5 rounded-lg hover:text-blue-600 hover:bg-slate-100 transition-colors cursor-pointer"
                          title="Locate Trip on Map"
                        >
                          <MdLocationOn size={16} />
                        </button>

                        {/* View Details Button */}
                        <button
                          type="button"
                          onClick={() => onViewTrip && onViewTrip(trip)}
                          className="p-1.5 rounded-lg hover:text-blue-600 hover:bg-slate-100 transition-colors cursor-pointer"
                          title="View Manifest & Attendance"
                        >
                          <MdVisibility size={16} />
                        </button>

                        {/* Delete Button */}
                        <button
                          type="button"
                          onClick={() => onDeleteTrip && onDeleteTrip(trip.id)}
                          className="p-1.5 rounded-lg hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                          title="Delete Trip Record"
                        >
                          <MdDeleteOutline size={16} />
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
                  className="py-12 text-center text-slate-400 text-xs font-normal"
                >
                  {loading
                    ? 'Loading trips from database...'
                    : 'No trips recorded in database matching the specified filters.'}
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
