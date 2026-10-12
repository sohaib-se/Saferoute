import { supabase } from '../lib/supabaseClient';
import { getCurrentSchoolId } from '../lib/session';
import {
  createAppCredential,
  getSchoolCredentialsMap,
  getDeterministicFallbackCode,
} from './appCredentialsService';
import { clearStudentsCache } from './studentsService';

let parentsCache = {
  data: null,
  timestamp: 0,
  schoolId: null,
};
let parentsInFlight = null;
const CACHE_TTL_MS = 3 * 60 * 1000; // 3 minutes

export const clearParentsCache = () => {
  parentsCache = { data: null, timestamp: 0, schoolId: null };
  parentsInFlight = null;
};

export const getParents = async (forceRefresh = false) => {
  const schoolId = getCurrentSchoolId();
  if (!schoolId) {
    throw new Error('No active school session found. Please sign in again.');
  }

  const isCacheValid =
    !forceRefresh &&
    parentsCache.data &&
    parentsCache.schoolId === schoolId &&
    Date.now() - parentsCache.timestamp < CACHE_TTL_MS;

  if (isCacheValid) {
    return parentsCache.data;
  }

  if (!forceRefresh && parentsInFlight) {
    return parentsInFlight;
  }

  parentsInFlight = (async () => {
    try {
      const { data, error } = await supabase
        .from('parents')
        .select('*')
        .eq('school_id', schoolId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching parents:', error);
        throw error;
      }

      // Fetch credentials map and linked students for parents
      const [credentialsMap, studentsDataResult] = await Promise.all([
        getSchoolCredentialsMap().catch(() => ({})),
        supabase
          .from('students')
          .select('id, name, class_grade, parent_id, student_code')
          .eq('school_id', schoolId)
          .then((res) => res.data || [])
          .catch(() => []),
      ]);

      const studentsByParent = {};
      studentsDataResult.forEach((st) => {
        if (st.parent_id) {
          if (!studentsByParent[st.parent_id]) {
            studentsByParent[st.parent_id] = [];
          }
          studentsByParent[st.parent_id].push({
            id: st.id,
            name: st.name,
            grade: st.class_grade || 'Grade 5',
            code: st.student_code,
          });
        }
      });

      const formatted = (data || []).map((p, index) => {
        const parts = (p.name || '').trim().split(' ');
        const initials =
          parts.length >= 2
            ? `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase()
            : (p.name || 'PA').slice(0, 2).toUpperCase();

        const cred = credentialsMap[p.id] || {
          loginId: getDeterministicFallbackCode(p),
          password: getDeterministicFallbackCode(p),
        };

        return {
          id: p.id,
          num: index + 1,
          name: p.name,
          email: p.email || 'N/A',
          phone: p.phone,
          address: p.address || '',
          route: p.route || 'Route 1',
          bus: p.bus || 'Bus 01',
          status: p.status || 'Active',
          initials,
          avatarBg: 'bg-blue-100 text-blue-600',
          children: studentsByParent[p.id] || [],
          credentials: cred,
        };
      });

      parentsCache = {
        data: formatted,
        timestamp: Date.now(),
        schoolId,
      };

      return formatted;
    } finally {
      parentsInFlight = null;
    }
  })();

  return parentsInFlight;
};

export const addParent = async (parentData) => {
  const schoolId = getCurrentSchoolId();
  if (!schoolId) {
    throw new Error('No active school session found. Please sign in again.');
  }

  const { data, error } = await supabase
    .from('parents')
    .insert([
      {
        school_id: schoolId,
        name: parentData.name,
        email: parentData.email || '',
        phone: parentData.phone,
        address: parentData.address || '',
        route: parentData.route || 'Route 1',
        bus: parentData.bus || 'Bus 01',
        status: parentData.status || 'Active',
      },
    ])
    .select()
    .single();

  if (error) {
    console.error('Error adding parent:', error);
    throw error;
  }

  // Link selected students and generate credentials concurrently
  const studentDbIds = (parentData.selectedStudentIds || [])
    .concat((parentData.selectedStudents || []).map((s) => s.dbId || s.id))
    .filter((id) => id && typeof id === 'string' && id.length > 20);

  let credentials = null;
  if (data?.id) {
    const linkPromise =
      studentDbIds.length > 0
        ? supabase
            .from('students')
            .update({
              parent_id: data.id,
              parent_name: data.name,
            })
            .in('id', studentDbIds)
            .eq('school_id', schoolId)
            .catch((linkError) => console.warn('Could not link students:', linkError))
        : Promise.resolve();

    const credPromise = createAppCredential({
      schoolId,
      userType: 'parent',
      userId: data.id,
      name: data.name,
      phone: data.phone,
    }).catch((credErr) => console.warn('Could not generate credentials:', credErr));

    const [, credResult] = await Promise.all([linkPromise, credPromise]);
    credentials = credResult;
  }

  clearParentsCache();
  if (typeof clearStudentsCache === 'function') {
    clearStudentsCache();
  }

  return { ...data, credentials };
};

export const updateParent = async (parentId, parentData) => {
  const schoolId = getCurrentSchoolId();
  if (!schoolId) {
    throw new Error('No active school session found. Please sign in again.');
  }

  const { data, error } = await supabase
    .from('parents')
    .update({
      name: parentData.name,
      email: parentData.email,
      phone: parentData.phone,
      address: parentData.address,
      route: parentData.route || 'Route 1',
      bus: parentData.bus || 'Bus 01',
      status: parentData.status || 'Active',
    })
    .eq('id', parentId)
    .eq('school_id', schoolId)
    .select()
    .single();

  if (error) {
    console.error('Error updating parent:', error);
    throw error;
  }

  // Synchronize student links and app credentials concurrently
  const updateTasks = [];

  if (parentData.selectedStudentIds !== undefined || parentData.children !== undefined) {
    const studentDbIds = (parentData.selectedStudentIds || [])
      .concat((parentData.selectedStudents || []).map((s) => s.dbId || s.id))
      .concat((parentData.children || []).map((c) => c.id))
      .filter((id) => id && typeof id === 'string' && id.length > 20);

    const studentSyncPromise = (async () => {
      try {
        if (studentDbIds.length > 0) {
          await supabase
            .from('students')
            .update({ parent_id: null, parent_name: '' })
            .eq('parent_id', parentId)
            .eq('school_id', schoolId)
            .not('id', 'in', `(${studentDbIds.join(',')})`);
          await supabase
            .from('students')
            .update({
              parent_id: parentId,
              parent_name: parentData.name,
            })
            .in('id', studentDbIds)
            .eq('school_id', schoolId);
        } else {
          await supabase
            .from('students')
            .update({ parent_id: null, parent_name: '' })
            .eq('parent_id', parentId)
            .eq('school_id', schoolId);
        }
      } catch (linkErr) {
        console.warn('Could not update student links on parent update:', linkErr);
      }
    })();

    updateTasks.push(studentSyncPromise);
  }

  // Synchronize name & phone in app_credentials
  updateTasks.push(
    supabase
      .from('app_credentials')
      .update({
        name: parentData.name,
        phone: parentData.phone || '',
      })
      .eq('user_id', parentId)
      .eq('school_id', schoolId)
      .catch((credErr) => {
        console.warn('Could not update app credentials on parent update:', credErr);
      })
  );

  await Promise.all(updateTasks);

  clearParentsCache();
  if (typeof clearStudentsCache === 'function') {
    clearStudentsCache();
  }

  return data;
};

export const deleteParent = async (parentId) => {
  const schoolId = getCurrentSchoolId();
  if (!schoolId) {
    throw new Error('No active school session found. Please sign in again.');
  }

  // Remove credentials and unlink students concurrently
  await Promise.all([
    supabase
      .from('app_credentials')
      .delete()
      .eq('user_id', parentId)
      .eq('school_id', schoolId)
      .catch((credErr) => console.warn('Could not remove app credentials for deleted parent:', credErr)),
    supabase
      .from('students')
      .update({ parent_id: null, parent_name: '' })
      .eq('parent_id', parentId)
      .eq('school_id', schoolId)
      .catch((unlinkErr) => console.warn('Could not unlink students for deleted parent:', unlinkErr)),
  ]);

  const { error } = await supabase
    .from('parents')
    .delete()
    .eq('id', parentId)
    .eq('school_id', schoolId);

  if (error) {
    console.error('Error deleting parent:', error);
    throw error;
  }

  clearParentsCache();
  if (typeof clearStudentsCache === 'function') {
    clearStudentsCache();
  }

  return true;
};
