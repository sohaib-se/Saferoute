import React, { useState } from 'react';
import {
  MdSearch,
  MdAdd,
  MdFileDownload,
  MdKeyboardArrowDown,
  MdEdit,
  MdVisibility,
  MdChevronLeft,
  MdChevronRight,
} from 'react-icons/md';

export const initialVehiclesData = [
  {
    num: 1,
    code: '07',
    badgeStyle: 'bg-blue-50 border-blue-100 text-blue-600',
    name: 'Bus-07',
    regNo: 'LHR-4821',
    model: 'Toyota Coaster 2023',
    capacitySeats: '30 Seats',
    capacitySub: '28 Filled (93%)',
    driverInitials: 'UK',
    driverName: 'Usman Khan',
    driverPhone: '0321 3344556',
    route: 'Route 2',
    routeSub: 'Model Town Sector B',
    speed: '34 km/h',
    speedDot: 'bg-emerald-500',
    signalSub: 'Signal: Strong 5G',
    status: 'Running',
    statusBadgeStyle: 'bg-emerald-50 text-emerald-600 border border-emerald-200/70',
    statusDotStyle: 'bg-emerald-500',
  },
  {
    num: 2,
    code: '09',
    badgeStyle: 'bg-blue-50 border-blue-100 text-blue-600',
    name: 'Bus-09',
    regNo: 'ISL-3902',
    model: 'Isuzu NPR 2022',
    capacitySeats: '28 Seats',
    capacitySub: '26 Filled (92%)',
    driverInitials: 'BA',
    driverName: 'Bilal Ahmed',
    driverPhone: '0333 5566778',
    route: 'Route 3',
    routeSub: 'University Campus Loop',
    speed: '38 km/h',
    speedDot: 'bg-emerald-500',
    signalSub: 'Signal: Strong 5G',
    status: 'Running',
    statusBadgeStyle: 'bg-emerald-50 text-emerald-600 border border-emerald-200/70',
    statusDotStyle: 'bg-emerald-500',
  },
  {
    num: 3,
    code: '12',
    badgeStyle: 'bg-blue-50 border-blue-100 text-blue-600',
    name: 'Bus-12',
    regNo: 'KHI-8291',
    model: 'Toyota Coaster 2024',
    capacitySeats: '32 Seats',
    capacitySub: '30 Filled (94%)',
    driverInitials: 'MA',
    driverName: 'Muhammad Ali',
    driverPhone: '0300 1112233',
    route: 'Route 1',
    routeSub: 'Green Valley Main',
    speed: '42 km/h',
    speedDot: 'bg-emerald-500',
    signalSub: 'Signal: Strong 5G',
    status: 'On Route',
    statusBadgeStyle: 'bg-blue-50 text-blue-600 border border-blue-200/70',
    statusDotStyle: 'bg-blue-500',
  },
  {
    num: 4,
    code: '15',
    badgeStyle: 'bg-amber-50 border-amber-200/60 text-amber-600',
    name: 'Bus-15',
    regNo: 'LHR-7720',
    model: 'Hino Kazay 2021',
    capacitySeats: '26 Seats',
    capacitySub: '0 Filled (Standby)',
    driverInitials: 'RM',
    driverName: 'Rashid Mehmood',
    driverPhone: '0345 7788990',
    route: 'Route 4',
    routeSub: 'Johar Town Central',
    speed: '0 km/h',
    speedDot: 'bg-amber-500',
    signalSub: 'Parked at Depot',
    status: 'Idle',
    statusBadgeStyle: 'bg-amber-50 text-amber-600 border border-amber-200/70',
    statusDotStyle: 'bg-amber-500',
  },
  {
    num: 5,
    code: '18',
    badgeStyle: 'bg-rose-50 border-rose-200/60 text-rose-600',
    name: 'Bus-18',
    regNo: 'RWP-9011',
    model: 'Toyota Coaster 2020',
    capacitySeats: '30 Seats',
    capacitySub: 'In Inspection',
    driverInitials: 'FA',
    driverName: 'Farhan Ali',
    driverPhone: '0311 2233445',
    route: 'Scheduled Garage',
    routeSub: 'Workshop Yard #2',
    speed: 'Offline',
    speedDot: 'bg-slate-400',
    signalSub: 'Telemetry Disconnected',
    status: 'Maintenance',
    statusBadgeStyle: 'bg-rose-50 text-rose-600 border border-rose-200/70',
    statusDotStyle: 'bg-rose-500',
  },
  {
    num: 6,
    code: '04',
    badgeStyle: 'bg-blue-50 border-blue-100 text-blue-600',
    name: 'Bus-04',
    regNo: 'LHR-1149',
    model: 'Toyota HiAce Super GL',
    capacitySeats: '24 Seats',
    capacitySub: '22 Filled (91%)',
    driverInitials: 'TJ',
    driverName: 'Tariq Jameel',
    driverPhone: '0302 7711223',
    route: 'Route 1 (Shift 2)',
    routeSub: 'Gulberg III & Mini Market',
    speed: '29 km/h',
    speedDot: 'bg-emerald-500',
    signalSub: 'Signal: Strong 5G',
    status: 'Running',
    statusBadgeStyle: 'bg-emerald-50 text-emerald-600 border border-emerald-200/70',
    statusDotStyle: 'bg-emerald-500',
  },
  {
    num: 7,
    code: '22',
    badgeStyle: 'bg-blue-50 border-blue-100 text-blue-600',
    name: 'Bus-22',
    regNo: 'MUL-5541',
    model: 'Isuzu Journey 2023',
    capacitySeats: '30 Seats',
    capacitySub: '28 Filled (93%)',
    driverInitials: 'HR',
    driverName: 'Hamza Rauf',
    driverPhone: '0315 8899112',
    route: 'Route 2 (Express)',
    routeSub: 'Model Town to Campus',
    speed: '35 km/h',
    speedDot: 'bg-emerald-500',
    signalSub: 'Signal: Strong 5G',
    status: 'Running',
    statusBadgeStyle: 'bg-emerald-50 text-emerald-600 border border-emerald-200/70',
    statusDotStyle: 'bg-emerald-500',
  },
  {
    num: 8,
    code: '11',
    badgeStyle: 'bg-amber-50 border-amber-200/60 text-amber-600',
    name: 'Bus-11',
    regNo: 'LHR-3419',
    model: 'Toyota Coaster 2022',
    capacitySeats: '25 Seats',
    capacitySub: 'Reserve Unit',
    driverInitials: 'SN',
    driverName: 'Shahzad Noor',
    driverPhone: '0324 1122998',
    route: 'Standby / Reserve',
    routeSub: 'Depot Bay 3',
    speed: '0 km/h',
    speedDot: 'bg-amber-500',
    signalSub: 'Depot Ready',
    status: 'Standby',
    statusBadgeStyle: 'bg-amber-50 text-amber-600 border border-amber-200/70',
    statusDotStyle: 'bg-amber-500',
  },
];

