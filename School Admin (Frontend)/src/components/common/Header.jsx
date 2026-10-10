import React, { useState, useRef, useEffect } from 'react';
import {
  MdSearch,
  MdNotificationsNone,
  MdKeyboardArrowDown,
  MdPerson,
  MdLogout,
  MdClose,
  MdDirectionsBus,
  MdSchool,
  MdLocationOn,
  MdWarning,
  MdDashboard,
  MdArrowForward,
} from 'react-icons/md';

const searchableItems = [
  // Navigation / Pages
  {
    type: 'Page',
    title: 'Live Tracking',
    subtitle: 'Real-time GPS telematics & bus tracking map',
    targetPage: 'Live Tracking',
    badge: 'Live Map',
    badgeColor: 'bg-blue-50 text-blue-600',
    icon: MdLocationOn,
  },
  {
    type: 'Page',
    title: 'Dashboard',
    subtitle: 'Fleet overview, metrics & daily trips',
    targetPage: 'Dashboard',
    badge: 'Main',
    badgeColor: 'bg-slate-100 text-slate-600',
    icon: MdDashboard,
  },
  {
    type: 'Page',
    title: 'Students Management',
    subtitle: 'Student rosters, routes & enrollment records',
    targetPage: 'Students',
    badge: 'Roster',
    badgeColor: 'bg-emerald-50 text-emerald-600',
    icon: MdSchool,
  },
  {
    type: 'Page',
    title: 'Vehicles Management',
    subtitle: 'Bus fleet status, inspections & maintenance',
    targetPage: 'Vehicles',
    badge: 'Fleet',
    badgeColor: 'bg-indigo-50 text-indigo-600',
    icon: MdDirectionsBus,
  },
  {
    type: 'Page',
    title: 'Drivers Management',
    subtitle: 'Driver profiles, licenses & duty status',
    targetPage: 'Drivers',
    badge: 'Crew',
    badgeColor: 'bg-purple-50 text-purple-600',
    icon: MdPerson,
  },
  {
    type: 'Page',
    title: 'SOS Alerts & Distress Ledger',
    subtitle: 'Emergency broadcasts & radar dispatch link',
    targetPage: 'SOS Alerts',
    badge: 'Emergency',
    badgeColor: 'bg-rose-50 text-rose-600',
    icon: MdWarning,
  },
  {
    type: 'Page',
    title: 'Notifications Center',
    subtitle: 'Fleet updates, announcements & alerts',
    targetPage: 'Notifications',
    badge: 'Alerts',
    badgeColor: 'bg-amber-50 text-amber-600',
    icon: MdNotificationsNone,
  },

  // Vehicles
  {
    type: 'Vehicle',
    title: 'Bus No. 12',
    subtitle: 'Plate: LES-8821 • Route 1 (Green Valley) • Muhammad Ali',
    targetPage: 'Live Tracking',
    badge: 'On Route',
    badgeColor: 'bg-emerald-50 text-emerald-600',
    icon: MdDirectionsBus,
  },
  {
    type: 'Vehicle',
    title: 'Bus No. 07',
    subtitle: 'Plate: LES-9943 • Route 2 (Pine Crest) • Usman Khan',
    targetPage: 'Live Tracking',
    badge: 'On Route',
    badgeColor: 'bg-emerald-50 text-emerald-600',
    icon: MdDirectionsBus,
  },
  {
    type: 'Vehicle',
    title: 'Bus No. 15',
    subtitle: 'Plate: LES-4412 • Route 3 (City Center) • Rashid Mehmood',
    targetPage: 'Live Tracking',
    badge: 'Delayed',
    badgeColor: 'bg-amber-50 text-amber-600',
    icon: MdDirectionsBus,
  },
  {
    type: 'Vehicle',
    title: 'Bus No. 09',
    subtitle: 'Plate: LES-3321 • Route 4 (University Line) • Bilal Ahmed',
    targetPage: 'Vehicles',
    badge: 'Online',
    badgeColor: 'bg-blue-50 text-blue-600',
    icon: MdDirectionsBus,
  },
  {
    type: 'Vehicle',
    title: 'Bus No. 18',
    subtitle: 'Plate: LES-7719 • Route 5 (Gulberg Loop) • Tariq Jameel',
    targetPage: 'Vehicles',
    badge: 'On Route',
    badgeColor: 'bg-emerald-50 text-emerald-600',
    icon: MdDirectionsBus,
  },

  // Students
  {
    type: 'Student',
    title: 'Ayesha Khan (#ST-9041)',
    subtitle: 'Grade 5 • Bus 12 • Route 1 (Green Valley)',
    targetPage: 'Students',
    badge: 'Grade 5',
    badgeColor: 'bg-rose-50 text-rose-600',
    icon: MdSchool,
  },
  {
    type: 'Student',
    title: 'Muhammad Ali (#ST-8822)',
    subtitle: 'Grade 6 • Bus 07 • Route 2 (Model Town)',
    targetPage: 'Students',
    badge: 'Grade 6',
    badgeColor: 'bg-blue-50 text-blue-600',
    icon: MdSchool,
  },
  {
    type: 'Student',
    title: 'Sara Khan (#ST-7721)',
    subtitle: 'Grade 7 • Bus 09 • Route 3 (City Center)',
    targetPage: 'Students',
    badge: 'Grade 7',
    badgeColor: 'bg-amber-50 text-amber-600',
    icon: MdSchool,
  },
  {
    type: 'Student',
    title: 'Hassan Ali (#ST-9055)',
    subtitle: 'Grade 5 • Bus 12 • Route 1 (Green Valley)',
    targetPage: 'Students',
    badge: 'Grade 5',
    badgeColor: 'bg-teal-50 text-teal-600',
    icon: MdSchool,
  },
  {
    type: 'Student',
    title: 'Fatima Noor (#ST-6643)',
    subtitle: 'Grade 6 • Bus 15 • Route 2 (Johar Town)',
    targetPage: 'Students',
    badge: 'Grade 6',
    badgeColor: 'bg-indigo-50 text-indigo-600',
    icon: MdSchool,
  },

  // Drivers
  {
    type: 'Driver',
    title: 'Muhammad Ali (Driver)',
    subtitle: 'Phone: 0300 1112233 • Bus 12 • Heavy License',
    targetPage: 'Drivers',
    badge: 'Heavy Lic',
    badgeColor: 'bg-emerald-50 text-emerald-600',
    icon: MdPerson,
  },
  {
    type: 'Driver',
    title: 'Usman Khan (Driver)',
    subtitle: 'Phone: 0321 3344556 • Bus 07 • Heavy License',
    targetPage: 'Drivers',
    badge: 'Heavy Lic',
    badgeColor: 'bg-emerald-50 text-emerald-600',
    icon: MdPerson,
  },
  {
    type: 'Driver',
    title: 'Rashid Mehmood (Driver)',
    subtitle: 'Phone: 0305 5551234 • Bus 15 • Heavy License',
    targetPage: 'Drivers',
    badge: 'Heavy Lic',
    badgeColor: 'bg-amber-50 text-amber-600',
    icon: MdPerson,
  },
];

