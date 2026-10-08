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

const Addstudent = ({ onLogout, onNavigate, currentPage = 'Students', onAddStudent }) => {
  const [formData, setFormData] = useState({
    name: 'Ayesha Khan',
    id: 'ST-9041',
    class: 'Grade 5',
    section: 'A',
    rollNo: '14',
    dob: '2014-05-12',
    bloodGroup: 'O+',
    gender: 'Female',
    
    // Parent info
    parentSearch: '',
    parentName: 'Tariq Khan',
    relationship: 'Father',
    parentPhone: '+92 312 9876543',
    parentEmail: 'tariq.khan@example.com',

    // Route & Fleet info
    route: 'Route 1 - Green Valley Express (Zone North)',
    vehicle: 'Bus 12 • Muhammad Ali • 32 Seats (6 Available)',
    serviceMode: 'Two-Way',
    allocatedSeat: 'Seat #18',
    status: 'Waiting',

    // Residence & Geofence
    address: 'House #42, Street 4, Sector B-1, Green Valley Housing Society, Lahore',
    instructions: 'Student wears asthma inhaler; mother will accompany',
    
    // Image
    photoUrl: null,
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleGenderSelect = (gender) => {
    setFormData((prev) => ({ ...prev, gender }));
  };

  const handleServiceModeSelect = (serviceMode) => {
    setFormData((prev) => ({ ...prev, serviceMode }));
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

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if (!formData.name) return;

    const names = formData.name.trim().split(' ');
    const calculatedInitials = names.length >= 2
      ? `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase()
      : formData.name.slice(0, 2).toUpperCase();
    
    const formattedId = formData.id.startsWith('#') ? formData.id : `#${formData.id}`;

    const shortRoute = formData.route.includes('-') 
      ? formData.route.split('-')[0].trim() 
      : formData.route;
    
    const shortVehicle = formData.vehicle.includes('•') 
      ? formData.vehicle.split('•')[0].trim() 
      : formData.vehicle;

    const newStudent = {
      ...formData,
      name: formData.name,
      id: formattedId,
      class: formData.class,
      route: shortRoute,
      vehicle: shortVehicle,
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

    const shortRoute = formData.route.includes('-') 
      ? formData.route.split('-')[0].trim() 
      : formData.route;
    
    const shortVehicle = formData.vehicle.includes('•') 
      ? formData.vehicle.split('•')[0].trim() 
      : formData.vehicle;

    if (onAddStudent) {
      onAddStudent({
        ...formData,
        id: formattedId,
        route: shortRoute,
        vehicle: shortVehicle,
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
    <div className="h-screen flex bg-[#f2f6fa] text-slate-800 antialiased font-sans overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        onLogout={onLogout}
        currentPage={currentPage}
        onNavigate={onNavigate}
      />

      {/* Main Content Container */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#f2f6fa] overflow-y-auto h-screen pb-24">
        {/* Header */}
        <Header />

        {/* Main Content */}
        <main className="px-8 pt-6 max-w-[1360px] w-full mx-auto flex-1">
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

                <CardParentGuardian
                  formData={formData}
                  onChange={handleChange}
                />
              </div>

              {/* Right Column (5 of 12 cols) */}
              <div className="col-span-12 lg:col-span-5 space-y-6">
                <CardRouteFleet
                  formData={formData}
                  onChange={handleChange}
                  onServiceModeSelect={handleServiceModeSelect}
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
    </div>
  );
};

export default Addstudent;
