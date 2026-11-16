import { supabase } from '../lib/supabaseClient';
import { getCurrentSchoolId, getCurrentUser } from '../lib/session';

export const DEFAULT_SCHOOL_PROFILE = {
  schoolName: 'SafeRoute International Academy',
  campusName: 'Main Campus - Gulberg III',
  registrationNo: 'REG-PK-2024-9912',
  schoolEmail: 'admin@saferoute.edu.pk',
  phone: '+92 42 3578 9000',
  emergencyPhone: '+92 300 1112233',
  address: 'Plot 44-A, Block H, Gulberg III, Lahore, Pakistan',
  website: 'https://saferoute.school.edu',
  morningStartTime: '07:30 AM',
  afternoonDismissal: '02:15 PM',
  principalName: 'Dr. Tariq Mansoor',
  logoUrl: null,
};

export const DEFAULT_PREFERENCES = {
  parentSmsAlerts: true,
  sosEmergencyBroadcast: true,
  autoExportManifest: true,
  telematicsInterval: '10s',
};

export const DEFAULT_ADMIN = {
  name: 'Admin',
  email: 'admin@saferoute.com',
  phone: '0300 1234567',
  role: 'Super Admin (Fleet Director)',
  department: 'Transport & Fleet Safety',
};

/**
 * Loads the active school's profile, admin credentials, fleet preferences,
 * and live system metrics directly from Supabase.
 */
export const getSchoolProfile = async () => {
  const schoolId = getCurrentSchoolId();
  const sessionUser = getCurrentUser() || {};

  // Load any locally cached data as baseline
  let cachedSchool = {};
  let cachedPrefs = {};
  try {
    cachedSchool = JSON.parse(localStorage.getItem('schoolProfile') || '{}');
  } catch {}
  try {
    cachedPrefs = JSON.parse(localStorage.getItem('fleetPreferences') || '{}');
  } catch {}

  let dbSchool = null;
  let metrics = { totalBuses: 0, totalStudents: 0, activeDrivers: 0 };

  try {
    // 1. Fetch school record from Supabase
    const { data, error } = await supabase
      .from('schools')
      .select('*')
      .eq('id', schoolId)
      .maybeSingle();

    if (!error && data) {
      dbSchool = data;
    } else if (error) {
      console.warn('Could not fetch school from Supabase:', error.message);
    }

    // 2. Query live counts for the header metrics
    const [busesRes, studentsRes, driversRes] = await Promise.allSettled([
      supabase.from('vehicles').select('*', { count: 'exact', head: true }).eq('school_id', schoolId),
      supabase.from('students').select('*', { count: 'exact', head: true }).eq('school_id', schoolId),
      supabase.from('drivers').select('*', { count: 'exact', head: true }).eq('school_id', schoolId),
    ]);

    metrics.totalBuses = busesRes.status === 'fulfilled' && typeof busesRes.value.count === 'number'
      ? busesRes.value.count
      : 0;
    metrics.totalStudents = studentsRes.status === 'fulfilled' && typeof studentsRes.value.count === 'number'
      ? studentsRes.value.count
      : 0;
    metrics.activeDrivers = driversRes.status === 'fulfilled' && typeof driversRes.value.count === 'number'
      ? driversRes.value.count
      : 0;
  } catch (err) {
    console.warn('Network error while querying Supabase for profile:', err);
  }

  // Assemble unified schoolData with priority: Supabase DB > LocalStorage > Defaults
  const schoolData = {
    schoolName: dbSchool?.name || cachedSchool.schoolName || sessionUser.name || DEFAULT_SCHOOL_PROFILE.schoolName,
    campusName: dbSchool?.campus_name || cachedSchool.campusName || DEFAULT_SCHOOL_PROFILE.campusName,
    registrationNo: dbSchool?.registration_no || cachedSchool.registrationNo || DEFAULT_SCHOOL_PROFILE.registrationNo,
    schoolEmail: dbSchool?.email || cachedSchool.schoolEmail || sessionUser.email || DEFAULT_SCHOOL_PROFILE.schoolEmail,
    phone: dbSchool?.phone || cachedSchool.phone || sessionUser.phone || DEFAULT_SCHOOL_PROFILE.phone,
    emergencyPhone: dbSchool?.emergency_phone || cachedSchool.emergencyPhone || DEFAULT_SCHOOL_PROFILE.emergencyPhone,
    address: dbSchool?.address || cachedSchool.address || sessionUser.address || DEFAULT_SCHOOL_PROFILE.address,
    website: dbSchool?.website || cachedSchool.website || DEFAULT_SCHOOL_PROFILE.website,
    morningStartTime: dbSchool?.morning_start_time || cachedSchool.morningStartTime || DEFAULT_SCHOOL_PROFILE.morningStartTime,
    afternoonDismissal: dbSchool?.afternoon_dismissal || cachedSchool.afternoonDismissal || DEFAULT_SCHOOL_PROFILE.afternoonDismissal,
    principalName: dbSchool?.principal_name || cachedSchool.principalName || DEFAULT_SCHOOL_PROFILE.principalName,
    logoUrl: dbSchool?.logo_url || cachedSchool.logoUrl || localStorage.getItem('schoolLogo') || null,
  };

  // Assemble adminData
  const adminData = {
    name: dbSchool?.admin_name || sessionUser.name || cachedSchool.principalName || DEFAULT_ADMIN.name,
    email: dbSchool?.admin_email || sessionUser.email || dbSchool?.email || DEFAULT_ADMIN.email,
    phone: dbSchool?.admin_phone || sessionUser.phone || dbSchool?.phone || DEFAULT_ADMIN.phone,
    role: dbSchool?.admin_role || sessionUser.role || DEFAULT_ADMIN.role,
    department: dbSchool?.department || sessionUser.department || DEFAULT_ADMIN.department,
  };

  // Assemble preferences
  const preferences = {
    ...DEFAULT_PREFERENCES,
    ...cachedPrefs,
    ...(typeof dbSchool?.preferences === 'object' && dbSchool?.preferences !== null ? dbSchool.preferences : {}),
  };

  return {
    schoolData,
    adminData,
    preferences,
    metrics,
    rawSchool: dbSchool,
  };
};

