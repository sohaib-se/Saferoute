import React from 'react';
import { MdSearch, MdNotificationsNone, MdKeyboardArrowDown } from 'react-icons/md';

const Header = () => {
  let user = null;
  try {
    user = JSON.parse(localStorage.getItem('user') || 'null');
  } catch (e) {}
  const displayName = user?.name || 'Admin';
  const initial = displayName.charAt(0).toUpperCase() || 'A';

  return (
    <header
      className="bg-white border-b border-slate-200/80 px-8 py-3.5 flex items-center justify-between sticky top-0 z-30 font-sans shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
      data-purpose="top-header"
    >
      {/* Search Input */}
      <div className="w-80 relative">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
          <MdSearch size={17} />
        </div>
        <input
          type="text"
          placeholder="Search students, buses, drivers..."
          className="w-full pl-9 pr-10 py-2 bg-slate-50/70 border border-slate-200/90 rounded-xl text-xs placeholder-slate-400 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all font-sans"
        />
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <kbd className="text-[10px] font-semibold text-slate-400 bg-white border border-slate-200 px-1.5 py-0.5 rounded shadow-2xs">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-3.5">
        {/* Bell Notifications */}
        <button
          type="button"
          aria-label="Notifications"
          className="w-9 h-9 rounded-xl bg-slate-50 hover:bg-slate-100/80 border border-slate-200/80 flex items-center justify-center relative text-slate-600 transition-colors cursor-pointer"
        >
          <MdNotificationsNone size={18} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white" />
        </button>

        {/* Divider */}
        <div className="h-6 w-px bg-slate-200/80 mx-0.5" />

        {/* User Profile */}
        <div className="flex items-center gap-2.5 px-2 py-1 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer group">
          <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
            {initial}
          </div>
          <div className="text-left hidden sm:block">
            <p className="text-xs font-semibold text-slate-800 leading-tight group-hover:text-blue-600 transition-colors">
              {displayName}
            </p>
            <p className="text-[11px] text-slate-400 leading-tight font-medium">School Admin</p>
          </div>
          <MdKeyboardArrowDown size={16} className="text-slate-400 group-hover:text-slate-600 transition-colors" />
        </div>
      </div>
    </header>
  );
};

export default Header;