const Header = ({ onNavigate }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const dropdownRef = useRef(null);
  const searchContainerRef = useRef(null);
  const searchInputRef = useRef(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target)
      ) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard shortcut listener (Cmd+K or Ctrl+K & Escape)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
        setIsSearchOpen(true);
      } else if (e.key === 'Escape') {
        setIsSearchOpen(false);
        searchInputRef.current?.blur();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
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

  const handleNotificationClick = () => {
    if (onNavigate) {
      onNavigate('Notifications');
    } else {
      window.dispatchEvent(
        new CustomEvent('app-navigate', { detail: 'Notifications' })
      );
    }
  };

  const navigateToPage = (targetPage) => {
    if (onNavigate) {
      onNavigate(targetPage);
    } else {
      window.dispatchEvent(
        new CustomEvent('app-navigate', { detail: targetPage })
      );
    }
    setIsSearchOpen(false);
    setSearchQuery('');
  };

  // Filter search results
  const query = searchQuery.trim().toLowerCase();
  const filteredResults = query
    ? searchableItems.filter((item) => {
        return (
          item.title.toLowerCase().includes(query) ||
          item.subtitle.toLowerCase().includes(query) ||
          item.type.toLowerCase().includes(query)
        );
      })
    : searchableItems.slice(0, 5); // default suggested quick links

  return (
    <header
      className="bg-white border-b border-slate-200/80 px-8 py-3.5 flex items-center justify-between sticky top-0 z-30 font-sans shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
      data-purpose="top-header"
    >
      {/* Functional Search Input */}
      <div className="w-80 sm:w-96 relative" ref={searchContainerRef}>
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
          <MdSearch size={17} />
        </div>
        <input
          ref={searchInputRef}
          type="text"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setIsSearchOpen(true);
          }}
          onFocus={() => setIsSearchOpen(true)}
          placeholder="Search students, buses, drivers..."
          className="w-full pl-9 pr-12 py-2 bg-slate-50/70 border border-slate-200/90 rounded-xl text-xs placeholder-slate-400 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all font-sans"
        />

        {/* Clear or ⌘K Badge */}
        <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center">
          {searchQuery ? (
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                searchInputRef.current?.focus();
              }}
              className="text-slate-400 hover:text-slate-600 p-1 rounded-md hover:bg-slate-200/60 transition-colors cursor-pointer"
              title="Clear search"
            >
              <MdClose size={14} />
            </button>
          ) : (
            <kbd className="text-[10px] font-semibold text-slate-400 bg-white border border-slate-200 px-1.5 py-0.5 rounded shadow-2xs pointer-events-none">
              ⌘K
            </kbd>
          )}
        </div>

        {/* Live Search Results Dropdown */}
        {isSearchOpen && (
          <div className="absolute left-0 right-0 top-full mt-2 bg-white border border-slate-200 rounded-2xl shadow-xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150 max-h-96 flex flex-col">
            <div className="p-2.5 bg-slate-50/70 border-b border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
              <span className="font-semibold">
                {query ? `Results for "${searchQuery}"` : 'Quick Navigation'}
              </span>
              <span className="text-[10px] text-slate-400 font-mono">
                {filteredResults.length} {filteredResults.length === 1 ? 'match' : 'matches'}
              </span>
            </div>

            <div className="overflow-y-auto divide-y divide-slate-50 p-1.5 custom-scrollbar">
              {filteredResults.length > 0 ? (
                filteredResults.map((item, idx) => {
                  const ItemIcon = item.icon || MdSearch;
                  return (
                    <div
                      key={`${item.title}-${idx}`}
                      onClick={() => navigateToPage(item.targetPage)}
                      className="p-2.5 rounded-xl hover:bg-blue-50/60 cursor-pointer transition-all flex items-center justify-between gap-3 group"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-8 h-8 rounded-lg bg-slate-100 group-hover:bg-blue-100 text-slate-600 group-hover:text-blue-600 flex items-center justify-center shrink-0 transition-colors">
                          <ItemIcon size={16} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-slate-800 group-hover:text-blue-600 truncate transition-colors">
                            {item.title}
                          </p>
                          <p className="text-[11px] text-slate-400 truncate">
                            {item.subtitle}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <span
                          className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border border-current/20 ${item.badgeColor}`}
                        >
                          {item.badge}
                        </span>
                        <MdArrowForward
                          size={14}
                          className="text-slate-300 group-hover:text-blue-500 opacity-0 group-hover:opacity-100 transition-all -translate-x-1 group-hover:translate-x-0"
                        />
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="py-8 px-4 text-center">
                  <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-2">
                    <MdSearch size={20} />
                  </div>
                  <p className="text-xs font-bold text-slate-700">No results found</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    No matching students, vehicles, or drivers found for "{searchQuery}".
                  </p>
                </div>
              )}
            </div>

            <div className="p-2 bg-slate-50 border-t border-slate-100 text-[10px] text-slate-400 flex items-center justify-between">
              <span>Press <kbd className="font-mono bg-white px-1 py-0.5 rounded border border-slate-200">ESC</kbd> to close</span>
              <span>Click any result to jump to page</span>
            </div>
          </div>
        )}
      </div>


      {/* Right Actions */}
      <div className="flex items-center gap-3.5">
        {/* Bell Notifications */}
        <button
          type="button"
          aria-label="Notifications"
          onClick={handleNotificationClick}
          title="View Notifications"
          className="w-9 h-9 rounded-xl bg-slate-50 hover:bg-slate-100/80 border border-slate-200/80 flex items-center justify-center relative text-slate-600 hover:text-blue-600 transition-colors cursor-pointer"
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
