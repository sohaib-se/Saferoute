import { MdAltRoute } from 'react-icons/md';

const CardRouteFleet = ({ formData, onChange, drivers = [], vehicles = [] }) => {
  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
      <div className="flex items-center justify-between pb-5 border-b border-slate-100 mb-5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <MdAltRoute className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900 leading-tight">
              Route & Fleet Assignment
            </h2>
            <p className="text-[11px] text-slate-500">Allocate driver and vehicle fleet</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {/* Driver Selection Dropdown */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">Driver Selection *</label>
          <select
            value={formData.driver || ''}
            onChange={(e) => onChange('driver', e.target.value)}
            className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all outline-none cursor-pointer"
          >
            <option value="">Select a driver...</option>
            {drivers.length > 0 ? (
              drivers.map((d) => (
                <option key={d.id} value={d.name}>
                  {d.name} {d.status ? `(${d.status})` : ''}
                </option>
              ))
            ) : (
              <>
                <option value="Muhammad Ali">Muhammad Ali</option>
                <option value="Tariq Mahmood">Tariq Mahmood</option>
                <option value="Rashid Khan">Rashid Khan</option>
              </>
            )}
          </select>
        </div>

        {/* Bus Selection Dropdown */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">Bus Selection *</label>
          <select
            value={formData.vehicle || ''}
            onChange={(e) => onChange('vehicle', e.target.value)}
            className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all outline-none cursor-pointer"
          >
            <option value="">Select a vehicle...</option>
            {vehicles.length > 0 ? (
              vehicles.map((v) => (
                <option key={v.id} value={v.name}>
                  {v.name} {v.regNo ? `(${v.regNo})` : ''}
                </option>
              ))
            ) : (
              <>
                <option value="Bus 01">Bus 01</option>
                <option value="Bus 12">Bus 12</option>
                <option value="Bus 07">Bus 07</option>
              </>
            )}
          </select>
        </div>
      </div>
    </div>
  );
};

export default CardRouteFleet;