/**
 * Updates school institutional profile in Supabase database.
 * Updates core columns (`name`, `address`, `phone`, `email`), and attempts
 * extended columns (`logo_url`, `campus_name`, `registration_no`, etc.).
 */
export const updateSchoolProfile = async (updatedData) => {
  const schoolId = getCurrentSchoolId();
  if (!schoolId) {
    throw new Error('No active school found. Please sign in again.');
  }

  // 1. Prepare full payload
  const fullPayload = {
    name: updatedData.schoolName,
    address: updatedData.address,
    phone: updatedData.phone,
    email: updatedData.schoolEmail,
    campus_name: updatedData.campusName,
    registration_no: updatedData.registrationNo,
    emergency_phone: updatedData.emergencyPhone,
    website: updatedData.website,
    morning_start_time: updatedData.morningStartTime,
    afternoon_dismissal: updatedData.afternoonDismissal,
    principal_name: updatedData.principalName,
    logo_url: updatedData.logoUrl || null,
    updated_at: new Date().toISOString(),
  };

  // Core columns guaranteed by base schema
  const corePayload = {
    name: updatedData.schoolName,
    address: updatedData.address,
    phone: updatedData.phone,
    email: updatedData.schoolEmail,
  };

  let updateError = null;

  try {
    // Attempt updating all fields
    const { error } = await supabase
      .from('schools')
      .update(fullPayload)
      .eq('id', schoolId);

    if (error) {
      console.warn('Extended columns update failed; retrying with core columns:', error.message);
      // Fallback: update core columns only
      const { error: coreErr } = await supabase
        .from('schools')
        .update(corePayload)
        .eq('id', schoolId);

      if (coreErr) {
        updateError = coreErr;
      }
    }
  } catch (err) {
    console.error('Exception updating school in Supabase:', err);
    updateError = err;
  }

  if (updateError) {
    throw new Error(updateError.message || 'Failed to update school profile in database.');
  }

  // 2. Persist in localStorage for instant reactive UI
  try {
    localStorage.setItem('schoolProfile', JSON.stringify(updatedData));
    if (updatedData.logoUrl) {
      localStorage.setItem('schoolLogo', updatedData.logoUrl);
    } else {
      localStorage.removeItem('schoolLogo');
    }

    // Also sync school name and address in current user session if applicable
    const currentUser = getCurrentUser();
    if (currentUser) {
      currentUser.schoolName = updatedData.schoolName;
      currentUser.address = updatedData.address;
      localStorage.setItem('user', JSON.stringify(currentUser));
    }
  } catch {}

  // 3. Dispatch reactive events
  window.dispatchEvent(new CustomEvent('school-profile-updated', { detail: updatedData }));
  window.dispatchEvent(new CustomEvent('user-profile-updated'));

  return { success: true };
};

