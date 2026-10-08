const CardBasicProfile = ({ formData, onChange, onGenderSelect }) => {
  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm">
      <div className="flex items-center justify-between pb-5 border-b border-slate-100 mb-5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <rect height="18" rx="2" ry="2" width="18" x="3" y="4"></rect>
              <line x1="16" x2="16" y1="2" y2="6"></line>
              <line x1="8" x2="8" y1="2" y2="6"></line>
              <line x1="3" x2="21" y1="10" y2="10"></line>
            </svg>
          </div>
          <h2 className="text-base font-bold text-slate-800">Basic Student Profile</h2>
        </div>
        <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-semibold">
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
              className="w-full px-3.5 py-2.5 bg-[#f0f5fa] border-0 rounded-lg text-sm text-slate-700 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:bg-white"
              placeholder="e.g. Ayesha Khan"
              value={formData.name || ''}
              onChange={(e) => onChange('name', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Admission / Student ID *</label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-semibold">#</span>
              <input
                type="text"
                required
                className="w-full pl-8 pr-3.5 py-2.5 bg-[#f0f5fa] border-0 rounded-lg text-sm text-slate-700 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:bg-white"
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
              className="w-full px-3.5 py-2.5 bg-[#f0f5fa] border-0 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-blue-500 focus:bg-white cursor-pointer"
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
              className="w-full px-3.5 py-2.5 bg-[#f0f5fa] border-0 rounded-lg text-sm text-slate-700 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:bg-white"
              placeholder="e.g. A"
              value={formData.section || ''}
              onChange={(e) => onChange('section', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Roll Number</label>
            <input
              type="text"
              className="w-full px-3.5 py-2.5 bg-[#f0f5fa] border-0 rounded-lg text-sm text-slate-700 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:bg-white"
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
            <svg className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M12 2a8 8 0 00-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 00-8-8z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <input
              type="text"
              required
              className="w-full pl-10 pr-3.5 py-2.5 bg-[#f0f5fa] border-0 rounded-lg text-sm text-slate-700 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:bg-white"
              placeholder="e.g. House #42, Street 4, Sector B-1, Green Valley Housing Society, Lahore"
              value={formData.address || ''}
              onChange={(e) => onChange('address', e.target.value)}
            />
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">Gender</label>
          <div className="grid grid-cols-3 gap-3">
            <button
              type="button"
              onClick={() => onGenderSelect('Male')}
              className={`flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                formData.gender === 'Male'
                  ? 'bg-[#1664ec] text-white shadow-sm shadow-blue-500/30'
                  : 'bg-[#f0f5fa] text-slate-700 hover:bg-slate-200/80'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="10" cy="14" r="5"></circle>
                <line x1="19" x2="13.6" y1="5" y2="10.4"></line>
                <line x1="19" x2="14" y1="5" y2="5"></line>
                <line x1="19" x2="19" y1="5" y2="10"></line>
              </svg>
              Male
            </button>

            <button
              type="button"
              onClick={() => onGenderSelect('Female')}
              className={`flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                formData.gender === 'Female'
                  ? 'bg-[#1664ec] text-white shadow-sm shadow-blue-500/30'
                  : 'bg-[#f0f5fa] text-slate-700 hover:bg-slate-200/80'
              }`}
            >
              <svg className="w-4 h-4 text-current" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="12" cy="9" r="5"></circle>
                <line x1="12" x2="12" y1="14" y2="21"></line>
                <line x1="8.5" x2="15.5" y1="17.5" y2="17.5"></line>
              </svg>
              Female
            </button>

            <button
              type="button"
              onClick={() => onGenderSelect('Other')}
              className={`flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                formData.gender === 'Other'
                  ? 'bg-[#1664ec] text-white shadow-sm shadow-blue-500/30'
                  : 'bg-[#f0f5fa] text-slate-700 hover:bg-slate-200/80'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="4"></circle>
                <path d="M12 2v4m0 12v4M2 12h4m12 0h4"></path>
              </svg>
              Other
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardBasicProfile;
