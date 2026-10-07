const DashboardFooter = () => {
  return (
    <footer className="mt-auto bg-white border-t border-slate-200/80 px-8 py-4 flex items-center justify-between flex-wrap gap-4 text-xs text-slate-500">
      <div>
        © 2026 School Transport System. All rights reserved.
      </div>
      <div className="flex items-center gap-6">
        <a className="hover:text-slate-800 transition-colors" href="#">Privacy Policy</a>
        <a className="hover:text-slate-800 transition-colors" href="#">Terms of Service</a>
        <a className="hover:text-slate-800 transition-colors" href="#">System Status</a>
      </div>
    </footer>
  );
};

export default DashboardFooter;
