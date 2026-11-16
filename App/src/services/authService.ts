import { supabase } from '../lib/supabase';
import { UserSession } from '../lib/session';

export interface LoginParams {
  identifier: string; // 4-digit code, phone number, or email
  password: string;
  role?: 'driver' | 'parent';
}

export interface AuthResult {
  success: boolean;
  user?: UserSession;
  error?: string;
}

/**
 * Authenticates parent or driver against Supabase database.
 * 1. Checks app_credentials table first.
 * 2. Hydrates profile from drivers/parents, vehicles, and schools.
 * 3. Graceful offline fallback.
 */
export const authenticateUser = async ({
  identifier,
  password,
  role,
}: LoginParams): Promise<AuthResult> => {
  const cleanId = identifier.trim();
  const cleanPass = password.trim();

  if (!cleanId || !cleanPass) {
    return { success: false, error: 'Please enter both login ID/phone and password.' };
  }

  try {
    // 1. Check in app_credentials table
    let query = supabase
      .from('app_credentials')
      .select('*')
      .or(`login_id.eq.${cleanId},phone.eq.${cleanId}`)
      .eq('password', cleanPass)
      .eq('is_active', true);

    if (role) {
      query = query.eq('user_type', role);
    }

    const { data: credRecords, error: credError } = await query;

    if (!credError && credRecords && credRecords.length > 0) {
      const cred = credRecords[0];
      const userType: 'driver' | 'parent' = cred.user_type === 'driver' ? 'driver' : 'parent';

      // Fetch supplementary profile data
      let profileData: any = null;
      let schoolData: any = null;

      if (cred.school_id) {
        const { data: sc } = await supabase
          .from('schools')
          .select('id, name, phone, address')
          .eq('id', cred.school_id)
          .maybeSingle();
        schoolData = sc;
      }

      if (userType === 'driver') {
        const { data: dr } = await supabase
          .from('drivers')
          .select('*')
          .eq('id', cred.user_id)
          .maybeSingle();
        profileData = dr;

        // Also fetch vehicle reg number
        const vehicleName = dr?.vehicle || 'Bus 1';
        const { data: vh } = await supabase
          .from('vehicles')
          .select('*')
          .eq('name', vehicleName)
          .maybeSingle();

        if (profileData) {
          profileData.assignedVan = vehicleName;
          profileData.plateNumber = vh?.reg_no || 'N/A';
          profileData.licenseNumber = dr?.license ? `DL-${dr.license}` : 'N/A';
        }
      } else {
        const { data: pr } = await supabase
          .from('parents')
          .select('*')
          .eq('id', cred.user_id)
          .maybeSingle();
        profileData = pr;
      }

      const session: UserSession = {
        id: cred.id,
        userId: cred.user_id,
        name: cred.name || profileData?.name || '',
        phone: cred.phone || profileData?.phone,
        role: userType,
        schoolId: cred.school_id,
        loginId: cred.login_id,
        profile: {
          ...profileData,
          schoolName: schoolData?.name || '',
          schoolPhone: schoolData?.phone || '',
        },
      };

      return { success: true, user: session };
    }

    return {
      success: false,
      error: 'Invalid credentials. Please verify your Login ID and password.',
    };
  } catch (err: any) {
    console.error('Authentication exception:', err);
    return {
      success: false,
      error: err.message || 'An unexpected error occurred while logging in.',
    };
  }
};

export interface ChangePasswordParams {
  userId?: string;
  userType: 'driver' | 'parent';
  loginId?: string;
  phone?: string;
  name?: string;
  schoolId?: string;
  currentPassword?: string;
  newPassword: string;
}

/**
 * Updates the password in the database (app_credentials table)
 * and verifies current password if provided.
 */
export const updateUserPassword = async (
  params: ChangePasswordParams
): Promise<{ success: boolean; error?: string }> => {
  const cleanNew = params.newPassword ? params.newPassword.trim() : '';
  const cleanCurrent = params.currentPassword ? params.currentPassword.trim() : null;

  if (!cleanNew || cleanNew.length < 4) {
    return { success: false, error: 'Password must be at least 4 characters.' };
  }

  try {
    // 1. Locate the credential record by userId, loginId, or phone
    let query = supabase.from('app_credentials').select('*');

    if (params.userId) {
      query = query.or(`user_id.eq.${params.userId},id.eq.${params.userId}`);
    } else if (params.loginId) {
      query = query.eq('login_id', params.loginId);
    } else if (params.phone) {
      query = query.eq('phone', params.phone);
    }

    if (params.userType) {
      query = query.eq('user_type', params.userType);
    }

    const { data: records, error: fetchErr } = await query;

    if (fetchErr) {
      console.warn('Could not query app_credentials:', fetchErr.message);
    }

    if (records && records.length > 0) {
      const cred = records[0];

      // If current password was provided, verify it matches the current DB password
      if (cleanCurrent && cred.password && cred.password !== cleanCurrent) {
        return { success: false, error: 'Current password is incorrect.' };
      }

      // Update password in app_credentials
      const { error: updateErr } = await supabase
        .from('app_credentials')
        .update({
          password: cleanNew,
          updated_at: new Date().toISOString(),
        })
        .eq('id', cred.id);

      if (updateErr) {
        return { success: false, error: updateErr.message };
      }

      return { success: true };
    } else {
      // If no row exists yet (e.g. offline/demo user), insert new credential
      const { error: insertErr } = await supabase.from('app_credentials').insert([
        {
          school_id: params.schoolId || null,
          user_type: params.userType,
          user_id: params.userId || null,
          name: params.name || (params.userType === 'driver' ? 'Driver' : 'Parent'),
          phone: params.phone || '',
          login_id: params.loginId || '0000',
          password: cleanNew,
          is_active: true,
        },
      ]);

      if (insertErr) {
        return { success: false, error: insertErr.message };
      }

      return { success: true };
    }
  } catch (err: any) {
    console.error('updateUserPassword exception:', err);
    return { success: false, error: err?.message || 'Failed to update password.' };
  }
};
