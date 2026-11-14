import React from 'react';
import { MdKeyboardArrowDown, MdRefresh } from 'react-icons/md';

const NotificationFilterBar = ({
  activeTab = 'All',
  onTabChange,
  recipientFilter = 'All Recipients',
  onRecipientFilterChange,
  dateFilter = 'All Time',
  onDateFilterChange,
  onRefresh,
  isRefreshing = false,
}) => {
  const tabs = ['All', 'Pickup', 'Drop', 'Delay', 'Emergency', 'System'];
  const todayFormatted = new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <section className="space-y-3 pt-1 font-sans">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          {tabs.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => onTabChange && onTabChange(tab)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl transition cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 font-medium'
                }`}
              >
                <span>{tab}</span>
                {tab === 'Emergency' && (
                  <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-white' : 'bg-rose-500'}`}></span>
                )}
                {tab === 'Delay' && (
                  <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-white' : 'bg-amber-500'}`}></span>
                )}
              </button>
            );
          })}
        </div>

        {/* Dropdown Selectors */}
        <div className="flex items-center gap-2">
          {/* Recipients Filter */}
          <div className="relative">
            <select
              value={recipientFilter}
              onChange={(e) => onRecipientFilterChange && onRecipientFilterChange(e.target.value)}
              className="appearance-none pl-3.5 pr-8 py-2 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-700 hover:bg-slate-50 transition cursor-pointer shadow-2xs"
            >
              <option value="All Alerts">All Alerts</option>
              <option value="Admin Only">Direct Fleet Alerts</option>
              <option value="Parents Only">Parents Broadcasts</option>
              <option value="Drivers Only">Drivers Broadcasts</option>
              <option value="Broadcasts">Broadcasts (Drivers & Parents)</option>
            </select>
            <MdKeyboardArrowDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Date Filter */}
          <div className="relative">
            <select
              value={dateFilter}
              onChange={(e) => onDateFilterChange && onDateFilterChange(e.target.value)}
              className="appearance-none pl-3.5 pr-8 py-2 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-700 hover:bg-slate-50 transition cursor-pointer shadow-2xs"
            >
              <option value="All Time">All Time</option>
              <option value="Today">Today ({todayFormatted})</option>
              <option value="Yesterday">Yesterday</option>
              <option value="Last 7 Days">Last 7 Days</option>
              <option value="This Month">This Month</option>
            </select>
            <MdKeyboardArrowDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Filter Subtext Row */}
      <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
        <span>Showing latest live alerts for <span className="font-semibold text-slate-600">{todayFormatted}</span></span>
        <button
          type="button"
          onClick={onRefresh}
          className="flex items-center gap-1.5 text-blue-600 hover:text-blue-700 font-medium transition cursor-pointer"
        >
          <MdRefresh size={16} className={isRefreshing ? 'animate-spin' : ''} />
          <span>{isRefreshing ? 'Refreshing...' : 'Live Realtime Sync'}</span>
        </button>
      </div>
    </section>
  );
};

export default NotificationFilterBar;
