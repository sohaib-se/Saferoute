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
  speedKmh?: number;
  distanceKm?: number;
  schoolName?: string;
  homeAddress?: string;
}

export const OpenStreetMapLiveView: React.FC<OpenStreetMapLiveViewProps> = ({
  vehicleName = 'Assigned Van',
  driverName = 'Assigned Driver',
  latitude = 33.6844,
  longitude = 73.0479,
  speedKmh = 38,
  distanceKm = 1.8,
  schoolName = 'School Campus',
  homeAddress = 'Student Stop',
}) => {
  const webViewRef = useRef<any>(null);

  // Send real-time updates to Leaflet without reloading the WebView
  useEffect(() => {
    if (webViewRef.current) {
      const script = `
        if (window.updateBusPosition) {
          window.updateBusPosition(${latitude}, ${longitude}, ${speedKmh}, '${vehicleName}');
        }
        true;
      `;
      webViewRef.current.injectJavaScript(script);
    }
  }, [latitude, longitude, speedKmh, vehicleName]);

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
      width: 42px;
      height: 42px;
      border-radius: 50%;
      background: linear-gradient(135deg, #007AFF 0%, #0056B3 100%);
      border: 3px solid #FFFFFF;
      box-shadow: 0 6px 16px rgba(0, 122, 255, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      color: #FFFFFF;
      font-size: 21px;
      position: relative;
    }
    .bus-pulse {
      position: absolute;
      width: 60px;
      height: 60px;
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
      font-size: 10.5px;
      font-weight: 800;
      padding: 3px 8px;
      border-radius: 10px;
      margin-top: 4px;
      white-space: nowrap;
      box-shadow: 0 3px 8px rgba(0,0,0,0.3);
      border: 1px solid rgba(255,255,255,0.15);
    }
    /* Stop Pins */
    .stop-marker-school {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: #059669;
      border: 2.5px solid #FFFFFF;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #FFFFFF;
      font-size: 15px;
      box-shadow: 0 4px 10px rgba(5, 150, 105, 0.4);
    }
    .stop-marker-home {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: #8B5CF6;
      border: 2.5px solid #FFFFFF;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #FFFFFF;
      font-size: 15px;
      box-shadow: 0 4px 10px rgba(139, 92, 246, 0.4);
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
    var currentLat = ${latitude};
    var currentLng = ${longitude};
    var speed = ${speedKmh};
    var vanName = '${vehicleName}';

    // School Campus & Home Stop coordinates in Sector G-10 / Islamabad
    var schoolCoord = [33.6938, 73.0336];
    var homeCoord = [33.6745, 73.0594];
    var currentBusCoord = [currentLat, currentLng];

    // Initialize Map with zoom
    var map = L.map('map', {
      zoomControl: true,
      attributionControl: false
    }).setView(currentBusCoord, 14);

    // 1. OpenStreetMap standard tile provider with full global road and location names
    var osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      detectRetina: true
    }).addTo(map);

    // 2. Esri Satellite Imagery Layer (Free, no API key needed)
    var satLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      maxZoom: 19
    });

    // Layer switcher control
    var baseMaps = {
      "🗺️ Street Names": osmLayer,
      "🛰️ Satellite": satLayer
    };
    L.control.layers(baseMaps, null, { position: 'topright' }).addTo(map);

    // Route Polyline connecting Depot -> Van -> Home
    var routePoints = [
      schoolCoord,
      [33.6895, 73.0402],
      currentBusCoord,
      [33.6801, 73.0532],
      homeCoord
    ];

    var polyline = L.polyline(routePoints, {
      color: '#007AFF',
      weight: 5,
      opacity: 0.85,
      smoothFactor: 1
    }).addTo(map);

    // 1. School Campus Marker
    var schoolIcon = L.divIcon({
      className: '',
      html: '<div class="stop-marker-school">🏫</div>',
      iconSize: [32, 32],
      iconAnchor: [16, 16]
    });
    L.marker(schoolCoord, { icon: schoolIcon }).addTo(map)
      .bindPopup('<b>${schoolName}</b><br/>Depot & Morning Campus Gate');

    // 2. Student Home Stop Marker
    var homeIcon = L.divIcon({
      className: '',
      html: '<div class="stop-marker-home">🏠</div>',
      iconSize: [32, 32],
      iconAnchor: [16, 16]
    });
    L.marker(homeCoord, { icon: homeIcon }).addTo(map)
      .bindPopup('<b>Designated Home Stop</b><br/>${homeAddress}');

    // 3. Dynamic Moving Bus Marker
    function createBusHtml(name, spd) {
      return '<div class="bus-marker-wrap">' +
             '  <div class="bus-pulse"></div>' +
             '  <div class="bus-pin-circle">🚐</div>' +
             '  <div class="bus-badge">' + name + ' • ' + spd + ' km/h</div>' +
             '</div>';
    }

    var busIcon = L.divIcon({
      className: '',
      html: createBusHtml(vanName, speed),
      iconSize: [80, 80],
      iconAnchor: [40, 40]
    });

    var busMarker = L.marker(currentBusCoord, { icon: busIcon }).addTo(map)
      .bindPopup('<b>' + vanName + '</b><br/>Driver: ${driverName}<br/>Live Speed: ' + speed + ' km/h');

    // Smooth update function called by React Native injection
    window.updateBusPosition = function(newLat, newLng, newSpeed, newName) {
      var newPos = [newLat, newLng];
      busMarker.setLatLng(newPos);
      busMarker.setIcon(L.divIcon({
        className: '',
        html: createBusHtml(newName || vanName, newSpeed),
        iconSize: [80, 80],
        iconAnchor: [40, 40]
      }));

      // Update route polyline middle position
      routePoints[2] = newPos;
      polyline.setLatLngs(routePoints);
    };

    window.recenterOnBus = function() {
      map.panTo(busMarker.getLatLng(), { animate: true, duration: 0.8 });
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

      {/* Recenter Button Overlay */}
      <TouchableOpacity
        style={styles.recenterBtn}
        onPress={recenterMap}
        activeOpacity={0.8}
      >
        <Ionicons name="navigate" size={17} color="#007AFF" />
        <Text style={styles.recenterText}>Recenter Van</Text>
      </TouchableOpacity>
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
