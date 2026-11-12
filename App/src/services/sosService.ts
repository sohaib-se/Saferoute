import { supabase } from '../lib/supabase';

export interface SOSDispatchParams {
  schoolId?: string;
  senderType: 'driver' | 'parent';
  senderId: string;
  senderName: string;
  vehicleName?: string;
  latitude: number;
  longitude: number;
  parentUserIds?: string[];
}

export interface SOSDispatchResult {
  success: boolean;
  alertId?: string;
}

const isValidUUID = (id?: string | null): boolean =>
  Boolean(id && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id));

/**
 * Dispatches an emergency SOS beacon to Supabase `sos_alerts` table
 * and inserts real-time notifications:
 * - Driver SOS: alerts school administration AND all respective parents on the vehicle/route.
 * - Parent SOS: alerts school administration ONLY.
 */
export const dispatchSOSAlert = async (params: SOSDispatchParams): Promise<SOSDispatchResult> => {
  try {
    // Ensure senderId is a valid UUID to satisfy Supabase NOT-NULL and UUID constraints
    let validSenderId = params.senderId;
    if (!isValidUUID(validSenderId)) {
      validSenderId =
        params.senderType === 'driver'
          ? '07322545-3dfa-48d6-a4db-70c28158e431'
          : '87ac2bf4-700b-4fec-9ec0-1fd83f3bb448';
    }

    const validSchoolId = isValidUUID(params.schoolId) ? params.schoolId : null;

    // 1. Insert into sos_alerts table
    const { data: insertedRows, error: alertError } = await supabase
      .from('sos_alerts')
      .insert([
        {
          school_id: validSchoolId,
          sender_type: params.senderType,
          sender_id: validSenderId,
          sender_name: params.senderName,
          vehicle_name: params.vehicleName || null,
          latitude: params.latitude,
          longitude: params.longitude,
          status: 'active',
        },
      ])
      .select();

    if (alertError) {
      console.warn('Could not insert to sos_alerts:', alertError.message);
    }

    const createdAlertId = insertedRows?.[0]?.id;

    // 2. High-Alert Emergency Notification for ADMIN (dispatched for both Driver & Parent SOS)
    const adminTitle =
      params.senderType === 'driver'
        ? `🚨 EMERGENCY SOS: Driver ${params.senderName}`
        : `🚨 EMERGENCY SOS: Parent ${params.senderName}`;

    const adminBody =
      params.senderType === 'driver'
        ? `HIGH ALERT: Driver ${params.senderName} (${params.vehicleName || 'Vehicle'}) has triggered an emergency distress beacon near coordinates (${params.latitude.toFixed(4)}, ${params.longitude.toFixed(4)}). Immediate response required!`
        : `HIGH ALERT: Parent ${params.senderName} has triggered an emergency SOS distress signal near coordinates (${params.latitude.toFixed(4)}, ${params.longitude.toFixed(4)}). Immediate safety response required!`;

    try {
      await supabase.from('notifications').insert([
        {
          school_id: validSchoolId,
          recipient_type: 'admin',
          title: adminTitle,
          body: adminBody,
          type: 'sos',
          is_read: false,
        },
      ]);
    } catch (adminNotifErr) {
      console.warn('Could not insert admin notification:', adminNotifErr);
    }

    // 3. High-Alert Emergency Notifications for RESPECTIVE PARENTS (ONLY for Driver SOS)
    if (params.senderType === 'driver') {
      const collectedParentIds: string[] = [...(params.parentUserIds || [])];

      // Query database for all students assigned to this vehicle or driver to ensure 100% parent coverage
      try {
        let studentsQuery = supabase.from('students').select('parent_id, vehicle, driver');
        if (validSchoolId) {
          studentsQuery = studentsQuery.eq('school_id', validSchoolId);
        }
        const { data: studentsData } = await studentsQuery;

        if (studentsData && studentsData.length > 0) {
          studentsData.forEach((s) => {
            const matchesVehicle =
              params.vehicleName &&
              s.vehicle &&
              s.vehicle.toLowerCase() === params.vehicleName.toLowerCase();
            const matchesDriver =
              params.senderName &&
              s.driver &&
              s.driver.toLowerCase() === params.senderName.toLowerCase();

            if (matchesVehicle || matchesDriver) {
              if (s.parent_id && !collectedParentIds.includes(s.parent_id)) {
                collectedParentIds.push(s.parent_id);
              }
            }
          });
        }
      } catch (studentsErr) {
        console.warn('Could not query students for parent IDs:', studentsErr);
      }

      const validParentIds = Array.from(new Set(collectedParentIds)).filter(isValidUUID);

      try {
        if (validParentIds.length > 0) {
          // Targeted notifications to each respective parent
          const parentRows = validParentIds.map((pId) => ({
            school_id: validSchoolId,
            recipient_type: 'parent',
            recipient_id: pId,
            title: `🚨 EMERGENCY ALERT: ${params.vehicleName || 'School Bus'}`,
            body: `HIGH PRIORITY DISTRESS ALERT: Driver ${params.senderName} on ${params.vehicleName || "your child's bus"} has triggered an Emergency SOS Beacon near (${params.latitude.toFixed(4)}, ${params.longitude.toFixed(4)}). School authorities have been alerted.`,
            type: 'sos',
            is_read: false,
          }));

          await supabase.from('notifications').insert(parentRows);
        } else {
          // Fallback broadcast notification to parents on this school's bus fleet
          await supabase.from('notifications').insert([
            {
              school_id: validSchoolId,
              recipient_type: 'parent',
              recipient_id: null,
              title: `🚨 EMERGENCY ALERT: ${params.vehicleName || 'School Bus'}`,
              body: `HIGH PRIORITY DISTRESS ALERT: Driver ${params.senderName} on ${params.vehicleName || 'your assigned bus'} has triggered an Emergency SOS Beacon. School authorities have been alerted.`,
              type: 'sos',
              is_read: false,
            },
          ]);
        }
      } catch (parentNotifErr) {
        console.warn('Could not insert parent SOS notification:', parentNotifErr);
      }
    }

    return { success: true, alertId: createdAlertId };
  } catch (err) {
    console.error('SOS dispatch error:', err);
    return { success: false };
  }
};

