import React, { useState, useEffect } from 'react';
import {
  MdDashboard,
  MdDirectionsBus,
  MdPeople,
  MdPerson,
  MdAccessTime,
  MdLocationOn,
  MdNotifications,
  MdWarning,
  MdPersonOutline,
  MdLogout,
  MdSettings,
  MdRoute,
} from 'react-icons/md';
import { supabase } from '../../lib/supabaseClient';
import { getCurrentSchoolId } from '../../lib/session';

const isValidUUID = (val) =>
  Boolean(val && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(val));

const Sidebar = ({ onLogout, currentPage = 'Dashboard', onNavigate }) => {
  const [activeSosCount, setActiveSosCount] = useState(0);
  const [unreadNotifCount, setUnreadNotifCount] = useState(0);

  const fetchBadgeCounts = async () => {
    try {
      const schoolId = getCurrentSchoolId();

      // 1. Live active SOS count
      let sosQuery = supabase
        .from('sos_alerts')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'active');

      if (isValidUUID(schoolId)) {
        sosQuery = sosQuery.or(`school_id.eq.${schoolId},school_id.is.null`);
      }

      const { count: sosCount, error: sosErr } = await sosQuery;
      if (!sosErr && typeof sosCount === 'number') {
        setActiveSosCount(sosCount);
      }

      // 2. Live unread admin notifications count
      let notifQuery = supabase
        .from('notifications')
        .select('*', { count: 'exact', head: true })
        .eq('is_read', false)
        .in('recipient_type', ['admin', 'all']);

      if (isValidUUID(schoolId)) {
        notifQuery = notifQuery.or(`school_id.eq.${schoolId},school_id.is.null`);
      }

      const { count: notifCount, error: notifErr } = await notifQuery;
      if (!notifErr && typeof notifCount === 'number') {
        setUnreadNotifCount(notifCount);
      }
    } catch (e) {
      console.warn('Failed to fetch sidebar badge counts:', e);
    }
  };

  useEffect(() => {
    fetchBadgeCounts();

    // 5s interval polling
    const interval = setInterval(fetchBadgeCounts, 5000);

    // Real-time listener for SOS alerts
    const sosChannel = supabase
      .channel('sidebar:sos_badges')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'sos_alerts' }, () => {
        fetchBadgeCounts();
      })
      .subscribe();

    // Real-time listener for notifications
    const notifChannel = supabase
      .channel('sidebar:notif_badges')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'notifications' }, () => {
        fetchBadgeCounts();
      })
      .subscribe();

    return () => {
      clearInterval(interval);
      supabase.removeChannel(sosChannel);
      supabase.removeChannel(notifChannel);
    };
  }, []);

  const navItems = [
    { label: 'Dashboard', icon: MdDashboard },
    { label: 'Students', icon: MdPersonOutline },
    { label: 'Parents', icon: MdPeople },
    { label: 'Drivers', icon: MdPerson },
    { label: 'Vehicles', icon: MdDirectionsBus },
    { label: 'Routes', icon: MdRoute },
    { label: 'Trips', icon: MdAccessTime },
    { label: 'Live Tracking', icon: MdLocationOn, liveDot: true },
    {
      label: 'Notifications',
      icon: MdNotifications,
      hasDot: unreadNotifCount > 0,
    },
    {
      label: 'SOS Alerts',
      icon: MdWarning,
      badge: activeSosCount > 0 ? activeSosCount : null,
      danger: true,
    },
  ];

  return (
    <aside
      className="w-[240px] flex-shrink-0 flex flex-col justify-between h-screen sticky top-0 z-40 select-none bg-white border-r border-slate-200/80 font-sans shadow-[1px_0_3px_rgba(0,0,0,0.02)]"
      data-purpose="sidebar"
    >
      <div className="flex flex-col flex-1 min-h-0">
        {/* Brand Header */}
        <div className="px-5 pt-6 pb-5 flex items-center gap-3 border-b border-slate-100/80">
          <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20 shrink-0">
            <MdDirectionsBus size={20} />
          </div>
          <div className="min-w-0">
            <h1 className="text-sm font-bold text-slate-900 tracking-tight leading-snug">
              SafeRoute
            </h1>
            <p className="text-[11px] font-medium text-slate-400 truncate">
              Admin Fleet Portal
            </p>
          </div>
        </div>

        {/* Navigation items */}
        <nav className="px-3 pt-4 pb-2 space-y-1 flex-1 overflow-y-auto custom-scrollbar">
          {navItems.map(({ label, icon: Icon, badge, danger, liveDot, hasDot }) => {
            const active =
              currentPage === label || (label === 'Students' && currentPage === 'AddStudent');

            let itemClass = 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 font-medium';
            if (active) {
              itemClass = danger
                ? 'bg-rose-50 text-rose-600 font-semibold shadow-xs'
                : 'bg-blue-50 text-blue-600 font-semibold shadow-xs';
            } else if (danger) {
              itemClass = 'text-rose-600 hover:bg-rose-50/70 font-medium';
            }

            return (
              <a
                key={label}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (onNavigate) {
                    onNavigate(label);
                  }
                }}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all duration-150 text-xs ${itemClass}`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Icon
                    size={17}
                    className={`shrink-0 ${
                      active
                        ? danger
                          ? 'text-rose-600'
                          : 'text-blue-600'
                        : danger
                        ? 'text-rose-500'
                        : 'text-slate-400'
                    }`}
                  />
                  <span className="truncate">{label}</span>
                </div>
                {liveDot && !badge && !hasDot && (
                  <span className="w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-emerald-100 animate-pulse shrink-0" />
                )}
                {hasDot ? (
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600 ring-2 ring-blue-100 shrink-0" />
                ) : badge ? (
                  <span
                    className={`w-5 h-5 rounded-full text-white text-[10px] font-bold flex items-center justify-center shrink-0 shadow-xs ${
                      danger ? 'bg-rose-500 animate-pulse' : 'bg-blue-600'
                    }`}
                  >
                    {badge}
                  </span>
                ) : null}
              </a>
            );
          })}
        </nav>
      </div>

      {/* User Status, Settings & Logout Footer */}
      <div className="p-3 border-t border-slate-100 bg-slate-50/50 flex items-center gap-2">
        <button
          onClick={onLogout}
          type="button"
          className="flex-1 flex items-center gap-2.5 px-3 py-2 rounded-xl transition-all duration-150 text-slate-600 hover:text-rose-600 hover:bg-white border border-transparent hover:border-slate-200/80 text-xs font-semibold cursor-pointer shadow-xs min-w-0"
          title="Sign out of portal"
        >
          <MdLogout size={16} className="text-slate-400 shrink-0 group-hover:text-rose-600" />
          <span className="truncate">Sign Out</span>
        </button>

        <button
          onClick={() => onNavigate && onNavigate('Profile')}
          type="button"
          className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-150 cursor-pointer shadow-xs shrink-0 ${
            currentPage === 'Profile'
              ? 'bg-blue-50 text-blue-600 border border-blue-200 shadow-2xs'
              : 'text-slate-500 hover:text-slate-900 bg-white hover:bg-slate-100/80 border border-slate-200/80'
          }`}
          title="School Profile & Settings"
          aria-label="Settings"
        >
          <MdSettings
            size={18}
            className={
              currentPage === 'Profile'
                ? 'text-blue-600 rotate-45 transition-transform'
                : 'text-slate-500 hover:rotate-45 transition-transform'
            }
          />
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
