import { MdPeopleOutline, MdPersonAdd, MdSearch } from 'react-icons/md';

const CardParentGuardian = ({ formData, onChange, onNewParentClick }) => {
  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
      <div className="flex items-center justify-between pb-5 border-b border-slate-100 mb-5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <MdPeopleOutline className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900">Parent & Guardian Link</h2>
            <p className="text-[11px] text-slate-500">Automated SMS & push notifications</p>
          </div>
        </div>

        <button
          type="button"
          onClick={onNewParentClick}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-blue-200 bg-blue-50/80 text-blue-600 text-xs font-semibold hover:bg-blue-100 transition-colors cursor-pointer shadow-xs"
        >
          <MdPersonAdd className="w-3.5 h-3.5" />
          New Parent
        </button>
      </div>

      <div className="space-y-4">
        {/* Search Parent Database */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">Search Parent Database</label>
          <div className="relative">
            <MdSearch className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all outline-none"
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
              className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all outline-none"
              placeholder="e.g. Tariq Khan"
              value={formData.parentName || ''}
              onChange={(e) => onChange('parentName', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Relationship</label>
            <input
              type="text"
              className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all outline-none"
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
