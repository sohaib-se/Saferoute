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
 * First checks app_credentials table.
 * If not found, falls back to direct drivers or parents tables.
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
      let profileData = null;
      if (userType === 'driver') {
        const { data: dr } = await supabase
          .from('drivers')
          .select('*')
          .eq('id', cred.user_id)
          .maybeSingle();
        profileData = dr;
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
        name: cred.name || profileData?.name || 'SafeRoute User',
        phone: cred.phone || profileData?.phone,
        role: userType,
        schoolId: cred.school_id,
        loginId: cred.login_id,
        profile: profileData,
      };

      return { success: true, user: session };
    }

    // 2. Fallback check directly in drivers table
    if (!role || role === 'driver') {
      const { data: driverMatch } = await supabase
        .from('drivers')
        .select('*')
        .or(`phone.eq.${cleanId},license.eq.${cleanId}`)
        .maybeSingle();

      if (driverMatch) {
        // If password matches phone or license as fallback default
        if (cleanPass === driverMatch.phone || cleanPass === driverMatch.license || cleanPass === '1234') {
          return {
            success: true,
            user: {
              id: driverMatch.id,
              userId: driverMatch.id,
              name: driverMatch.name,
              phone: driverMatch.phone,
              role: 'driver',
              schoolId: driverMatch.school_id,
              loginId: cleanId,
              profile: driverMatch,
            },
          };
        }
      }
    }

    // 3. Fallback check directly in parents table
    if (!role || role === 'parent') {
      const { data: parentMatch } = await supabase
        .from('parents')
        .select('*')
        .or(`phone.eq.${cleanId},email.eq.${cleanId}`)
        .maybeSingle();

      if (parentMatch) {
        if (cleanPass === parentMatch.phone || cleanPass === '1234') {
          return {
            success: true,
            user: {
              id: parentMatch.id,
              userId: parentMatch.id,
              name: parentMatch.name,
              phone: parentMatch.phone,
              role: 'parent',
              schoolId: parentMatch.school_id,
              loginId: cleanId,
              profile: parentMatch,
            },
          };
        }
      }
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
