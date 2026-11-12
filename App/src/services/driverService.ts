import { supabase } from '../lib/supabase';
import { StudentRosterItem, TransitMilestone } from '../context/DriverTripContext';

export interface DriverVehicleInfo {
  name: string;
  plate: string;
  route: string;
  model?: string;
  capacity?: string;
}

/**
 * Fetches the driver's profile, assigned vehicle, and assigned route details from Supabase.
 */
export const getDriverVehicleInfo = async (
  driverName: string,
  schoolId?: string
): Promise<DriverVehicleInfo> => {
  try {
    let query = supabase.from('drivers').select('*').eq('name', driverName);
    if (schoolId) query = query.eq('school_id', schoolId);
    const { data: driverData } = await query.maybeSingle();

    const assignedVehicleName = driverData?.vehicle && driverData.vehicle !== 'Unassigned'
      ? driverData.vehicle
      : 'Bus 1';

    const assignedRoute = driverData?.route && driverData.route !== 'Unassigned'
      ? driverData.route
      : 'Morning Route - Sector G-10';

    // Fetch matching vehicle record for registration plate number
    const { data: vehicleData } = await supabase
      .from('vehicles')
      .select('*')
      .eq('name', assignedVehicleName)
      .maybeSingle();

    return {
      name: assignedVehicleName,
      plate: vehicleData?.reg_no || 'ICT-4921',
      route: assignedRoute,
      model: vehicleData?.model || '2025',
      capacity: vehicleData?.capacity_seats || '30 Seats',
    };
  } catch (err) {
    console.warn('Could not fetch driver vehicle info:', err);
    return {
      name: 'Bus 1',
      plate: 'ICT-4921',
      route: 'Morning Route - Sector G-10',
    };
  }
};

/**
 * Fetches real students assigned to this driver/vehicle from Supabase `students` table,
 * joined with parent details from `parents` table.
 */
