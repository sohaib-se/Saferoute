const AddStudentHeader = ({ onCancel, onSubmit }) => {
  return (
    <div className="flex items-start justify-between pb-6">
      <div>
        <nav className="flex items-center text-[12px] text-slate-500 space-x-1.5 mb-1.5 font-medium">
          <span className="hover:text-slate-700 cursor-pointer" onClick={onCancel}>Students</span>
          <span className="text-slate-400">&gt;</span>
          <span className="hover:text-slate-700 cursor-pointer" onClick={onCancel}>All Students</span>
          <span className="text-slate-400">&gt;</span>
          <span className="text-slate-800 font-semibold">Add New Student</span>
        </nav>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Add New Student</h1>
        <p className="text-sm text-slate-500 mt-0.5">Register a new student and assign transport route, vehicle, and pickup details.</p>
      </div>

      {/* Top Action Buttons */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 transition-colors shadow-sm cursor-pointer"
        >
          <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <line x1="18" x2="6" y1="6" y2="18"></line>
            <line x1="6" x2="18" y1="6" y2="18"></line>
          </svg>
          Cancel
        </button>
        <button
          type="button"
          onClick={onSubmit}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white bg-[#1664ec] hover:bg-[#1254c7] transition-colors shadow-sm cursor-pointer"
        >
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          Save Student
        </button>
      </div>
    </div>
  );
};

export default AddStudentHeader;
