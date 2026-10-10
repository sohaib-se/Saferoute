import { MdPersonOutline, MdLocationOn } from 'react-icons/md';

const CardBasicProfile = ({ formData, onChange, onGenderSelect }) => {
  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
      <div className="flex items-center justify-between pb-5 border-b border-slate-100 mb-5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <MdPersonOutline className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900">Basic Student Profile</h2>
            <p className="text-[11px] text-slate-500">Legal identification and grade placement</p>
          </div>
        </div>
        <span className="px-2.5 py-1 bg-blue-50 text-blue-600 rounded-full text-[11px] font-semibold border border-blue-100">
          Academic Year 2024-25
        </span>
      </div>

      <div className="space-y-4">
        {/* Row 1: Full Name & Admission ID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Full Legal Name *</label>
            <input
              type="text"
              required
              className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all outline-none"
              placeholder="e.g. Ayesha Khan"
              value={formData.name || ''}
              onChange={(e) => onChange('name', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Admission / Student ID *</label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-semibold">#</span>
              <input
                type="text"
                required
                className="w-full pl-8 pr-3.5 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all outline-none"
                placeholder="e.g. ST-9041"
                value={formData.id || ''}
                onChange={(e) => onChange('id', e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Row 2: Grade, Section, Roll Number */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Grade / Level *</label>
            <select
              value={formData.class || 'Grade 5'}
              onChange={(e) => onChange('class', e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all outline-none cursor-pointer"
            >
              <option value="Grade 5">Grade 5</option>
              <option value="Grade 6">Grade 6</option>
              <option value="Grade 7">Grade 7</option>
              <option value="Grade 8">Grade 8</option>
              <option value="Grade 9">Grade 9</option>
              <option value="Grade 10">Grade 10</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Section</label>
            <input
              type="text"
              className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all outline-none"
              placeholder="e.g. A"
              value={formData.section || ''}
              onChange={(e) => onChange('section', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Roll Number</label>
            <input
              type="text"
              className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all outline-none"
              placeholder="e.g. 14"
              value={formData.rollNo || ''}
              onChange={(e) => onChange('rollNo', e.target.value)}
            />
          </div>
        </div>

        {/* Row 3: Residential Address */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">Residential Address *</label>
          <div className="relative">
            <MdLocationOn className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              required
              className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all outline-none"
              placeholder="e.g. House #42, Street 4, Sector B-1, Green Valley Housing Society, Lahore"
              value={formData.address || ''}
              onChange={(e) => onChange('address', e.target.value)}
            />
          </div>
        </div>

        {/* Gender Selection */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">Gender</label>
          <div className="grid grid-cols-3 gap-3">
            {['Male', 'Female', 'Other'].map((g) => {
              const isSelected = formData.gender === g;
              return (
                <button
                  key={g}
                  type="button"
                  onClick={() => onGenderSelect(g)}
                  className={`py-2 px-4 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-50/70 text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {g}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardBasicProfile;
