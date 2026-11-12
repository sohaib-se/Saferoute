import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import { Ionicons } from '@expo/vector-icons';
import { shadows } from '../../../../lib/theme';

const MapWebView = WebView as any;

export interface OpenStreetMapLiveViewProps {
  vehicleName?: string;
  driverName?: string;
  latitude?: number;
  longitude?: number;
  isTripActive?: boolean;
}

export const OpenStreetMapLiveView: React.FC<OpenStreetMapLiveViewProps> = ({
  vehicleName = 'Bus 1',
  driverName = 'Farhan Khan',
  latitude = 34.0100649,
  longitude = 71.6738585,
  isTripActive = false,
}) => {
  const webViewRef = useRef<any>(null);

  // Send real-time updates to Leaflet without reloading the WebView
  useEffect(() => {
    if (webViewRef.current) {
      const script = `
        if (window.setTripActiveStatus) {
          window.setTripActiveStatus(${isTripActive}, ${latitude}, ${longitude}, '${vehicleName}');
        } else if (window.updateBusPosition) {
          window.updateBusPosition(${latitude}, ${longitude}, '${vehicleName}');
        }
        true;
      `;
      webViewRef.current.injectJavaScript(script);
    }
  }, [isTripActive, latitude, longitude, vehicleName]);

  const recenterMap = () => {
    if (webViewRef.current) {
      webViewRef.current.injectJavaScript(`
        if (window.recenterOnBus) {
          window.recenterOnBus();
        }
        true;
      `);
    }
  };

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
  <style>
    * {
      box-sizing: border-box;
      -webkit-touch-callout: none;
      -webkit-user-select: none;
    }
    html, body, #map {
      width: 100%;
      height: 100%;
      margin: 0;
      padding: 0;
      background: #F8FAFC;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    }
    .leaflet-control-zoom {
      border: none !important;
      box-shadow: 0 4px 14px rgba(15, 23, 42, 0.12) !important;
      border-radius: 12px !important;
      overflow: hidden;
      margin-top: 14px !important;
      margin-left: 14px !important;
    }
    .leaflet-control-zoom a {
      background: #FFFFFF !important;
      color: #0F172A !important;
      border-bottom: 1px solid #E2E8F0 !important;
      width: 36px !important;
      height: 36px !important;
      line-height: 36px !important;
      font-size: 16px !important;
      font-weight: bold !important;
    }
    /* Layer control styling */
    .leaflet-control-layers {
      border-radius: 12px !important;
      box-shadow: 0 4px 14px rgba(15, 23, 42, 0.12) !important;
      border: 1px solid #E2E8F0 !important;
      font-size: 12px !important;
      font-weight: 600 !important;
      color: #0F172A !important;
      padding: 6px 10px !important;
      margin-top: 14px !important;
      margin-right: 14px !important;
    }
    /* Custom Van Pin with Pulse Effect */
    .bus-marker-wrap {
      display: flex;
      flex-direction: column;
      align-items: center;
      transform: translate(-50%, -50%);
      transition: all 0.5s ease-out;
    }
    .bus-pin-circle {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background: linear-gradient(135deg, #007AFF 0%, #0056B3 100%);
      border: 3px solid #FFFFFF;
      box-shadow: 0 6px 16px rgba(0, 122, 255, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      color: #FFFFFF;
      font-size: 22px;
      position: relative;
    }
    .bus-pulse {
      position: absolute;
      width: 64px;
      height: 64px;
      border-radius: 50%;
      background: rgba(0, 122, 255, 0.35);
      animation: pulse 2.2s infinite ease-out;
      pointer-events: none;
    }
    @keyframes pulse {
      0% { transform: scale(0.6); opacity: 1; }
      100% { transform: scale(1.7); opacity: 0; }
    }
    .bus-badge {
      background: #0F172A;
      color: #38BDF8;
      font-size: 11px;
      font-weight: 800;
      padding: 3px 9px;
      border-radius: 10px;
      margin-top: 4px;
      white-space: nowrap;
      box-shadow: 0 3px 8px rgba(0,0,0,0.3);
      border: 1px solid rgba(255,255,255,0.15);
    }
    .leaflet-popup-content-wrapper {
      border-radius: 14px;
      box-shadow: 0 8px 24px rgba(15, 23, 42, 0.18);
    }
    .leaflet-popup-content {
      margin: 10px 14px;
      font-size: 12.5px;
      line-height: 1.4;
      font-weight: 600;
      color: #0F172A;
    }
  </style>
</head>
<body>
  <div id="map"></div>

  <script>
    var isTripActive = ${isTripActive ? 'true' : 'false'};
    var currentLat = ${latitude};
    var currentLng = ${longitude};
    var vanName = '${vehicleName}';
    var driverName = '${driverName}';
    var currentBusCoord = [currentLat, currentLng];

    // Initialize Map centered on the Driver's coordinates
    var map = L.map('map', {
      zoomControl: true,
      attributionControl: false
    }).setView(currentBusCoord, 15);

    // 1. Google Maps Streets Tile Layer (Direct Google Tile Server)
    var googleRoads = L.tileLayer('https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
      maxZoom: 20,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    }).addTo(map);

    // 2. Google Maps Hybrid Satellite Tile Layer (Satellite with roads & labels)
    var googleSat = L.tileLayer('https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}', {
      maxZoom: 20,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    });

    // 3. OpenStreetMap standard fallback layer
    var osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19
    });

    // Layer switcher control (Roads, Satellite, OpenStreetMap)
    var baseMaps = {
      "🗺️ Google Streets": googleRoads,
      "🛰️ Google Satellite": googleSat,
      "📍 Street Names": osmLayer
    };
    L.control.layers(baseMaps, null, { position: 'topright' }).addTo(map);

    var busMarker = null;

    // Dynamic Moving Bus Marker (ONLY driver live location, no school/home markers)
    function createBusHtml(name) {
      return '<div class="bus-marker-wrap">' +
             '  <div class="bus-pulse"></div>' +
             '  <div class="bus-pin-circle">🚐</div>' +
             '  <div class="bus-badge">' + name + '</div>' +
             '</div>';
    }

    function initBusMarker(latLng, name) {
      var busIcon = L.divIcon({
        className: '',
        html: createBusHtml(name || vanName),
        iconSize: [80, 80],
        iconAnchor: [40, 40]
      });
      busMarker = L.marker(latLng, { icon: busIcon }).addTo(map)
        .bindPopup('<b>' + (name || vanName) + '</b><br/>Driver: ' + driverName);
    }

    // Only create and show pointer if trip is currently active
    if (isTripActive && typeof currentLat === 'number' && typeof currentLng === 'number') {
      initBusMarker(currentBusCoord, vanName);
    }

    // Dynamically toggle trip active state
    window.setTripActiveStatus = function(active, newLat, newLng, newName) {
      isTripActive = Boolean(active);
      if (isTripActive && typeof newLat === 'number' && typeof newLng === 'number') {
        var pos = [newLat, newLng];
        if (!busMarker) {
          initBusMarker(pos, newName);
          map.setView(pos, 17, { animate: true, duration: 0.8 });
        } else {
          busMarker.setLatLng(pos);
          map.panTo(pos, { animate: true, duration: 0.8 });
        }
      } else {
        if (busMarker) {
          map.removeLayer(busMarker);
          busMarker = null;
        }
      }
    };

    // Smooth update function called from React Native
    window.updateBusPosition = function(newLat, newLng, newName) {
      if (!isTripActive) return;
      if (typeof newLat !== 'number' || typeof newLng !== 'number') return;
      var newPos = [newLat, newLng];
      if (!busMarker) {
        initBusMarker(newPos, newName);
      } else {
        busMarker.setLatLng(newPos);
        busMarker.setIcon(L.divIcon({
          className: '',
          html: createBusHtml(newName || vanName),
          iconSize: [80, 80],
          iconAnchor: [40, 40]
        }));
      }
      map.panTo(newPos, { animate: true, duration: 0.8 });
    };

    // Recenter vehicle and zoom in to street level (zoom 17)
    window.recenterOnBus = function() {
      if (busMarker) {
        map.setView(busMarker.getLatLng(), 17, { animate: true, duration: 0.8 });
      }
    };
  </script>
</body>
</html>
  `;

  return (
    <View style={styles.container}>
      <MapWebView
        ref={webViewRef}
        source={{ html: htmlContent }}
        style={styles.webView}
        originWhitelist={['*']}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        scalesPageToFit={false}
        scrollEnabled={false}
      />

      {/* Recenter Button Overlay - only visible when trip is active */}
      {isTripActive && (
        <TouchableOpacity
          style={styles.recenterBtn}
          onPress={recenterMap}
          activeOpacity={0.8}
        >
          <Ionicons name="navigate" size={17} color="#007AFF" />
          <Text style={styles.recenterText}>Recenter Vehicle</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    position: 'relative',
    backgroundColor: '#F8FAFC',
  },
  webView: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  recenterBtn: {
    position: 'absolute',
    bottom: 14,
    right: 14,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
    gap: 6,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    ...shadows.card,
  },
  recenterText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F172A',
  },
});

