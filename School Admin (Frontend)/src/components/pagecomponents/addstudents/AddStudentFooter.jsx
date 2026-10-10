import { MdArrowBack, MdCheck } from 'react-icons/md';

const AddStudentFooter = ({ onBack, onSaveAndAddAnother, onSubmit }) => {
  return (
    <footer className="fixed bottom-0 right-0 left-[240px] bg-white/95 backdrop-blur-md border-t border-slate-200/80 px-8 py-3.5 z-30 flex items-center justify-between shadow-[0_-4px_12px_rgba(0,0,0,0.03)]">
      {/* Back Link */}
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
      >
        <MdArrowBack className="w-4 h-4" />
        Back to Students Directory
      </button>

      {/* Action Buttons */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onBack}
          className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-colors shadow-xs cursor-pointer"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={onSaveAndAddAnother}
          className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-colors shadow-xs cursor-pointer"
        >
          Save & Add Another
        </button>
        <button
          type="button"
          onClick={onSubmit}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs shadow-blue-500/20 transition-colors cursor-pointer"
        >
          <MdCheck className="w-4 h-4" />
          Save & Assign Route
        </button>
      </div>
    </footer>
  );
};

export default AddStudentFooter;
