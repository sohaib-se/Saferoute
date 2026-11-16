import React, { useState, useEffect, useCallback } from 'react';
import Sidebar from '../components/common/Sidebar';
import Header from '../components/common/Header';
import {
  ProfileHeaderBanner,
  SchoolProfileCard,
  ChangePasswordCard,
  ProfileFooter,
} from '../components/pagecomponents/Profile';
import {
  getSchoolProfile,
  updateSchoolProfile,
  updateAdminPassword,
  uploadSchoolLogo,
  removeSchoolLogo,
  DEFAULT_SCHOOL_PROFILE,
} from '../services/schoolProfileService';
import { MdErrorOutline } from 'react-icons/md';

const Profile = ({
  onLogout,
  onNavigate,
  currentPage = 'Profile',
}) => {
  const [schoolData, setSchoolData] = useState(DEFAULT_SCHOOL_PROFILE);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploadingLogo, setIsUploadingLogo] = useState(false);

  const [toast, setToast] = useState({ message: '', type: 'success' });

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: '', type: 'success' }), 4000);
  };

  // Fetch initial profile data on mount
  const fetchProfileData = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await getSchoolProfile();
      if (res?.schoolData) {
        setSchoolData(res.schoolData);
      }
    } catch (err) {
      console.error('Failed to load school profile:', err);
      showToast('Could not fetch latest profile from database.', 'error');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfileData();
  }, [fetchProfileData]);

  // Handle saving school institutional profile
  const handleSaveSchoolProfile = async (updatedSchool) => {
    try {
      const merged = { ...schoolData, ...updatedSchool };
      await updateSchoolProfile(merged);
      setSchoolData(merged);
      showToast('School profile updated and saved to database successfully!', 'success');
    } catch (err) {
      showToast(err.message || 'Failed to save school profile to database.', 'error');
      throw err;
    }
  };

  // Handle updating admin password
  const handleUpdatePassword = async ({ currentPassword, newPassword }) => {
    try {
      const result = await updateAdminPassword({ currentPassword, newPassword });
      if (result && !result.success) {
        return result;
      }
      showToast('Password updated successfully in the database!', 'success');
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message || 'Could not update password.' };
    }
  };

  // Handle uploading school logo
  const handleUploadLogo = async (file) => {
    try {
      setIsUploadingLogo(true);
      const res = await uploadSchoolLogo(file);
      if (res?.logoUrl) {
        setSchoolData((prev) => ({ ...prev, logoUrl: res.logoUrl }));
        showToast('School logo uploaded to Supabase Storage and saved successfully!', 'success');
      }
    } catch (err) {
      console.error('Logo upload error:', err);
      showToast(err.message || 'Failed to upload school logo.', 'error');
    } finally {
      setIsUploadingLogo(false);
    }
  };

  // Handle removing school logo
  const handleRemoveLogo = async () => {
    try {
      setIsUploadingLogo(true);
      await removeSchoolLogo();
      setSchoolData((prev) => ({ ...prev, logoUrl: null }));
      showToast('School logo removed.', 'success');
    } catch (err) {
      showToast(err.message || 'Failed to remove school logo.', 'error');
    } finally {
      setIsUploadingLogo(false);
    }
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
        {toast.message && (
          <div
            className={`fixed top-20 right-8 z-50 px-4 py-2.5 rounded-xl shadow-xl border text-xs font-semibold flex items-center gap-2.5 animate-in fade-in slide-in-from-top-2 duration-200 ${
              toast.type === 'error'
                ? 'bg-rose-950/95 text-white border-rose-800'
                : 'bg-slate-900/95 text-white border-slate-700'
            }`}
          >
            {toast.type === 'error' ? (
              <MdErrorOutline className="w-4 h-4 text-rose-400 shrink-0" />
            ) : (
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            )}
            <span>{toast.message}</span>
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
            logoUrl={schoolData.logoUrl}
            onUploadLogo={handleUploadLogo}
            onRemoveLogo={handleRemoveLogo}
            isUploadingLogo={isUploadingLogo}
          />

          {/* Cards Layout Grid: School Profile & Password Security */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column: School Profile (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <SchoolProfileCard
                schoolData={schoolData}
                onSaveSchoolProfile={handleSaveSchoolProfile}
                isLoading={isLoading}
              />
            </div>

            {/* Right Column: Password Change (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <ChangePasswordCard
                onUpdatePassword={handleUpdatePassword}
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
