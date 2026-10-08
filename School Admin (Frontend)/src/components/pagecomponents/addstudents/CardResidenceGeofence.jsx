const CardResidenceGeofence = ({ formData, onChange }) => {
  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm">
      <div className="flex items-center justify-between pb-5 border-b border-slate-100 mb-5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M12 2a8 8 0 00-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 00-8-8z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
          </div>
          <h2 className="text-base font-bold text-slate-800">Residence & Geofence</h2>
        </div>

        <button
          type="button"
          className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 cursor-pointer"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="22" x2="18" y1="12" y2="12"></line>
            <line x1="6" x2="2" y1="12" y2="12"></line>
            <line x1="12" x2="12" y1="6" y2="2"></line>
            <line x1="12" x2="12" y1="22" y2="18"></line>
          </svg>
          Detect GPS
        </button>
      </div>

      <div className="space-y-4">
        {/* Residential Street Address */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">Residential Street Address *</label>
          <input
            type="text"
            required
            className="w-full px-3.5 py-2.5 bg-[#f0f5fa] border-0 rounded-lg text-xs text-slate-800 focus:ring-2 focus:ring-blue-500 focus:bg-white"
            placeholder="Street address..."
            value={formData.address || ''}
            onChange={(e) => onChange('address', e.target.value)}
          />
        </div>

        {/* Embedded Map Preview */}
        <div className="relative h-44 w-full rounded-xl overflow-hidden border border-slate-200 bg-[#dce7e1] flex items-center justify-center">
          {/* Simulated Map Feature Lines */}
          <div className="absolute inset-0 opacity-40 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.7)_0%,transparent_60%)]">
            <div className="absolute w-full h-1 bg-amber-200 top-12 rotate-[-6deg]"></div>
            <div className="absolute w-full h-2 bg-white top-24 rotate-[14deg]"></div>
            <div className="absolute w-2 h-full bg-white left-16 rotate-[-12deg]"></div>
            <div className="absolute w-1.5 h-full bg-amber-100 right-28 rotate-[25deg]"></div>
            <span className="absolute top-4 left-6 text-[8px] font-bold text-slate-500 uppercase tracking-wider">Gulshan-e-Ravi</span>
            <span className="absolute top-8 right-16 text-[8px] font-bold text-red-500 tracking-wider">Punjab Rangers HQ</span>
            <span className="absolute bottom-12 left-10 text-[8px] font-bold text-slate-500">Samanabad Town</span>
          </div>

          {/* Geofence Radius Circle and Pin */}
          <div className="relative flex items-center justify-center z-10">
            <div className="w-28 h-28 rounded-full bg-blue-500/15 border border-blue-500/40 flex items-center justify-center">
              <div className="w-14 h-14 rounded-full bg-blue-500/20 border border-blue-500/60 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg border-2 border-white transform -translate-y-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Overlay Pill at Bottom of Map */}
          <div className="absolute bottom-2.5 left-2.5 right-2.5 bg-white/95 backdrop-blur-xs py-1.5 px-3 rounded-lg border border-slate-200/90 shadow-sm flex items-center justify-between text-[10px] z-20">
            <div className="flex items-center gap-1.5 text-slate-700 font-semibold">
              <svg className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
              </svg>
              <span>Smart Alert Geofence: <strong>500m Radius</strong></span>
            </div>
            <span className="text-slate-400 font-mono text-[9px]">31.4826° N, 74.2982° E</span>
          </div>
        </div>

        {/* Special Driver & Attendant Instructions */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">Special Driver & Attendant Instructions</label>
          <input
            type="text"
            className="w-full px-3.5 py-2.5 bg-[#f0f5fa] border-0 rounded-lg text-xs text-slate-800 focus:ring-2 focus:ring-blue-500 focus:bg-white"
            placeholder="Special instructions..."
            value={formData.instructions || ''}
            onChange={(e) => onChange('instructions', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default CardResidenceGeofence;