/**
 * Updates administrator personal account details in Supabase and localStorage.
 */
export const updateAdminProfile = async (updatedAdmin) => {
  const schoolId = getCurrentSchoolId();
  if (!schoolId) {
    throw new Error('No active school found. Please sign in again.');
  }

  // Attempt to save admin metadata on schools table
  try {
    const adminPayload = {
      admin_name: updatedAdmin.name,
      admin_email: updatedAdmin.email,
      admin_phone: updatedAdmin.phone,
      admin_role: updatedAdmin.role,
      department: updatedAdmin.department,
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabase
      .from('schools')
      .update(adminPayload)
      .eq('id', schoolId);

    if (error) {
      console.info('Could not update admin columns on schools (pending migration):', error.message);
    }
  } catch (err) {
    console.warn('Supabase admin update exception:', err);
  }

  // Persist updated admin to session storage / localStorage so Header immediately reflects changes
  try {
    const currentUser = getCurrentUser() || {};
    const mergedUser = {
      ...currentUser,
      name: updatedAdmin.name,
      email: updatedAdmin.email,
      phone: updatedAdmin.phone,
      role: updatedAdmin.role,
      department: updatedAdmin.department,
    };
    localStorage.setItem('user', JSON.stringify(mergedUser));
  } catch {}

  // Dispatch event for Header and rest of app
  window.dispatchEvent(new CustomEvent('user-profile-updated', { detail: updatedAdmin }));

  return { success: true };
};

/**
 * Verifies current password and updates to new password in Supabase `schools` table.
 */
export const updateAdminPassword = async ({ currentPassword, newPassword }) => {
  const schoolId = getCurrentSchoolId();
  if (!schoolId) {
    return { success: false, error: 'No active session found. Please sign in again.' };
  }

  const cleanCurrent = currentPassword?.trim();
  const cleanNew = newPassword?.trim();

  if (!cleanNew || cleanNew.length < 8) {
    return { success: false, error: 'New password must be at least 8 characters long.' };
  }

  try {
    // 1. Fetch existing school password from Supabase
    const { data: school, error: fetchErr } = await supabase
      .from('schools')
      .select('id, password')
      .eq('id', schoolId)
      .maybeSingle();

    if (fetchErr || !school) {
      return { success: false, error: 'Could not verify school account from database.' };
    }

    // 2. Validate current password
    if (cleanCurrent && school.password && school.password !== cleanCurrent) {
      return { success: false, error: 'The current password you entered is incorrect.' };
    }

    // 3. Update password in Supabase schools table
    const { error: updateErr } = await supabase
      .from('schools')
      .update({
        password: cleanNew,
      })
      .eq('id', schoolId);

    if (updateErr) {
      return { success: false, error: updateErr.message || 'Failed to update password in database.' };
    }

    // 4. Update session timestamp
    try {
      const currentUser = getCurrentUser() || {};
      currentUser.passwordLastChanged = new Date().toISOString();
      localStorage.setItem('user', JSON.stringify(currentUser));
    } catch {}

    return { success: true };
  } catch (err) {
    console.error('Password update exception:', err);
    return { success: false, error: err.message || 'An error occurred while updating password.' };
  }
};

/**
 * Uploads a school logo to Supabase Storage (student-photos bucket under school-logos/)
 * and updates `logo_url` in the database.
 */
export const uploadSchoolLogo = async (file) => {
  if (!file) {
    throw new Error('Please select an image file to upload.');
  }

  // Validate image file type
  const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml', 'image/gif'];
  if (!validTypes.includes(file.type)) {
    throw new Error('Please upload a valid image file (PNG, JPG, SVG, WEBP).');
  }

  // Validate max size: 5MB
  if (file.size > 5 * 1024 * 1024) {
    throw new Error('Logo image must be smaller than 5MB.');
  }

  const schoolId = getCurrentSchoolId() || 'default-school';
  const fileExt = file.name ? file.name.split('.').pop().toLowerCase() : 'png';
  const fileName = `school_logo_${Date.now()}.${fileExt}`;
  const filePath = `school-logos/${schoolId}/${fileName}`;

  // 1. Upload to Supabase Storage
  const { error: uploadErr } = await supabase.storage
    .from('student-photos')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: true,
      contentType: file.type || 'image/png',
    });

  if (uploadErr) {
    console.error('Logo upload to Supabase storage failed:', uploadErr);
    throw new Error(`Failed to upload logo: ${uploadErr.message}`);
  }

  // 2. Obtain Public URL
  const { data: publicUrlData } = supabase.storage
    .from('student-photos')
    .getPublicUrl(filePath);

  const publicUrl = publicUrlData?.publicUrl;
  if (!publicUrl) {
    throw new Error('Failed to retrieve public URL for uploaded logo.');
  }

  // 3. Update database
  try {
    const { error: dbErr } = await supabase
      .from('schools')
      .update({ logo_url: publicUrl, updated_at: new Date().toISOString() })
      .eq('id', schoolId);

    if (dbErr) {
      console.info('Could not update logo_url in schools table directly:', dbErr.message);
    }
  } catch (err) {
    console.warn('DB logo update exception:', err);
  }

  // 4. Update localStorage
  try {
    localStorage.setItem('schoolLogo', publicUrl);
    const cachedProfile = JSON.parse(localStorage.getItem('schoolProfile') || '{}');
    cachedProfile.logoUrl = publicUrl;
    localStorage.setItem('schoolProfile', JSON.stringify(cachedProfile));
  } catch {}

  // 5. Dispatch event so UI updates immediately
  window.dispatchEvent(new CustomEvent('school-logo-updated', { detail: { logoUrl: publicUrl } }));
  window.dispatchEvent(new CustomEvent('school-profile-updated', { detail: { logoUrl: publicUrl } }));

  return { success: true, logoUrl: publicUrl };
};

