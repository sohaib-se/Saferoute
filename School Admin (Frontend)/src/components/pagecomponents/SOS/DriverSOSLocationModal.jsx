import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import {
  MdDirectionsBus,
  MdLocationOn,
  MdCheckCircle,
  MdOpenInNew,
  MdPerson,
  MdAccessTime,
  MdDeleteOutline,
} from 'react-icons/md';
import Modal from '../../common/Modal';

const DriverSOSLocationModal = ({
  isOpen,
  onClose,
  alert,
  onResolveAlert,
  onDeleteAlert,
}) => {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);

  const lat = alert?.latitude != null ? Number(alert.latitude) : null;
  const lng = alert?.longitude != null ? Number(alert.longitude) : null;
  const hasValidCoords = lat != null && lng != null && !isNaN(lat) && !isNaN(lng) && lat !== 0;

  const vehicleName = alert?.vehicle_name || 'Fleet Bus';
  const driverName = alert?.sender_name || 'Driver';
  const isCritical = alert?.status === 'active';
  const alertId = alert?.id ? `SOS-${alert.id.slice(0, 4).toUpperCase()}` : 'ALERT';

  const timeStr = alert?.created_at
    ? new Date(alert.created_at).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
    : 'Recent';

  // Initialize and render Leaflet map
  useEffect(() => {
    if (!isOpen || !hasValidCoords || !mapContainerRef.current) return;

    // Center on exact driver location
    const center = [lat, lng];

    const map = L.map(mapContainerRef.current, {
      center,
      zoom: 16,
      zoomControl: true,
      attributionControl: false,
    });

    // High-resolution Google Streets Tile Layer
    L.tileLayer('https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
      maxZoom: 20,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    }).addTo(map);

    // Custom pulsing Bus Marker Icon
    const busMarkerHtml = `
      <div style="display:flex;flex-direction:column;align-items:center;transform:translate(-50%, -50%);">
        <div style="position:relative;display:flex;align-items:center;justify-content:center;">
          <div style="position:absolute;width:56px;height:56px;border-radius:50%;background:rgba(220,38,38,0.35);animation:ping 1.5s cubic-bezier(0,0,0.2,1) infinite;"></div>
          <div style="width:44px;height:44px;border-radius:22px;background:#DC2626;border:3px solid #FFFFFF;box-shadow:0 4px 14px rgba(220,38,38,0.5);display:flex;align-items:center;justify-content:center;color:#FFFFFF;">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M4 16c0 .88.39 1.67 1 2.22V20c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h8v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1.78c.61-.55 1-1.34 1-2.22V6c0-3.5-3.58-4-8-4s-8 .5-8 4v10zm3.5 1c-.83 0-1.5-.67-1.5-1.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17zm9 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm1.5-6H6V6h12v5z"/>
            </svg>
          </div>
        </div>
        <div style="background:#0F172A;color:#FFFFFF;font-size:11px;font-weight:700;padding:3px 10px;border-radius:8px;margin-top:5px;box-shadow:0 2px 8px rgba(0,0,0,0.35);white-space:nowrap;border:1px solid rgba(255,255,255,0.2);">
          ${vehicleName} • ${driverName}
        </div>
      </div>
    `;

    const busIcon = L.divIcon({
      className: 'driver-sos-bus-marker',
      html: busMarkerHtml,
      iconSize: [110, 60],
      iconAnchor: [55, 30],
    });

    const marker = L.marker(center, { icon: busIcon }).addTo(map);

    marker.bindPopup(`
      <div style="font-family:sans-serif;font-size:12px;padding:3px;">
        <strong style="font-size:13px;color:#0F172A;">${vehicleName}</strong><br/>
        <span style="color:#475569;">Driver: ${driverName}</span><br/>
        <span style="color:#DC2626;font-weight:bold;font-family:monospace;">${lat.toFixed(5)}° N, ${lng.toFixed(5)}° E</span>
      </div>
    `).openPopup();

    mapInstanceRef.current = map;

    // Handle container dimensions when modal opens
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 200);

    return () => {
      clearTimeout(timer);
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [isOpen, hasValidCoords, lat, lng, vehicleName, driverName]);

  if (!isOpen || !alert) return null;

  const handleOpenGoogleMaps = () => {
    if (hasValidCoords) {
      window.open(`https://www.google.com/maps?q=${lat},${lng}`, '_blank');
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      icon={<MdDirectionsBus size={22} className="text-red-600" />}
      title={`Driver Emergency SOS • ${vehicleName}`}
      subtitle={`Distress beacon #${alertId} • Driver: ${driverName}`}
      maxWidth="max-w-3xl"
    >
      <div className="p-6 space-y-4">
        {/* Status & Details Banner */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl text-xs">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-1.5 font-bold text-slate-800">
              <MdPerson className="w-4 h-4 text-slate-400" />
              <span>{driverName}</span>
            </div>
            <div className="flex items-center gap-1.5 font-bold text-slate-800">
              <MdDirectionsBus className="w-4 h-4 text-blue-600" />
              <span>{vehicleName}</span>
            </div>
            <div className="flex items-center gap-1.5 font-medium text-slate-500">
              <MdAccessTime className="w-4 h-4 text-slate-400" />
              <span>{timeStr}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span
              className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                isCritical
                  ? 'bg-red-100 text-red-700 border border-red-200 animate-pulse'
                  : 'bg-emerald-100 text-emerald-700 border border-emerald-200'
              }`}
            >
              {isCritical ? 'Active Distress Beacon' : 'Incident Resolved'}
            </span>
          </div>
        </div>

        {/* Map Container */}
        {hasValidCoords ? (
          <div className="relative rounded-2xl overflow-hidden border border-slate-300 shadow-inner">
            <div
              ref={mapContainerRef}
              className="w-full h-[400px] z-10"
              style={{ minHeight: '400px' }}
            />

            {/* Overlay Badge for Coordinates */}
            <div className="absolute bottom-3 left-3 z-[1000] bg-white/95 backdrop-blur-xs px-3 py-1.5 rounded-xl border border-slate-200 shadow-md text-xs font-semibold text-slate-800 flex items-center gap-1.5">
              <MdLocationOn className="w-4 h-4 text-red-600" />
              <span className="font-mono text-slate-900 font-bold">
                {lat.toFixed(5)}° N, {lng.toFixed(5)}° E
              </span>
            </div>
          </div>
        ) : (
          <div className="p-12 text-center bg-slate-50 border border-slate-200 rounded-2xl">
            <MdLocationOn size={36} className="text-slate-400 mx-auto mb-2" />
            <p className="text-sm font-bold text-slate-700">No Exact Coordinates Available</p>
            <p className="text-xs text-slate-500 mt-1">
              The driver device did not report satellite coordinates during this alert.
            </p>
          </div>
        )}

        {/* Modal Footer Controls */}
        <div className="pt-2 flex items-center justify-between gap-3 border-t border-slate-100">
          <button
            type="button"
            onClick={handleOpenGoogleMaps}
            disabled={!hasValidCoords}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 transition shadow-2xs cursor-pointer disabled:opacity-50"
          >
            <MdOpenInNew className="w-4 h-4 text-slate-500" />
            <span>Open in Google Maps</span>
          </button>

          <div className="flex items-center gap-2">
            {onDeleteAlert && (
              <button
                type="button"
                onClick={() => {
                  if (window.confirm(`Delete SOS incident #${alertId}?`)) {
                    onDeleteAlert(alert.id);
                    onClose();
                  }
                }}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 border border-rose-200 transition-colors cursor-pointer"
                title="Delete SOS Alert"
              >
                <MdDeleteOutline className="w-4 h-4" />
                <span>Delete</span>
              </button>
            )}
            {isCritical && onResolveAlert && (
              <button
                type="button"
                onClick={() => {
                  onResolveAlert(alert.id);
                  onClose();
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                <MdCheckCircle className="w-4 h-4" />
                <span>Mark as Resolved</span>
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default DriverSOSLocationModal;
