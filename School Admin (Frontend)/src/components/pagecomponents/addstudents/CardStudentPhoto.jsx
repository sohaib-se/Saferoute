import { MdAddPhotoAlternate } from 'react-icons/md';

const CardStudentPhoto = ({ photoUrl, onPhotoChange, onRemovePhoto }) => {
  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex items-center gap-6">
      {/* Upload Circular Area */}
      <label className="w-20 h-20 rounded-full bg-blue-50/80 border-2 border-dashed border-blue-200 flex flex-col items-center justify-center text-blue-600 shrink-0 cursor-pointer hover:bg-blue-100/70 transition-colors overflow-hidden relative group">
        {photoUrl ? (
          <img src={photoUrl} alt="Student Photograph" className="w-full h-full object-cover" />
        ) : (
          <>
            <MdAddPhotoAlternate className="w-6 h-6 text-blue-500" />
            <span className="text-[10px] font-semibold mt-0.5">Upload</span>
          </>
        )}
        <input type="file" accept="image/*" className="hidden" onChange={onPhotoChange} />
      </label>

      {/* Photograph Info & Controls */}
      <div className="flex-1">
        <h3 className="text-sm font-bold text-slate-900">Student Photograph</h3>
        <p className="text-xs text-slate-500 mt-1 leading-relaxed max-w-sm">
          Upload recent portrait for bus pass credential and facial verification. PNG, JPG (Max 2MB).
        </p>
        <div className="flex items-center gap-4 mt-3">
          <label className="text-xs font-semibold text-blue-600 hover:text-blue-700 cursor-pointer">
            Choose File
            <input type="file" accept="image/*" className="hidden" onChange={onPhotoChange} />
          </label>
          {photoUrl && (
            <button
              type="button"
              onClick={onRemovePhoto}
              className="text-xs font-semibold text-rose-500 hover:text-rose-600 cursor-pointer"
            >
              Remove
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardStudentPhoto;
