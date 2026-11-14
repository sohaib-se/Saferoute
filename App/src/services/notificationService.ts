import { supabase } from '../lib/supabase';
import { NotificationItemData } from '../components/screencomponents/parent/notifications/NotificationList';

const isValidUUID = (id?: string | null): boolean =>
  Boolean(id && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id));

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
      .limit(30);

    if (schoolId && isValidUUID(schoolId)) {
      query = query.or(`school_id.eq.${schoolId},school_id.is.null`);
    }

    if (recipientId && isValidUUID(recipientId)) {
      query = query.or(
        `recipient_id.eq.${recipientId},and(recipient_type.eq.${recipientType},recipient_id.is.null),recipient_type.eq.all`
      );
    } else {
      query = query.or(`recipient_type.eq.${recipientType},recipient_type.eq.all`);
    }

    const { data, error } = await query;
    if (error) throw error;

    if (!data || data.length === 0) {
      return [];
    }

    return data.map((n) => {
      const createdDate = new Date(n.created_at);
      const isToday = new Date().toDateString() === createdDate.toDateString();
      const timeStr = isToday
        ? `${createdDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • Today`
        : `${createdDate.toLocaleDateString([], { month: 'short', day: 'numeric' })} • ${createdDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

      return {
        id: n.id,
        title: n.title,
        body: n.body,
        time: timeStr,
        type: n.type || 'notice',
        isRead: Boolean(n.is_read),
      };
    });
  } catch (err) {
    console.warn('fetchNotificationsFromDb error:', err);
    return [];
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

/**
 * Subscribes to new real-time notifications for the given recipient type and school.
 */
export const subscribeToNotifications = (
  recipientType: 'parent' | 'driver',
  recipientId: string | undefined,
  schoolId: string | undefined,
  onNewNotification: (notif: NotificationItemData) => void,
  onDeleteNotification?: (deletedId: string) => void
) => {
  const channel = supabase
    .channel(`realtime:notifications:${recipientType}_${recipientId || 'all'}`)
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'notifications',
      },
      (payload) => {
        const n = payload.new as any;
        if (!n) return;

        // Check if matching recipient
        const matchesType = n.recipient_type === recipientType || n.recipient_type === 'all';
        const matchesRecipient = !n.recipient_id || n.recipient_id === recipientId;
        const matchesSchool = !schoolId || !n.school_id || n.school_id === schoolId;

        if (matchesType && matchesRecipient && matchesSchool) {
          const createdDate = new Date(n.created_at);
          const timeStr = `${createdDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • Today`;
          onNewNotification({
            id: n.id,
            title: n.title,
            body: n.body,
            time: timeStr,
            type: n.type || 'notice',
            isRead: Boolean(n.is_read),
          });
        }
      }
    )
    .on(
      'postgres_changes',
      {
        event: 'DELETE',
        schema: 'public',
        table: 'notifications',
      },
      (payload) => {
        const oldRow = payload.old as any;
        if (oldRow?.id && onDeleteNotification) {
          onDeleteNotification(oldRow.id);
        }
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
};
