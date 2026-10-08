const CardRouteFleet = ({ formData, onChange }) => {
  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm">
      <div className="flex items-center justify-between pb-5 border-b border-slate-100 mb-5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <line x1="6" x2="6" y1="3" y2="15"></line>
              <circle cx="18" cy="6" r="3"></circle>
              <circle cx="6" cy="18" r="3"></circle>
              <path d="M18 9a9 9 0 0 1-9 9"></path>
            </svg>
          </div>
          <h2 className="text-base font-bold text-slate-800 leading-tight">
            Route & Fleet Assignment
          </h2>
        </div>
      </div>

      <div className="space-y-4">
        {/* Driver Selection Dropdown */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">Driver Selection *</label>
          <select
            value={formData.driver || 'Muhammad Ali'}
            onChange={(e) => onChange('driver', e.target.value)}
            className="w-full px-3.5 py-2.5 bg-[#f0f5fa] border-0 rounded-lg text-xs font-medium text-slate-800 focus:ring-2 focus:ring-blue-500 focus:bg-white cursor-pointer"
          >
            <option value="Muhammad Ali">Muhammad Ali</option>
            <option value="Tariq Mahmood">Tariq Mahmood</option>
            <option value="Rashid Khan">Rashid Khan</option>
            <option value="Usman Ghani">Usman Ghani</option>
            <option value="Bilal Ahmed">Bilal Ahmed</option>
            <option value="Sajid Mahmood">Sajid Mahmood</option>
          </select>
        </div>

        {/* Bus Selection Dropdown */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">Bus Selection *</label>
          <select
            value={formData.vehicle || 'Bus 12'}
            onChange={(e) => onChange('vehicle', e.target.value)}
            className="w-full px-3.5 py-2.5 bg-[#f0f5fa] border-0 rounded-lg text-xs font-medium text-slate-800 focus:ring-2 focus:ring-blue-500 focus:bg-white cursor-pointer"
          >
            <option value="Bus 12">Bus 12</option>
            <option value="Bus 07">Bus 07</option>
            <option value="Bus 09">Bus 09</option>
            <option value="Bus 15">Bus 15</option>
            <option value="Bus 18">Bus 18</option>
            <option value="Bus 05">Bus 05</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default CardRouteFleet;
