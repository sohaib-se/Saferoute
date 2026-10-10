import React, { useState } from 'react';
import Sidebar from '../components/common/Sidebar';
import Header from '../components/common/Header';
import {
  ProfileHeaderBanner,
  SchoolProfileCard,
  ChangePasswordCard,
  AdminDetailsCard,
  FleetPreferencesCard,
  ProfileFooter,
} from '../components/pagecomponents/Profile';

const defaultSchoolProfile = {
  schoolName: 'SafeRoute International Academy',
  campusName: 'Main Campus - Gulberg III',
  registrationNo: 'REG-PK-2024-9912',
  schoolEmail: 'admin@saferoute.edu.pk',
  phone: '+92 42 3578 9000',
  emergencyPhone: '+92 300 1112233',
  address: 'Plot 44-A, Block H, Gulberg III, Lahore, Pakistan',
  website: 'https://saferoute.school.edu',
  morningStartTime: '07:30 AM',
  afternoonDismissal: '02:15 PM',
  principalName: 'Dr. Tariq Mansoor',
};

const defaultPreferences = {
  parentSmsAlerts: true,
  sosEmergencyBroadcast: true,
  autoExportManifest: true,
  telematicsInterval: '10s',
};

const Profile = ({
  onLogout,
  onNavigate,
  currentPage = 'Profile',
}) => {
  // Load initial data from localStorage if available
  const [schoolData, setSchoolData] = useState(() => {
    try {
      const saved = localStorage.getItem('schoolProfile');
      return saved ? JSON.parse(saved) : defaultSchoolProfile;
    } catch {
      return defaultSchoolProfile;
    }
  });

  const [adminData, setAdminData] = useState(() => {
    try {
      const saved = localStorage.getItem('user');
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          name: parsed.name || 'Admin',
          email: parsed.email || 'admin@saferoute.com',
          phone: parsed.phone || '0300 1234567',
          role: parsed.role || 'Super Admin (Fleet Director)',
          department: 'Transport & Fleet Safety',
        };
      }
    } catch {}
    return {
      name: 'Admin',
      email: 'admin@saferoute.com',
      phone: '0300 1234567',
      role: 'Super Admin (Fleet Director)',
      department: 'Transport & Fleet Safety',
    };
  });

  const [preferences, setPreferences] = useState(() => {
    try {
      const saved = localStorage.getItem('fleetPreferences');
      return saved ? JSON.parse(saved) : defaultPreferences;
    } catch {
      return defaultPreferences;
    }
  });

  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  const handleSaveSchoolProfile = (updatedSchool) => {
    setSchoolData(updatedSchool);
    localStorage.setItem('schoolProfile', JSON.stringify(updatedSchool));
    showToast('School profile updated and saved successfully!');
  };

  const handleSaveAdminProfile = (updatedAdmin) => {
    setAdminData(updatedAdmin);
    // Persist in localStorage so Header and rest of app update reactively
    localStorage.setItem('user', JSON.stringify(updatedAdmin));
    showToast('Administrator details saved successfully!');
  };

  const handleUpdatePassword = () => {
    try {
      const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
      currentUser.passwordLastChanged = new Date().toISOString();
      localStorage.setItem('user', JSON.stringify(currentUser));
    } catch {}
    showToast('Password changed successfully! Keep your credentials safe.');
  };

  const handleSavePreferences = (updatedPrefs) => {
    setPreferences(updatedPrefs);
    localStorage.setItem('fleetPreferences', JSON.stringify(updatedPrefs));
    showToast('Fleet preferences updated successfully!');
  };

  return (
    <div className="h-screen flex bg-[#F8FAFC] text-slate-800 antialiased overflow-hidden font-sans">
      {/* Sidebar Navigation */}
      <Sidebar
        onLogout={onLogout}
        currentPage={currentPage}
        onNavigate={onNavigate}
      />

      {/* Main View Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#F8FAFC] overflow-y-auto h-screen">
        {/* Common Header */}
        <Header onNavigate={onNavigate} />

        {/* Floating Toast Notification */}
        {toastMessage && (
          <div className="fixed top-20 right-8 z-50 bg-slate-900/95 text-white px-4 py-2.5 rounded-xl shadow-xl border border-slate-700 text-xs font-semibold flex items-center gap-2 animate-in fade-in slide-in-from-top-2 duration-200">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Profile Main Body */}
        <main
          className="flex-1 p-8 space-y-6 max-w-[1440px] w-full mx-auto"
          data-purpose="profile-main-area"
        >
          {/* Header Overview Banner */}
          <ProfileHeaderBanner
            schoolName={schoolData.schoolName}
            campusName={schoolData.campusName}
            adminName={adminData.name}
            totalBuses={25}
            totalStudents={340}
            activeDrivers={18}
          />

          {/* Cards Layout Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column: School Profile & Preferences (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <SchoolProfileCard
                schoolData={schoolData}
                onSaveSchoolProfile={handleSaveSchoolProfile}
              />

              <FleetPreferencesCard
                preferences={preferences}
                onSavePreferences={handleSavePreferences}
              />
            </div>

            {/* Right Column: Admin Details & Password Change (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <ChangePasswordCard
                onUpdatePassword={handleUpdatePassword}
              />

              <AdminDetailsCard
                adminData={adminData}
                onSaveAdminProfile={handleSaveAdminProfile}
              />
            </div>
          </div>

          <div className="h-4"></div>
        </main>

        {/* Profile Footer */}
        <ProfileFooter />
      </div>
    </div>
  );
};

export default Profile;
