import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import {
  MdAdd,
  MdRemove,
  MdCenterFocusStrong,
  MdLayers,
  MdDirectionsBus,
} from 'react-icons/md';

const LiveTrackingMap = ({
  vehicles = [],
  selectedVehicle,
  onSelectVehicle,
  mapViewMode = 'Roads',
  onCycleViewMode,
  onResetView,
}) => {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const layersRef = useRef({});
  const markersRef = useRef({});

  // 1. Initialize Leaflet Map with Google Maps Tile Layers
  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Default center on active Peshawar region
    const defaultCenter = [34.0100649, 71.6738585];

    const map = L.map(mapContainerRef.current, {
      center: defaultCenter,
      zoom: 15,
      zoomControl: false, // We use custom styled controls
      attributionControl: false,
    });

    // 1. Google Streets Tile Layer (Direct Google Tile Server, No Key Needed)
    const googleRoads = L.tileLayer(
      'https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
      {
        maxZoom: 20,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
      }
    ).addTo(map);

    // 2. Google Satellite Hybrid Layer (Satellite Imagery + Street Names)
    const googleSatellite = L.tileLayer(
      'https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}',
      {
        maxZoom: 20,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
      }
    );

    // 3. OpenStreetMap Fallback Layer
    const osmLayer = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 19,
      }
    );

    layersRef.current = {
      roads: googleRoads,
      satellite: googleSatellite,
      osm: osmLayer,
    };

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // 2. Switch base layers on mapViewMode change
  useEffect(() => {
    const map = mapInstanceRef.current;
    const { roads, satellite, osm } = layersRef.current;
    if (!map || !roads || !satellite) return;

    if (mapViewMode === 'Satellite') {
      if (map.hasLayer(roads)) map.removeLayer(roads);
      if (map.hasLayer(osm)) map.removeLayer(osm);
      if (!map.hasLayer(satellite)) satellite.addTo(map);
    } else {
      if (map.hasLayer(satellite)) map.removeLayer(satellite);
      if (map.hasLayer(osm)) map.removeLayer(osm);
      if (!map.hasLayer(roads)) roads.addTo(map);
    }
  }, [mapViewMode]);

  // 3. Render and update driver live location markers (Strictly NO school or home markers)
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Filter to only vehicles that have real-time coordinates
    const validVehicles = vehicles.filter(
      (v) =>
        v &&
        typeof v.latitude === 'number' &&
        typeof v.longitude === 'number' &&
        !isNaN(v.latitude) &&
        !isNaN(v.longitude)
    );

    const activeNames = new Set(validVehicles.map((v) => v.name));

    // Remove markers of vehicles that are no longer active
    Object.keys(markersRef.current).forEach((vName) => {
      if (!activeNames.has(vName)) {
        map.removeLayer(markersRef.current[vName]);
        delete markersRef.current[vName];
      }
    });

    // Create or update markers for each active vehicle
    validVehicles.forEach((vehicle) => {
      const isSelected = selectedVehicle?.name === vehicle.name;
      const isDelayed = vehicle.statusType === 'delayed' || vehicle.status === 'Delayed';

      const ringColor = isSelected
        ? 'rgba(37, 99, 235, 0.35)'
        : isDelayed
        ? 'rgba(245, 158, 11, 0.3)'
        : 'rgba(16, 185, 129, 0.28)';

      const pinBg = isSelected
        ? '#2563EB'
        : isDelayed
        ? '#F59E0B'
        : '#10B981';

      const badgeColor = isSelected
        ? '#60A5FA'
        : isDelayed
        ? '#FBBF24'
        : '#34D399';

      const customIcon = L.divIcon({
        className: 'custom-fleet-bus-marker',
        html: `
          <div style="display:flex;flex-direction:column;align-items:center;transform:translate(-50%, -50%);cursor:pointer;">
            <div style="position:relative;display:flex;align-items:center;justify-content:center;">
              <div style="position:absolute;width:48px;height:48px;border-radius:50%;background:${ringColor};animation:pulse 2s infinite ease-out;"></div>
              <div style="width:36px;height:36px;border-radius:18px;background:${pinBg};border:2.5px solid #FFFFFF;box-shadow:0 4px 12px rgba(0,0,0,0.3);display:flex;align-items:center;justify-content:center;color:#FFFFFF;font-size:16px;">
                🚐
              </div>
            </div>
            <div style="background:#0F172A;color:${badgeColor};font-size:11px;font-weight:700;padding:2.5px 8px;border-radius:8px;margin-top:3px;box-shadow:0 2px 6px rgba(0,0,0,0.35);white-space:nowrap;border:1px solid rgba(255,255,255,0.18);">
              ${vehicle.name}
            </div>
          </div>
        `,
        iconSize: [90, 60],
        iconAnchor: [45, 30],
      });

      const latLng = [vehicle.latitude, vehicle.longitude];

      if (markersRef.current[vehicle.name]) {
        // Smoothly update existing marker position and icon
        const existingMarker = markersRef.current[vehicle.name];
        existingMarker.setLatLng(latLng);
        existingMarker.setIcon(customIcon);
      } else {
        // Create new marker
        const newMarker = L.marker(latLng, { icon: customIcon }).addTo(map);

        // Bind informative tooltip popup (No speed)
        newMarker.bindPopup(`
          <div style="font-family:sans-serif;padding:4px;">
            <div style="font-weight:bold;font-size:13px;color:#0F172A;margin-bottom:2px;">${vehicle.name} (${vehicle.plate || 'Active'})</div>
            <div style="font-size:11px;color:#475569;">Driver: <b>${vehicle.driver || 'Assigned Driver'}</b></div>
            <div style="font-size:10px;color:#94A3B8;margin-top:4px;">Status: ${vehicle.status || 'On Route'}</div>
          </div>
        `);

        newMarker.on('click', () => {
          map.setView(latLng, 17, { animate: true, duration: 0.8 });
          if (onSelectVehicle) onSelectVehicle(vehicle);
        });

        markersRef.current[vehicle.name] = newMarker;
      }
    });

    // Auto-center and zoom in on selected vehicle or first active vehicle
    if (selectedVehicle?.latitude && selectedVehicle?.longitude) {
      map.setView([selectedVehicle.latitude, selectedVehicle.longitude], 17, {
        animate: true,
        duration: 0.8,
      });
    } else if (validVehicles.length > 0) {
      // Center on first active vehicle
      map.setView([validVehicles[0].latitude, validVehicles[0].longitude], 15);
    }
  }, [vehicles, selectedVehicle, onSelectVehicle]);

  // Handlers for zoom & controls
  const handleZoomIn = () => {
    mapInstanceRef.current?.zoomIn();
  };

  const handleZoomOut = () => {
    mapInstanceRef.current?.zoomOut();
  };

  const handleReset = () => {
    const valid = vehicles.filter((v) => v.latitude && v.longitude);
    if (valid.length > 0 && mapInstanceRef.current) {
      mapInstanceRef.current.setView([valid[0].latitude, valid[0].longitude], 15);
    } else if (mapInstanceRef.current) {
      mapInstanceRef.current.setView([34.0100649, 71.6738585], 15);
    }
    if (onResetView) onResetView();
  };

  const activeVehicle = selectedVehicle || vehicles[0];
  const isSatellite = mapViewMode === 'Satellite';
  const isTraffic = mapViewMode === 'Traffic';
  const hasActiveVehicles = vehicles.some((v) => v.latitude && v.longitude);

  return (
    <div
      className="lg:col-span-8 border border-slate-200/90 rounded-2xl relative overflow-hidden shadow-sm h-[720px] flex flex-col justify-between font-sans select-none bg-slate-100"
      data-purpose="leaflet-google-tiles-map"
    >
      {/* 1. Leaflet Map Viewport Container */}
      <div ref={mapContainerRef} className="absolute inset-0 w-full h-full z-0" />

      {/* 2. Empty-state Banner if no vehicles are broadcasting */}
      {!hasActiveVehicles && (
        <div className="absolute top-4 left-4 z-20 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-xl shadow-md border border-slate-200 flex items-center gap-2.5 text-xs font-semibold text-slate-700 animate-in fade-in duration-300">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping"></span>
          <span>Waiting for drivers to start live shift... (Google Maps Telemetry Active)</span>
        </div>
      )}

      {/* 3. Top-Right Floating Controls (Zoom, Recenter, Layer Switcher) */}
      <div className="absolute top-4 right-4 flex flex-col gap-2 z-30 pointer-events-auto">
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
            title="Recenter Map View"
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
          <MdLayers
            size={16}
            className={isTraffic ? 'text-amber-600' : isSatellite ? 'text-blue-600' : ''}
          />
        </button>
      </div>

      {/* 4. Bottom Telematics & Status Pill Bar */}
      <div className="relative z-20 p-4 flex items-center justify-between pointer-events-none flex-wrap gap-2 mt-auto">
        {/* Map Legend Pill */}
        <div className="bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-semibold text-slate-700 shadow-sm border border-slate-200 pointer-events-auto flex items-center gap-3">
          <span className="text-slate-400 font-bold">Google Tiles:</span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Live Driver</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-blue-600"></span>
            <span>Selected</span>
          </span>
        </div>

        {/* GPS Telemetry Pill */}
        <div className="bg-slate-900 text-white px-3.5 py-1.5 rounded-full text-xs font-medium shadow-md pointer-events-auto flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>GPS Telemetry: Live</span>
          </div>
          <span className="text-slate-600">|</span>
          <div className="font-mono text-[11px] text-slate-300">
            {activeVehicle?.latitude
              ? `Lat: ${Number(activeVehicle.latitude).toFixed(4)}° N  Lng: ${Number(
                  activeVehicle.longitude
                ).toFixed(4)}° E`
              : 'Broadcasting Ready'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveTrackingMap;
