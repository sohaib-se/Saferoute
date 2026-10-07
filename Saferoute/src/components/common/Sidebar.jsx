import {
  MdDashboard,
  MdDirectionsBus,
  MdPeople,
  MdPerson,
  MdMap,
  MdAccessTime,
  MdLocationOn,
  MdAccountBalanceWallet,
  MdNotifications,
  MdWarning,
  MdPersonOutline,
  MdLogout,
} from 'react-icons/md';

const navItems = [
  { label: 'Dashboard', icon: MdDashboard, active: true },
  { label: 'Students', icon: MdPersonOutline },
  { label: 'Parents', icon: MdPeople },
  { label: 'Drivers', icon: MdPerson },
  { label: 'Vehicles', icon: MdDirectionsBus },
  { label: 'Routes', icon: MdMap },
  { label: 'Trips', icon: MdAccessTime },
  { label: 'Live Tracking', icon: MdLocationOn },
  { label: 'Notifications', icon: MdNotifications, badge: 3 },
  { label: 'SOS Alerts', icon: MdWarning, badge: 1, danger: true },
];

const Sidebar = ({ onLogout }) => {
  return (
    <aside
      className="w-[230px] flex-shrink-0 flex flex-col justify-between select-none"
      style={{ background: '#0C1425' }}
      data-purpose="sidebar"
    >
      <div>
        {/* Brand */}
        <div className="px-5 pt-6 pb-6 flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-white"
            style={{ background: '#2563EB', boxShadow: '0 4px 12px rgba(37,99,235,0.3)' }}
          >
            <MdDirectionsBus size={20} />
          </div>
          <div>
            <h1 className="text-sm font-bold text-white tracking-tight leading-snug">
              SafeRoute
            </h1>
            <p className="text-[11px] font-medium" style={{ color: '#94A3B8' }}>
              Admin Fleet Portal
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="px-3 space-y-0.5 text-[13px]">
          {navItems.map(({ label, icon: Icon, active, badge, danger }) => (
            <a
              key={label}
              href="#"
              className="flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all duration-150"
              style={{
                background: active ? '#2563EB' : 'transparent',
                color: active ? '#fff' : danger ? '#FB7185' : '#94A3B8',
                fontWeight: active ? 600 : 500,
              }}
              onMouseEnter={(e) => {
                if (!active) {
                  e.currentTarget.style.background = '#152038';
                  if (!danger) e.currentTarget.style.color = '#E2E8F0';
                }
              }}
              onMouseLeave={(e) => {
                if (!active) {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = danger ? '#FB7185' : '#94A3B8';
                }
              }}
            >
              <div className="flex items-center gap-3.5">
                <Icon size={16} className="flex-shrink-0" />
                <span>{label}</span>
              </div>
              {badge && (
                <span
                  className="w-5 h-5 rounded-full text-white text-[10px] font-bold flex items-center justify-center"
                  style={{ background: danger ? '#E11D48' : '#1D4ED8' }}
                >
                  {badge}
                </span>
              )}
            </a>
          ))}
        </nav>
      </div>

      {/* Logout button */}
      <div className="px-5 py-6">
        <button 
          onClick={onLogout}
          className="flex items-center gap-3 w-full px-3.5 py-2.5 rounded-xl transition-all duration-150 text-[#94A3B8] hover:text-[#FB7185] hover:bg-[#152038]"
        >
          <MdLogout size={18} />
          <span className="text-[13px] font-semibold">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
