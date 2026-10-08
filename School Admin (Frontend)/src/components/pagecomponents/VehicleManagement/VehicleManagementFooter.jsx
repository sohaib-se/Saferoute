import React from 'react';

const VehicleManagementFooter = () => {
  return (
    <footer className="px-6 py-4 border-t border-slate-200/80 bg-white text-xs text-slate-500 flex flex-col md:flex-row items-center justify-between gap-3 flex-shrink-0" data-purpose="site-footer">
      <div>
        © 2026 <span className="font-semibold text-slate-700">School Transport System</span>. All rights reserved.
      </div>
      <div className="flex items-center space-x-6">
        <a className="hover:text-slate-800 transition-colors" href="#">Privacy Policy</a>
        <a className="hover:text-slate-800 transition-colors" href="#">Terms of Service</a>
        <a className="hover:text-slate-800 transition-colors" href="#">System Status</a>
        <div className="flex items-center space-x-1.5 text-emerald-600 font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span>All Servers 100%</span>
        </div>
      </div>
    </footer>
  );
};

export default VehicleManagementFooter;
