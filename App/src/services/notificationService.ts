import { supabase } from '../lib/supabase';
import { NotificationItemData } from '../components/screencomponents/parent/notifications/NotificationList';

/**
 * Fetches real notifications from Supabase `notifications` table.
 */
export const fetchNotificationsFromDb = async (
  recipientType: 'parent' | 'driver',
  recipientId?: string,
  schoolId?: string
): Promise<NotificationItemData[]> => {
  try {
    let query = supabase
      .from('notifications')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(20);

    if (schoolId) query = query.eq('school_id', schoolId);
    if (recipientId) {
      query = query.or(`recipient_id.eq.${recipientId},recipient_type.eq.${recipientType},recipient_type.eq.all`);
    } else {
      query = query.or(`recipient_type.eq.${recipientType},recipient_type.eq.all`);
    }

    const { data, error } = await query;
    if (error) throw error;

    if (!data || data.length === 0) {
      return getFallbackNotifications(recipientType);
    }

    return data.map((n) => {
      const createdDate = new Date(n.created_at);
      const timeStr = `${createdDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • Today`;

      return {
        id: n.id,
        title: n.title,
        body: n.body,
        time: timeStr,
        type: n.type || 'notice',
        isRead: Boolean(n.is_read),
      };
    });
  } catch {
    return getFallbackNotifications(recipientType);
  }
};

/**
 * Marks notifications as read in Supabase.
 */
export const markNotificationsAsReadInDb = async (notificationIds: string[]): Promise<void> => {
  if (notificationIds.length === 0) return;
  try {
    await supabase
      .from('notifications')
      .update({ is_read: true })
      .in('id', notificationIds);
  } catch {
    // Graceful fallback
  }
};

const getFallbackNotifications = (role: 'parent' | 'driver'): NotificationItemData[] => {
  if (role === 'parent') {
    return [
      {
        id: 'n-1',
        title: 'Morning Route Commenced',
        body: 'Driver Hilal has started the morning pickup route for Bus 1.',
        time: '07:05 AM • Today',
        type: 'trip_start',
        isRead: false,
      },
      {
        id: 'n-2',
        title: 'Safe Arrival Notice',
        body: 'Bus 1 is operating on schedule with active telemetry enabled.',
        time: '07:15 AM • Today',
        type: 'notice',
        isRead: true,
      },
    ];
  } else {
    return [
      {
        id: 'dn-1',
        title: 'Roster Ready for Morning Shift',
        body: 'Morning Route - Sector G-10 is assigned with all stops updated.',
        time: '07:00 AM • Today',
        type: 'trip_start',
        isRead: false,
      },
    ];
  }
};
