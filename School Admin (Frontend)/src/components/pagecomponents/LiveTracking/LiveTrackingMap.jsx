import React, { useState } from 'react';
import {
  MdAdd,
  MdRemove,
  MdCenterFocusStrong,
  MdLayers,
  MdDirectionsBus,
} from 'react-icons/md';

const LiveTrackingMap = ({
  vehicles,
  selectedVehicle,
  onSelectVehicle,
  mapViewMode = 'Roads',
  onCycleViewMode,
  onResetView,
}) => {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.15, 1.45));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.15, 0.8));
  };

  const handleReset = () => {
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
    if (onResetView) onResetView();
  };

  // Determine current active vehicle coordinates
  const activeVehicle = selectedVehicle || vehicles[0];
  const haloX = activeVehicle?.coordinates?.x || 576;
  const haloY = activeVehicle?.coordinates?.y || 280;

  // View mode variations
  const isSatellite = mapViewMode === 'Satellite';
  const isTraffic = mapViewMode === 'Traffic';

  return (
    <div
      className={`lg:col-span-8 border border-slate-200/90 rounded-2xl relative overflow-hidden shadow-sm h-[720px] flex flex-col justify-between font-sans select-none transition-colors duration-300 ${
        isSatellite ? 'bg-[#0f172a]' : 'bg-[#eef2f6]'
      }`}
      data-purpose="vector-map-viewport"
    >
      {/* Zoom / Pan Wrapper */}
      <div
        className="absolute inset-0 transition-transform duration-300 ease-out origin-center"
        style={{
          transform: `scale(${zoomLevel}) translate(${panOffset.x}px, ${panOffset.y}px)`,
        }}
      >
        {/* Vector Map Canvas / SVG Layer */}
        <svg
          className="absolute inset-0 w-full h-full object-cover"
          preserveAspectRatio="none"
          viewBox="0 0 1000 800"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Geofence Dark Corridor Gradient */}
            <linearGradient id="corridorGrad" x1="0%" x2="100%" y1="0%" y2="100%">
              <stop offset="0%" stopColor="#0f172a" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#1e293b" stopOpacity="0.9" />
            </linearGradient>

            {/* Grid Pattern */}
            <pattern
              height="100"
              id="mapGrid"
              patternUnits="userSpaceOnUse"
              width="100"
            >
              <path
                d="M 100 0 L 0 0 0 100"
                fill="none"
                stroke={isSatellite ? '#1e293b' : '#e2e8f0'}
                strokeWidth="1.2"
              />
            </pattern>
          </defs>

          {/* Base Grid & Landmass */}
          <rect
            fill={isSatellite ? '#0b1120' : '#edf2f7'}
            height="800"
            width="1000"
          />
          <rect fill="url(#mapGrid)" height="800" width="1000" />

          {/* Park / Soft Green Zones */}
          <rect
            fill={isSatellite ? '#143826' : '#dcfce7'}
            fillOpacity={isSatellite ? '0.7' : '0.85'}
            height="90"
            rx="18"
            width="140"
            x="540"
            y="470"
          />
          <rect
            fill={isSatellite ? '#143826' : '#dcfce7'}
            fillOpacity={isSatellite ? '0.4' : '0.5'}
            height="80"
            rx="14"
            width="160"
            x="270"
            y="250"
          />

          {/* Lake / Blue Area */}
          <path
            d="M-20,450 C80,430 180,480 240,440 L220,650 L-20,650 Z"
            fill={isSatellite ? '#0c2340' : '#e0f2fe'}
            opacity={isSatellite ? '0.8' : '0.6'}
          />

          {/* Major Roads Lines */}
          {/* Grand Avenue (Vertical) */}
          <line
            stroke={isSatellite ? '#334155' : '#ffffff'}
            strokeWidth="16"
            x1="608"
            x2="608"
            y1="0"
            y2="800"
          />
          <line
            stroke={isSatellite ? '#64748b' : '#cbd5e1'}
            strokeDasharray="6 6"
            strokeWidth="1.5"
            x1="608"
            x2="608"
            y1="0"
            y2="800"
          />

          {/* Green Valley Ave (Horizontal) */}
          <line
            stroke={isSatellite ? '#334155' : '#ffffff'}
            strokeWidth="16"
            x1="0"
            x2="1000"
            y1="335"
            y2="335"
          />
          <line
            stroke={isSatellite ? '#64748b' : '#cbd5e1'}
            strokeDasharray="6 6"
            strokeWidth="1.5"
            x1="0"
            x2="1000"
            y1="335"
            y2="335"
          />

          {/* Diagonal Connector */}
          <line
            stroke={isSatellite ? '#334155' : '#ffffff'}
            strokeWidth="12"
            x1="220"
            x2="600"
            y1="200"
            y2="580"
          />

          {/* Traffic Congestion Overlay when in Traffic mode */}
          {isTraffic && (
            <>
              <line
                stroke="#ef4444"
                strokeWidth="5"
                opacity="0.85"
                x1="320"
                x2="450"
                y1="335"
                y2="335"
              />
              <line
                stroke="#f59e0b"
                strokeWidth="5"
                opacity="0.85"
                x1="608"
                x2="608"
                y1="400"
                y2="560"
              />
              <line
                stroke="#10b981"
                strokeWidth="5"
                opacity="0.85"
                x1="520"
                x2="780"
                y1="335"
                y2="335"
              />
            </>
          )}

          {/* High-risk Geofence Corridor Polygon */}
          <polygon
            fill="url(#corridorGrad)"
            points="340,460 720,390 710,425 420,442"
          />
          <text
            fill="#ffffff"
            fontSize="10"
            fontWeight="700"
            letterSpacing="0.5"
            x="665"
            y="388"
          >
            ST. JOHN
          </text>
          <text
            fill="#cbd5e1"
            fontSize="8"
            fontWeight="600"
            x="665"
            y="401"
          >
            ACADEMIC
          </text>
          <text
            fill="#cbd5e1"
            fontSize="8"
            fontWeight="600"
            x="665"
            y="411"
          >
            WAY
          </text>

          {/* Route Secondary: Green Line (Bus 07 path) */}
          <polyline
            fill="none"
            points="315,550 460,550 505,435 580,435"
            stroke="#10b981"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="4.5"
          />

          {/* Route Primary: Bus 12 Trajectory (Blue active path) */}
          <path
            d="M 285,335 L 438,335 Q 470,300 520,295 L 664,295 L 664,360"
            fill="none"
            stroke="#2563eb"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="6.5"
          />

          {/* Path Node Circles */}
          <circle
            cx="438"
            cy="335"
            fill="#ffffff"
            r="4.5"
            stroke="#2563eb"
            strokeWidth="2.5"
          />
          <circle
            cx="530"
            cy="295"
            fill="#ffffff"
            r="4.5"
            stroke="#2563eb"
            strokeWidth="2.5"
          />

          {/* Road Labels */}
          <text
            fill={isSatellite ? '#94a3b8' : '#64748b'}
            fontSize="9"
            fontWeight="700"
            letterSpacing="1"
            x="258"
            y="328"
          >
            GREEN VALLEY AVE
          </text>
          <text
            fill={isSatellite ? '#cbd5e1' : '#475569'}
            fontSize="9"
            fontWeight="700"
            letterSpacing="0.5"
            x="510"
            y="288"
          >
            NORTH CENTER
          </text>
          <text
            fill={isSatellite ? '#94a3b8' : '#64748b'}
            fontSize="8.5"
            fontWeight="700"
            letterSpacing="1"
            transform="rotate(90 582,250)"
            x="582"
            y="250"
          >
            GRAND
          </text>

          {/* Halo surrounding active vehicle */}
          <circle
            cx={haloX}
            cy={haloY}
            fill="#3b82f6"
            fillOpacity="0.22"
            r="38"
            className="animate-pulse"
          />
          <circle
            cx={haloX}
            cy={haloY}
            fill="#3b82f6"
            fillOpacity="0.08"
            r="54"
          />
        </svg>

        {/* ================= DYNAMIC VEHICLE MARKERS ================= */}

        {/* 1. BUS 12 (Main Focus / Blue Badge) */}
        {vehicles.some((v) => v.id === 'bus-12') && (
          <div
            onClick={() => {
              const bus = vehicles.find((v) => v.id === 'bus-12');
              if (bus) onSelectVehicle(bus);
            }}
            className="absolute left-[560px] top-[260px] z-20 pointer-events-auto cursor-pointer group"
            data-purpose="marker-bus-12"
          >
            {/* Icon with Speed Badge */}
            <div className="relative">
              <div
                className={`w-10 h-10 rounded-2xl flex items-center justify-center text-white shadow-lg transition-transform duration-200 group-hover:scale-105 ${
                  activeVehicle?.id === 'bus-12'
                    ? 'bg-blue-600 ring-4 ring-white shadow-blue-500/40'
                    : 'bg-blue-500 ring-2 ring-white/80'
                }`}
              >
                <MdDirectionsBus size={20} />
              </div>
              <span className="absolute -top-1.5 -right-2 px-1.5 py-0.5 bg-emerald-600 text-white text-[10px] font-bold rounded-full border border-white shadow-xs">
                38
              </span>
            </div>

            {/* Attached Callout Popup Card (Shown when selected or hovered) */}
            {activeVehicle?.id === 'bus-12' && (
              <div className="absolute top-11 -left-36 mt-2 w-52 bg-white/95 backdrop-blur-md rounded-xl p-3 shadow-xl border border-slate-200/90 text-xs animate-in fade-in zoom-in-95 duration-150">
                <div className="flex items-center justify-between pb-1.5 border-b border-slate-100">
                  <div className="flex items-center gap-1.5 font-bold text-slate-800">
                    <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                    <span>Bus No. 12</span>
                  </div>
                  <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                    On Route
                  </span>
                </div>
                <div className="mt-2 space-y-1 text-slate-600 text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Driver:</span>
                    <span className="font-semibold text-slate-800">Muhammad Ali</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Speed:</span>
                    <span className="font-bold text-emerald-600">
                      38 <span className="font-normal text-[10px] text-slate-500">km/h</span>
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Last Update:</span>
                    <span className="text-slate-500">2 min ago</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 2. BUS 07 (Green Pill Marker on Corridor) */}
        {vehicles.some((v) => v.id === 'bus-07') && (
          <div
            onClick={() => {
              const bus = vehicles.find((v) => v.id === 'bus-07');
              if (bus) onSelectVehicle(bus);
            }}
            className="absolute left-[440px] top-[410px] z-20 cursor-pointer pointer-events-auto group"
            data-purpose="marker-bus-07"
          >
            <div
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold shadow-md transition-all duration-200 group-hover:scale-105 ${
                activeVehicle?.id === 'bus-07'
                  ? 'bg-emerald-600 text-white ring-4 ring-emerald-200'
                  : 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Bus 07 • 34 km/h</span>
            </div>
            <div
              className={`w-2 h-2 transform rotate-45 mx-auto -mt-1 ${
                activeVehicle?.id === 'bus-07'
                  ? 'bg-emerald-600'
                  : 'bg-emerald-900 border-r border-b border-emerald-500/40'
              }`}
            ></div>

            {/* Attached Callout Popup when active */}
            {activeVehicle?.id === 'bus-07' && (
              <div className="absolute top-8 -left-20 mt-1 w-48 bg-white/95 backdrop-blur-md rounded-xl p-2.5 shadow-xl border border-slate-200/90 text-xs animate-in fade-in zoom-in-95 duration-150">
                <div className="flex items-center justify-between pb-1 border-b border-slate-100">
                  <span className="font-bold text-slate-800 text-[11px]">Bus No. 07</span>
                  <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-1 py-0.2 rounded">
                    On Route
                  </span>
                </div>
                <div className="mt-1.5 space-y-0.5 text-[10px] text-slate-600">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Driver:</span>
                    <span className="font-semibold text-slate-800">Usman Khan</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Speed:</span>
                    <span className="font-bold text-emerald-600">34 km/h</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 3. BUS 15 (Amber Delayed Marker) */}
        {vehicles.some((v) => v.id === 'bus-15') && (
          <div
            onClick={() => {
              const bus = vehicles.find((v) => v.id === 'bus-15');
              if (bus) onSelectVehicle(bus);
            }}
            className="absolute left-[330px] top-[505px] z-20 cursor-pointer pointer-events-auto group"
            data-purpose="marker-bus-15"
          >
            <div
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold shadow-md transition-all duration-200 group-hover:scale-105 ${
                activeVehicle?.id === 'bus-15'
                  ? 'bg-amber-600 text-white ring-4 ring-amber-200'
                  : 'bg-amber-500 text-white ring-2 ring-white'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
              <span>Bus 15 • Slow (18 km/h)</span>
            </div>
            <div className="w-2 h-2 bg-amber-500 ring-2 ring-white transform rotate-45 mx-auto -mt-1"></div>

            {/* Attached Callout Popup when active */}
            {activeVehicle?.id === 'bus-15' && (
              <div className="absolute top-8 -left-20 mt-1 w-48 bg-white/95 backdrop-blur-md rounded-xl p-2.5 shadow-xl border border-slate-200/90 text-xs animate-in fade-in zoom-in-95 duration-150">
                <div className="flex items-center justify-between pb-1 border-b border-slate-100">
                  <span className="font-bold text-slate-800 text-[11px]">Bus No. 15</span>
                  <span className="text-[10px] font-semibold text-amber-700 bg-amber-50 px-1 py-0.2 rounded border border-amber-200">
                    Delayed (+8m)
                  </span>
                </div>
                <div className="mt-1.5 space-y-0.5 text-[10px] text-slate-600">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Driver:</span>
                    <span className="font-semibold text-slate-800">Rashid Mehmood</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Speed:</span>
                    <span className="font-bold text-amber-600">18 km/h</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 4. BUS 09 (Node on Grand Avenue) */}
        {vehicles.some((v) => v.id === 'bus-09') && (
          <div
            onClick={() => {
              const bus = vehicles.find((v) => v.id === 'bus-09');
              if (bus) onSelectVehicle(bus);
            }}
            className="absolute left-[690px] top-[320px] z-20 cursor-pointer pointer-events-auto group"
            data-purpose="marker-bus-09"
            title="Bus No. 09 (Bilal Ahmed • 38 km/h)"
          >
            <div className="relative flex items-center justify-center">
              <span className="animate-ping absolute inline-flex h-6 w-6 rounded-full bg-amber-400 opacity-30"></span>
              <div
                className={`w-4 h-4 rounded-full bg-amber-400 ring-4 ring-white shadow-md transition-transform group-hover:scale-125 ${
                  activeVehicle?.id === 'bus-09' ? 'ring-blue-500 scale-125' : ''
                }`}
              ></div>
            </div>

            {/* Attached Callout Popup when active */}
            {activeVehicle?.id === 'bus-09' && (
              <div className="absolute top-6 -left-20 mt-1 w-44 bg-white/95 backdrop-blur-md rounded-xl p-2.5 shadow-xl border border-slate-200/90 text-xs animate-in fade-in zoom-in-95 duration-150">
                <div className="flex items-center justify-between pb-1 border-b border-slate-100">
                  <span className="font-bold text-slate-800 text-[11px]">Bus No. 09</span>
                  <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-1 py-0.2 rounded">
                    On Route
                  </span>
                </div>
                <div className="mt-1 space-y-0.5 text-[10px] text-slate-600">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Driver:</span>
                    <span className="font-semibold text-slate-800">Bilal Ahmed</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Speed:</span>
                    <span className="font-bold text-emerald-600">38 km/h</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Top-Right Floating Map Controls */}
      <div className="absolute top-4 right-4 flex flex-col gap-2 z-30">
        <div className="bg-white rounded-xl shadow-md border border-slate-200/80 flex flex-col overflow-hidden text-slate-600">
          <button
            type="button"
            onClick={handleZoomIn}
            className="w-8 h-8 flex items-center justify-center hover:bg-slate-100 hover:text-slate-900 border-b border-slate-100 text-base font-bold transition cursor-pointer"
            title="Zoom In"
          >
            <MdAdd size={16} />
          </button>
          <button
            type="button"
            onClick={handleZoomOut}
            className="w-8 h-8 flex items-center justify-center hover:bg-slate-100 hover:text-slate-900 border-b border-slate-100 text-base font-bold transition cursor-pointer"
            title="Zoom Out"
          >
            <MdRemove size={16} />
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="w-8 h-8 flex items-center justify-center hover:bg-slate-100 hover:text-slate-900 transition text-slate-500 cursor-pointer"
            title="Reset Map View"
          >
            <MdCenterFocusStrong size={15} />
          </button>
        </div>

        <button
          type="button"
          onClick={onCycleViewMode}
          className="w-8 h-8 bg-white rounded-xl shadow-md border border-slate-200/80 flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition cursor-pointer"
          title={`Layer Mode: ${mapViewMode} (Click to toggle)`}
        >
          <MdLayers size={16} className={isTraffic ? 'text-amber-600' : isSatellite ? 'text-blue-600' : ''} />
        </button>
      </div>

      {/* Bottom Telematics & Legend Bar */}
      <div className="relative z-20 p-4 flex items-center justify-between pointer-events-none flex-wrap gap-2">
        {/* Legend Pill */}
        <div className="bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-semibold text-slate-700 shadow-sm border border-slate-200 pointer-events-auto flex items-center gap-3">
          <span className="text-slate-400 font-bold">Legend:</span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Optimal</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            <span>Delayed (&gt;5m)</span>
          </span>
        </div>

        {/* GPS Connection Status Navy Pill */}
        <div className="bg-slate-900 text-white px-3.5 py-1.5 rounded-full text-xs font-medium shadow-md pointer-events-auto flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>GPS 5G Link: 99.8%</span>
          </div>
          <span className="text-slate-600">|</span>
          <div className="font-mono text-[11px] text-slate-300">
            Lat: {activeVehicle?.coordinates?.lat || '31.5204° N'} &nbsp; Lng: {activeVehicle?.coordinates?.lng || '74.3587° E'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveTrackingMap;
