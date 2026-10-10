import { MdGpsFixed, MdLocationOn, MdRadar } from 'react-icons/md';

const CardResidenceGeofence = ({ formData, onChange }) => {
  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
      <div className="flex items-center justify-between pb-5 border-b border-slate-100 mb-5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <MdRadar className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900">Residence & Geofence</h2>
            <p className="text-[11px] text-slate-500">Proximity radar & alert radius</p>
          </div>
        </div>

        <button
          type="button"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-blue-200 bg-blue-50/80 text-blue-600 text-xs font-semibold hover:bg-blue-100 transition-colors cursor-pointer shadow-xs"
        >
          <MdGpsFixed className="w-3.5 h-3.5" />
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
            className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all outline-none"
            placeholder="e.g. House #42, Street 4, Sector B-1, Green Valley Housing Society, Lahore"
            value={formData.address || ''}
            onChange={(e) => onChange('address', e.target.value)}
          />
        </div>

        {/* Embedded Map Preview */}
        <div className="relative h-48 w-full rounded-xl overflow-hidden border border-slate-200 bg-[#dce7e1] flex items-center justify-center p-3">
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

          {/* Geofence Radius Circle and Pin with Real-time Address */}
          <div className="relative flex flex-col items-center justify-center z-10 -mt-2">
            {/* Realtime Address Tooltip */}
            <div className="mb-2 px-3 py-1 bg-white/95 backdrop-blur-md rounded-lg shadow-sm border border-blue-200 text-center max-w-[280px] transition-all">
              <p className="text-[10px] font-bold text-blue-700 truncate leading-tight">
                📍 {formData.address ? formData.address : 'Type address above to set location...'}
              </p>
            </div>

            <div className="w-20 h-20 rounded-full bg-blue-500/15 border border-blue-500/40 flex items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-blue-500/20 border border-blue-500/60 flex items-center justify-center">
                <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg border-2 border-white">
                  <MdLocationOn className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          </div>

          {/* Overlay Pill at Bottom of Map */}
          <div className="absolute bottom-2.5 left-2.5 right-2.5 bg-white/95 backdrop-blur-xs py-1.5 px-3 rounded-lg border border-slate-200/90 shadow-xs flex items-center justify-between text-[10px] z-20">
            <div className="flex items-center gap-1.5 text-slate-700 font-semibold truncate mr-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
              <span className="truncate">Geofence: <strong>500m Radius</strong></span>
            </div>
            <span className="text-slate-400 font-mono text-[9px] shrink-0">31.4826° N, 74.2982° E</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardResidenceGeofence;
