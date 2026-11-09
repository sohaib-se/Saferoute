import { supabase } from '../lib/supabase';
import { ChildData } from '../components/screencomponents/parent/dashboard/ChildStatusCard';
export type { ChildData };

export interface ParentProfileData {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  joinedDate: string;
  role: string;
  bus: string;
}

export interface AssignedDriverDetails {
  driverName: string;
  phone: string;
  vehicleName: string;
  plateNumber: string;
  licenseNumber: string;
  route: string;
}

/**
 * Fetches all registered children for this parent from Supabase `students` table,
 * joined with assigned vehicle and driver data.
 */
export const getParentChildren = async (
  parentId?: string,
  parentName?: string,
  schoolId?: string
): Promise<ChildData[]> => {
  try {
    let query = supabase.from('students').select('*');

    if (schoolId) {
      query = query.eq('school_id', schoolId);
    }

    if (parentId) {
      query = query.or(`parent_id.eq.${parentId},parent_name.ilike.%${parentName || ''}%`);
    }

    const { data: studentsData, error } = await query;
    if (error) throw error;

    if (!studentsData || studentsData.length === 0) {
      return [];
    }

    // Fetch driver lookup map
    const driverNames = Array.from(new Set(studentsData.map((s) => s.driver).filter(Boolean)));
    const vehicleNames = Array.from(new Set(studentsData.map((s) => s.vehicle).filter(Boolean)));

    const [driversRes, vehiclesRes] = await Promise.all([
      driverNames.length > 0
        ? supabase.from('drivers').select('*').in('name', driverNames)
        : Promise.resolve({ data: [] }),
      vehicleNames.length > 0
        ? supabase.from('vehicles').select('*').in('name', vehicleNames)
        : Promise.resolve({ data: [] }),
    ]);

    const driversMap: Record<string, any> = {};
    (driversRes.data || []).forEach((d) => {
      driversMap[d.name.toLowerCase()] = d;
    });

    const vehiclesMap: Record<string, any> = {};
    (vehiclesRes.data || []).forEach((v) => {
      vehiclesMap[v.name.toLowerCase()] = v;
    });

    return studentsData.map((s, index) => {
      const dKey = (s.driver || '').toLowerCase();
      const vKey = (s.vehicle || '').toLowerCase();

      const matchedDriver = driversMap[dKey];
      const matchedVehicle = vehiclesMap[vKey];

      const driverPhone = matchedDriver?.phone || '03124124';
      const driverName = matchedDriver?.name || s.driver || 'Hilal';
      const vehiclePlate = matchedVehicle?.reg_no || 'ICT-4921';
      const vehicleDisplay = `${s.vehicle || 'Bus 1'} (${vehiclePlate})`;

      let status = (s.status as any) || 'Waiting';
      if (status === 'Picked up') status = 'En route';

      return {
        id: s.id,
        name: s.name,
        grade: `${s.class_grade || 'Grade 5'}${s.section ? ' - Section ' + s.section : ''}`,
        studentCode: s.student_code ? s.student_code.replace('#', '') : `${1480 + index}`,
        vehicle: vehicleDisplay,
        driverName,
        driverPhone,
        status,
        etaMinutes: status === 'En route' ? 7 : status === 'Waiting' ? 15 : 0,
        pickupTime: `07:${25 + index * 10} AM`,
        stopAddress: s.stop || s.address || 'Khatme Nabuwat Chowk',
      };
    });
  } catch (err) {
    console.error('Failed to load parent children from Supabase:', err);
    return [];
  }
};

/**
 * Fetches the guardian profile from Supabase `parents` table.
 */
export const getParentProfileData = async (
  parentId?: string,
  fallbackPhone?: string
): Promise<ParentProfileData> => {
  try {
    let query = supabase.from('parents').select('*');
    if (parentId) {
      query = query.eq('id', parentId);
    } else if (fallbackPhone) {
      query = query.eq('phone', fallbackPhone);
    }

    const { data } = await query.maybeSingle();

    const formattedDate = data?.created_at
      ? new Date(data.created_at).toLocaleDateString('en-US', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        })
      : '15 Sep 2024';

    return {
      id: data?.id || parentId || 'parent-1',
      name: data?.name || 'Zeeshan Malik',
      email: data?.email || 'zeeshan@gmail.com',
      phone: data?.phone || '+92 312 412412',
      address: data?.address || 'Khatme Nabuwat Chowk, Ghari Rashida',
      joinedDate: formattedDate,
      role: 'Primary Guardian',
      bus: data?.bus || 'Bus 1',
    };
  } catch (err) {
    console.error('Error fetching parent profile:', err);
    return {
      id: parentId || 'parent-1',
      name: 'Zeeshan Malik',
      email: 'zeeshan@gmail.com',
      phone: '+92 312 412412',
      address: 'Khatme Nabuwat Chowk, Ghari Rashida',
      joinedDate: '15 Sep 2024',
      role: 'Primary Guardian',
      bus: 'Bus 1',
    };
  }
};

/**
 * Fetches assigned driver details for the child.
 */
export const getAssignedDriverDetails = async (
  driverName: string = 'Hilal',
  vehicleName: string = 'Bus 1'
): Promise<AssignedDriverDetails> => {
  try {
    const [dRes, vRes] = await Promise.all([
      supabase.from('drivers').select('*').eq('name', driverName).maybeSingle(),
      supabase.from('vehicles').select('*').eq('name', vehicleName).maybeSingle(),
    ]);

    return {
      driverName: dRes.data?.name || driverName,
      phone: dRes.data?.phone || '03124124',
      vehicleName: vRes.data?.name || vehicleName,
      plateNumber: vRes.data?.reg_no || 'ICT-4921',
      licenseNumber: dRes.data?.license ? `DL-${dRes.data.license}` : 'DL-32412',
      route: dRes.data?.route || 'Morning Route - Sector G-10',
    };
  } catch {
    return {
      driverName,
      phone: '03124124',
      vehicleName,
      plateNumber: 'ICT-4921',
      licenseNumber: 'DL-32412',
      route: 'Morning Route - Sector G-10',
    };
  }
};

/**
 * Subscribes to real-time student updates (e.g. driver marks "Picked up" or "Dropped off")
 */
export const subscribeToStudentStatusChanges = (
  schoolId: string | undefined,
  onUpdate: (updatedStudent: any) => void
) => {
  const channel = supabase
    .channel('realtime:students_status')
    .on(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: 'students',
      },
      (payload) => {
        if (!schoolId || payload.new.school_id === schoolId) {
          onUpdate(payload.new);
        }
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
};

/**
 * Subscribes to driver live location updates for the assigned vehicle
 */
export const subscribeToLiveVehicleLocation = (
  vehicleName: string,
  onLocationUpdate: (location: { latitude: number; longitude: number; speedKmh: number }) => void
) => {
  const channel = supabase
    .channel(`realtime:vehicle_location_${vehicleName}`)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'vehicle_locations',
        filter: `vehicle_name=eq.${vehicleName}`,
      },
      (payload) => {
        const item = payload.new as any;
        if (item) {
          onLocationUpdate({
            latitude: Number(item.latitude),
            longitude: Number(item.longitude),
            speedKmh: Number(item.speed_kmh || 35),
          });
        }
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
};
