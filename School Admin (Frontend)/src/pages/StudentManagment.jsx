import React, { useState } from 'react';
import Sidebar from '../components/common/Sidebar';
import Header from '../components/common/Header';
import KPIStatsCards from '../components/pagecomponents/StudentManagement/KPIStatsCards';
import StudentsTableSection from '../components/pagecomponents/StudentManagement/StudentsTableSection';
import StudentManagementFooter from '../components/pagecomponents/StudentManagement/StudentManagementFooter';
import StudentDetailsModal from '../components/pagecomponents/StudentManagement/StudentDetailsModal';

const StudentManagment = ({
  onLogout,
  onNavigate,
  currentPage = 'Students',
  students: externalStudents,
  onUpdateStudent,
}) => {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [modalMode, setModalMode] = useState('view'); // 'view' or 'edit'
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  // Fallback initial state if external props aren't provided
  const [localStudents, setLocalStudents] = useState([
    {
      id: '#ST-9041',
      num: 1,
      name: 'Ayesha Khan',
      class: 'Grade 5',
      route: 'Route 1',
      vehicle: 'Bus 12',
      status: 'On Route',
      initials: 'AK',
      avatarBg: 'bg-rose-100 text-rose-500',
    },
    {
      id: '#ST-8822',
      num: 2,
      name: 'Muhammad Ali',
      class: 'Grade 6',
      route: 'Route 2',
      vehicle: 'Bus 07',
      status: 'Picked Up',
      initials: 'MA',
      avatarBg: 'bg-blue-100 text-blue-600',
    },
    {
      id: '#ST-7721',
      num: 3,
      name: 'Sara Khan',
      class: 'Grade 7',
      route: 'Route 3',
      vehicle: 'Bus 09',
      status: 'Waiting',
      initials: 'SK',
      avatarBg: 'bg-amber-100 text-amber-600',
    },
    {
      id: '#ST-9055',
      num: 4,
      name: 'Hassan Ali',
      class: 'Grade 5',
      route: 'Route 1',
      vehicle: 'Bus 12',
      status: 'On Route',
      initials: 'HA',
      avatarBg: 'bg-teal-100 text-teal-600',
    },
    {
      id: '#ST-6643',
      num: 5,
      name: 'Fatima Noor',
      class: 'Grade 6',
      route: 'Route 2',
      vehicle: 'Bus 15',
      status: 'Dropped',
      initials: 'FN',
      avatarBg: 'bg-indigo-100 text-indigo-600',
    },
    {
      id: '#ST-7128',
      num: 6,
      name: 'Bilal Ahmed',
      class: 'Grade 7',
      route: 'Route 4',
      vehicle: 'Bus 18',
      status: 'Picked Up',
      initials: 'BA',
      avatarBg: 'bg-purple-100 text-purple-600',
    },
    {
      id: '#ST-9080',
      num: 7,
      name: 'Zoya Malik',
      class: 'Grade 5',
      route: 'Route 1',
      vehicle: 'Bus 12',
      status: 'On Route',
      initials: 'ZM',
      avatarBg: 'bg-pink-100 text-pink-600',
    },
    {
      id: '#ST-5510',
      num: 8,
      name: 'Hamza Tariq',
      class: 'Grade 8',
      route: 'Route 5',
      vehicle: 'Bus 05',
      status: 'Waiting',
      initials: 'HT',
      avatarBg: 'bg-cyan-100 text-cyan-700',
    },
  ]);

  const studentsList = externalStudents || localStudents;

  const handleViewStudent = (student) => {
    setSelectedStudent(student);
    setModalMode('view');
    setIsDetailsModalOpen(true);
  };

  const handleEditStudent = (student) => {
    setSelectedStudent(student);
    setModalMode('edit');
    setIsDetailsModalOpen(true);
  };

  const handleSaveStudent = (updatedStudent) => {
    if (onUpdateStudent) {
      onUpdateStudent(updatedStudent);
    } else {
      setLocalStudents(
        localStudents.map((s) => (s.id === updatedStudent.id ? updatedStudent : s))
      );
    }
  };

  const handleAddStudentClick = () => {
    if (onNavigate) {
      onNavigate('AddStudent');
    }
  };

  return (
    <div className="h-screen flex bg-[#F8FAFC] text-slate-800 font-sans antialiased overflow-hidden">
      <Sidebar
        onLogout={onLogout}
        currentPage={currentPage}
        onNavigate={onNavigate}
      />

      <div className="flex-1 flex flex-col min-w-0 bg-[#F8FAFC] overflow-y-auto h-screen">
        <Header />

        <main className="flex-1 p-8 space-y-6 max-w-[1440px] w-full mx-auto">
          <KPIStatsCards />

          <StudentsTableSection
            onAddStudentClick={handleAddStudentClick}
            onViewStudent={handleViewStudent}
            onEditStudent={handleEditStudent}
            studentsList={studentsList}
          />

          <div className="h-4"></div>
        </main>

        <StudentManagementFooter />
      </div>

      <StudentDetailsModal
        student={selectedStudent}
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        onSave={handleSaveStudent}
        mode={modalMode}
      />
    </div>
  );
};

export default StudentManagment;
