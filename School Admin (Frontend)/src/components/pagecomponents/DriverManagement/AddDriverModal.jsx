import React, { useState, useEffect } from 'react';
import { MdBadge, MdCameraAlt, MdEdit } from 'react-icons/md';
import Modal from '../../common/Modal';
import { uploadDriverPhoto, deleteDriverPhoto, cleanupDriverPhotos } from '../../../services/storageService';

const AddDriverModal = ({
  isOpen,
  onClose,
  onAddDriver,
  onUpdateDriver,
  driver = null,
}) => {
  const isEditMode = Boolean(driver);
  const [photoFile, setPhotoFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    license: '',
    licenseType: 'Heavy Transport',
    phone: '',
    status: 'Online',
    photoUrl: null,
  });

  useEffect(() => {
    setPhotoFile(null);
    if (driver) {
      setFormData({
        name: driver.name || '',
        license: driver.license || '',
        licenseType: driver.licenseType || 'Heavy Transport',
        phone: driver.phone || '',
        status: driver.status || 'Online',
        photoUrl: driver.photo_url || driver.photoUrl || driver.profile_image || null,
      });
    } else {
      setFormData({
        name: '',
        license: '',
        licenseType: 'Heavy Transport',
        phone: '',
        status: 'Online',
        photoUrl: null,
      });
    }
  }, [driver, isOpen]);

  if (!isOpen) return null;

  const handlePhotoUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Please choose an image file smaller than 5MB.');
        return;
      }
      setPhotoFile(file);
      const previewUrl = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, photoUrl: previewUrl }));
    }
  };

  const handleRemovePhoto = () => {
    setPhotoFile(null);
    setFormData((prev) => ({ ...prev, photoUrl: null }));
  };

  const getInitials = (name) => {
    if (!name) return 'DR';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  const getStatusStyles = (status) => {
    switch (status) {
      case 'Online':
        return {
          badge: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
          dot: 'bg-emerald-500',
          initials: 'bg-blue-100 text-blue-700',
        };
      case 'Idle / Break':
      case 'Standby':
        return {
          badge: 'bg-amber-50 text-amber-700 border border-amber-200',
          dot: 'bg-amber-500',
          initials: 'bg-amber-100 text-amber-700',
        };
      case 'Offline':
      default:
        return {
          badge: 'bg-slate-100 text-slate-600 border border-slate-200',
          dot: 'bg-slate-400',
          initials: 'bg-slate-100 text-slate-700',
        };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.license) return;

    setIsSubmitting(true);
    try {
      const previousPhotoUrl = driver?.photo_url || driver?.photoUrl || driver?.profile_image;
      let finalPhotoUrl = formData.photoUrl;

      if (photoFile) {
        try {
          const uploadedUrl = await uploadDriverPhoto(photoFile, formData.license || formData.name);
          if (uploadedUrl) {
            finalPhotoUrl = uploadedUrl;
            if (previousPhotoUrl && previousPhotoUrl !== uploadedUrl) {
              await deleteDriverPhoto(previousPhotoUrl);
            }
            await cleanupDriverPhotos(formData.license || formData.name, uploadedUrl);
          }
        } catch (err) {
          console.error('Failed to upload driver photo to storage:', err);
        }
      } else if (!formData.photoUrl && previousPhotoUrl) {
        await deleteDriverPhoto(previousPhotoUrl);
        await cleanupDriverPhotos(formData.license || formData.name);
        finalPhotoUrl = null;
      }

      const styles = getStatusStyles(formData.status);
      const driverPayload = {
        ...(driver || {}),
        ...formData,
        photoUrl: finalPhotoUrl,
        photo_url: finalPhotoUrl,
        profile_image: finalPhotoUrl,
        vehicle: driver?.vehicle || 'Unassigned',
        route: driver?.route || 'Unassigned',
        initials: getInitials(formData.name),
        initialsStyle: styles.initials,
        statusBadgeStyle: styles.badge,
        statusDotStyle: styles.dot,
      };

      if (isEditMode) {
        if (onUpdateDriver) {
          await onUpdateDriver(driverPayload);
        }
      } else {
        if (onAddDriver) {
          await onAddDriver(driverPayload);
        }
      }

      setFormData({
        name: '',
        license: '',
        licenseType: 'Heavy Transport',
        phone: '',
        status: 'Online',
        photoUrl: null,
      });
      setPhotoFile(null);
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      icon={isEditMode ? <MdEdit size={20} /> : <MdBadge size={20} />}
      title={isEditMode ? 'Edit Driver Information' : 'Add New Driver'}
      subtitle={
        isEditMode
          ? 'Update driver license, contact, photo, or duty status'
          : 'Enroll transport personnel into the active driver roster'
      }
      maxWidth="max-w-lg"
    >
      <form onSubmit={handleSubmit}>
        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto custom-scrollbar">
          {/* Profile Photo Upload */}
          <div className="flex flex-col sm:flex-row items-center gap-4 p-3.5 bg-slate-50/70 rounded-xl border border-slate-200/80">
            <label className="w-16 h-16 rounded-full bg-blue-100/70 border-2 border-dashed border-blue-300 flex flex-col items-center justify-center text-blue-600 shrink-0 cursor-pointer hover:bg-blue-100 transition-colors overflow-hidden relative group">
              {formData.photoUrl ? (
                <img
                  src={formData.photoUrl}
                  alt="Driver"
                  className="w-full h-full object-cover"
                />
              ) : (
                <>
                  <MdCameraAlt size={22} />
                  <span className="text-[10px] font-semibold mt-0.5">Photo</span>
                </>
              )}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handlePhotoUpload}
              />
            </label>
            <div className="flex-1 text-center sm:text-left">
              <h4 className="text-xs font-bold text-slate-800">Driver Profile Image</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Upload clear portrait for fleet verification and digital badge identification.
              </p>
              <div className="flex items-center justify-center sm:justify-start gap-3 mt-2">
                <label className="text-xs font-semibold text-blue-600 hover:text-blue-700 cursor-pointer">
                  Choose Photo
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handlePhotoUpload}
                  />
                </label>
                {formData.photoUrl && (
                  <button
                    type="button"
                    onClick={handleRemovePhoto}
                    className="text-xs font-semibold text-rose-500 hover:text-rose-600 cursor-pointer"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Driver Full Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Muhammad Ali"
              className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/10 transition-all font-sans"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                License Number <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. LIC-PK-98214"
                className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/10 transition-all font-sans"
                value={formData.license}
                onChange={(e) => setFormData({ ...formData, license: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Phone Number <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. 0300 1112233"
                className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/10 transition-all font-sans"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Duty Status
            </label>
            <select
              className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/10 transition-all font-sans cursor-pointer"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            >
              <option value="Online">Online</option>
              <option value="Idle / Break">Idle / Break</option>
              <option value="Standby">Standby</option>
              <option value="Offline">Offline</option>
            </select>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-50/60 border-t border-slate-100 flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition cursor-pointer disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-xl shadow-xs transition cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isSubmitting && (
              <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            )}
            <span>{isSubmitting ? 'Saving...' : isEditMode ? 'Save Changes' : 'Save Driver'}</span>
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddDriverModal;
