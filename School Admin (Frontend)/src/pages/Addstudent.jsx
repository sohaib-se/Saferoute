import { useState, useEffect } from 'react';
import Sidebar from '../components/common/Sidebar';
import Header from '../components/common/Header';
import AddStudentHeader from '../components/pagecomponents/addstudents/AddStudentHeader';
import CardStudentPhoto from '../components/pagecomponents/addstudents/CardStudentPhoto';
import CardBasicProfile from '../components/pagecomponents/addstudents/CardBasicProfile';
import CardRouteFleet from '../components/pagecomponents/addstudents/CardRouteFleet';
import AddStudentFooter from '../components/pagecomponents/addstudents/AddStudentFooter';
import { getDrivers } from '../services/driversService';
import { getVehicles } from '../services/vehiclesService';
import { uploadStudentPhoto, deleteStudentPhoto, cleanupStudentPhotos } from '../services/storageService';

const Addstudent = ({
  onLogout,
  onNavigate,
  currentPage = 'Students',
  onAddStudent,
  onUpdateStudent,
  studentToEdit = null,
}) => {
  const isEditMode = Boolean(studentToEdit);
  const [availableDrivers, setAvailableDrivers] = useState([]);
  const [availableVehicles, setAvailableVehicles] = useState([]);
  const [photoFile, setPhotoFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: studentToEdit?.name || '',
    id: studentToEdit?.id ? studentToEdit.id.replace('#', '') : '',
    class: studentToEdit?.class || studentToEdit?.class_grade || 'Grade 5',
    section: studentToEdit?.section || '',
    rollNo: studentToEdit?.rollNo || studentToEdit?.roll_no || '',
    gender: studentToEdit?.gender || 'Female',

    // Route & Fleet info
    driver: studentToEdit?.driver || '',
    vehicle: studentToEdit?.vehicle || '',
    status: studentToEdit?.status || 'Waiting',

    // Residence
    address: studentToEdit?.address || '',

    // Image
    photoUrl: studentToEdit?.photo_url || studentToEdit?.photoUrl || null,
  });

  useEffect(() => {
    if (studentToEdit) {
      setPhotoFile(null);
      setFormData({
        name: studentToEdit.name || '',
        id: studentToEdit.id ? studentToEdit.id.replace('#', '') : '',
        class: studentToEdit.class || studentToEdit.class_grade || 'Grade 5',
        section: studentToEdit.section || '',
        rollNo: studentToEdit.rollNo || studentToEdit.roll_no || '',
        gender: studentToEdit.gender || 'Female',
        driver: studentToEdit.driver || '',
        vehicle: studentToEdit.vehicle || '',
        status: studentToEdit.status || 'Waiting',
        address: studentToEdit.address || '',
        photoUrl: studentToEdit.photo_url || studentToEdit.photoUrl || null,
      });
    }
  }, [studentToEdit]);

  useEffect(() => {
    const loadFleetData = async () => {
      try {
        const [driversData, vehiclesData] = await Promise.all([
          getDrivers().catch(() => []),
          getVehicles().catch(() => []),
        ]);
        setAvailableDrivers(driversData);
        setAvailableVehicles(vehiclesData);
        if (!studentToEdit) {
          if (driversData.length > 0) {
            setFormData((prev) => ({ ...prev, driver: prev.driver || driversData[0].name }));
          }
          if (vehiclesData.length > 0) {
            setFormData((prev) => ({ ...prev, vehicle: prev.vehicle || vehiclesData[0].name }));
          }
        }
      } catch (err) {
        console.error('Error loading fleet data for student enrollment:', err);
      }
    };
    loadFleetData();
  }, [studentToEdit]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleGenderSelect = (gender) => {
    setFormData((prev) => ({ ...prev, gender }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setPhotoFile(file);
      const url = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, photoUrl: url }));
    }
  };

  const handleRemovePhoto = () => {
    setPhotoFile(null);
    setFormData((prev) => ({ ...prev, photoUrl: null }));
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!formData.name) return;

    setIsSubmitting(true);
    try {
      const previousPhotoUrl = studentToEdit?.photo_url || studentToEdit?.photoUrl;
      let finalPhotoUrl = formData.photoUrl;

      // If user uploaded a new local file, upload it to Supabase Storage
      if (photoFile) {
        try {
          const uploadedUrl = await uploadStudentPhoto(photoFile, formData.id || formData.name);
          if (uploadedUrl) {
            finalPhotoUrl = uploadedUrl;
            // Delete previous photo from storage if it exists and differs
            if (previousPhotoUrl && previousPhotoUrl !== uploadedUrl) {
              await deleteStudentPhoto(previousPhotoUrl);
            }
            // Clean up any remaining legacy photos for this student
            await cleanupStudentPhotos(formData.id || formData.name, uploadedUrl);
          }
        } catch (uploadErr) {
          console.error('Failed to upload student photo:', uploadErr);
          alert('Note: Photo could not be uploaded to storage. Saving student record.');
        }
      } else if (!formData.photoUrl && previousPhotoUrl) {
        // If photo was explicitly cleared/removed
        await deleteStudentPhoto(previousPhotoUrl);
        await cleanupStudentPhotos(formData.id || formData.name);
        finalPhotoUrl = null;
      }

      const names = formData.name.trim().split(' ');
      const calculatedInitials =
        names.length >= 2
          ? `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase()
          : formData.name.slice(0, 2).toUpperCase();

      const formattedId = formData.id
        ? formData.id.startsWith('#')
          ? formData.id
          : `#${formData.id}`
        : studentToEdit?.id || `#ST-${Math.floor(1000 + Math.random() * 9000)}`;

      const studentPayload = {
        ...(studentToEdit || {}),
        ...formData,
        photoUrl: finalPhotoUrl,
        photo_url: finalPhotoUrl,
        name: formData.name,
        id: formattedId,
        class: formData.class,
        class_grade: formData.class,
        route: formData.driver ? `Driver: ${formData.driver}` : studentToEdit?.route || 'Route 1',
        vehicle: formData.vehicle || 'Bus 12',
        status: formData.status || 'Waiting',
        initials: calculatedInitials,
        avatarBg: studentToEdit?.avatarBg || 'bg-rose-100 text-rose-500',
      };

      if (isEditMode) {
        if (onUpdateStudent) {
          await onUpdateStudent(studentPayload);
        }
      } else {
        if (onAddStudent) {
          await onAddStudent(studentPayload);
        }
      }

      if (onNavigate) {
        onNavigate('Students');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveAndAddAnother = async (e) => {
    if (e) e.preventDefault();
    if (!formData.name) return;

    setIsSubmitting(true);
    try {
      let finalPhotoUrl = formData.photoUrl;
      if (photoFile) {
        try {
          const uploadedUrl = await uploadStudentPhoto(photoFile, formData.id || formData.name);
          if (uploadedUrl) {
            finalPhotoUrl = uploadedUrl;
          }
        } catch (uploadErr) {
          console.error('Failed to upload student photo:', uploadErr);
        }
      }

      const names = (formData.name || 'New Student').trim().split(' ');
      const calculatedInitials =
        names.length >= 2
          ? `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase()
          : formData.name.slice(0, 2).toUpperCase();

      const formattedId = (formData.id || 'ST-9000').startsWith('#')
        ? formData.id
        : `#${formData.id}`;

      if (onAddStudent) {
        await onAddStudent({
          ...formData,
          photoUrl: finalPhotoUrl,
          photo_url: finalPhotoUrl,
          id: formattedId,
          route: formData.driver ? `Driver: ${formData.driver}` : 'Route 1',
          vehicle: formData.vehicle || 'Bus 12',
          initials: calculatedInitials,
          avatarBg: 'bg-blue-100 text-blue-600',
        });
      }

      // Reset form for next student
      setPhotoFile(null);
      setFormData((prev) => ({
        ...prev,
        name: '',
        id: `ST-${Math.floor(1000 + Math.random() * 9000)}`,
        rollNo: '',
        photoUrl: null,
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (onNavigate) {
      onNavigate('Students');
    }
  };

  return (
    <div className="h-screen flex bg-[#F8FAFC] text-slate-800 antialiased font-sans overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        onLogout={onLogout}
        currentPage={currentPage}
        onNavigate={onNavigate}
      />

      {/* Main Content Container */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#F8FAFC] overflow-y-auto h-screen pb-28">
        {/* Header */}
        <Header onNavigate={onNavigate} />

        {/* Main Content */}
        <main className="px-8 pt-6 pb-8 max-w-[1440px] w-full mx-auto flex-1">
          <form onSubmit={handleSubmit}>
            {/* Breadcrumb & Header Title */}
            <AddStudentHeader
              onCancel={handleCancel}
              onSubmit={handleSubmit}
              isEditMode={isEditMode}
            />

            {/* Main 2-Column Grid */}
            <div className="grid grid-cols-12 gap-6 items-start">
              {/* Left Column (7 of 12 cols) */}
              <div className="col-span-12 lg:col-span-7 space-y-6">
                <CardStudentPhoto
                  photoUrl={formData.photoUrl}
                  onPhotoChange={handlePhotoChange}
                  onRemovePhoto={handleRemovePhoto}
                />

                <CardBasicProfile
                  formData={formData}
                  onChange={handleChange}
                  onGenderSelect={handleGenderSelect}
                />
              </div>

              {/* Right Column (5 of 12 cols) */}
              <div className="col-span-12 lg:col-span-5 space-y-6">
                <CardRouteFleet
                  formData={formData}
                  onChange={handleChange}
                  drivers={availableDrivers}
                  vehicles={availableVehicles}
                />
              </div>
            </div>
          </form>
        </main>

        {/* Sticky Bottom Bar */}
        <AddStudentFooter
          onBack={handleCancel}
          onSaveAndAddAnother={handleSaveAndAddAnother}
          onSubmit={handleSubmit}
          isEditMode={isEditMode}
        />
      </div>
    </div>
  );
};

export default Addstudent;
