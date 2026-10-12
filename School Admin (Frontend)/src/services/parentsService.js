import { supabase } from '../lib/supabaseClient';
import { getCurrentSchoolId } from '../lib/session';

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

  // Fetch linked students to populate children for each parent
  let studentsByParent = {};
  try {
    const { data: studentsData } = await supabase
      .from('students')
      .select('id, name, class_grade, parent_id, student_code')
      .eq('school_id', schoolId);

    if (studentsData) {
      studentsData.forEach((st) => {
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
    }
  } catch (stErr) {
    console.warn('Could not fetch linked students for parents:', stErr);
  }

  return (data || []).map((p, index) => {
    const parts = (p.name || '').trim().split(' ');
    const initials =
      parts.length >= 2
        ? `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase()
        : (p.name || 'PA').slice(0, 2).toUpperCase();

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

  return data;
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
      route: parentData.route,
      bus: parentData.bus,
      status: parentData.status,
    })
    .eq('id', parentId)
    .eq('school_id', schoolId)
    .select()
    .single();

  if (error) {
    console.error('Error updating parent:', error);
    throw error;
  }

  return data;
};

export const deleteParent = async (parentId) => {
  const schoolId = getCurrentSchoolId();
  if (!schoolId) {
    throw new Error('No active school session found. Please sign in again.');
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
