import { supabase } from '../lib/supabaseClient';
import { getCurrentSchoolId } from '../lib/session';
import {
  createAppCredential,
  getSchoolCredentialsMap,
  getDeterministicFallbackCode,
} from './appCredentialsService';

export const getParents = async () => {
  const schoolId = getCurrentSchoolId();
  if (!schoolId) {
    throw new Error('No active school session found. Please sign in again.');
  }

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

  return (data || []).map((p, index) => {
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

  // If students were selected, link them to the newly created parent
  const studentDbIds = (parentData.selectedStudentIds || [])
    .concat((parentData.selectedStudents || []).map((s) => s.dbId || s.id))
    .filter((id) => id && typeof id === 'string' && id.length > 20); // Check valid UUIDs

  if (studentDbIds.length > 0 && data?.id) {
    try {
      await supabase
        .from('students')
        .update({
          parent_id: data.id,
          parent_name: data.name,
        })
        .in('id', studentDbIds)
        .eq('school_id', schoolId);
    } catch (linkError) {
      console.warn('Could not link students to parent in database:', linkError);
    }
  }

  // Generate and store unique 4-digit ID and password in app_credentials
  let credentials = null;
  if (data?.id) {
    credentials = await createAppCredential({
      schoolId,
      userType: 'parent',
      userId: data.id,
      name: data.name,
      phone: data.phone,
    });
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

  // Synchronize student links in the database
  if (parentData.selectedStudentIds !== undefined || parentData.children !== undefined) {
    const studentDbIds = (parentData.selectedStudentIds || [])
      .concat((parentData.selectedStudents || []).map((s) => s.dbId || s.id))
      .concat((parentData.children || []).map((c) => c.id))
      .filter((id) => id && typeof id === 'string' && id.length > 20);

    try {
      // 1. Unlink students previously linked to this parent who are no longer selected
      if (studentDbIds.length > 0) {
        await supabase
          .from('students')
          .update({ parent_id: null, parent_name: '' })
          .eq('parent_id', parentId)
          .eq('school_id', schoolId)
          .not('id', 'in', `(${studentDbIds.join(',')})`);
      } else {
        await supabase
          .from('students')
          .update({ parent_id: null, parent_name: '' })
          .eq('parent_id', parentId)
          .eq('school_id', schoolId);
      }

      // 2. Link newly selected students to this parent
      if (studentDbIds.length > 0) {
        await supabase
          .from('students')
          .update({
            parent_id: parentId,
            parent_name: parentData.name,
          })
          .in('id', studentDbIds)
          .eq('school_id', schoolId);
      }
    } catch (linkErr) {
      console.warn('Could not update student links on parent update:', linkErr);
    }
  }

  // Synchronize name & phone in app_credentials
  try {
    await supabase
      .from('app_credentials')
      .update({
        name: parentData.name,
        phone: parentData.phone || '',
      })
      .eq('user_id', parentId)
      .eq('school_id', schoolId);
  } catch (credErr) {
    console.warn('Could not update app credentials on parent update:', credErr);
  }

  return data;
};

export const deleteParent = async (parentId) => {
  const schoolId = getCurrentSchoolId();
  if (!schoolId) {
    throw new Error('No active school session found. Please sign in again.');
  }

  // Remove credentials for this parent if stored in app_credentials
  try {
    await supabase
      .from('app_credentials')
      .delete()
      .eq('user_id', parentId)
      .eq('school_id', schoolId);
  } catch (credErr) {
    console.warn('Could not remove app credentials for deleted parent:', credErr);
  }

  // Unlink any students assigned to this parent
  try {
    await supabase
      .from('students')
      .update({ parent_id: null, parent_name: '' })
      .eq('parent_id', parentId)
      .eq('school_id', schoolId);
  } catch (unlinkErr) {
    console.warn('Could not unlink students for deleted parent:', unlinkErr);
  }

  const { error } = await supabase
    .from('parents')
    .delete()
    .eq('id', parentId)
    .eq('school_id', schoolId);

  if (error) {
    console.error('Error deleting parent:', error);
    throw error;
  }

  return true;
};