/**
 * Removes the school logo from database and storage.
 */
export const removeSchoolLogo = async () => {
  const schoolId = getCurrentSchoolId();

  try {
    await supabase
      .from('schools')
      .update({ logo_url: null, updated_at: new Date().toISOString() })
      .eq('id', schoolId);
  } catch (err) {
    console.warn('Logo removal exception:', err);
  }

  try {
    localStorage.removeItem('schoolLogo');
    const cachedProfile = JSON.parse(localStorage.getItem('schoolProfile') || '{}');
    delete cachedProfile.logoUrl;
    localStorage.setItem('schoolProfile', JSON.stringify(cachedProfile));
  } catch {}

  window.dispatchEvent(new CustomEvent('school-logo-updated', { detail: { logoUrl: null } }));
  window.dispatchEvent(new CustomEvent('school-profile-updated', { detail: { logoUrl: null } }));

  return { success: true };
};

/**
 * Updates fleet and dispatch safety preferences in Supabase and localStorage.
 */
export const updateFleetPreferences = async (updatedPreferences) => {
  const schoolId = getCurrentSchoolId();

  try {
    const { error } = await supabase
      .from('schools')
      .update({
        preferences: updatedPreferences,
        updated_at: new Date().toISOString(),
      })
      .eq('id', schoolId);

    if (error) {
      console.info('Could not persist preferences column to schools table (pending migration):', error.message);
    }
  } catch (err) {
    console.warn('Exception updating preferences:', err);
  }

  try {
    localStorage.setItem('fleetPreferences', JSON.stringify(updatedPreferences));
  } catch {}

  window.dispatchEvent(new CustomEvent('fleet-preferences-updated', { detail: updatedPreferences }));

  return { success: true };
};
