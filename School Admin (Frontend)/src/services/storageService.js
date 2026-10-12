import { supabase } from '../lib/supabaseClient';
import { getCurrentSchoolId } from '../lib/session';

/**
 * Extracts the storage file path from a Supabase Storage public or signed URL.
 * e.g. "https://.../storage/v1/object/public/student-photos/school-id/ST-9041_123.jpg" -> "school-id/ST-9041_123.jpg"
 * @param {string} url - The URL or relative path.
 * @param {string} bucketName - Bucket name (default: 'student-photos').
 * @returns {string|null} - Clean file path or null.
 */
export const extractStoragePathFromUrl = (url, bucketName = 'student-photos') => {
  if (!url || typeof url !== 'string') return null;

  // Ignore local blob previews or base64 data URIs
  if (url.startsWith('blob:') || url.startsWith('data:')) {
    return null;
  }

  // If already relative (e.g. "school-id/ST-001.jpg" or "student-photos/school-id/ST-001.jpg")
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    let clean = url;
    if (clean.startsWith(`${bucketName}/`)) {
      clean = clean.replace(`${bucketName}/`, '');
    }
    return clean.replace(/^\/+/, '').replace(/\/+$/, '');
  }

  const marker = `/${bucketName}/`;
  const index = url.indexOf(marker);
  if (index !== -1) {
    const rawPath = url.substring(index + marker.length);
    const cleanPath = rawPath.split('?')[0].split('#')[0]; // strip query parameters and hash
    return decodeURIComponent(cleanPath).replace(/^\/+/, '').replace(/\/+$/, '');
  }

  return null;
};

/**
 * Deletes a student photo (or array of photos) from the 'student-photos' bucket in Supabase Storage.
 * @param {string|string[]} photoUrlOrPath - Public URL, relative path, or array of URLs/paths.
 * @returns {Promise<boolean>} - True if deleted successfully, false otherwise.
 */
export const deleteStudentPhoto = async (photoUrlOrPath) => {
  if (!photoUrlOrPath) return false;

  const items = Array.isArray(photoUrlOrPath) ? photoUrlOrPath : [photoUrlOrPath];
  const filePaths = items
    .map((item) => extractStoragePathFromUrl(item, 'student-photos'))
    .filter(Boolean);

  if (filePaths.length === 0) {
    return false;
  }

  try {
    const { data, error } = await supabase.storage
      .from('student-photos')
      .remove(filePaths);

    if (error) {
      console.warn('Failed to delete photo from Supabase storage:', error.message);
      return false;
    }

    console.log('Successfully removed old student photo(s) from storage:', filePaths, data);
    return true;
  } catch (err) {
    console.warn('Error deleting photo from storage:', err);
    return false;
  }
};

/**
 * Scans the student's storage directory and cleans up any old/orphaned photos for this student.
 * Ensures only the active photo remains in Supabase Storage.
 * @param {string} studentCodeOrId - Unique identifier of the student.
 * @param {string|null} keepUrlOrPath - Optional photo URL or path to keep (won't be deleted).
 * @returns {Promise<number>} - Count of orphaned photos removed.
 */
export const cleanupStudentPhotos = async (studentCodeOrId, keepUrlOrPath = null) => {
  if (!studentCodeOrId) return 0;

  const schoolId = getCurrentSchoolId() || 'default-school';
  const cleanId = String(studentCodeOrId).replace(/[^a-zA-Z0-9_-]/g, '');
  if (!cleanId) return 0;

  const keepPath = keepUrlOrPath ? extractStoragePathFromUrl(keepUrlOrPath, 'student-photos') : null;

  try {
    const { data: files, error } = await supabase.storage
      .from('student-photos')
      .list(schoolId, { limit: 100 });

    if (error || !Array.isArray(files)) {
      return 0;
    }

    // Identify files belonging to this student (e.g., "3213_1791802.jpg")
    const toDelete = files
      .filter((file) => file.name && (file.name.startsWith(`${cleanId}_`) || file.name.startsWith(`${cleanId}.`)))
      .map((file) => `${schoolId}/${file.name}`)
      .filter((filePath) => !keepPath || filePath !== keepPath);

    if (toDelete.length > 0) {
      console.log(`Cleaning up ${toDelete.length} legacy photo(s) for student ${cleanId}:`, toDelete);
      await supabase.storage.from('student-photos').remove(toDelete);
      return toDelete.length;
    }

    return 0;
  } catch (err) {
    console.warn('Error cleaning up legacy student photos:', err);
    return 0;
  }
};

/**
 * Uploads a student photo to the 'student-photos' bucket in Supabase Storage.
 * @param {File|Blob} file - The image file to upload.
 * @param {string} studentCodeOrId - Unique identifier to include in the filename.
 * @returns {Promise<string>} - Resolves with the public URL of the uploaded image.
 */
export const uploadStudentPhoto = async (file, studentCodeOrId = 'student') => {
  if (!file) return null;

  const schoolId = getCurrentSchoolId() || 'default-school';
  const cleanId = String(studentCodeOrId).replace(/[^a-zA-Z0-9_-]/g, '') || 'photo';
  const fileExt = file.name ? file.name.split('.').pop().toLowerCase() : 'jpg';
  const uniqueTimestamp = Date.now();
  const filePath = `${schoolId}/${cleanId}_${uniqueTimestamp}.${fileExt}`;

  const { error } = await supabase.storage
    .from('student-photos')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: true,
      contentType: file.type || 'image/jpeg',
    });

  if (error) {
    console.error('Failed to upload student photo to Supabase storage:', error);
    throw new Error(`Failed to upload student photo: ${error.message}`);
  }

  const { data: publicUrlData } = supabase.storage
    .from('student-photos')
    .getPublicUrl(filePath);

  return publicUrlData.publicUrl;
};
