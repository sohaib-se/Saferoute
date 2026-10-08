import { useState } from 'react';
import Sidebar from '../components/common/Sidebar';
import Header from '../components/common/Header';
import NotificationHeaderSection from '../components/pagecomponents/Notifications/NotificationHeaderSection';
import NotificationStatCards from '../components/pagecomponents/Notifications/NotificationStatCards';
import NotificationFilterBar from '../components/pagecomponents/Notifications/NotificationFilterBar';
import NotificationsListSection, {
  initialNotificationsData,
} from '../components/pagecomponents/Notifications/NotificationsListSection';
import SendNotificationModal from '../components/pagecomponents/Notifications/SendNotificationModal';

const Notifications = ({
  onLogout,
  onNavigate,
  currentPage = 'Notifications',
}) => {
  const [notifications, setNotifications] = useState(initialNotificationsData);
  const [activeTab, setActiveTab] = useState('All');
  const [recipientFilter, setRecipientFilter] = useState('All Recipients');
  const [dateFilter, setDateFilter] = useState('Today (Oct 24, 2024)');
  const [isSendModalOpen, setIsSendModalOpen] = useState(false);

  const handleSendNotification = (newNotification) => {
    setNotifications((prev) => [newNotification, ...prev]);
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((item) => ({ ...item, unread: false }))
    );
  };

  const totalCount = notifications.length;
  const unreadCount = notifications.filter((item) => item.unread).length;

  return (
    <div className="h-screen flex bg-[#f8fafc] text-slate-800 antialiased overflow-hidden font-sans">
      {/* Sidebar */}
      <Sidebar
        onLogout={onLogout}
        currentPage={currentPage}
        onNavigate={onNavigate}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#f8fafc] overflow-y-auto h-screen">
        <Header />

        <main className="flex-1 p-8 space-y-6">
          {/* Header Section */}
          <NotificationHeaderSection
            totalCount={totalCount}
            unreadCount={unreadCount}
            onMarkAllAsRead={handleMarkAllAsRead}
            onOpenSendModal={() => setIsSendModalOpen(true)}
          />

          {/* Stat Cards */}
          <NotificationStatCards />

          {/* Filter Bar */}
          <NotificationFilterBar
            activeTab={activeTab}
            onTabChange={setActiveTab}
            recipientFilter={recipientFilter}
            onRecipientFilterChange={setRecipientFilter}
            dateFilter={dateFilter}
            onDateFilterChange={setDateFilter}
          />

          {/* Notifications List */}
          <NotificationsListSection
            notificationsList={notifications}
            activeTab={activeTab}
          />
        </main>
      </div>

      {/* Send Notification Modal */}
      <SendNotificationModal
        isOpen={isSendModalOpen}
        onClose={() => setIsSendModalOpen(false)}
        onSendNotification={handleSendNotification}
      />
    </div>
  );
};

export default Notifications;
