const SOSFooter = () => {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-white px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
      <div>
        © 2026 <strong className="text-slate-700 font-semibold">School Transport System</strong>. All rights reserved.
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
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          All Servers 100%
        </div>
      </div>
    </footer>
  );
};

export default SOSFooter;
