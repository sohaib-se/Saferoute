const AddStudentHeader = ({ onCancel, onSubmit }) => {
  return (
    <div className="pb-6">
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
  );
};

export default AddStudentHeader;