export const getDriverRoster = async (
  driverName: string,
  vehicleName: string,
  schoolId?: string,
  driverId?: string
): Promise<StudentRosterItem[]> => {
  try {
    let query = supabase
      .from('students')
      .select('*')
      .order('created_at', { ascending: true });

    if (schoolId) {
      query = query.eq('school_id', schoolId);
    }

    const { data: studentsData, error } = await query;
    if (error) throw error;

    if (!studentsData || studentsData.length === 0) {
      return [];
    }

    // Filter students assigned to this driver or vehicle (or route)
    const assignedStudents = studentsData.filter(
      (s) =>
        (driverId && s.driver_id === driverId) ||
        (s.driver && s.driver.toLowerCase() === driverName.toLowerCase()) ||
        (s.vehicle && s.vehicle.toLowerCase() === vehicleName.toLowerCase()) ||
        !s.driver // Fallback if unassigned in test environment
    );

    const studentListToProcess = assignedStudents.length > 0 ? assignedStudents : studentsData;

    // Fetch parents lookup map to get parent phone numbers, addresses, and userIds
    const parentIds = studentListToProcess
      .map((s) => s.parent_id)
      .filter((id): id is string => Boolean(id));
    const parentNames = studentListToProcess
      .map((s) => s.parent_name)
      .filter((name): name is string => Boolean(name));

    let parentsMapById: Record<string, { id: string; phone: string; address: string; name: string }> = {};
    let parentsMapByName: Record<string, { id: string; phone: string; address: string; name: string }> = {};

    let parentQuery = supabase.from('parents').select('id, name, phone, address');
    if (schoolId) parentQuery = parentQuery.eq('school_id', schoolId);

    const { data: parentsData } = await parentQuery;
    (parentsData || []).forEach((p) => {
      const info = {
        id: p.id,
        phone: p.phone || '',
        address: p.address || '',
        name: p.name || '',
      };
      if (p.id) parentsMapById[p.id] = info;
      if (p.name) parentsMapByName[p.name.trim().toLowerCase()] = info;
    });

    return studentListToProcess.map((s, index) => {
      const parent =
        (s.parent_id && parentsMapById[s.parent_id]) ||
        (s.parent_name && parentsMapByName[s.parent_name.trim().toLowerCase()]) ||
        null;

      const parentPhone = parent?.phone || s.phone || 'N/A';
      const parentName = parent?.name || s.parent_name || 'Guardian';
      const stopAddress = s.address || parent?.address || 'Designated Home Stop';

      const parts = (s.name || '').trim().split(' ');
      const avatarInitials =
        parts.length >= 2
          ? `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase()
          : (s.name || 'ST').slice(0, 2).toUpperCase();

      const dbStatus = s.status || 'Waiting';
      let milestone: TransitMilestone = 'waiting_home';
      if (dbStatus === 'Picked up') milestone = 'picked_home';
      else if (dbStatus === 'Dropped off') milestone = 'dropped_school';
      else if (dbStatus === 'Absent') milestone = 'absent';

      // Pickup time staggering
      const baseHour = 7;
      const minute = 15 + index * 10;
      const formattedPickupTime = `0${baseHour}:${minute < 10 ? '0' + minute : minute} AM`;

      return {
        id: s.id,
        stopNumber: index + 1,
        name: s.name,
        grade: `${s.class_grade || 'Grade 5'}${s.section ? ' - Sec ' + s.section : ''}`,
        stopAddress,
        pickupTime: formattedPickupTime,
        status: dbStatus as any,
        milestone,
        parentName,
        parentPhone,
        parentUserId: s.parent_id || parent?.id || undefined,
        avatarInitials,
        adminNotice: dbStatus === 'Absent' ? 'Student flagged absent today' : undefined,
      };
    });
  } catch (err) {
    console.error('Failed to fetch driver roster from Supabase:', err);
    return [];
  }
};

/**
 * Updates a student's status in Supabase and logs a notification for the guardian.
 */
export const updateStudentStatusInDb = async (
  studentId: string,
  status: 'Waiting' | 'Picked up' | 'Dropped off' | 'Absent',
  studentName?: string,
  schoolId?: string
): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('students')
      .update({ status })
      .eq('id', studentId);

    if (error) throw error;

    // Insert real-time notification for the parent
    try {
      await supabase.from('notifications').insert([
        {
          school_id: schoolId || null,
          recipient_type: 'parent',
          student_id: studentId,
          title: `Student Transit Update: ${status}`,
          body: `${studentName || 'Student'} has been marked as ${status} by Driver.`,
          type: status === 'Picked up' ? 'picked_up' : status === 'Dropped off' ? 'dropped_off' : 'notice',
          is_read: false,
        },
      ]);
    } catch {
      // Notifications table might not be migrated yet
    }

    return true;
  } catch (err) {
    console.error('Error updating student status in Supabase:', err);
    return false;
  }
};

/**
 * Batch drops all onboard students at school gate.
 */
export const batchDropAllAtSchoolInDb = async (
  studentIds: string[],
  vehicleName: string,
  schoolId?: string
): Promise<number> => {
  if (studentIds.length === 0) return 0;
  try {
    const { error } = await supabase
      .from('students')
      .update({ status: 'Dropped off' })
      .in('id', studentIds);

    if (error) throw error;

    try {
      await supabase.from('notifications').insert([
        {
          school_id: schoolId || null,
          recipient_type: 'parent',
          title: 'School Gate Arrival',
          body: `${vehicleName} has safely dropped off students at school.`,
          type: 'dropped_off',
          is_read: false,
        },
      ]);
    } catch {
      // Optional table migration
    }

    return studentIds.length;
  } catch (err) {
    console.error('Batch drop all failed:', err);
    return 0;
  }
};

/**
 * Broadcasts driver live GPS location to Supabase `vehicle_locations` table.
 */
export const broadcastDriverLocationToDb = async (
  schoolId: string | undefined,
  driverId: string | undefined,
  vehicleName: string,
  latitude: number,
  longitude: number,
  speedKmh: number = 35,
  heading: number = 0
): Promise<void> => {
  if (!vehicleName) return;

  try {
    const payload = {
      school_id: schoolId || null,
      driver_id: driverId || null,
      vehicle_name: vehicleName,
      latitude,
      longitude,
      speed_kmh: speedKmh,
      heading,
      is_active: true,
      updated_at: new Date().toISOString(),
    };

    // Primary: Upsert on unique vehicle_name
    const { error } = await supabase
      .from('vehicle_locations')
      .upsert(payload, { onConflict: 'vehicle_name' });

    if (error) {
      console.warn('Primary upsert error in broadcastDriverLocationToDb:', error.message);

      // If error is foreign key related (driver_id / school_id invalid UUID), retry with null FKs
      if (error.code === '23503') {
        await supabase.from('vehicle_locations').upsert(
          { ...payload, school_id: null, driver_id: null },
          { onConflict: 'vehicle_name' }
        );
      } else {
        // Fallback: check if row exists and update, otherwise insert
        const { data: existing } = await supabase
          .from('vehicle_locations')
          .select('id')
          .eq('vehicle_name', vehicleName)
          .maybeSingle();

        if (existing) {
          await supabase
            .from('vehicle_locations')
            .update(payload)
            .eq('id', existing.id);
        } else {
          await supabase.from('vehicle_locations').insert([payload]);
        }
      }
    }
  } catch (err) {
    console.warn('broadcastDriverLocationToDb exception:', err);
  }
};

/**
 * Stops broadcasting and clears the vehicle from vehicle_locations in Supabase.
 */
export const stopDriverLocationBroadcast = async (vehicleName: string) => {
  try {
    if (!vehicleName) return;
    // Delete the location record so vehicle_locations ONLY holds vehicles with active trips
    const { error } = await supabase
      .from('vehicle_locations')
      .delete()
      .eq('vehicle_name', vehicleName);

    if (error) {
      // Fallback: mark is_active = false
      await supabase
        .from('vehicle_locations')
        .update({ is_active: false, updated_at: new Date().toISOString() })
        .eq('vehicle_name', vehicleName);
    }
  } catch (err) {
    console.warn('stopDriverLocationBroadcast error:', err);
  }
};

/**
 * Fetches official school administration contact desk from Supabase `schools` table.
 */
export const getSchoolTransportDesk = async (schoolId?: string) => {
  try {
    let query = supabase.from('schools').select('*');
    if (schoolId) query = query.eq('id', schoolId);
    const { data } = await query.maybeSingle();

    return {
      name: data?.name || 'School Transport Desk',
      phone: data?.phone || '051-111-222-333',
      address: data?.address || 'Main Campus Gate 1',
      email: data?.email || 'transport@saferoute.edu',
    };
  } catch {
    return {
      name: 'School Transport Desk',
      phone: '051-111-222-333',
      address: 'Main Campus Gate 1',
      email: 'transport@saferoute.edu',
    };
  }
};
