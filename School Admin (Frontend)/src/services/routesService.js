import { supabase } from '../lib/supabaseClient';
import { getCurrentSchoolId } from '../lib/session';

let routesCache = {
  data: null,
  timestamp: 0,
  schoolId: null,
};
let routesInFlight = null;
const CACHE_TTL_MS = 3 * 60 * 1000; // 3 minutes

export const clearRoutesCache = () => {
  routesCache = { data: null, timestamp: 0, schoolId: null };
  routesInFlight = null;
};

export const getRoutes = async (forceRefresh = false) => {
  const schoolId = getCurrentSchoolId();
  if (!schoolId) {
    throw new Error('No active school session found. Please sign in again.');
  }

  const isCacheValid =
    !forceRefresh &&
    routesCache.data &&
    routesCache.schoolId === schoolId &&
    Date.now() - routesCache.timestamp < CACHE_TTL_MS;

  if (isCacheValid) {
    return routesCache.data;
  }

  if (!forceRefresh && routesInFlight) {
    return routesInFlight;
  }

  routesInFlight = (async () => {
    try {
      const { data, error } = await supabase
        .from('routes')
        .select('*')
        .eq('school_id', schoolId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching routes:', error);
        throw error;
      }

      const formatted = (data || []).map((r, index) => {
        const formattedDate = r.created_at
          ? new Date(r.created_at).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })
          : 'Recently Added';

        return {
          id: r.id,
          num: index + 1,
          name: r.name,
          createdAt: r.created_at,
          formattedDate,
        };
      });

      routesCache = {
        data: formatted,
        timestamp: Date.now(),
        schoolId,
      };

      return formatted;
    } finally {
      routesInFlight = null;
    }
  })();

  return routesInFlight;
};

export const addRoute = async (routeData) => {
  const schoolId = getCurrentSchoolId();
  if (!schoolId) {
    throw new Error('No active school session found. Please sign in again.');
  }

  const routeName = typeof routeData === 'string' ? routeData.trim() : (routeData.name || '').trim();
  if (!routeName) {
    throw new Error('Route name is required.');
  }

  const { data, error } = await supabase
    .from('routes')
    .insert([
      {
        school_id: schoolId,
        name: routeName,
      },
    ])
    .select()
    .single();

  if (error) {
    console.error('Error adding route:', error);
    throw error;
  }

  clearRoutesCache();

  return data;
};

export const updateRoute = async (routeId, routeData) => {
  const schoolId = getCurrentSchoolId();
  if (!schoolId) {
    throw new Error('No active school session found. Please sign in again.');
  }

  const routeName = typeof routeData === 'string' ? routeData.trim() : (routeData.name || '').trim();
  if (!routeName) {
    throw new Error('Route name is required.');
  }

  const { data, error } = await supabase
    .from('routes')
    .update({
      name: routeName,
    })
    .eq('id', routeId)
    .eq('school_id', schoolId)
    .select()
    .single();

  if (error) {
    console.error('Error updating route:', error);
    throw error;
  }

  clearRoutesCache();

  return data;
};

export const deleteRoute = async (routeId) => {
  const schoolId = getCurrentSchoolId();
  if (!schoolId) {
    throw new Error('No active school session found. Please sign in again.');
  }

  const { error } = await supabase
    .from('routes')
    .delete()
    .eq('id', routeId)
    .eq('school_id', schoolId);

  if (error) {
    console.error('Error deleting route:', error);
    throw error;
  }

  clearRoutesCache();

  return true;
};
