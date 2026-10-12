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
  return user?.id || null;
};
