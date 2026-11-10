import { supabase } from '../lib/supabase';

export interface TripRecord {
  id: string;
  school_id?: string;
  driver_id?: string;
  driver_name: string;
  vehicle_name: string;
  route: string;
  trip_date: string;
  pickup_status: 'pending' | 'in_progress' | 'completed';
  pickup_started_at?: string;
  pickup_completed_at?: string;
  dropoff_status: 'locked' | 'pending' | 'in_progress' | 'completed';
  dropoff_started_at?: string;
  dropoff_completed_at?: string;
  overall_status: 'pending' | 'pickup_active' | 'pickup_done' | 'dropoff_active' | 'completed';
  created_at?: string;
  updated_at?: string;
}

export interface TripAttendanceRecord {
  id: string;
  trip_id: string;
  student_id: string;
  school_id?: string;
  pickup_status: 'pending' | 'picked_up' | 'absent';
  picked_up_at?: string;
  dropoff_status: 'pending' | 'dropped' | 'skipped';
  dropped_at?: string;
  created_at?: string;
}

const getTodayDateString = (): string => {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * Fetch today's most recent active or created trip for a specific driver.
 */
export const getTodayTripForDriver = async (
  driverName?: string,
  driverId?: string,
  schoolId?: string
): Promise<TripRecord | null> => {
  try {
    const today = getTodayDateString();
    let query = supabase
      .from('trips')
      .select('*')
      .eq('trip_date', today)
      .order('created_at', { ascending: false })
      .limit(1);

    if (driverId) {
      query = query.eq('driver_id', driverId);
    } else if (driverName) {
      query = query.eq('driver_name', driverName);
    }

    if (schoolId) {
      query = query.eq('school_id', schoolId);
    }

    const { data, error } = await query;
    if (error) {
      console.warn('Error fetching today trip:', error.message);
      return null;
    }

    if (data && data.length > 0) {
      return data[0] as TripRecord;
    }
    return null;
  } catch (err) {
    console.warn('getTodayTripForDriver exception:', err);
    return null;
  }
};

/**
 * Create a new trip for today by the driver.
 */
export const createDriverTrip = async (params: {
  schoolId?: string;
  driverId?: string;
  driverName: string;
  vehicleName: string;
  route: string;
}): Promise<TripRecord | null> => {
  try {
    const today = getTodayDateString();
    const payload = {
      school_id: params.schoolId || null,
      driver_id: params.driverId || null,
      driver_name: params.driverName,
      vehicle_name: params.vehicleName,
      route: params.route,
      trip_date: today,
      pickup_status: 'pending',
      dropoff_status: 'locked',
      overall_status: 'pending',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from('trips')
      .insert([payload])
      .select()
      .single();

    if (error) {
      console.error('Error inserting trip:', error.message);
      throw error;
    }

    return data as TripRecord;
  } catch (err) {
    console.error('createDriverTrip exception:', err);
    throw err;
  }
};

/**
 * Initialize trip_attendance rows for all students assigned to this driver/vehicle.
 */
export const initializeTripAttendance = async (
  tripId: string,
  studentIds: string[],
  schoolId?: string
): Promise<boolean> => {
  if (!studentIds || studentIds.length === 0) return true;

  try {
    const rows = studentIds.map((studentId) => ({
      trip_id: tripId,
      student_id: studentId,
      school_id: schoolId || null,
      pickup_status: 'pending',
      dropoff_status: 'pending',
      created_at: new Date().toISOString(),
    }));

    const { error } = await supabase
      .from('trip_attendance')
      .upsert(rows, { onConflict: 'trip_id,student_id' });

    if (error) {
      console.warn('Error initializing trip attendance:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.warn('initializeTripAttendance exception:', err);
    return false;
  }
};

/**
 * Fetch all trip_attendance records for a trip.
 */
export const getTripAttendanceRecords = async (tripId: string): Promise<TripAttendanceRecord[]> => {
  try {
    const { data, error } = await supabase
      .from('trip_attendance')
      .select('*')
      .eq('trip_id', tripId);

    if (error) {
      console.warn('Error fetching trip attendance records:', error.message);
      return [];
    }
    return (data || []) as TripAttendanceRecord[];
  } catch (err) {
    console.warn('getTripAttendanceRecords exception:', err);
    return [];
  }
};

/**
 * Start the pickup sub-trip.
 * Sets pickup_status = 'in_progress', overall_status = 'pickup_active', pickup_started_at = now
 */
export const startPickupSubTrip = async (tripId: string): Promise<TripRecord | null> => {
  try {
    const nowIso = new Date().toISOString();
    const { data, error } = await supabase
      .from('trips')
      .update({
        pickup_status: 'in_progress',
        overall_status: 'pickup_active',
        pickup_started_at: nowIso,
        updated_at: nowIso,
      })
      .eq('id', tripId)
      .select()
      .single();

    if (error) throw error;
    return data as TripRecord;
  } catch (err) {
    console.error('startPickupSubTrip error:', err);
    return null;
  }
};

/**
 * Mark a single student as picked up.
 */
export const markStudentPickedUpInDb = async (
  tripId: string,
  studentId: string,
  studentName?: string,
  schoolId?: string
): Promise<boolean> => {
  try {
    const nowIso = new Date().toISOString();

    // 1. Update trip_attendance row
    await supabase
      .from('trip_attendance')
      .update({
        pickup_status: 'picked_up',
        picked_up_at: nowIso,
      })
      .eq('trip_id', tripId)
      .eq('student_id', studentId);

    // 2. Also update students table for backwards compatibility with parent tracking
    await supabase
      .from('students')
      .update({ status: 'Picked up' })
      .eq('id', studentId);

    // 3. Insert notification for parent
    try {
      await supabase.from('notifications').insert([
        {
          school_id: schoolId || null,
          recipient_type: 'parent',
          student_id: studentId,
          title: 'Student Picked Up',
          body: `${studentName || 'Student'} has safely boarded the bus.`,
          type: 'picked_up',
          is_read: false,
        },
      ]);
    } catch {}

    return true;
  } catch (err) {
    console.error('markStudentPickedUpInDb error:', err);
    return false;
  }
};

/**
 * Mark a single student as absent during pickup.
 */
export const markStudentAbsentInDb = async (
  tripId: string,
  studentId: string,
  studentName?: string,
  schoolId?: string
): Promise<boolean> => {
  try {
    await supabase
      .from('trip_attendance')
      .update({
        pickup_status: 'absent',
        dropoff_status: 'skipped',
      })
      .eq('trip_id', tripId)
      .eq('student_id', studentId);

    await supabase
      .from('students')
      .update({ status: 'Absent' })
      .eq('id', studentId);

    try {
      await supabase.from('notifications').insert([
        {
          school_id: schoolId || null,
          recipient_type: 'parent',
          student_id: studentId,
          title: 'Student Marked Absent',
          body: `${studentName || 'Student'} was marked absent for the morning pickup route.`,
          type: 'notice',
          is_read: false,
        },
      ]);
    } catch {}

    return true;
  } catch (err) {
    console.error('markStudentAbsentInDb error:', err);
    return false;
  }
};

/**
 * Complete the pickup sub-trip ("Drop at School" button).
 * Any students still 'pending' are marked 'absent'.
 * Trips record: pickup_status = 'completed', pickup_completed_at = now,
 * dropoff_status = 'pending' (unlocked!), overall_status = 'pickup_done'.
 */
export const completePickupSubTrip = async (
  tripId: string,
  schoolId?: string
): Promise<TripRecord | null> => {
  try {
    const nowIso = new Date().toISOString();

    // 1. Mark any still pending students as absent in trip_attendance
    const { data: pendingRows } = await supabase
      .from('trip_attendance')
      .select('student_id')
      .eq('trip_id', tripId)
      .eq('pickup_status', 'pending');

    if (pendingRows && pendingRows.length > 0) {
      const pendingIds = pendingRows.map((r) => r.student_id);
      await supabase
        .from('trip_attendance')
        .update({ pickup_status: 'absent', dropoff_status: 'skipped' })
        .eq('trip_id', tripId)
        .in('student_id', pendingIds);

      await supabase
        .from('students')
        .update({ status: 'Absent' })
        .in('id', pendingIds);
    }

    // 2. Mark all picked_up students as 'Dropped off' at school on students table
    const { data: pickedRows } = await supabase
      .from('trip_attendance')
      .select('student_id')
      .eq('trip_id', tripId)
      .eq('pickup_status', 'picked_up');

    if (pickedRows && pickedRows.length > 0) {
      const pickedIds = pickedRows.map((r) => r.student_id);
      await supabase
        .from('students')
        .update({ status: 'Dropped off' })
        .in('id', pickedIds);
    }

    // 3. Update the trip record
    const { data, error } = await supabase
      .from('trips')
      .update({
        pickup_status: 'completed',
        pickup_completed_at: nowIso,
        dropoff_status: 'pending', // Unlocked!
        overall_status: 'pickup_done',
        updated_at: nowIso,
      })
      .eq('id', tripId)
      .select()
      .single();

    if (error) throw error;

    // Send broadcast notification
    try {
      await supabase.from('notifications').insert([
        {
          school_id: schoolId || null,
          recipient_type: 'parent',
          title: 'Arrived at School Gate',
          body: 'The morning pickup trip is complete. All onboard students safely dropped off at school.',
          type: 'dropped_off',
          is_read: false,
        },
      ]);
    } catch {}

    return data as TripRecord;
  } catch (err) {
    console.error('completePickupSubTrip error:', err);
    return null;
  }
};

/**
 * Start the dropoff sub-trip.
 * Sets dropoff_status = 'in_progress', overall_status = 'dropoff_active', dropoff_started_at = now
 */
export const startDropoffSubTrip = async (tripId: string): Promise<TripRecord | null> => {
  try {
    const nowIso = new Date().toISOString();
    const { data, error } = await supabase
      .from('trips')
      .update({
        dropoff_status: 'in_progress',
        overall_status: 'dropoff_active',
        dropoff_started_at: nowIso,
        updated_at: nowIso,
      })
      .eq('id', tripId)
      .select()
      .single();

    if (error) throw error;
    return data as TripRecord;
  } catch (err) {
    console.error('startDropoffSubTrip error:', err);
    return null;
  }
};

/**
 * Mark a single student as dropped off at home during the afternoon trip.
 */
export const markStudentDroppedInDb = async (
  tripId: string,
  studentId: string,
  studentName?: string,
  schoolId?: string
): Promise<boolean> => {
  try {
    const nowIso = new Date().toISOString();

    // Update trip attendance row
    await supabase
      .from('trip_attendance')
      .update({
        dropoff_status: 'dropped',
        dropped_at: nowIso,
      })
      .eq('trip_id', tripId)
      .eq('student_id', studentId);

    // Update students table
    await supabase
      .from('students')
      .update({ status: 'Dropped off' })
      .eq('id', studentId);

    try {
      await supabase.from('notifications').insert([
        {
          school_id: schoolId || null,
          recipient_type: 'parent',
          student_id: studentId,
          title: 'Student Safely Dropped Home',
          body: `${studentName || 'Student'} has safely arrived at home.`,
          type: 'dropped_off',
          is_read: false,
        },
      ]);
    } catch {}

    return true;
  } catch (err) {
    console.error('markStudentDroppedInDb error:', err);
    return false;
  }
};

/**
 * Complete the dropoff trip.
 * If force = true, any remaining pending dropoffs are marked 'skipped'.
 * Sets dropoff_status = 'completed', overall_status = 'completed', dropoff_completed_at = now
 */
export const completeDropoffSubTrip = async (
  tripId: string,
  force: boolean = false,
  schoolId?: string
): Promise<{ success: boolean; message: string; trip?: TripRecord }> => {
  try {
    const nowIso = new Date().toISOString();

    // Check if there are pending students who were picked up in the morning
    const { data: pendingRows } = await supabase
      .from('trip_attendance')
      .select('student_id')
      .eq('trip_id', tripId)
      .eq('pickup_status', 'picked_up')
      .eq('dropoff_status', 'pending');

    if (pendingRows && pendingRows.length > 0) {
      if (!force) {
        return {
          success: false,
          message: `Cannot complete trip: ${pendingRows.length} student(s) have not been dropped yet.`,
        };
      } else {
        // Force-complete: mark remaining as 'skipped'
        const pendingIds = pendingRows.map((r) => r.student_id);
        await supabase
          .from('trip_attendance')
          .update({ dropoff_status: 'skipped' })
          .eq('trip_id', tripId)
          .in('student_id', pendingIds);
      }
    }

    const { data, error } = await supabase
      .from('trips')
      .update({
        dropoff_status: 'completed',
        overall_status: 'completed',
        dropoff_completed_at: nowIso,
        updated_at: nowIso,
      })
      .eq('id', tripId)
      .select()
      .single();

    if (error) throw error;

    try {
      await supabase.from('notifications').insert([
        {
          school_id: schoolId || null,
          recipient_type: 'parent',
          title: 'Drop-off Route Completed',
          body: 'The afternoon drop-off route is complete. SafeRoute trip concluded.',
          type: 'notice',
          is_read: false,
        },
      ]);
    } catch {}

    return {
      success: true,
      message: 'Trip completed successfully! All students dropped safely.',
      trip: data as TripRecord,
    };
  } catch (err: any) {
    console.error('completeDropoffSubTrip error:', err);
    return {
      success: false,
      message: err.message || 'Failed to complete dropoff trip.',
    };
  }
};

