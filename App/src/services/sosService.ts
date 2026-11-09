import { supabase } from '../lib/supabase';

export interface SOSDispatchParams {
  schoolId?: string;
  senderType: 'driver' | 'parent';
  senderId: string;
  senderName: string;
  vehicleName?: string;
  latitude: number;
  longitude: number;
}

/**
 * Dispatches an emergency SOS beacon to Supabase `sos_alerts` table.
 */
export const dispatchSOSAlert = async (params: SOSDispatchParams): Promise<boolean> => {
  try {
    const { error } = await supabase.from('sos_alerts').insert([
      {
        school_id: params.schoolId || null,
        sender_type: params.senderType,
        sender_id: params.senderId,
        sender_name: params.senderName,
        vehicle_name: params.vehicleName || null,
        latitude: params.latitude,
        longitude: params.longitude,
        status: 'active',
      },
    ]);

    if (error) {
      console.warn('Could not insert to sos_alerts:', error.message);
    }

    // Also broadcast notification to admin desk
    try {
      await supabase.from('notifications').insert([
        {
          school_id: params.schoolId || null,
          recipient_type: 'admin',
          title: `EMERGENCY SOS: ${params.senderName} (${params.senderType.toUpperCase()})`,
          body: `Emergency distress beacon triggered near coordinates (${params.latitude.toFixed(4)}, ${params.longitude.toFixed(4)}).`,
          type: 'sos',
          is_read: false,
        },
      ]);
    } catch {
      // Table migration fallback
    }

    return true;
  } catch (err) {
    console.error('SOS dispatch error:', err);
    return false;
  }
};
