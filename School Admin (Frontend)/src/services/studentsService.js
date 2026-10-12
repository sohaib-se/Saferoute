import { supabase } from '../lib/supabaseClient';
import { getCurrentSchoolId } from '../lib/session';
import { clearParentsCache } from './parentsService';

let studentsCache = {
  data: null,
  timestamp: 0,
  schoolId: null,
};
let studentsInFlight = null;
const CACHE_TTL_MS = 3 * 60 * 1000; // 3 minutes

export const clearStudentsCache = () => {
  studentsCache = { data: null, timestamp: 0, schoolId: null };
  studentsInFlight = null;
};

export const getStudents = async (forceRefresh = false) => {
  const schoolId = getCurrentSchoolId();
  if (!schoolId) {
    throw new Error('No active school session found. Please sign in again.');
  }

  const isCacheValid =
    !forceRefresh &&
    studentsCache.data &&
    studentsCache.schoolId === schoolId &&
    Date.now() - studentsCache.timestamp < CACHE_TTL_MS;

  if (isCacheValid) {
    return studentsCache.data;
  }

  if (!forceRefresh && studentsInFlight) {
    return studentsInFlight;
  }

  studentsInFlight = (async () => {
    try {
      const { data, error } = await supabase
        .from('students')
        .select('*')
        .eq('school_id', schoolId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching students:', error);
        throw error;
      }

      const avatarColors = [
        'bg-rose-100 text-rose-500',
        'bg-blue-100 text-blue-600',
        'bg-amber-100 text-amber-600',
        'bg-teal-100 text-teal-600',
        'bg-indigo-100 text-indigo-600',
        'bg-purple-100 text-purple-600',
        'bg-pink-100 text-pink-600',
      ];

      const formatted = (data || []).map((s, index) => {
        const parts = (s.name || '').trim().split(' ');
        const initials =
          parts.length >= 2
            ? `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase()
            : (s.name || 'ST').slice(0, 2).toUpperCase();

        return {
          dbId: s.id,
          id: s.student_code || `#ST-${index + 1000}`,
          num: index + 1,
          name: s.name,
          class: s.class_grade || 'Grade 5',
          section: s.section || '',
          rollNo: s.roll_no || '',
          gender: s.gender || 'Other',
          route: s.route || 'Route 1',
          vehicle: s.vehicle || 'Bus 01',
          driver: s.driver || '',
          status: s.status || 'Waiting',
          parentName: s.parent_name || '',
          relationship: s.relationship || '',
          address: s.address || '',
          photoUrl: s.photo_url || null,
          initials,
          avatarBg: avatarColors[index % avatarColors.length],
        };
      });

      studentsCache = {
        data: formatted,
        timestamp: Date.now(),
        schoolId,
      };

      return formatted;
    } finally {
      studentsInFlight = null;
    }
  })();

  return studentsInFlight;
};

export const addStudent = async (studentData) => {
  const schoolId = getCurrentSchoolId();
  if (!schoolId) {
    throw new Error('No active school session found. Please sign in again.');
  }

  const formattedId = studentData.id
    ? studentData.id.startsWith('#')
      ? studentData.id
      : `#${studentData.id}`
    : `#ST-${Math.floor(1000 + Math.random() * 9000)}`;

  const { data, error } = await supabase
    .from('students')
    .insert([
      {
        school_id: schoolId,
        student_code: formattedId,
        name: studentData.name,
        class_grade: studentData.class || studentData.class_grade || 'Grade 5',
        section: studentData.section || '',
        roll_no: studentData.rollNo || studentData.roll_no || '',
        gender: studentData.gender || 'Female',
        parent_name: studentData.parentName || studentData.parent_name || '',
        relationship: studentData.relationship || '',
        parent_id: studentData.parentId || null,
        vehicle: studentData.vehicle || 'Bus 01',
        driver: studentData.driver || '',
        route: studentData.route || 'Route 1',
        status: studentData.status || 'Waiting',
        address: studentData.address || '',
        photo_url: studentData.photoUrl || null,
      },
    ])
    .select()
    .single();

  if (error) {
    console.error('Error adding student:', error);
    throw error;
  }

  clearStudentsCache();
  if (typeof clearParentsCache === 'function') {
    clearParentsCache();
  }

  return data;
};

export const updateStudent = async (studentDbId, studentData) => {
  const schoolId = getCurrentSchoolId();
  if (!schoolId) {
    throw new Error('No active school session found. Please sign in again.');
  }

  const { data, error } = await supabase
    .from('students')
    .update({
      name: studentData.name,
      class_grade: studentData.class || studentData.class_grade,
      section: studentData.section,
      roll_no: studentData.rollNo || studentData.roll_no,
      gender: studentData.gender,
      parent_name: studentData.parentName || studentData.parent_name,
      relationship: studentData.relationship,
      vehicle: studentData.vehicle,
      driver: studentData.driver,
      route: studentData.route,
      status: studentData.status,
      address: studentData.address,
    })
    .eq('id', studentDbId)
    .eq('school_id', schoolId)
    .select()
    .single();

  if (error) {
    console.error('Error updating student:', error);
    throw error;
  }

  clearStudentsCache();
  if (typeof clearParentsCache === 'function') {
    clearParentsCache();
  }

  return data;
};

export const deleteStudent = async (studentDbId) => {
  const schoolId = getCurrentSchoolId();
  if (!schoolId) {
    throw new Error('No active school session found. Please sign in again.');
  }

  const { error } = await supabase
    .from('students')
    .delete()
    .eq('id', studentDbId)
    .eq('school_id', schoolId);

  if (error) {
    console.error('Error deleting student:', error);
    throw error;
  }

  clearStudentsCache();
  if (typeof clearParentsCache === 'function') {
    clearParentsCache();
  }

  return true;
};
