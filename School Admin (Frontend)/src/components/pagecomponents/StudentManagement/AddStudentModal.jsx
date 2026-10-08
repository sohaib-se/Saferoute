import { useState } from 'react';

const AddStudentModal = ({ isOpen, onClose, onAddStudent }) => {
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

  if (!isOpen) return null;

  const handleGenderSelect = (gender) => {
    setFormData((prev) => ({ ...prev, gender }));
  };

  const handleServiceModeSelect = (serviceMode) => {
    setFormData((prev) => ({ ...prev, serviceMode }));
  };

  const handlePhotoUpload = (e) => {
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

    // Extract short vehicle & route names for table display
    const shortRoute = formData.route.includes('-') 
      ? formData.route.split('-')[0].trim() 
      : formData.route;
    
    const shortVehicle = formData.vehicle.includes('•') 
      ? formData.vehicle.split('•')[0].trim() 
      : formData.vehicle;

    onAddStudent({
      ...formData,
      name: formData.name,
      id: formattedId,
      class: formData.class,
      route: shortRoute,
      vehicle: shortVehicle,
      status: formData.status || 'Waiting',
      initials: calculatedInitials,
      avatarBg: 'bg-rose-100 text-rose-500',
    });
    onClose();
  };

  const handleSaveAndAddAnother = (e) => {
    e.preventDefault();
    handleSubmit();
    // Reset basic fields for next student
    setFormData((prev) => ({
      ...prev,
      name: '',
      id: `ST-${Math.floor(1000 + Math.random() * 9000)}`,
      rollNo: '',
      photoUrl: null,
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4 sm:p-6 overflow-y-auto">
      <div className="bg-[#f2f6fa] rounded-2xl border border-slate-200 shadow-2xl max-w-5xl w-full max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* BEGIN: Modal Header */}
        <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between flex-shrink-0">
          <div>
            <nav className="flex items-center text-[12px] text-slate-500 space-x-1.5 mb-1 font-medium">
              <span>Students</span>
              <span className="text-slate-400">&gt;</span>
              <span>All Students</span>
              <span className="text-slate-400">&gt;</span>
              <span className="text-slate-800 font-semibold">Add New Student</span>
            </nav>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">Add New Student</h2>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 w-9 h-9 rounded-xl flex items-center justify-center hover:bg-slate-100 transition cursor-pointer"
          >
            <i className="fa-solid fa-xmark text-base"></i>
          </button>
        </div>
        {/* END: Modal Header */}

        {/* BEGIN: Scrollable Modal Body */}
        <div className="flex-1 overflow-y-auto p-6">
          <form onSubmit={handleSubmit} className="grid grid-cols-12 gap-6 items-start">
            
            {/* LEFT COLUMN (7 of 12 cols) */}
            <div className="col-span-12 lg:col-span-7 space-y-6">
              
              {/* Card 1: Student Photograph */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm flex items-center gap-6">
                {/* Upload Circular Area */}
                <label className="w-24 h-24 rounded-full bg-blue-100/70 border-2 border-dashed border-blue-200 flex flex-col items-center justify-center text-blue-600 flex-shrink-0 cursor-pointer hover:bg-blue-100 transition-colors overflow-hidden relative group">
                  {formData.photoUrl ? (
                    <img src={formData.photoUrl} alt="Student" className="w-full h-full object-cover" />
                  ) : (
                    <>
                      <i className="fa-solid fa-camera text-xl mb-1"></i>
                      <span className="text-[11px] font-medium">Upload</span>
                    </>
                  )}
                  <input type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
                </label>

                {/* Photograph Info & Controls */}
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-slate-800">Student Photograph</h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed max-w-sm">
                    Upload recent portrait for bus pass credential and facial verification. Allowed formats: PNG, JPG (Max 2MB).
                  </p>
                  <div className="flex items-center gap-4 mt-3">
                    <label className="text-xs font-semibold text-blue-600 hover:text-blue-700 cursor-pointer">
                      Choose File
                      <input type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
                    </label>
                    {formData.photoUrl && (
                      <button
                        type="button"
                        onClick={handleRemovePhoto}
                        className="text-xs font-semibold text-red-500 hover:text-red-600 cursor-pointer"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Card 2: Basic Student Profile */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm">
                <div className="flex items-center justify-between pb-5 border-b border-slate-100 mb-5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                      <i className="fa-solid fa-graduation-cap text-sm"></i>
                    </div>
                    <h2 className="text-base font-bold text-slate-800">Basic Student Profile</h2>
                  </div>
                  <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-semibold">
                    Academic Year 2024-25
                  </span>
                </div>

                <div className="space-y-4">
                  {/* Row 1: Full Name & Admission ID */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">Full Legal Name *</label>
                      <input
                        type="text"
                        required
                        className="w-full px-3.5 py-2.5 bg-[#f0f5fa] border-0 rounded-lg text-sm text-slate-700 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:bg-white"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">Admission / Student ID *</label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-semibold">#</span>
                        <input
                          type="text"
                          required
                          className="w-full pl-8 pr-3.5 py-2.5 bg-[#f0f5fa] border-0 rounded-lg text-sm text-slate-700 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:bg-white"
                          placeholder="Student ID"
                          value={formData.id}
                          onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Row 2: Grade, Section, Roll Number */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">Grade / Level *</label>
                      <select
                        value={formData.class}
                        onChange={(e) => setFormData({ ...formData, class: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-[#f0f5fa] border-0 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-blue-500 focus:bg-white cursor-pointer"
                      >
                        <option value="Grade 5">Grade 5</option>
                        <option value="Grade 6">Grade 6</option>
                        <option value="Grade 7">Grade 7</option>
                        <option value="Grade 8">Grade 8</option>
                        <option value="Grade 9">Grade 9</option>
                        <option value="Grade 10">Grade 10</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">Section</label>
                      <input
                        type="text"
                        className="w-full px-3.5 py-2.5 bg-[#f0f5fa] border-0 rounded-lg text-sm text-slate-700 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:bg-white"
                        placeholder="Section"
                        value={formData.section}
                        onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">Roll Number</label>
                      <input
                        type="text"
                        className="w-full px-3.5 py-2.5 bg-[#f0f5fa] border-0 rounded-lg text-sm text-slate-700 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:bg-white"
                        placeholder="Rollno"
                        value={formData.rollNo}
                        onChange={(e) => setFormData({ ...formData, rollNo: e.target.value })}
                      />
                    </div>
                  </div>

                  {/* Row 3: Date of Birth & Blood Group */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">Date of Birth</label>
                      <div className="relative">
                        <i className="fa-regular fa-calendar absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
                        <input
                          type="date"
                          className="w-full pl-10 pr-3.5 py-2.5 bg-[#f0f5fa] border-0 rounded-lg text-sm text-slate-700 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:bg-white"
                          value={formData.dob}
                          onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">Blood Group</label>
                      <select
                        value={formData.bloodGroup}
                        onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-[#f0f5fa] border-0 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-blue-500 focus:bg-white cursor-pointer"
                      >
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                      </select>
                    </div>
                  </div>

                  {/* Gender Selection Pill Buttons */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">Gender</label>
                    <div className="grid grid-cols-3 gap-3">
                      <button
                        type="button"
                        onClick={() => handleGenderSelect('Male')}
                        className={`flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                          formData.gender === 'Male'
                            ? 'bg-[#1664ec] text-white shadow-sm shadow-blue-500/30'
                            : 'bg-[#f0f5fa] text-slate-700 hover:bg-slate-200/80'
                        }`}
                      >
                        <i className="fa-solid fa-mars text-sm"></i>
                        Male
                      </button>

                      <button
                        type="button"
                        onClick={() => handleGenderSelect('Female')}
                        className={`flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                          formData.gender === 'Female'
                            ? 'bg-[#1664ec] text-white shadow-sm shadow-blue-500/30'
                            : 'bg-[#f0f5fa] text-slate-700 hover:bg-slate-200/80'
                        }`}
                      >
                        <i className="fa-solid fa-venus text-sm"></i>
                        Female
                      </button>

                      <button
                        type="button"
                        onClick={() => handleGenderSelect('Other')}
                        className={`flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                          formData.gender === 'Other'
                            ? 'bg-[#1664ec] text-white shadow-sm shadow-blue-500/30'
                            : 'bg-[#f0f5fa] text-slate-700 hover:bg-slate-200/80'
                        }`}
                      >
                        <i className="fa-solid fa-genderless text-sm"></i>
                        Other
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 3: Parent & Guardian Link */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm">
                <div className="flex items-center justify-between pb-5 border-b border-slate-100 mb-5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                      <i className="fa-solid fa-user-group text-sm"></i>
                    </div>
                    <div>
                      <h2 className="text-base font-bold text-slate-800">Parent & Guardian Link</h2>
                      <p className="text-[11px] text-slate-500">Links automated SMS/push alerts on departure and arrival.</p>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-blue-200 bg-blue-50/70 text-blue-600 text-xs font-semibold hover:bg-blue-100 transition-colors cursor-pointer"
                  >
                    <i className="fa-solid fa-user-plus text-xs"></i>
                    New Parent
                  </button>
                </div>

                <div className="space-y-4">
                  {/* Search Parent Database */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">Search Parent Database</label>
                    <div className="relative">
                      <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
                      <input
                        type="text"
                        className="w-full pl-10 pr-3.5 py-2.5 bg-[#f0f5fa] border-0 rounded-lg text-sm text-slate-700 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:bg-white"
                        placeholder="Search parents database"
                        value={formData.parentSearch}
                        onChange={(e) => setFormData({ ...formData, parentSearch: e.target.value })}
                      />
                    </div>
                  </div>

                  {/* Row 1: Contact Name & Relationship */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">Primary Contact Name *</label>
                      <input
                        type="text"
                        required
                        className="w-full px-3.5 py-2.5 bg-[#f0f5fa] border-0 rounded-lg text-sm text-slate-700 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:bg-white"
                        placeholder="Contact person name"
                        value={formData.parentName}
                        onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">Relationship</label>
                      <input
                        type="text"
                        className="w-full px-3.5 py-2.5 bg-[#f0f5fa] border-0 rounded-lg text-sm text-slate-700 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:bg-white"
                        placeholder="Relation"
                        value={formData.relationship}
                        onChange={(e) => setFormData({ ...formData, relationship: e.target.value })}
                      />
                    </div>
                  </div>

                  {/* Row 2: Phone & Email */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">Primary Phone Number (SMS Alerts) *</label>
                      <div className="relative">
                        <i className="fa-solid fa-phone absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
                        <input
                          type="text"
                          required
                          className="w-full pl-10 pr-3.5 py-2.5 bg-[#f0f5fa] border-0 rounded-lg text-sm text-slate-700 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:bg-white"
                          placeholder="Phone no"
                          value={formData.parentPhone}
                          onChange={(e) => setFormData({ ...formData, parentPhone: e.target.value })}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">Email Address (Invoicing & Logs)</label>
                      <div className="relative">
                        <i className="fa-regular fa-envelope absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
                        <input
                          type="email"
                          className="w-full pl-10 pr-3.5 py-2.5 bg-[#f0f5fa] border-0 rounded-lg text-sm text-slate-700 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:bg-white"
                          placeholder="Email"
                          value={formData.parentEmail}
                          onChange={(e) => setFormData({ ...formData, parentEmail: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN (5 of 12 cols) */}
            <div className="col-span-12 lg:col-span-5 space-y-6">

              {/* Card 4: Route & Fleet Assignment */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm">
                <div className="flex items-center justify-between pb-5 border-b border-slate-100 mb-5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                      <i className="fa-solid fa-route text-sm"></i>
                    </div>
                    <h2 className="text-base font-bold text-slate-800 leading-tight">
                      Route & Fleet<br className="hidden sm:inline" /> Assignment
                    </h2>
                  </div>

                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 text-blue-600 text-[11px] font-semibold">
                    <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                    <span>Live Synced</span>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Select Transit Route */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">Select Transit Route *</label>
                    <select
                      value={formData.route}
                      onChange={(e) => setFormData({ ...formData, route: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#f0f5fa] border-0 rounded-lg text-xs font-medium text-slate-800 focus:ring-2 focus:ring-blue-500 focus:bg-white cursor-pointer"
                    >
                      <option value="Route 1 - Green Valley Express (Zone North)">Route 1 - Green Valley Express (Zone North)</option>
                      <option value="Route 2 - City Center Express (Zone South)">Route 2 - City Center Express (Zone South)</option>
                      <option value="Route 3 - Model Town Shuttle (Zone East)">Route 3 - Model Town Shuttle (Zone East)</option>
                      <option value="Route 4 - Gulberg Connect (Zone West)">Route 4 - Gulberg Connect (Zone West)</option>
                      <option value="Route 5 - DHA Ring Road (Zone Central)">Route 5 - DHA Ring Road (Zone Central)</option>
                    </select>
                  </div>

                  {/* Assigned Vehicle & Driver */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">Assigned Vehicle & Driver *</label>
                    <select
                      value={formData.vehicle}
                      onChange={(e) => setFormData({ ...formData, vehicle: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#f0f5fa] border-0 rounded-lg text-xs font-medium text-slate-800 focus:ring-2 focus:ring-blue-500 focus:bg-white cursor-pointer"
                    >
                      <option value="Bus 12 • Muhammad Ali • 32 Seats (6 Available)">Bus 12 • Muhammad Ali • 32 Seats (6 Available)</option>
                      <option value="Bus 07 • Tariq Mahmood • 28 Seats (4 Available)">Bus 07 • Tariq Mahmood • 28 Seats (4 Available)</option>
                      <option value="Bus 09 • Rashid Khan • 30 Seats (8 Available)">Bus 09 • Rashid Khan • 30 Seats (8 Available)</option>
                      <option value="Bus 15 • Usman Ghani • 35 Seats (2 Available)">Bus 15 • Usman Ghani • 35 Seats (2 Available)</option>
                      <option value="Bus 18 • Bilal Ahmed • 40 Seats (10 Available)">Bus 18 • Bilal Ahmed • 40 Seats (10 Available)</option>
                    </select>
                  </div>

                  {/* Driver Phone & Seat Cap */}
                  <div className="flex items-center justify-between text-[11px] font-medium text-slate-600 px-0.5">
                    <span>Driver Phone: +92 312 4433221</span>
                    <span className="text-blue-600 font-semibold">Seat Cap: 81% full</span>
                  </div>

                  {/* Transport Service Mode */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">Transport Service Mode</label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => handleServiceModeSelect('Two-Way')}
                        className={`py-2 px-1 text-center rounded-lg cursor-pointer transition-colors ${
                          formData.serviceMode === 'Two-Way'
                            ? 'bg-[#1664ec] text-white shadow-sm'
                            : 'bg-[#f0f5fa] text-slate-700 hover:bg-slate-200/80'
                        }`}
                      >
                        <div className="text-[11px] font-bold leading-tight">Two-Way</div>
                        <div className={`text-[9px] font-normal mt-0.5 ${formData.serviceMode === 'Two-Way' ? 'text-blue-100' : 'text-slate-400'}`}>Pick & Drop</div>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleServiceModeSelect('Morning')}
                        className={`py-2 px-1 text-center rounded-lg cursor-pointer transition-colors ${
                          formData.serviceMode === 'Morning'
                            ? 'bg-[#1664ec] text-white shadow-sm'
                            : 'bg-[#f0f5fa] text-slate-700 hover:bg-slate-200/80'
                        }`}
                      >
                        <div className="text-[11px] font-bold leading-tight">Morning</div>
                        <div className={`text-[9px] font-normal mt-0.5 ${formData.serviceMode === 'Morning' ? 'text-blue-100' : 'text-slate-400'}`}>Pickup Only</div>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleServiceModeSelect('Afternoon')}
                        className={`py-2 px-1 text-center rounded-lg cursor-pointer transition-colors ${
                          formData.serviceMode === 'Afternoon'
                            ? 'bg-[#1664ec] text-white shadow-sm'
                            : 'bg-[#f0f5fa] text-slate-700 hover:bg-slate-200/80'
                        }`}
                      >
                        <div className="text-[11px] font-bold leading-tight">Afternoon</div>
                        <div className={`text-[9px] font-normal mt-0.5 ${formData.serviceMode === 'Afternoon' ? 'text-blue-100' : 'text-slate-400'}`}>Drop Only</div>
                      </button>
                    </div>
                  </div>

                  {/* Scheduled Stops & ETA Sub-card */}
                  <div className="bg-[#f0f5fa]/90 rounded-xl p-3.5 border border-slate-200/60 space-y-3">
                    <div className="flex items-center justify-between text-[11px] font-bold tracking-wider text-slate-500">
                      <span>SCHEDULED STOPS & ETA</span>
                      <span className="text-blue-600 bg-blue-50 px-2 py-0.5 rounded text-[10px]">Stop #4</span>
                    </div>

                    {/* Stop 1: Pickup */}
                    <div className="flex items-center justify-between bg-white p-2.5 rounded-lg border border-slate-100 shadow-xs">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                          <i className="fa-solid fa-bus text-xs"></i>
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-slate-800 leading-tight">Green Valley Main Gate</p>
                          <p className="text-[10px] text-slate-400">Morning Pickup</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-bold text-slate-800 leading-tight">07:15 AM</p>
                        <p className="text-[10px] text-slate-400">Est. window ±3m</p>
                      </div>
                    </div>

                    {/* Stop 2: Drop-off */}
                    <div className="flex items-center justify-between bg-white p-2.5 rounded-lg border border-slate-100 shadow-xs">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                          <i className="fa-solid fa-house text-xs"></i>
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-slate-800 leading-tight">Green Valley Main Gate</p>
                          <p className="text-[10px] text-slate-400">Afternoon Drop-off</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-bold text-slate-800 leading-tight">02:30 PM</p>
                        <p className="text-[10px] text-slate-400">School Exit 02:10 PM</p>
                      </div>
                    </div>
                  </div>

                  {/* Allocated Seat & Status Inputs */}
                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">Allocated Seat</label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 bg-[#f0f5fa] border-0 rounded-lg text-xs font-medium text-slate-700 focus:ring-2 focus:ring-blue-500 focus:bg-white"
                        value={formData.allocatedSeat}
                        onChange={(e) => setFormData({ ...formData, allocatedSeat: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">Status</label>
                      <select
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                        className="w-full px-3 py-2 bg-[#f0f5fa] border-0 rounded-lg text-xs font-medium text-slate-700 focus:ring-2 focus:ring-blue-500 focus:bg-white cursor-pointer"
                      >
                        <option value="On Route">On Route</option>
                        <option value="Picked Up">Picked Up</option>
                        <option value="Waiting">Waiting</option>
                        <option value="Dropped">Dropped</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 5: Residence & Geofence */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm">
                <div className="flex items-center justify-between pb-5 border-b border-slate-100 mb-5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                      <i className="fa-solid fa-location-dot text-sm"></i>
                    </div>
                    <h2 className="text-base font-bold text-slate-800">Residence & Geofence</h2>
                  </div>

                  <button
                    type="button"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 cursor-pointer"
                  >
                    <i className="fa-solid fa-crosshairs text-xs"></i>
                    Detect GPS
                  </button>
                </div>

                <div className="space-y-4">
                  {/* Residential Street Address */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">Residential Street Address *</label>
                    <input
                      type="text"
                      required
                      className="w-full px-3.5 py-2.5 bg-[#f0f5fa] border-0 rounded-lg text-xs text-slate-800 focus:ring-2 focus:ring-blue-500 focus:bg-white"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    />
                  </div>

                  {/* Embedded Map Preview */}
                  <div className="relative h-44 w-full rounded-xl overflow-hidden border border-slate-200 bg-[#dce7e1] flex items-center justify-center">
                    {/* Map tile texture pattern */}
                    <div className="absolute inset-0 opacity-40 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.7)_0%,transparent_60%)]">
                      <div className="absolute w-full h-1 bg-amber-200 top-12 rotate-[-6deg]"></div>
                      <div className="absolute w-full h-2 bg-white top-24 rotate-[14deg]"></div>
                      <div className="absolute w-2 h-full bg-white left-16 rotate-[-12deg]"></div>
                      <div className="absolute w-1.5 h-full bg-amber-100 right-28 rotate-[25deg]"></div>
                      <span className="absolute top-4 left-6 text-[8px] font-bold text-slate-500 uppercase tracking-wider">Gulshan-e-Ravi</span>
                      <span className="absolute top-8 right-16 text-[8px] font-bold text-red-500 tracking-wider">Punjab Rangers HQ</span>
                      <span className="absolute bottom-12 left-10 text-[8px] font-bold text-slate-500">Samanabad Town</span>
                    </div>

                    {/* Geofence Radius Circle and Pin */}
                    <div className="relative flex items-center justify-center z-10">
                      <div className="w-28 h-28 rounded-full bg-blue-500/15 border border-blue-500/40 flex items-center justify-center">
                        <div className="w-14 h-14 rounded-full bg-blue-500/20 border border-blue-500/60 flex items-center justify-center">
                          <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg border-2 border-white transform -translate-y-1">
                            <i className="fa-solid fa-location-dot text-xs"></i>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Overlay Pill at Bottom of Map */}
                    <div className="absolute bottom-2.5 left-2.5 right-2.5 bg-white/95 backdrop-blur-xs py-1.5 px-3 rounded-lg border border-slate-200/90 shadow-sm flex items-center justify-between text-[10px] z-20">
                      <div className="flex items-center gap-1.5 text-slate-700 font-semibold">
                        <i className="fa-solid fa-circle-notch text-blue-600 text-xs"></i>
                        <span>Smart Alert Geofence: <strong>500m Radius</strong></span>
                      </div>
                      <span className="text-slate-400 font-mono text-[9px]">31.4826° N, 74.2982° E</span>
                    </div>
                  </div>

                  {/* Special Driver & Attendant Instructions */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">Special Driver & Attendant Instructions</label>
                    <input
                      type="text"
                      className="w-full px-3.5 py-2.5 bg-[#f0f5fa] border-0 rounded-lg text-xs text-slate-800 focus:ring-2 focus:ring-blue-500 focus:bg-white"
                      value={formData.instructions}
                      onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
                    />
                  </div>
                </div>
              </div>

            </div>

          </form>
        </div>
        {/* END: Scrollable Modal Body */}

        {/* BEGIN: Modal Footer / Sticky Actions */}
        <div className="bg-white border-t border-slate-200 px-6 py-4 flex items-center justify-between flex-shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 transition-colors shadow-sm cursor-pointer"
          >
            <i className="fa-solid fa-xmark text-xs"></i>
            Cancel
          </button>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleSaveAndAddAnother}
              className="px-4 py-2 rounded-lg border border-slate-300 bg-white text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-colors shadow-sm cursor-pointer"
            >
              Save & Add Another
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-[#1664ec] hover:bg-[#1254c7] text-white text-xs font-semibold shadow-sm transition-colors cursor-pointer"
            >
              <i className="fa-solid fa-check text-xs"></i>
              Save Student
            </button>
          </div>
        </div>
        {/* END: Modal Footer */}

      </div>
    </div>
  );
};

export default AddStudentModal;
