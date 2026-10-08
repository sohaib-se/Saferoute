const CardParentGuardian = ({ formData, onChange, onNewParentClick }) => {
  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm">
      <div className="flex items-center justify-between pb-5 border-b border-slate-100 mb-5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-800">Parent & Guardian Link</h2>
            <p className="text-[11px] text-slate-500">Links automated SMS/push alerts on departure and arrival.</p>
          </div>
        </div>

        <button
          type="button"
          onClick={onNewParentClick}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-blue-200 bg-blue-50/70 text-blue-600 text-xs font-semibold hover:bg-blue-100 transition-colors cursor-pointer"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="8.5" cy="7" r="4"></circle>
            <line x1="20" x2="20" y1="8" y2="14"></line>
            <line x1="23" x2="17" y1="11" y2="11"></line>
          </svg>
          New Parent
        </button>
      </div>

      <div className="space-y-4">
        {/* Search Parent Database */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">Search Parent Database</label>
          <div className="relative">
            <svg className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" x2="16.65" y1="21" y2="16.65"></line>
            </svg>
            <input
              type="text"
              className="w-full pl-10 pr-3.5 py-2.5 bg-[#f0f5fa] border-0 rounded-lg text-sm text-slate-700 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:bg-white"
              placeholder="Search parents database (e.g. Tariq Khan)..."
              value={formData.parentSearch || ''}
              onChange={(e) => onChange('parentSearch', e.target.value)}
            />
          </div>
        </div>

        {/* Row 1: Contact Name & Relationship */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Primary Contact Name *</label>
            <input
              type="text"
              required
              className="w-full px-3.5 py-2.5 bg-[#f0f5fa] border-0 rounded-lg text-sm text-slate-700 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:bg-white"
              placeholder="e.g. Tariq Khan"
              value={formData.parentName || ''}
              onChange={(e) => onChange('parentName', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Relationship</label>
            <input
              type="text"
              className="w-full px-3.5 py-2.5 bg-[#f0f5fa] border-0 rounded-lg text-sm text-slate-700 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:bg-white"
              placeholder="e.g. Father"
              value={formData.relationship || ''}
              onChange={(e) => onChange('relationship', e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardParentGuardian;
