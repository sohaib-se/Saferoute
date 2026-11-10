import { supabase } from '../lib/supabaseClient';
import { getCurrentSchoolId } from '../lib/session';

const getSchoolId = () => {
  const schoolId = getCurrentSchoolId();
  if (!schoolId) throw new Error('No active school session found. Please sign in again.');
  return schoolId;
};

const toDateString = (date = new Date()) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// ─── Status badge styling helpers ──────────────────────────────────────────

export const getOverallStatusBadge = (status) => {
  switch (status) {
    case 'pickup_active':
      return {
        label: 'Pickup Active',
        style: 'bg-blue-50 text-blue-700 border border-blue-200',
        dot: 'bg-blue-500',
      };
    case 'pickup_done':
      return {
        label: 'At School',
        style: 'bg-teal-50 text-teal-700 border border-teal-200',
        dot: 'bg-teal-500',
      };
    case 'dropoff_active':
      return {
        label: 'Dropoff Active',
        style: 'bg-amber-50 text-amber-700 border border-amber-200',
        dot: 'bg-amber-500',
      };
    case 'completed':
      return {
        label: 'Completed',
        style: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
        dot: 'bg-emerald-500',
      };
    default:
      return {
        label: 'Pending',
        style: 'bg-slate-100 text-slate-600 border border-slate-200',
        dot: 'bg-slate-400',
      };
  }
};

export const getSubTripStatusBadge = (status) => {
  switch (status) {
    case 'in_progress':
      return {
        label: 'In Progress',
        style: 'bg-blue-50 text-blue-700 border border-blue-200',
      };
    case 'completed':
      return {
        label: 'Completed ✓',
        style: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
      };
    case 'locked':
      return {
        label: 'Locked 🔒',
        style: 'bg-slate-100 text-slate-500 border border-slate-200',
      };
    default:
      return {
        label: 'Pending',
        style: 'bg-slate-100 text-slate-500 border border-slate-200',
      };
  }
};

// ─── Fetch trips for school ────────────────────────────────────────────────

export const getTrips = async (filterDate = null) => {
  const schoolId = getSchoolId();

  let query = supabase
    .from('trips')
    .select('*')
    .eq('school_id', schoolId)
    .order('created_at', { ascending: false });

  if (filterDate) {
    query = query.eq('trip_date', toDateString(filterDate));
  }

  const { data: tripsData, error: tripsError } = await query;
  if (tripsError) {
    console.error('Error fetching trips:', tripsError);
    throw tripsError;
  }

  if (!tripsData || tripsData.length === 0) {
    return [];
  }

  // Fetch all attendance rows for these trips to compute actual counts
  const tripIds = tripsData.map((t) => t.id);
  const { data: attendanceData } = await supabase
    .from('trip_attendance')
    .select('trip_id, pickup_status, dropoff_status')
    .in('trip_id', tripIds);

  const attendanceMap = {};
  (attendanceData || []).forEach((att) => {
    if (!attendanceMap[att.trip_id]) {
      attendanceMap[att.trip_id] = { total: 0, picked: 0, dropped: 0, absent: 0 };
    }
    attendanceMap[att.trip_id].total += 1;
    if (att.pickup_status === 'picked_up') attendanceMap[att.trip_id].picked += 1;
    if (att.pickup_status === 'absent') attendanceMap[att.trip_id].absent += 1;
    if (att.dropoff_status === 'dropped') attendanceMap[att.trip_id].dropped += 1;
  });

  return tripsData.map((t, idx) => {
    const counts = attendanceMap[t.id] || { total: 0, picked: 0, dropped: 0, absent: 0 };
    const overallBadge = getOverallStatusBadge(t.overall_status);
    const pickupBadge = getSubTripStatusBadge(t.pickup_status);
    const dropoffBadge = getSubTripStatusBadge(t.dropoff_status);

    const driverInitials = (t.driver_name || 'DR')
      .trim()
      .split(' ')
      .map((n) => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();

    // Formatting timing string
    let timings = 'Scheduled';
    if (t.pickup_started_at) {
      const pStart = new Date(t.pickup_started_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const pEnd = t.pickup_completed_at
        ? new Date(t.pickup_completed_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        : 'In Transit';
      timings = `${pStart} - ${pEnd}`;
    }

    return {
      id: t.id,
      displayId: `#TRP-${t.id.slice(0, 6).toUpperCase()}`,
      num: idx + 1,
      schoolId: t.school_id,
      driverId: t.driver_id,
      driverName: t.driver_name || 'Unassigned',
      driverInitials,
      vehicleName: t.vehicle_name || 'Bus',
      route: t.route || 'General Route',
      tripDate: t.trip_date,

      // Sub-trip statuses
      pickupStatus: t.pickup_status,
      pickupStartedAt: t.pickup_started_at,
      pickupCompletedAt: t.pickup_completed_at,
      pickupBadge,

      dropoffStatus: t.dropoff_status,
      dropoffStartedAt: t.dropoff_started_at,
      dropoffCompletedAt: t.dropoff_completed_at,
      dropoffBadge,

      // Overall
      overallStatus: t.overall_status,
      overallBadge,

      // Computed counts from trip_attendance
      totalStudents: counts.total,
      studentsPicked: counts.picked,
      studentsDropped: counts.dropped,
      studentsAbsent: counts.absent,

      timings,
      createdAt: t.created_at,
      updatedAt: t.updated_at,
    };
  });
};

/**
 * Fetch detailed student attendance for a trip, joining student details.
 */
export const getTripAttendance = async (tripId) => {
  const schoolId = getSchoolId();

  const { data: attData, error: attError } = await supabase
    .from('trip_attendance')
    .select('*')
    .eq('trip_id', tripId);

  if (attError) throw attError;
  if (!attData || attData.length === 0) return [];

  // Fetch matching students from students table
  const studentIds = attData.map((a) => a.student_id);
  const { data: studentsData } = await supabase
    .from('students')
    .select('id, name, student_code, class_grade, section, address, parent_name, photo_url')
    .in('id', studentIds);

  const studentMap = {};
  (studentsData || []).forEach((st) => {
    studentMap[st.id] = st;
  });

  return attData.map((att, index) => {
    const student = studentMap[att.student_id] || {};
    return {
      id: att.id,
      studentId: att.student_id,
      num: index + 1,
      studentName: student.name || 'Student',
      studentCode: student.student_code || `#ST-${index + 100}`,
      classGrade: student.class_grade || 'Grade 5',
      section: student.section || '',
      address: student.address || 'Designated Stop',
      parentName: student.parent_name || 'Guardian',
      photoUrl: student.photo_url || null,
      pickupStatus: att.pickup_status,
      pickedUpAt: att.picked_up_at
        ? new Date(att.picked_up_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        : null,
      dropoffStatus: att.dropoff_status,
      droppedAt: att.dropped_at
        ? new Date(att.dropped_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        : null,
    };
  });
};

/**
 * Delete a trip and its attendance records.
 */
export const deleteTrip = async (tripId) => {
  const schoolId = getSchoolId();

  const { error } = await supabase
    .from('trips')
    .delete()
    .eq('id', tripId)
    .eq('school_id', schoolId);

  if (error) {
    console.error('Error deleting trip:', error);
    throw error;
  }
  return true;
};

