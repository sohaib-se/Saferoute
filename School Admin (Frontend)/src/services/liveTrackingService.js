import { supabase } from '../lib/supabaseClient';
import { getCurrentSchoolId } from '../lib/session';

/**
 * Fetch all currently active vehicle locations from Supabase.
 */
export const fetchActiveVehicleLocations = async (customSchoolId) => {
  try {
    const schoolId = customSchoolId || getCurrentSchoolId();
    let query = supabase
      .from('vehicle_locations')
      .select('*')
      .eq('is_active', true);

    if (schoolId) {
      query = query.or(`school_id.eq.${schoolId},school_id.is.null`);
    }

    const { data, error } = await query;
    if (error) {
      console.warn('Could not fetch vehicle_locations:', error.message);
      return [];
    }

    return data || [];
  } catch (err) {
    console.warn('fetchActiveVehicleLocations exception:', err);
    return [];
  }
};

/**
 * Subscribes to real-time location telemetry for all vehicles.
 */
export const subscribeToAllVehicleLocations = (customSchoolId, onUpdate) => {
  const schoolId = customSchoolId || getCurrentSchoolId();

  const channel = supabase
    .channel('admin:fleet_vehicle_locations')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'vehicle_locations',
      },
      (payload) => {
        const item = payload.new || payload.old;
        if (!item) return;

        // If scoped to a school, ignore other schools
        if (schoolId && item.school_id && item.school_id !== schoolId) {
          return;
        }

        onUpdate(payload.new, payload.eventType);
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
};

