import { supabase } from '../lib/supabaseClient';
import { getCurrentSchoolId } from '../lib/session';

export const getDrivers = async () => {
  const schoolId = getCurrentSchoolId();
  if (!schoolId) {
    throw new Error('No active school session found. Please sign in again.');
  }

  const { data, error } = await supabase
    .from('drivers')
    .select('*')
    .eq('school_id', schoolId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching drivers:', error);
    throw error;
  }

  // Format into the structure expected by the frontend components
  return (data || []).map((d, index) => {
    const initials = d.name
      ? d.name
          .trim()
          .split(' ')
          .map((n) => n[0])
          .slice(0, 2)
          .join('')
          .toUpperCase()
      : 'DR';

    return {
      id: d.id,
      num: index + 1,
      name: d.name,
      license: d.license,
      licenseType: d.license_type || 'Heavy Transport',
      phone: d.phone,
      vehicle: d.vehicle || 'Unassigned',
      route: d.route || 'Unassigned',
      status: d.status || 'Online',
      initials,
      initialsStyle: 'bg-blue-100 text-blue-700',
      statusBadgeStyle:
        d.status === 'Online'
          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
          : d.status === 'Offline'
          ? 'bg-slate-100 text-slate-600 border border-slate-200'
          : 'bg-amber-50 text-amber-700 border border-amber-200',
      statusDotStyle:
        d.status === 'Online'
          ? 'bg-emerald-500'
          : d.status === 'Offline'
          ? 'bg-slate-400'
          : 'bg-amber-500',
    };
  });
};

export const addDriver = async (driverData) => {
  const schoolId = getCurrentSchoolId();
  if (!schoolId) {
    throw new Error('No active school session found. Please sign in again.');
  }

  const { data, error } = await supabase
    .from('drivers')
    .insert([
      {
        school_id: schoolId,
        name: driverData.name,
        license: driverData.license,
        license_type: driverData.licenseType || 'Heavy Transport',
        phone: driverData.phone,
        vehicle: driverData.vehicle || 'Unassigned',
        route: driverData.route || 'Unassigned',
        status: driverData.status || 'Online',
      },
    ])
    .select()
    .single();

  if (error) {
    console.error('Error adding driver:', error);
    throw error;
  }

  return data;
};

export const updateDriver = async (driverId, driverData) => {
  const schoolId = getCurrentSchoolId();
  if (!schoolId) {
    throw new Error('No active school session found. Please sign in again.');
  }

  const { data, error } = await supabase
    .from('drivers')
    .update({
      name: driverData.name,
      license: driverData.license,
      license_type: driverData.licenseType || 'Heavy Transport',
      phone: driverData.phone,
      vehicle: driverData.vehicle,
      route: driverData.route,
      status: driverData.status,
    })
    .eq('id', driverId)
    .eq('school_id', schoolId)
    .select()
    .single();

  if (error) {
    console.error('Error updating driver:', error);
    throw error;
  }

  return data;
};

export const deleteDriver = async (driverId) => {
  const schoolId = getCurrentSchoolId();
  if (!schoolId) {
    throw new Error('No active school session found. Please sign in again.');
  }

  const { error } = await supabase
    .from('drivers')
    .delete()
    .eq('id', driverId)
    .eq('school_id', schoolId);

  if (error) {
    console.error('Error deleting driver:', error);
    throw error;
  }

  return true;
};
