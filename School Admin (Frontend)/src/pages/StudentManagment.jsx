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
  isLoading = false,
  onAddStudent,
  onUpdateStudent,
  onDeleteStudent,
  onEditStudent,
}) => {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const studentsList = externalStudents || [];

  const handleViewStudent = (student) => {
    setSelectedStudent(student);
    setIsDetailsModalOpen(true);
  };

  const handleEditStudent = (student) => {
    if (onEditStudent) {
      onEditStudent(student);
    } else if (onNavigate) {
      onNavigate('AddStudent', student);
    }
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

  const handleDeleteStudent = (student) => {
    if (
      !window.confirm(
        `Are you sure you want to delete student "${student.name}"? This action cannot be undone.`
      )
    ) {
      return;
    }

    if (onDeleteStudent) {
      onDeleteStudent(student.dbId || student.id);
    } else {
      setLocalStudents((prev) =>
        prev.filter((s) => (s.dbId || s.id) !== (student.dbId || student.id))
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
        <Header onNavigate={onNavigate} />

        <main className="flex-1 p-8 space-y-6 max-w-[1440px] w-full mx-auto">
          <KPIStatsCards
            stats={{
              totalStudents: studentsList.length,
              onRoute: studentsList.filter((s) => {
                const st = (s.status || '').toLowerCase();
                return st === 'on route' || st === 'en route' || st === 'in transit';
              }).length,
              pickedUp: studentsList.filter((s) => {
                const st = (s.status || '').toLowerCase();
                return st === 'picked up';
              }).length,
              droppedSafely: studentsList.filter((s) => {
                const st = (s.status || '').toLowerCase();
                return st === 'dropped' || st === 'dropped off';
              }).length,
            }}
          />

          <StudentsTableSection
            onAddStudentClick={handleAddStudentClick}
            onViewStudent={handleViewStudent}
            onEditStudent={handleEditStudent}
            onDeleteStudent={handleDeleteStudent}
            studentsList={studentsList}
            isLoading={isLoading}
          />

          <div className="h-4"></div>
        </main>

        <StudentManagementFooter />
      </div>

      <StudentDetailsModal
        student={selectedStudent}
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        onEdit={(student) => {
          setIsDetailsModalOpen(false);
          handleEditStudent(student);
        }}
      />
    </div>
  );
};

export default StudentManagment;
