import React from 'react';

const LiveTrackingFooter = () => {
  return (
    <footer
      className="mt-auto bg-white border-t border-slate-200/90 px-8 py-4 flex items-center justify-between flex-wrap gap-4 text-xs text-slate-500 font-sans"
      data-purpose="site-footer"
    >
      <div>
        © 2026 <span className="font-semibold text-slate-700">SafeRoute School Transport System</span>. All rights reserved.
      </div>
      <div className="flex items-center gap-6">
        <a className="hover:text-slate-800 transition-colors" href="#">
          Privacy Policy
        </a>
        <a className="hover:text-slate-800 transition-colors" href="#">
          Terms of Service
        </a>
        <a className="hover:text-slate-800 transition-colors" href="#">
          System Status
        </a>
        <div className="flex items-center gap-1.5 text-emerald-600 font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>All Telemetry Servers 100%</span>
        </div>
      </div>
    </footer>
  );
};

export default LiveTrackingFooter;
