import React from 'react';

const NotificationFilterBar = ({
  activeTab = 'All',
  onTabChange,
  recipientFilter = 'All Recipients',
  onRecipientFilterChange,
  dateFilter = 'Today (Oct 24, 2024)',
  onDateFilterChange,
}) => {
  const tabs = ['All', 'Pickup', 'Drop', 'Delay', 'Emergency', 'System & Fee'];

  return (
    <section className="space-y-3 pt-2">
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
                className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 font-medium'
                }`}
              >
                <span>{tab}</span>
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
              className="appearance-none inline-flex items-center gap-2 pl-3 pr-8 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <option value="All Recipients">All Recipients</option>
              <option value="Parents Only">Parents Only</option>
              <option value="Drivers Only">Drivers Only</option>
              <option value="Admin Only">Admin Only</option>
            </select>
            <svg className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
          </div>

          {/* Date Filter */}
          <div className="relative">
            <select
              value={dateFilter}
              onChange={(e) => onDateFilterChange && onDateFilterChange(e.target.value)}
              className="appearance-none inline-flex items-center gap-2 pl-3 pr-8 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <option value="Today (Oct 24, 2024)">Today (Oct 24, 2024)</option>
              <option value="Yesterday">Yesterday</option>
              <option value="Last 7 Days">Last 7 Days</option>
              <option value="This Month">This Month</option>
            </select>
            <svg className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
          </div>
        </div>
      </div>

      {/* Filter Subtext Row */}
      <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
        <span>Showing latest operational and broadcast alerts for <span className="font-medium text-slate-600">October 24, 2024</span></span>
        <button type="button" className="flex items-center gap-1.5 text-blue-600 hover:text-blue-700 font-medium transition-colors cursor-pointer">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
          <span>Auto-refreshing (every 30s)</span>
        </button>
      </div>
    </section>
  );
};

export default NotificationFilterBar;
