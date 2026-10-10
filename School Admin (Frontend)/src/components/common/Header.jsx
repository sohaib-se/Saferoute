import React, { useState, useRef, useEffect } from 'react';
import { MdSearch, MdNotificationsNone, MdKeyboardArrowDown, MdPerson, MdLogout } from 'react-icons/md';

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  let user = null;
  try {
    user = JSON.parse(localStorage.getItem('user') || 'null');
  } catch (e) {}
  const displayName = user?.name || 'Admin';
  const initial = displayName.charAt(0).toUpperCase() || 'A';

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('isLoggedIn');
    window.location.href = '/';
  };

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

        {/* User Profile Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <div 
            className="flex items-center gap-2.5 px-2 py-1 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer group"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
              {initial}
            </div>
            <div className="text-left hidden sm:block">
              <p className="text-xs font-semibold text-slate-800 leading-tight group-hover:text-blue-600 transition-colors">
                {displayName}
              </p>
              <p className="text-[11px] text-slate-400 leading-tight font-medium">School Admin</p>
            </div>
            <MdKeyboardArrowDown 
              size={16} 
              className={`text-slate-400 group-hover:text-slate-600 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} 
            />
          </div>

          {isDropdownOpen && (
            <div className="absolute -right-4 sm:-right-8 top-full mt-3.5 w-64 bg-white border border-slate-200 border-t-0 rounded-b-2xl rounded-t-none shadow-[0_12px_30px_rgba(0,0,0,0.12)] p-3 z-40 animate-in fade-in slide-in-from-top-2 duration-200 flex flex-col gap-3">
              
              {/* User Info / White Space at Top */}
              <div className="flex flex-col items-center justify-center text-center space-y-1 mt-1">
                <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-base mb-1 ring-2 ring-white shadow-sm border border-blue-100">
                  {initial}
                </div>
                <h4 className="text-sm font-bold text-slate-800 leading-none">{displayName}</h4>
                <p className="text-xs font-medium text-slate-500">School Admin</p>
              </div>

              {/* Action Buttons Row */}
              <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  className="flex-1 flex justify-center items-center gap-1.5 px-3 py-2.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 hover:text-blue-600 rounded-xl transition-all cursor-pointer shadow-2xs"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <MdPerson size={16} className="text-slate-400 group-hover:text-blue-500" />
                  <span>Profile</span>
                </button>
                
                <button
                  type="button"
                  className="flex-1 flex justify-center items-center gap-1.5 px-3 py-2.5 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 active:bg-rose-800 border border-transparent rounded-xl transition-all cursor-pointer shadow-xs"
                  onClick={handleLogout}
                >
                  <MdLogout size={16} />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
