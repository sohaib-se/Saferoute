import { supabase } from '../lib/supabaseClient';
import { getCurrentSchoolId } from '../lib/session';
import { clearDriversCache } from './driversService';

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
          route: v.route || 'Unassigned',
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

  const vehicleName = (vehicleData.name || '').trim();
  const assignedDriverName =
    vehicleData.driverName && vehicleData.driverName !== 'Unassigned'
      ? vehicleData.driverName.trim()
      : 'Unassigned';
  const assignedRoute =
    vehicleData.route && vehicleData.route !== 'Unassigned'
      ? vehicleData.route.trim()
      : 'Unassigned';

  const { data, error } = await supabase
    .from('vehicles')
    .insert([
      {
        school_id: schoolId,
        name: vehicleName,
        reg_no: (vehicleData.regNo || '').trim(),
        model: vehicleData.model || '',
        capacity_seats: vehicleData.capacitySeats || '30 Seats',
        driver_name: assignedDriverName,
        route: assignedRoute,
        status: vehicleData.status || 'Running',
      },
    ])
    .select()
    .single();

  if (error) {
    console.error('Error adding vehicle:', error);
    throw error;
  }

  // When a driver and route are assigned to the vehicle, assign them to the driver as well
  if (assignedDriverName !== 'Unassigned') {
    try {
      // 1. Unassign this driver from any other vehicle in this school
      await supabase
        .from('vehicles')
        .update({ driver_name: 'Unassigned' })
        .eq('school_id', schoolId)
        .neq('id', data.id)
        .eq('driver_name', assignedDriverName);

      // 2. Assign the vehicle and route to the driver in the drivers table
      let updateQuery = supabase
        .from('drivers')
        .update({
          vehicle: vehicleName,
          route: assignedRoute,
        })
        .eq('school_id', schoolId);

      if (vehicleData.driverId) {
        updateQuery = updateQuery.eq('id', vehicleData.driverId);
      } else {
        updateQuery = updateQuery.eq('name', assignedDriverName);
      }

      const { error: driverErr } = await updateQuery;
      if (driverErr) {
        console.warn('Could not assign vehicle and route to driver:', driverErr);
      }
    } catch (e) {
      console.warn('Error syncing driver vehicle/route in addVehicle:', e);
    }
  }

  clearVehiclesCache();
  clearDriversCache();

  return data;
};

export const updateVehicle = async (vehicleId, vehicleData) => {
  const schoolId = getCurrentSchoolId();
  if (!schoolId) {
    throw new Error('No active school session found. Please sign in again.');
  }

  // 1. Fetch current vehicle before update to track driver/vehicle changes
  const { data: currentVehicle } = await supabase
    .from('vehicles')
    .select('id, name, driver_name, route')
    .eq('id', vehicleId)
    .eq('school_id', schoolId)
    .maybeSingle();

  const vehicleName = (vehicleData.name || '').trim();
  const assignedDriverName =
    vehicleData.driverName && vehicleData.driverName !== 'Unassigned'
      ? vehicleData.driverName.trim()
      : 'Unassigned';
  const assignedRoute =
    vehicleData.route && vehicleData.route !== 'Unassigned'
      ? vehicleData.route.trim()
      : 'Unassigned';

  // 2. Update vehicle record
  const { data, error } = await supabase
    .from('vehicles')
    .update({
      name: vehicleName,
      reg_no: (vehicleData.regNo || '').trim(),
      model: vehicleData.model || '',
      capacity_seats: vehicleData.capacitySeats,
      driver_name: assignedDriverName,
      route: assignedRoute,
      status: vehicleData.status || 'Running',
    })
    .eq('id', vehicleId)
    .eq('school_id', schoolId)
    .select()
    .single();

  if (error) {
    console.error('Error updating vehicle:', error);
    throw error;
  }

  const prevDriverName =
    currentVehicle?.driver_name && currentVehicle.driver_name !== 'Unassigned'
      ? currentVehicle.driver_name.trim()
      : null;

  try {
    // 3. If previous driver was unassigned or changed to someone else, clear their vehicle & route
    if (prevDriverName && prevDriverName !== assignedDriverName) {
      await supabase
        .from('drivers')
        .update({
          vehicle: 'Unassigned',
          route: 'Unassigned',
        })
        .eq('school_id', schoolId)
        .eq('name', prevDriverName);
    }

    // 4. If a driver is assigned, update their driver record with this vehicle and route
    if (assignedDriverName !== 'Unassigned') {
      // Unlink this driver from any other vehicle they were previously assigned to
      await supabase
        .from('vehicles')
        .update({ driver_name: 'Unassigned' })
        .eq('school_id', schoolId)
        .neq('id', vehicleId)
        .eq('driver_name', assignedDriverName);

      // Assign the vehicle name and route to the driver
      let updateQuery = supabase
        .from('drivers')
        .update({
          vehicle: vehicleName,
          route: assignedRoute,
        })
        .eq('school_id', schoolId);

      if (vehicleData.driverId) {
        updateQuery = updateQuery.eq('id', vehicleData.driverId);
      } else {
        updateQuery = updateQuery.eq('name', assignedDriverName);
      }

      const { error: driverErr } = await updateQuery;
      if (driverErr) {
        console.warn('Could not assign vehicle and route to driver:', driverErr);
      }
    }
  } catch (e) {
    console.warn('Error syncing driver vehicle/route in updateVehicle:', e);
  }

  clearVehiclesCache();
  clearDriversCache();

  return data;
};

export const deleteVehicle = async (vehicleId) => {
  const schoolId = getCurrentSchoolId();
  if (!schoolId) {
    throw new Error('No active school session found. Please sign in again.');
  }

  // 1. Fetch current vehicle to see if a driver was assigned
  const { data: vehicleToDelete } = await supabase
    .from('vehicles')
    .select('id, name, driver_name')
    .eq('id', vehicleId)
    .eq('school_id', schoolId)
    .maybeSingle();

  const { error } = await supabase
    .from('vehicles')
    .delete()
    .eq('id', vehicleId)
    .eq('school_id', schoolId);

  if (error) {
    console.error('Error deleting vehicle:', error);
    throw error;
  }

  // 2. If the deleted vehicle had a driver, unassign that driver
  const assignedDriverName =
    vehicleToDelete?.driver_name && vehicleToDelete.driver_name !== 'Unassigned'
      ? vehicleToDelete.driver_name.trim()
      : null;

  if (assignedDriverName) {
    try {
      await supabase
        .from('drivers')
        .update({
          vehicle: 'Unassigned',
          route: 'Unassigned',
        })
        .eq('school_id', schoolId)
        .eq('name', assignedDriverName);
    } catch (e) {
      console.warn('Error unassigning driver on vehicle delete:', e);
    }
  }

  clearVehiclesCache();
  clearDriversCache();

  return true;
};

