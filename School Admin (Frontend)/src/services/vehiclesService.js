import { supabase } from '../lib/supabaseClient';
import { getCurrentSchoolId } from '../lib/session';

let vehiclesCache = {
  data: null,
  timestamp: 0,
  schoolId: null,
};
let vehiclesInFlight = null;
const CACHE_TTL_MS = 3 * 60 * 1000; // 3 minutes

export const clearVehiclesCache = () => {
  vehiclesCache = { data: null, timestamp: 0, schoolId: null };
  vehiclesInFlight = null;
};

export const getVehicles = async (forceRefresh = false) => {
  const schoolId = getCurrentSchoolId();
  if (!schoolId) {
    throw new Error('No active school session found. Please sign in again.');
  }

  const isCacheValid =
    !forceRefresh &&
    vehiclesCache.data &&
    vehiclesCache.schoolId === schoolId &&
    Date.now() - vehiclesCache.timestamp < CACHE_TTL_MS;

  if (isCacheValid) {
    return vehiclesCache.data;
  }

  if (!forceRefresh && vehiclesInFlight) {
    return vehiclesInFlight;
  }

  vehiclesInFlight = (async () => {
    try {
      const { data, error } = await supabase
        .from('vehicles')
        .select('*')
        .eq('school_id', schoolId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching vehicles:', error);
        throw error;
      }

      const formatted = (data || []).map((v, index) => {
        const driverInitials = v.driver_name
          ? v.driver_name
              .trim()
              .split(' ')
              .map((n) => n[0])
              .slice(0, 2)
              .join('')
              .toUpperCase()
          : 'DR';

        const numMatch = (v.name || '').match(/\d+/);
        const busCode = numMatch ? numMatch[0].padStart(2, '0') : '';
        const isMoving = v.status === 'Running' || v.status === 'On Route';
        const isMaintenance = v.status === 'Maintenance';

        return {
          id: v.id,
          num: index + 1,
          code: busCode,
          name: v.name,
          regNo: v.reg_no,
          model: v.model,
          capacitySeats: v.capacity_seats || '30 Seats',
          driverName: v.driver_name || 'Unassigned',
          driverInitials,
          driverInitialsStyle: 'bg-blue-100 text-blue-700',
          route: v.route || 'Route 1',
          speed: isMoving ? '32 km/h' : '0 km/h',
          speedDot: isMoving ? 'bg-emerald-500' : isMaintenance ? 'bg-rose-500' : 'bg-amber-500',
          signalSub: isMaintenance ? 'Telemetry Disconnected' : 'Signal: Strong 5G',
          status: v.status || 'Running',
          statusBadgeStyle:
            isMoving
              ? 'bg-emerald-50 text-emerald-600 border border-emerald-200/70'
              : v.status === 'Idle' || v.status === 'Standby'
              ? 'bg-amber-50 text-amber-600 border border-amber-200/70'
              : 'bg-rose-50 text-rose-600 border border-rose-200/70',
          statusDotStyle:
            isMoving
              ? 'bg-emerald-500'
              : v.status === 'Idle' || v.status === 'Standby'
              ? 'bg-amber-500'
              : 'bg-rose-500',
        };
      });

      vehiclesCache = {
        data: formatted,
        timestamp: Date.now(),
        schoolId,
      };

      return formatted;
    } finally {
      vehiclesInFlight = null;
    }
  })();

  return vehiclesInFlight;
};

export const addVehicle = async (vehicleData) => {
  const schoolId = getCurrentSchoolId();
  if (!schoolId) {
    throw new Error('No active school session found. Please sign in again.');
  }

  const { data, error } = await supabase
    .from('vehicles')
    .insert([
      {
        school_id: schoolId,
        name: vehicleData.name,
        reg_no: vehicleData.regNo,
        model: vehicleData.model || '',
        capacity_seats: vehicleData.capacitySeats || '30 Seats',
        driver_name: vehicleData.driverName || 'Unassigned',
        route: vehicleData.route || 'Route 1',
        status: vehicleData.status || 'Running',
      },
    ])
    .select()
    .single();

  if (error) {
    console.error('Error adding vehicle:', error);
    throw error;
  }

  clearVehiclesCache();

  return data;
};

export const updateVehicle = async (vehicleId, vehicleData) => {
  const schoolId = getCurrentSchoolId();
  if (!schoolId) {
    throw new Error('No active school session found. Please sign in again.');
  }

  const { data, error } = await supabase
    .from('vehicles')
    .update({
      name: vehicleData.name,
      reg_no: vehicleData.regNo,
      model: vehicleData.model,
      capacity_seats: vehicleData.capacitySeats,
      driver_name: vehicleData.driverName,
      route: vehicleData.route,
      status: vehicleData.status,
    })
    .eq('id', vehicleId)
    .eq('school_id', schoolId)
    .select()
    .single();

  if (error) {
    console.error('Error updating vehicle:', error);
    throw error;
  }

  clearVehiclesCache();

  return data;
};

export const deleteVehicle = async (vehicleId) => {
  const schoolId = getCurrentSchoolId();
  if (!schoolId) {
    throw new Error('No active school session found. Please sign in again.');
  }

  const { error } = await supabase
    .from('vehicles')
    .delete()
    .eq('id', vehicleId)
    .eq('school_id', schoolId);

  if (error) {
    console.error('Error deleting vehicle:', error);
    throw error;
  }

  clearVehiclesCache();

  return true;
};