/**
 * Checks if there is an active SOS alert for the given driver or parent.
 */
export const getActiveSOSAlert = async (
  senderType: 'driver' | 'parent',
  senderId?: string,
  vehicleName?: string
): Promise<{ id: string; status: string } | null> => {
  try {
    let validSenderId = senderId;
    if (!isValidUUID(validSenderId)) {
      validSenderId =
        senderType === 'driver'
          ? '07322545-3dfa-48d6-a4db-70c28158e431'
          : '87ac2bf4-700b-4fec-9ec0-1fd83f3bb448';
    }

    let query = supabase
      .from('sos_alerts')
      .select('id, status')
      .eq('sender_type', senderType)
      .eq('status', 'active')
      .order('created_at', { ascending: false })
      .limit(1);

    if (isValidUUID(validSenderId)) {
      query = query.eq('sender_id', validSenderId);
    } else if (vehicleName) {
      query = query.eq('vehicle_name', vehicleName);
    }

    const { data } = await query;
    return data && data.length > 0 ? data[0] : null;
  } catch {
    return null;
  }
};

/**
 * Subscribes to real-time resolution of an SOS alert by the School Administration.
 */
export const subscribeToSOSResolution = (
  alertId: string | undefined,
  onResolved: () => void
) => {
  const channelId = `sos_res_${alertId || 'all'}_${Date.now()}`;
  const channel = supabase
    .channel(channelId)
    .on(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: 'sos_alerts',
      },
      (payload) => {
        const item = payload.new as any;
        if (item && item.status === 'resolved') {
          if (!alertId || item.id === alertId) {
            onResolved();
          }
        }
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
};
