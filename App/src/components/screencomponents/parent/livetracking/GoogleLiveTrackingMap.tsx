import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import { TrackingMapCanvas } from './TrackingMapCanvas';
import { shadows } from '../../../../lib/theme';

export interface GoogleLiveTrackingMapProps {
  vehicleName?: string;
  driverName?: string;
  latitude?: number;
  longitude?: number;
  speedKmh?: number;
  distanceKm?: number;
}

export const GoogleLiveTrackingMap: React.FC<GoogleLiveTrackingMapProps> = ({
  vehicleName = 'Bus 1',
  driverName = 'Hilal',
  latitude = 33.6844,
  longitude = 73.0479,
  speedKmh = 38,
  distanceKm = 2.1,
}) => {
  const [mapMode, setMapMode] = useState<'google' | 'canvas'>('google');
  const mapRef = useRef<MapView>(null);

  // Default route points in Islamabad / Rawalpindi sector
  const routeCoordinates = [
    { latitude: 33.6938, longitude: 73.0336 }, // School Depot
    { latitude: 33.6895, longitude: 73.0402 },
    { latitude: latitude, longitude: longitude }, // Current Bus Position
    { latitude: 33.6801, longitude: 73.0532 },
    { latitude: 33.6745, longitude: 73.0594 }, // Home Stop
  ];

  useEffect(() => {
    if (mapMode === 'google' && mapRef.current) {
      mapRef.current.animateToRegion(
        {
          latitude,
          longitude,
          latitudeDelta: 0.025,
          longitudeDelta: 0.025,
        },
        800
      );
    }
  }, [latitude, longitude, mapMode]);

  return (
    <View style={styles.container}>
      {mapMode === 'google' ? (
        <MapView
          ref={mapRef}
          style={StyleSheet.absoluteFill}
          provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : undefined}
          initialRegion={{
            latitude,
            longitude,
            latitudeDelta: 0.03,
            longitudeDelta: 0.03,
          }}
          showsCompass={true}
          showsBuildings={true}
        >
          {/* Active Route Polyline */}
          <Polyline
            coordinates={routeCoordinates}
            strokeColor="#007AFF"
            strokeWidth={4}
            lineDashPattern={[0]}
          />

          {/* School Depot Marker */}
          <Marker
            coordinate={{ latitude: 33.6938, longitude: 73.0336 }}
            title="School Campus"
            description="Departure Depot"
          >
            <View style={styles.depotMarker}>
              <Ionicons name="school" size={14} color="#FFFFFF" />
            </View>
          </Marker>

          {/* Home Stop Marker */}
          <Marker
            coordinate={{ latitude: 33.6745, longitude: 73.0594 }}
            title="Designated Home Stop"
            description="Khatme Nabuwat Chowk"
          >
            <View style={styles.homeMarker}>
              <Ionicons name="home" size={14} color="#FFFFFF" />
            </View>
          </Marker>

          {/* Moving Vehicle Marker */}
          <Marker
            coordinate={{ latitude, longitude }}
            title={vehicleName}
            description={`Driver: ${driverName} • ${speedKmh} km/h`}
            anchor={{ x: 0.5, y: 0.5 }}
          >
            <View style={styles.busMarkerContainer}>
              <View style={styles.busPulseRing} />
              <View style={styles.busPin}>
                <Ionicons name="bus" size={15} color="#FFFFFF" />
              </View>
              <View style={styles.busSpeedBadge}>
                <Text style={styles.busSpeedText}>{speedKmh} km/h</Text>
              </View>
            </View>
          </Marker>
        </MapView>
      ) : (
        <TrackingMapCanvas
          vehicleName={vehicleName}
          driverName={driverName}
          speedKmh={speedKmh}
          distanceKm={distanceKm}
        />
      )}

      {/* Floating Map Mode Toggle */}
      <View style={styles.modeToggleRow}>
        <TouchableOpacity
          style={[styles.toggleBtn, mapMode === 'google' && styles.toggleBtnActive]}
          onPress={() => setMapMode('google')}
          activeOpacity={0.8}
        >
          <Ionicons
            name="map"
            size={13}
            color={mapMode === 'google' ? '#FFFFFF' : '#475569'}
          />
          <Text
            style={[
              styles.toggleBtnText,
              mapMode === 'google' && styles.toggleBtnTextActive,
            ]}
          >
            Google Map
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.toggleBtn, mapMode === 'canvas' && styles.toggleBtnActive]}
          onPress={() => setMapMode('canvas')}
          activeOpacity={0.8}
        >
          <Ionicons
            name="radio"
            size={13}
            color={mapMode === 'canvas' ? '#FFFFFF' : '#475569'}
          />
          <Text
            style={[
              styles.toggleBtnText,
              mapMode === 'canvas' && styles.toggleBtnTextActive,
            ]}
          >
            Transit Radar
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: '#E0F2FE',
  },
  modeToggleRow: {
    position: 'absolute',
    top: 12,
    right: 14,
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.94)',
    borderRadius: 20,
    padding: 3,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 4,
    zIndex: 10,
    ...shadows.card,
  },
  toggleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 16,
    gap: 4,
  },
  toggleBtnActive: {
    backgroundColor: '#007AFF',
  },
  toggleBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#475569',
  },
  toggleBtnTextActive: {
    color: '#FFFFFF',
  },
  depotMarker: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#059669',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    ...shadows.card,
  },
  homeMarker: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#8B5CF6',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    ...shadows.card,
  },
  busMarkerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  busPulseRing: {
    position: 'absolute',
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0, 122, 255, 0.25)',
  },
  busPin: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    ...shadows.card,
  },
  busSpeedBadge: {
    backgroundColor: '#0F172A',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    marginTop: 2,
  },
  busSpeedText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#38BDF8',
  },
});