const VehiclesTableSection = ({
  vehiclesList = initialVehiclesData,
  onAddVehicleClick,
  onViewVehicle,
  onEditVehicle,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [routeFilter, setRouteFilter] = useState('All Routes');
  const [activePage, setActivePage] = useState(1);

  const filteredVehicles = vehiclesList.filter((vehicle) => {
    const term = searchTerm.toLowerCase().trim();
    const matchesSearch =
      !term ||
      vehicle.name.toLowerCase().includes(term) ||
      vehicle.regNo.toLowerCase().includes(term) ||
      vehicle.model.toLowerCase().includes(term) ||
      vehicle.driverName.toLowerCase().includes(term) ||
      vehicle.route.toLowerCase().includes(term);

    const matchesStatus =
      statusFilter === 'All Statuses' ||
      vehicle.status.toLowerCase() === statusFilter.toLowerCase();

    const matchesRoute =
      routeFilter === 'All Routes' ||
      vehicle.route.toLowerCase().includes(routeFilter.toLowerCase());

    return matchesSearch && matchesStatus && matchesRoute;
  });

  const handleExport = () => {
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(filteredVehicles, null, 2)
    )}`;
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', jsonString);
    downloadAnchor.setAttribute('download', 'vehicles_export.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <section className="bg-white border border-slate-200/80 rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.03)] overflow-hidden font-sans" data-purpose="fleet-management-table-container">
      {/* Card Header Toolbar */}
      <div className="p-6 border-b border-slate-100">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Left Side: Title, Subtitle & Search Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex flex-col">
              <div className="flex items-center space-x-3">
                <h3 className="text-lg font-bold text-slate-900 tracking-tight whitespace-nowrap">Vehicles Directory</h3>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-600 border border-blue-100 whitespace-nowrap">
                  {vehiclesList.length} Registered Buses
                </span>
              </div>
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <MdSearch className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                className="w-full pl-9 pr-3.5 py-2 text-xs rounded-xl border border-slate-200 text-slate-800 bg-slate-50/70 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white font-sans transition-all"
                placeholder="Search vehicle..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Right Side: Controls (Filters, Export, Add) */}
          <div className="flex flex-wrap items-center justify-end gap-2.5">
            {/* Status Filter */}
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="appearance-none pl-3.5 pr-8 py-2 text-xs rounded-xl border border-slate-200 text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:border-blue-500 cursor-pointer font-medium shadow-2xs"
              >
                <option value="All Statuses">All Statuses</option>
                <option value="Running">Running</option>
                <option value="On Route">On Route</option>
                <option value="Idle">Idle</option>
                <option value="Maintenance">Maintenance</option>
              </select>
              <MdKeyboardArrowDown className="pointer-events-none absolute inset-y-0 right-2.5 my-auto text-slate-400 text-base" />
            </div>

            {/* Route Filter */}
            <div className="relative">
              <select
                value={routeFilter}
                onChange={(e) => setRouteFilter(e.target.value)}
                className="appearance-none pl-3.5 pr-8 py-2 text-xs rounded-xl border border-slate-200 text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:border-blue-500 cursor-pointer font-medium shadow-2xs"
              >
                <option value="All Routes">All Routes</option>
                <option value="Route 1">Route 1</option>
                <option value="Route 2">Route 2</option>
                <option value="Route 3">Route 3</option>
                <option value="Route 4">Route 4</option>
              </select>
              <MdKeyboardArrowDown className="pointer-events-none absolute inset-y-0 right-2.5 my-auto text-slate-400 text-base" />
            </div>

            {/* Export Button */}
            <button
              type="button"
              onClick={handleExport}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 border border-slate-200 text-xs font-semibold rounded-xl text-slate-700 bg-white hover:bg-slate-50 transition shadow-2xs cursor-pointer"
            >
              <MdFileDownload size={16} className="text-slate-500" />
              <span>Export</span>
            </button>

            {/* Add Vehicle Button */}
            <button
              type="button"
              onClick={onAddVehicleClick}
              className="inline-flex items-center gap-1.5 px-4 py-2 border border-transparent text-xs font-semibold rounded-xl text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 shadow-xs transition cursor-pointer"
            >
              <MdAdd size={16} />
              <span>Add Vehicle</span>
            </button>
          </div>
        </div>
      </div>

      {/* Table Responsive Wrapper */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50/60 border-b border-slate-100 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              <th className="py-3.5 px-4 w-12 text-center" scope="col">#</th>
              <th className="py-3.5 px-4 font-bold" scope="col">VEHICLE DETAILS</th>
              <th className="py-3.5 px-4 font-bold" scope="col">CAPACITY</th>
              <th className="py-3.5 px-4 font-bold" scope="col">ASSIGNED DRIVER</th>
              <th className="py-3.5 px-4 font-bold" scope="col">ASSIGNED ROUTE</th>
              <th className="py-3.5 px-4 font-bold" scope="col">GPS &amp; SPEED</th>
              <th className="py-3.5 px-4 font-bold" scope="col">STATUS</th>
              <th className="py-3.5 px-4 text-center font-bold" scope="col">ACTION</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
            {filteredVehicles.length > 0 ? (
              filteredVehicles.map((vehicle, idx) => (
                <tr key={vehicle.num || idx} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3.5 px-4 text-center text-slate-400 font-medium">{vehicle.num || idx + 1}</td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-xl ${vehicle.badgeStyle} font-bold flex items-center justify-center text-xs shrink-0`}>
                        {vehicle.code}
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 leading-snug">
                          {vehicle.name} <span className="font-normal text-slate-400 text-[11px] ml-1">| {vehicle.regNo}</span>
                        </p>
                        <p className="text-[11px] text-slate-400 mt-0.5">{vehicle.model}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <p className="font-semibold text-slate-900 leading-snug">{vehicle.capacitySeats}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">{vehicle.capacitySub}</p>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-slate-100 border border-slate-200 text-slate-700 font-bold flex items-center justify-center text-[10px] shrink-0">
                        {vehicle.driverInitials}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900 leading-snug">{vehicle.driverName}</p>
                        <p className="text-[11px] text-slate-400 mt-0.5">{vehicle.driverPhone}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <p className="font-semibold text-slate-900 leading-snug">{vehicle.route}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">{vehicle.routeSub}</p>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-1.5 leading-snug font-semibold text-slate-900">
                      <span className={`w-1.5 h-1.5 rounded-full ${vehicle.speedDot}`}></span>
                      <span>{vehicle.speed}</span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5">{vehicle.signalSub}</p>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold ${vehicle.statusBadgeStyle}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${vehicle.statusDotStyle} mr-1.5`}></span>
                      {vehicle.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <div className="flex items-center justify-center gap-2 text-slate-400">
                      <button
                        type="button"
                        onClick={() => onEditVehicle && onEditVehicle(vehicle)}
                        className="p-1 rounded-lg hover:text-blue-600 hover:bg-slate-100 transition cursor-pointer"
                        title="Edit Vehicle"
                      >
                        <MdEdit size={16} />
                      </button>
                      <button
                        type="button"
                        onClick={() => onViewVehicle && onViewVehicle(vehicle)}
                        className="p-1 rounded-lg hover:text-blue-600 hover:bg-slate-100 transition cursor-pointer"
                        title="View Vehicle"
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
                  No vehicles found matching the specified search criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <div>
          Showing <span className="font-semibold text-slate-700">1</span> to <span className="font-semibold text-slate-700">{filteredVehicles.length}</span> of <span className="font-semibold text-slate-700">{vehiclesList.length}</span> vehicles
        </div>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            disabled={activePage === 1}
            onClick={() => setActivePage((prev) => Math.max(1, prev - 1))}
            className="w-7 h-7 rounded-lg border border-slate-200 bg-white text-slate-400 hover:text-slate-700 hover:bg-slate-50 flex items-center justify-center transition disabled:opacity-50 cursor-pointer"
          >
            <MdChevronLeft size={16} />
          </button>
          {[1, 2, 3, 4].map((page) => (
            <button
              key={page}
              type="button"
              onClick={() => setActivePage(page)}
              className={`w-7 h-7 rounded-lg font-medium flex items-center justify-center transition cursor-pointer ${
                activePage === page
                  ? 'bg-blue-600 text-white font-bold shadow-xs'
                  : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-100'
              }`}
            >
              {page}
            </button>
          ))}
          <button
            type="button"
            disabled={activePage === 4}
            onClick={() => setActivePage((prev) => Math.min(4, prev + 1))}
            className="w-7 h-7 rounded-lg border border-slate-200 bg-white text-slate-400 hover:text-slate-700 hover:bg-slate-50 flex items-center justify-center transition disabled:opacity-50 cursor-pointer"
          >
            <MdChevronRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default VehiclesTableSection;
