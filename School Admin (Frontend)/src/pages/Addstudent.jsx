import { useState } from 'react';
import Sidebar from '../components/common/Sidebar';
import Header from '../components/common/Header';
import AddStudentHeader from '../components/pagecomponents/addstudents/AddStudentHeader';
import CardStudentPhoto from '../components/pagecomponents/addstudents/CardStudentPhoto';
import CardBasicProfile from '../components/pagecomponents/addstudents/CardBasicProfile';
import CardParentGuardian from '../components/pagecomponents/addstudents/CardParentGuardian';
import CardRouteFleet from '../components/pagecomponents/addstudents/CardRouteFleet';
import CardResidenceGeofence from '../components/pagecomponents/addstudents/CardResidenceGeofence';
import AddStudentFooter from '../components/pagecomponents/addstudents/AddStudentFooter';
import AddParentModal from '../components/pagecomponents/ParentManagement/AddParentModal';

const Addstudent = ({ onLogout, onNavigate, currentPage = 'Students', onAddStudent }) => {
  const [isAddParentModalOpen, setIsAddParentModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    id: '',
    class: 'Grade 5',
    section: '',
    rollNo: '',
    gender: 'Female',
    
    // Parent info
    parentSearch: '',
    parentName: '',
    relationship: '',

    // Route & Fleet info
    driver: 'Muhammad Ali',
    vehicle: 'Bus 12',
    status: 'Waiting',

    // Residence & Geofence
    address: '',
    
    // Image
    photoUrl: null,
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleGenderSelect = (gender) => {
    setFormData((prev) => ({ ...prev, gender }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, photoUrl: url }));
    }
  };

  const handleRemovePhoto = () => {
    setFormData((prev) => ({ ...prev, photoUrl: null }));
  };

  const handleAddParentFromModal = (newParent) => {
    setFormData((prev) => ({
      ...prev,
      parentName: newParent.name,
      parentSearch: newParent.name,
    }));
    setIsAddParentModalOpen(false);
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if (!formData.name) return;

    const names = formData.name.trim().split(' ');
    const calculatedInitials = names.length >= 2
      ? `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase()
      : formData.name.slice(0, 2).toUpperCase();
    
    const formattedId = formData.id.startsWith('#') ? formData.id : `#${formData.id}`;

    const newStudent = {
      ...formData,
      name: formData.name,
      id: formattedId,
      class: formData.class,
      route: formData.driver ? `Driver: ${formData.driver}` : 'Route 1',
      vehicle: formData.vehicle || 'Bus 12',
      status: formData.status || 'Waiting',
      initials: calculatedInitials,
      avatarBg: 'bg-rose-100 text-rose-500',
    };

    if (onAddStudent) {
      onAddStudent(newStudent);
    }

    if (onNavigate) {
      onNavigate('Students');
    }
  };

  const handleSaveAndAddAnother = (e) => {
    if (e) e.preventDefault();

    const names = (formData.name || 'New Student').trim().split(' ');
    const calculatedInitials = names.length >= 2
      ? `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase()
      : formData.name.slice(0, 2).toUpperCase();

    const formattedId = (formData.id || 'ST-9000').startsWith('#') ? formData.id : `#${formData.id}`;

    if (onAddStudent) {
      onAddStudent({
        ...formData,
        id: formattedId,
        route: formData.driver ? `Driver: ${formData.driver}` : 'Route 1',
        vehicle: formData.vehicle || 'Bus 12',
        initials: calculatedInitials,
        avatarBg: 'bg-blue-100 text-blue-600',
      });
    }

    // Reset form for next student
    setFormData((prev) => ({
      ...prev,
      name: '',
      id: `ST-${Math.floor(1000 + Math.random() * 9000)}`,
      rollNo: '',
      photoUrl: null,
    }));
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
            <AddStudentHeader onCancel={handleCancel} onSubmit={handleSubmit} />

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
                />

                <CardParentGuardian
                  formData={formData}
                  onChange={handleChange}
                  onNewParentClick={() => setIsAddParentModalOpen(true)}
                />

                <CardResidenceGeofence
                  formData={formData}
                  onChange={handleChange}
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
        />
      </div>

      {/* Add Parent Modal loaded from Parent Management */}
      <AddParentModal
        isOpen={isAddParentModalOpen}
        onClose={() => setIsAddParentModalOpen(false)}
        onAddParent={handleAddParentFromModal}
      />
    </div>
  );
};

export default Addstudent;
