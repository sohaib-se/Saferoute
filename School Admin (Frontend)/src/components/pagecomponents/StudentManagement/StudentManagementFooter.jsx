const StudentManagementFooter = () => {
  return (
    <footer className="bg-white border-t border-slate-200/80 px-8 py-4 flex flex-wrap items-center justify-between text-xs text-slate-500">
      <div>
        © 2026 <span className="font-bold text-slate-700">School Transport System</span>. All rights reserved.
      </div>
      <div className="flex items-center space-x-6 mt-2 sm:mt-0">
        <a className="hover:text-slate-800 transition" href="#">Privacy Policy</a>
        <a className="hover:text-slate-800 transition" href="#">Terms of Service</a>
        <a className="hover:text-slate-800 transition" href="#">System Status</a>
        <div className="flex items-center space-x-1.5 font-medium text-emerald-600">
          <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
          <span>All Servers 100%</span>
        </div>
      </div>
    </footer>
  );
};

export default StudentManagementFooter;
