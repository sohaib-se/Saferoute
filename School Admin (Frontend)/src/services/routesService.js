import { supabase } from '../lib/supabaseClient';
import { getCurrentSchoolId } from '../lib/session';

export const getRoutes = async () => {
  const schoolId = getCurrentSchoolId();
  if (!schoolId) {
    throw new Error('No active school session found. Please sign in again.');
  }

  const { data, error } = await supabase
    .from('routes')
    .select('*')
    .eq('school_id', schoolId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching routes:', error);
    throw error;
  }

  return (data || []).map((r, index) => {
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

  return true;
};
