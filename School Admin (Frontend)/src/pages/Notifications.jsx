import React, { useState, useEffect, useMemo } from 'react';
import Sidebar from '../components/common/Sidebar';
import Header from '../components/common/Header';
import NotificationHeaderSection from '../components/pagecomponents/Notifications/NotificationHeaderSection';
import NotificationStatCards from '../components/pagecomponents/Notifications/NotificationStatCards';
import NotificationFilterBar from '../components/pagecomponents/Notifications/NotificationFilterBar';
import NotificationsListSection from '../components/pagecomponents/Notifications/NotificationsListSection';
import SendNotificationModal from '../components/pagecomponents/Notifications/SendNotificationModal';
import { supabase } from '../lib/supabaseClient';
import { getCurrentSchoolId } from '../lib/session';

const isValidUUID = (val) =>
  Boolean(val && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(val));

const mapDbRowToNotificationItem = (row) => {
  const d = new Date(row.created_at);
  const now = new Date();
  const isToday = now.toDateString() === d.toDateString();
  const isYesterday = new Date(now.setDate(now.getDate() - 1)).toDateString() === d.toDateString();

  let timestamp = `${d.toLocaleDateString([], { month: 'short', day: 'numeric' })}, ${d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  if (isToday) {
    timestamp = `Today, ${d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  } else if (isYesterday) {
    timestamp = `Yesterday, ${d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  }

  // Derive Category & Visual Style
  const typeLower = (row.type || '').toLowerCase();
  const titleLower = (row.title || '').toLowerCase();

  let category = 'System';
  let borderLeft = 'border-l-indigo-400';
  let iconBg = 'bg-indigo-50 text-indigo-600';
  let badgeText = 'Notice Broadcast';
  let badgeStyle = 'bg-slate-100 text-slate-700 border-slate-200';

  if (typeLower === 'sos' || titleLower.includes('emergency') || titleLower.includes('sos')) {
    category = 'Emergency';
    borderLeft = 'border-l-rose-500';
    iconBg = 'bg-rose-50 text-rose-500';
    badgeText = 'High Priority Distress';
    badgeStyle = 'bg-rose-100 text-rose-800 border-rose-200';
  } else if (
    typeLower === 'picked_up' ||
    typeLower === 'pickup' ||
    titleLower.includes('picked up') ||
    titleLower.includes('pickup')
  ) {
    category = 'Pickup';
    borderLeft = 'border-l-blue-600';
    iconBg = 'bg-blue-50 text-blue-600';
    badgeText = 'Delivered to Bus';
    badgeStyle = 'bg-blue-50 text-blue-700 border-blue-200';
  } else if (
    typeLower === 'dropped_off' ||
    typeLower === 'drop' ||
    titleLower.includes('dropped') ||
    titleLower.includes('school gate')
  ) {
    category = 'Drop';
    borderLeft = 'border-l-emerald-500';
    iconBg = 'bg-emerald-50 text-emerald-600';
    badgeText = 'Dropped Safely';
    badgeStyle = 'bg-emerald-50 text-emerald-700 border-emerald-200';
  } else if (typeLower === 'delay' || titleLower.includes('delay')) {
    category = 'Delay';
    borderLeft = 'border-l-amber-500';
    iconBg = 'bg-amber-50 text-amber-600';
    badgeText = 'Route Alert';
    badgeStyle = 'bg-amber-100 text-amber-800 border-amber-200';
  } else if (typeLower === 'trip_start') {
    category = 'Pickup';
    borderLeft = 'border-l-blue-500';
    iconBg = 'bg-blue-50 text-blue-600';
    badgeText = 'Trip Dispatched';
    badgeStyle = 'bg-blue-50 text-blue-700 border-blue-200';
  }

  const recipientLabel =
    row.recipient_type === 'admin'
      ? 'School Admin'
      : row.recipient_type === 'parent'
      ? 'All Parents'
      : row.recipient_type === 'driver'
      ? 'All Drivers'
      : 'All Participants (Drivers & Parents)';

  return {
    id: row.id,
    title: row.title || 'SafeRoute Transit Update',
    content: row.body || '',
    category,
    borderLeft,
    iconBg,
    subInfo: `Target: ${recipientLabel} • Real-time Telemetry`,
    timestamp,
    unread: !row.is_read,
    raw: row,
  };
};

const Notifications = ({
  onLogout,
  onNavigate,
  currentPage = 'Notifications',
}) => {
  const [notifications, setNotifications] = useState([]);
  const [activeTab, setActiveTab] = useState('All');
  const [recipientFilter, setRecipientFilter] = useState('All Alerts');
  const [dateFilter, setDateFilter] = useState('All Time');
  const [isSendModalOpen, setIsSendModalOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // 1. Fetch real notifications from Supabase (Admin events, broadcasts, and admin-created messages)
  const fetchNotifications = async () => {
    setIsRefreshing(true);
    try {
      const schoolId = getCurrentSchoolId();
      const validSchoolId = isValidUUID(schoolId) ? schoolId : null;

      let query = supabase
        .from('notifications')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(200);

      if (validSchoolId) {
        query = query.or(`school_id.eq.${validSchoolId},school_id.is.null`);
      }

      // Show admin events, broadcasts, and admin-created messages for parents/drivers (where student_id is null)
      query = query.or(
        `recipient_type.eq.admin,recipient_type.eq.all,and(recipient_type.eq.parent,student_id.is.null),and(recipient_type.eq.driver,student_id.is.null)`
      );

      const { data, error } = await query;

      if (error) throw error;
      if (data) {
        // Automatically mark all loaded notifications as read since admin visited the page
        setNotifications(data.map((row) => mapDbRowToNotificationItem({ ...row, is_read: true })));

        const unreadRows = data.filter((row) => !row.is_read);
        if (unreadRows.length > 0) {
          const unreadIds = unreadRows.map((r) => r.id);
          supabase
            .from('notifications')
            .update({ is_read: true })
            .in('id', unreadIds)
            .then(() => {});
        }
      }
    } catch (err) {
      console.error('Error fetching notifications from Supabase:', err);
    } finally {
      setIsRefreshing(false);
    }
  };

  // 2. Setup real-time listener (filter admin viewable notifications)
  useEffect(() => {
    fetchNotifications();

    const channel = supabase
      .channel('admin_notifications_realtime')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'notifications' },
        (payload) => {
          const n = payload.new;
          if (!n) return;
          const isAdminViewable =
            n.recipient_type === 'admin' ||
            n.recipient_type === 'all' ||
            (n.recipient_type === 'parent' && !n.student_id) ||
            (n.recipient_type === 'driver' && !n.student_id);

          if (isAdminViewable) {
            // Since admin is currently on the notifications page, auto mark read
            supabase.from('notifications').update({ is_read: true }).eq('id', n.id).then(() => {});
            const newItem = mapDbRowToNotificationItem({ ...n, is_read: true });
            setNotifications((prev) => [newItem, ...prev.filter((item) => item.id !== newItem.id)]);
          }
        }
      )
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'notifications' },
        (payload) => {
          if (
            payload.new &&
            (payload.new.recipient_type === 'admin' || payload.new.recipient_type === 'all')
          ) {
            const updated = mapDbRowToNotificationItem(payload.new);
            setNotifications((prev) =>
              prev.map((n) => (n.id === updated.id ? updated : n))
            );
          }
        }
      )
      .on(
        'postgres_changes',
        { event: 'DELETE', schema: 'public', table: 'notifications' },
        (payload) => {
          if (payload.old) {
            setNotifications((prev) => prev.filter((n) => n.id !== payload.old.id));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // 3. Mark All As Read in Supabase (Admin notifications only)
  const handleMarkAllAsRead = async () => {
    try {
      await supabase
        .from('notifications')
        .update({ is_read: true })
        .in('recipient_type', ['admin', 'all'])
        .eq('is_read', false);

      setNotifications((prev) =>
        prev.map((item) => ({ ...item, unread: false }))
      );
    } catch (err) {
      console.error('Error marking all as read in Supabase:', err);
    }
  };

  // 4. Send Notification from Modal to Supabase
  const handleSendNotification = async (newNotification) => {
    try {
      const recipientMapping = {
        'All Parents': 'parent',
        'All Drivers': 'driver',
        'All Participants (Drivers & Parents)': 'all',
      };

      const schoolId = getCurrentSchoolId();
      const validSchoolId = isValidUUID(schoolId) ? schoolId : null;

      const payload = {
        school_id: validSchoolId,
        recipient_type: recipientMapping[newNotification.recipients] || 'all',
        title: newNotification.title,
        body: newNotification.content,
        type:
          newNotification.category === 'Emergency'
            ? 'sos'
            : newNotification.category === 'Delay'
            ? 'delay'
            : 'notice',
        is_read: false,
      };

      const { data, error } = await supabase
        .from('notifications')
        .insert([payload])
        .select()
        .single();

      if (error) throw error;
      if (data) {
        supabase.from('notifications').update({ is_read: true }).eq('id', data.id).then(() => {});
        const item = mapDbRowToNotificationItem({ ...data, is_read: true });
        setNotifications((prev) => [item, ...prev.filter((n) => n.id !== item.id)]);
      }
    } catch (err) {
      console.error('Error sending notification to Supabase:', err);
    }
  };

  // 5. Delete Notification from Supabase and participants
  const handleDeleteNotification = async (notificationId) => {
    try {
      setNotifications((prev) => prev.filter((n) => n.id !== notificationId));

      const { error } = await supabase
        .from('notifications')
        .delete()
        .eq('id', notificationId);

      if (error) {
        console.error('Failed to delete notification:', error);
        fetchNotifications();
      }
    } catch (err) {
      console.error('Error deleting notification:', err);
    }
  };

  // 6. Apply Dropdown Filters
  const displayedNotifications = useMemo(() => {
    return notifications.filter((item) => {
      const raw = item.raw || {};

      // Recipient filter
      if (recipientFilter === 'Admin Only' && raw.recipient_type !== 'admin') {
        return false;
      }
      if (recipientFilter === 'Parents Only' && raw.recipient_type !== 'parent') {
        return false;
      }
      if (recipientFilter === 'Drivers Only' && raw.recipient_type !== 'driver') {
        return false;
      }
      if (recipientFilter === 'Broadcasts' && raw.recipient_type !== 'all') {
        return false;
      }

      // Date filter
      if (dateFilter !== 'All Time' && raw.created_at) {
        const itemDate = new Date(raw.created_at);
        const now = new Date();

        if (dateFilter === 'Today') {
          if (itemDate.toDateString() !== now.toDateString()) return false;
        } else if (dateFilter === 'Yesterday') {
          const yesterday = new Date();
          yesterday.setDate(now.getDate() - 1);
          if (itemDate.toDateString() !== yesterday.toDateString()) return false;
        } else if (dateFilter === 'Last 7 Days') {
          const diffDays = (now.getTime() - itemDate.getTime()) / (1000 * 3600 * 24);
          if (diffDays > 7) return false;
        } else if (dateFilter === 'This Month') {
          if (
            itemDate.getMonth() !== now.getMonth() ||
            itemDate.getFullYear() !== now.getFullYear()
          ) {
            return false;
          }
        }
      }

      return true;
    });
  }, [notifications, recipientFilter, dateFilter]);

  const totalCount = displayedNotifications.length;
  const unreadCount = displayedNotifications.filter((item) => item.unread).length;

  return (
    <div className="h-screen flex bg-[#F8FAFC] text-slate-800 antialiased overflow-hidden font-sans">
      <Sidebar
        onLogout={onLogout}
        currentPage={currentPage}
        onNavigate={onNavigate}
      />

      <div className="flex-1 flex flex-col min-w-0 bg-[#F8FAFC] overflow-y-auto h-screen">
        <Header onNavigate={onNavigate} />

        <main className="flex-1 p-8 space-y-6 max-w-[1440px] w-full mx-auto">
          <NotificationHeaderSection
            totalCount={totalCount}
            unreadCount={unreadCount}
            onMarkAllAsRead={handleMarkAllAsRead}
            onOpenSendModal={() => setIsSendModalOpen(true)}
          />

          <NotificationStatCards notificationsList={displayedNotifications} />

          <NotificationFilterBar
            activeTab={activeTab}
            onTabChange={setActiveTab}
            recipientFilter={recipientFilter}
            onRecipientFilterChange={setRecipientFilter}
            dateFilter={dateFilter}
            onDateFilterChange={setDateFilter}
            onRefresh={fetchNotifications}
            isRefreshing={isRefreshing}
          />

          <NotificationsListSection
            notificationsList={displayedNotifications}
            activeTab={activeTab}
            onDeleteNotification={handleDeleteNotification}
          />

          <div className="h-4"></div>
        </main>
      </div>

      <SendNotificationModal
        isOpen={isSendModalOpen}
        onClose={() => setIsSendModalOpen(false)}
        onSendNotification={handleSendNotification}
      />
    </div>
  );
};

export default Notifications;
