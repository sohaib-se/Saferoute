const CardRouteFleet = ({ formData, onChange, onServiceModeSelect }) => {
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
            Route & Fleet<br className="hidden sm:inline" /> Assignment
          </h2>
        </div>

        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 text-blue-600 text-[11px] font-semibold">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
          <span>Live Synced</span>
        </div>
      </div>

      <div className="space-y-4">
        {/* Select Transit Route */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">Select Transit Route *</label>
          <select
            value={formData.route || 'Route 1 - Green Valley Express (Zone North)'}
            onChange={(e) => onChange('route', e.target.value)}
            className="w-full px-3.5 py-2.5 bg-[#f0f5fa] border-0 rounded-lg text-xs font-medium text-slate-800 focus:ring-2 focus:ring-blue-500 focus:bg-white cursor-pointer"
          >
            <option value="Route 1 - Green Valley Express (Zone North)">Route 1 - Green Valley Express (Zone North)</option>
            <option value="Route 2 - City Center Express (Zone South)">Route 2 - City Center Express (Zone South)</option>
            <option value="Route 3 - Model Town Shuttle (Zone East)">Route 3 - Model Town Shuttle (Zone East)</option>
            <option value="Route 4 - Gulberg Connect (Zone West)">Route 4 - Gulberg Connect (Zone West)</option>
            <option value="Route 5 - DHA Ring Road (Zone Central)">Route 5 - DHA Ring Road (Zone Central)</option>
          </select>
        </div>

        {/* Assigned Vehicle & Driver */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">Assigned Vehicle & Driver *</label>
          <select
            value={formData.vehicle || 'Bus 12 • Muhammad Ali • 32 Seats (6 Available)'}
            onChange={(e) => onChange('vehicle', e.target.value)}
            className="w-full px-3.5 py-2.5 bg-[#f0f5fa] border-0 rounded-lg text-xs font-medium text-slate-800 focus:ring-2 focus:ring-blue-500 focus:bg-white cursor-pointer"
          >
            <option value="Bus 12 • Muhammad Ali • 32 Seats (6 Available)">Bus 12 • Muhammad Ali • 32 Seats (6 Available)</option>
            <option value="Bus 07 • Tariq Mahmood • 28 Seats (4 Available)">Bus 07 • Tariq Mahmood • 28 Seats (4 Available)</option>
            <option value="Bus 09 • Rashid Khan • 30 Seats (8 Available)">Bus 09 • Rashid Khan • 30 Seats (8 Available)</option>
            <option value="Bus 15 • Usman Ghani • 35 Seats (2 Available)">Bus 15 • Usman Ghani • 35 Seats (2 Available)</option>
            <option value="Bus 18 • Bilal Ahmed • 40 Seats (10 Available)">Bus 18 • Bilal Ahmed • 40 Seats (10 Available)</option>
          </select>
        </div>

        {/* Driver Phone & Seat Cap */}
        <div className="flex items-center justify-between text-[11px] font-medium text-slate-600 px-0.5">
          <span>Driver Phone: +92 312 4433221</span>
          <span className="text-blue-600 font-semibold">Seat Cap: 81% full</span>
        </div>

        {/* Transport Service Mode */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">Transport Service Mode</label>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => onServiceModeSelect('Two-Way')}
              className={`py-2 px-1 text-center rounded-lg cursor-pointer transition-colors ${
                formData.serviceMode === 'Two-Way'
                  ? 'bg-[#1664ec] text-white shadow-sm'
                  : 'bg-[#f0f5fa] text-slate-700 hover:bg-slate-200/80'
              }`}
            >
              <div className="text-[11px] font-bold leading-tight">Two-Way</div>
              <div className={`text-[9px] font-normal mt-0.5 ${formData.serviceMode === 'Two-Way' ? 'text-blue-100' : 'text-slate-400'}`}>Pick & Drop</div>
            </button>

            <button
              type="button"
              onClick={() => onServiceModeSelect('Morning')}
              className={`py-2 px-1 text-center rounded-lg cursor-pointer transition-colors ${
                formData.serviceMode === 'Morning'
                  ? 'bg-[#1664ec] text-white shadow-sm'
                  : 'bg-[#f0f5fa] text-slate-700 hover:bg-slate-200/80'
              }`}
            >
              <div className="text-[11px] font-bold leading-tight">Morning</div>
              <div className={`text-[9px] font-normal mt-0.5 ${formData.serviceMode === 'Morning' ? 'text-blue-100' : 'text-slate-400'}`}>Pickup Only</div>
            </button>

            <button
              type="button"
              onClick={() => onServiceModeSelect('Afternoon')}
              className={`py-2 px-1 text-center rounded-lg cursor-pointer transition-colors ${
                formData.serviceMode === 'Afternoon'
                  ? 'bg-[#1664ec] text-white shadow-sm'
                  : 'bg-[#f0f5fa] text-slate-700 hover:bg-slate-200/80'
              }`}
            >
              <div className="text-[11px] font-bold leading-tight">Afternoon</div>
              <div className={`text-[9px] font-normal mt-0.5 ${formData.serviceMode === 'Afternoon' ? 'text-blue-100' : 'text-slate-400'}`}>Drop Only</div>
            </button>
          </div>
        </div>

        {/* Scheduled Stops & ETA Sub-card */}
        <div className="bg-[#f0f5fa]/90 rounded-xl p-3.5 border border-slate-200/60 space-y-3">
          <div className="flex items-center justify-between text-[11px] font-bold tracking-wider text-slate-500">
            <span>SCHEDULED STOPS & ETA</span>
            <span className="text-blue-600 bg-blue-50 px-2 py-0.5 rounded text-[10px]">Stop #4</span>
          </div>

          {/* Stop 1: Pickup */}
          <div className="flex items-center justify-between bg-white p-2.5 rounded-lg border border-slate-100 shadow-xs">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4 16c0 .88.39 1.67 1 2.22V20c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h8v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1.78c.61-.55 1-1.34 1-2.22V6c0-3.5-3.58-4-8-4s-8 .5-8 4v10zm3.5 1c-.83 0-1.5-.67-1.5-1.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17zm9 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm1.5-6H6V6h12v5z"></path>
                </svg>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-800 leading-tight">Green Valley Main Gate</p>
                <p className="text-[10px] text-slate-400">Morning Pickup</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs font-bold text-slate-800 leading-tight">07:15 AM</p>
              <p className="text-[10px] text-slate-400">Est. window ±3m</p>
            </div>
          </div>

          {/* Stop 2: Drop-off */}
          <div className="flex items-center justify-between bg-white p-2.5 rounded-lg border border-slate-100 shadow-xs">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="5"></circle>
                  <line x1="12" x2="12" y1="1" y2="3"></line>
                  <line x1="12" x2="12" y1="21" y2="23"></line>
                  <line x1="4.22" x2="5.64" y1="4.22" y2="5.64"></line>
                  <line x1="18.36" x2="19.78" y1="18.36" y2="19.78"></line>
                  <line x1="1" x2="3" y1="12" y2="12"></line>
                  <line x1="21" x2="23" y1="12" y2="12"></line>
                  <line x1="4.22" x2="5.64" y1="19.78" y2="18.36"></line>
                  <line x1="18.36" x2="19.78" y1="5.64" y2="4.22"></line>
                </svg>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-800 leading-tight">Green Valley Main Gate</p>
                <p className="text-[10px] text-slate-400">Afternoon Drop-off</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs font-bold text-slate-800 leading-tight">02:30 PM</p>
              <p className="text-[10px] text-slate-400">School Exit 02:10 PM</p>
            </div>
          </div>
        </div>

        {/* Allocated Seat & Status Inputs */}
        <div className="grid grid-cols-2 gap-3 pt-1">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Allocated Seat</label>
            <div className="relative">
              <svg className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M19 9h-2V7a4 4 0 00-8 0v2H7a2 2 0 00-2 2v7h14v-7a2 2 0 00-2-2z"></path>
              </svg>
              <input
                type="text"
                className="w-full pl-9 pr-3 py-2 bg-[#f0f5fa] border-0 rounded-lg text-xs font-medium text-slate-700 focus:ring-2 focus:ring-blue-500 focus:bg-white"
                value={formData.allocatedSeat || 'Seat #18'}
                onChange={(e) => onChange('allocatedSeat', e.target.value)}
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Status</label>
            <select
              value={formData.status || 'Waiting'}
              onChange={(e) => onChange('status', e.target.value)}
              className="w-full px-3.5 py-2 bg-[#f0f5fa] border-0 rounded-lg text-xs font-medium text-slate-700 focus:ring-2 focus:ring-blue-500 focus:bg-white cursor-pointer"
            >
              <option value="On Route">On Route</option>
              <option value="Picked Up">Picked Up</option>
              <option value="Waiting">Waiting</option>
              <option value="Dropped">Dropped</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardRouteFleet;
