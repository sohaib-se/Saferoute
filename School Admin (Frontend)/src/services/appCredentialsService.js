import { supabase } from '../lib/supabaseClient';
import { getCurrentSchoolId } from '../lib/session';

/**
 * Generates a deterministic 4-digit code based on a string (ID/phone/name)
 * Used as a fallback when Supabase table has not been migrated or in offline demo mode.
 */
export const getDeterministicFallbackCode = (entity = {}) => {
  const seed = (
    entity.id ||
    entity.dbId ||
    entity.phone ||
    entity.name ||
    'SafeRoute'
  ).toString();

  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }
  const code = (Math.abs(hash) % 9000) + 1000;
  return code.toString();
};

/**
 * Generates a unique 4-digit login code between 1000 and 9999
 */
export const generateUnique4DigitCode = (existingCodes = new Set()) => {
  let attempts = 0;
  while (attempts < 1000) {
    const candidate = Math.floor(1000 + Math.random() * 9000).toString();
    if (!existingCodes.has(candidate)) {
      return candidate;
    }
    attempts++;
  }
  return Math.floor(1000 + Math.random() * 9000).toString();
};

let credentialsCache = {
  data: null,
  timestamp: 0,
  schoolId: null,
};
let credentialsInFlight = null;
const CACHE_TTL_MS = 3 * 60 * 1000; // 3 minutes

export const clearCredentialsCache = () => {
  credentialsCache = { data: null, timestamp: 0, schoolId: null };
  credentialsInFlight = null;
};

/**
 * Fetches all app credentials for the active school session.
 * Returns a lookup map keyed by userId: { [userId]: { loginId, password, ... } }
 */
export const getSchoolCredentialsMap = async (forceRefresh = false) => {
  const schoolId = getCurrentSchoolId();
  if (!schoolId) return {};

  const isCacheValid =
    !forceRefresh &&
    credentialsCache.data &&
    credentialsCache.schoolId === schoolId &&
    Date.now() - credentialsCache.timestamp < CACHE_TTL_MS;

  if (isCacheValid) {
    return credentialsCache.data;
  }

  if (!forceRefresh && credentialsInFlight) {
    return credentialsInFlight;
  }

  credentialsInFlight = (async () => {
    try {
      const { data, error } = await supabase
        .from('app_credentials')
        .select('*')
        .eq('school_id', schoolId);

      if (error) {
        // Table might not be created yet in user's Supabase instance
        console.warn('Could not query app_credentials:', error.message);
        return credentialsCache.data || {};
      }

      const map = {};
      (data || []).forEach((cred) => {
        map[cred.user_id] = {
          id: cred.id,
          loginId: cred.login_id,
          password: cred.password,
          userType: cred.user_type,
          userId: cred.user_id,
          name: cred.name,
          phone: cred.phone,
          isActive: cred.is_active,
          createdAt: cred.created_at,
        };
      });

      credentialsCache = {
        data: map,
        timestamp: Date.now(),
        schoolId,
      };

      return map;
    } catch (err) {
      console.warn('app_credentials fetch error:', err);
      return credentialsCache.data || {};
    } finally {
      credentialsInFlight = null;
    }
  })();

  return credentialsInFlight;
};

/**
 * Creates and persists app credentials for a parent or driver.
 * A unique 4-digit code is generated and used for both login_id and password.
 */
export const createAppCredential = async ({
  schoolId: customSchoolId,
  userType, // 'parent' or 'driver'
  userId,
  name,
  phone = '',
}) => {
  const schoolId = customSchoolId || getCurrentSchoolId();
  if (!schoolId || !userId) {
    const fallback = getDeterministicFallbackCode({ id: userId, phone, name });
    return {
      loginId: fallback,
      password: fallback,
      userType,
      userId,
      name,
      phone,
    };
  }

  try {
    // 1. Fetch currently used codes to guarantee uniqueness
    const { data: existingRecords } = await supabase
      .from('app_credentials')
      .select('login_id');

    const usedCodes = new Set(
      (existingRecords || []).map((r) => r.login_id)
    );

    // 2. Generate a unique 4-digit code
    const uniqueCode = generateUnique4DigitCode(usedCodes);

    // 3. Insert new credential record
    const { data, error } = await supabase
      .from('app_credentials')
      .insert([
        {
          school_id: schoolId,
          user_type: userType,
          user_id: userId,
          name: name,
          phone: phone || '',
          login_id: uniqueCode,
          password: uniqueCode, // ID and password are the same 4 digits
          is_active: true,
        },
      ])
      .select()
      .single();

    if (error) {
      console.warn('Could not save credential to Supabase:', error.message);
      return {
        loginId: uniqueCode,
        password: uniqueCode,
        userType,
        userId,
        name,
        phone,
      };
    }

    clearCredentialsCache();

    return {
      id: data.id,
      loginId: data.login_id,
      password: data.password,
      userType: data.user_type,
      userId: data.user_id,
      name: data.name,
      phone: data.phone,
      isActive: data.is_active,
    };
  } catch (err) {
    console.warn('createAppCredential exception:', err);
    const fallback = getDeterministicFallbackCode({ id: userId, phone, name });
    return {
      loginId: fallback,
      password: fallback,
      userType,
      userId,
      name,
      phone,
    };
  }
};

/**
 * Updates a credential's password or active state
 */
export const updateAppCredential = async (credentialId, updates = {}) => {
  const schoolId = getCurrentSchoolId();
  if (!schoolId) throw new Error('No active school session found.');

  const payload = { ...updates, updated_at: new Date().toISOString() };
  if (updates.password) payload.password = updates.password;
  if (updates.isActive !== undefined) payload.is_active = updates.isActive;

  const { data, error } = await supabase
    .from('app_credentials')
    .update(payload)
    .eq('id', credentialId)
    .eq('school_id', schoolId)
    .select()
    .single();

  if (error) throw error;
  clearCredentialsCache();
  return data;
};
