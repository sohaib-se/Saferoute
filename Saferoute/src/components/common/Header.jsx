import { MdSearch, MdNotificationsNone, MdRefresh, MdKeyboardArrowDown } from 'react-icons/md';

const Header = () => {
  return (
    <header
      className="bg-white border-b border-slate-200/80 px-8 py-3.5 flex items-center justify-between sticky top-0 z-30"
      data-purpose="top-header"
    >
      {/* Search */}
      <div className="w-80 relative">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
          <MdSearch size={16} />
        </div>
        <input
          type="text"
          placeholder="Search here..."
          className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs placeholder-slate-400 text-slate-700 focus:outline-none focus:ring-2 focus:border-blue-500 transition-all"
          style={{ '--tw-ring-color': 'rgba(37,99,235,0.2)' }}
        />
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-4">
        {/* Bell */}
        <button className="w-9 h-9 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 flex items-center justify-center relative text-slate-600 transition-colors">
          <MdNotificationsNone size={18} />
          <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-rose-500 rounded-full ring-2 ring-white" />
        </button>

        {/* Refresh */}
        <button className="w-9 h-9 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 transition-colors">
          <MdRefresh size={16} />
        </button>

        {/* Divider */}
        <div className="h-7 w-px bg-slate-200 mx-1" />

        {/* User Profile */}
        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="w-9 h-9 rounded-full bg-[#2563EB] text-white flex items-center justify-center font-bold text-sm shadow-sm">
            A
          </div>
          <div className="text-left">
            <p className="text-xs font-bold text-slate-800 leading-tight group-hover:text-blue-600 transition-colors">
              Admin
            </p>
            <p className="text-[11px] text-slate-400 leading-tight">Super Admin</p>
          </div>
          <MdKeyboardArrowDown size={14} className="text-slate-400 ml-1" />
        </div>
      </div>
    </header>
  );
};

export default Header;
