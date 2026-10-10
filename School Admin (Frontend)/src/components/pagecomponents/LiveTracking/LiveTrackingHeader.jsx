import React from 'react';
import {
  MdCenterFocusStrong,
  MdRefresh,
  MdKeyboardArrowDown,
} from 'react-icons/md';

const LiveTrackingHeader = ({
  selectedRoute,
  onSelectRoute,
  selectedStatus,
  onSelectStatus,
  mapViewMode,
  onSelectMapViewMode,
  onCenterFleet,
  onRefresh,
  isRefreshing,
  activeCount = 18,
  idleCount = 5,
  garageCount = 2,
}) => {
  return (
    <section
      className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 font-sans"
      data-purpose="title-and-filters"
    >
      {/* Title & Badges */}
      <div>
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Live Tracking (All Vehicles)
          </h1>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>
              {activeCount} Vehicles Active on Map • {idleCount} Idle • {garageCount} In Garage
            </span>
          </span>
        </div>
        <p className="text-xs text-slate-500 mt-1">
          Real-time GPS telematics, transit routes, live speed tracking, geofence status, and active school bus fleet monitoring.
        </p>
      </div>

      {/* Filter & View Controls */}
      <div className="flex flex-wrap items-center gap-2.5">
        {/* Route Dropdown */}
        <div className="relative">
          <select
            value={selectedRoute}
            onChange={(e) => onSelectRoute(e.target.value)}
            className="appearance-none pl-3.5 pr-8 py-2 text-xs font-semibold bg-white border border-slate-200/90 rounded-xl text-slate-700 shadow-2xs hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer"
          >
            <option value="All">All Routes</option>
            <option value="Route 1 - Green Valley">Route 1 - Green Valley</option>
            <option value="Route 2 - Pine Crest">Route 2 - Pine Crest</option>
            <option value="Route 3 - City Center Express">Route 3 - City Center Express</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2.5 pointer-events-none text-slate-400">
            <MdKeyboardArrowDown size={16} />
          </div>
        </div>

        {/* Status Dropdown */}
        <div className="relative">
          <select
            value={selectedStatus}
            onChange={(e) => onSelectStatus(e.target.value)}
            className="appearance-none pl-3.5 pr-8 py-2 text-xs font-semibold bg-white border border-slate-200/90 rounded-xl text-slate-700 shadow-2xs hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer"
          >
            <option value="All">All Statuses (Active, Idle, Delayed)</option>
            <option value="Active">Active Only</option>
            <option value="Delayed">Delayed Only</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2.5 pointer-events-none text-slate-400">
            <MdKeyboardArrowDown size={16} />
          </div>
        </div>

        {/* Segmented View Toggle */}
        <div className="inline-flex rounded-xl border border-slate-200/90 bg-white p-0.5 shadow-2xs text-xs font-semibold text-slate-600">
          {['Roads', 'Traffic', 'Satellite'].map((mode) => {
            const isActive = mapViewMode === mode;
            return (
              <button
                key={mode}
                type="button"
                onClick={() => onSelectMapViewMode(mode)}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {mode}
              </button>
            );
          })}
        </div>

        {/* Center Fleet Button */}
        <button
          type="button"
          onClick={onCenterFleet}
          className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold bg-white border border-slate-200/90 rounded-xl text-slate-700 shadow-2xs hover:bg-slate-50 hover:border-slate-300 transition-all cursor-pointer"
          title="Center map on fleet"
        >
          <MdCenterFocusStrong size={15} className="text-blue-600" />
          <span>Center Fleet</span>
        </button>

        {/* Live Refresh Button */}
        <button
          type="button"
          onClick={onRefresh}
          className="p-2 rounded-xl bg-white border border-slate-200/90 text-slate-600 hover:text-blue-600 hover:bg-slate-50 shadow-2xs transition-all cursor-pointer"
          title="Refresh Telematics"
        >
          <MdRefresh
            size={16}
            className={`transition-transform duration-500 ${isRefreshing ? 'animate-spin text-blue-600' : ''}`}
          />
        </button>
      </div>
    </section>
  );
};

export default LiveTrackingHeader;
