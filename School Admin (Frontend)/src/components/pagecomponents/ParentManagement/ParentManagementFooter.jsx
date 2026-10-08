const ParentManagementFooter = () => {
  return (
    <footer className="h-14 bg-white border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between px-8 text-xs text-slate-500">
      <div>
        © 2026 <span className="font-medium text-slate-700">School Transport System</span>. All rights reserved.
      </div>
      <div className="flex items-center gap-6 mt-2 sm:mt-0">
        <a className="hover:text-slate-700 transition" href="#">Privacy Policy</a>
        <a className="hover:text-slate-700 transition" href="#">Terms of Service</a>
        <a className="hover:text-slate-700 transition" href="#">System Status</a>
        <div className="flex items-center gap-1.5 text-emerald-600 font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          All Servers 100%
        </div>
      </div>
    </footer>
  );
};

export default ParentManagementFooter;
