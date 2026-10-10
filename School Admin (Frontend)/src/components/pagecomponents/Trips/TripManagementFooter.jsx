import React from 'react';

const TripManagementFooter = () => {
  return (
    <footer
      className="px-8 py-3.5 border-t border-slate-200/80 bg-white text-xs text-slate-400 flex flex-col md:flex-row items-center justify-between gap-3 shrink-0"
      data-purpose="trips-site-footer"
    >
      <div>
        © 2026 <span className="font-semibold text-slate-700">School Transport System</span>. All rights reserved.
      </div>
      <div className="flex items-center gap-5">
        <a className="hover:text-slate-600 transition-colors" href="#">
          Privacy Policy
        </a>
        <a className="hover:text-slate-600 transition-colors" href="#">
          Terms of Service
        </a>
        <a className="hover:text-slate-600 transition-colors" href="#">
          System Status
        </a>
        <div className="flex items-center gap-1.5 text-emerald-600 font-medium ml-1">
          <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
          <span>All Servers 100%</span>
        </div>
      </div>
    </footer>
  );
};

export default TripManagementFooter;
