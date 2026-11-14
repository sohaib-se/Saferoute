/**
 * Helper utilities for managing the active School Admin session.
 */

export const getCurrentUser = () => {
  try {
    const raw = localStorage.getItem('user');
    return raw ? JSON.parse(raw) : null;
  } catch (err) {
    console.error('Failed to parse user from localStorage:', err);
    return null;
  }
};

export const getCurrentSchoolId = () => {
  const user = getCurrentUser();
  const id = user?.id || user?.school_id || user?.schoolId;
  if (id && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)) {
    return id;
  }
  return 'ff90c0a6-9775-4fe4-a816-c065e85d2e24';
};
