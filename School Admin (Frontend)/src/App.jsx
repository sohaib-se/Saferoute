import { useState, useEffect, useCallback } from 'react'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { getStudents, addStudent, updateStudent, deleteStudent } from './services/studentsService'
import DashboardPage from './pages/DashboardPage'
import ParentManagment from './pages/ParentManagment'
import StudentManagment from './pages/StudentManagment'
import DriversManagment from './pages/DriversManagment'
import VehicleManagment from './pages/VehicleManagment'
import RouteManagment from './pages/RouteManagment'
import Notifications from './pages/Notifications'
import Addstudent from './pages/Addstudent'
import LoginPage from './pages/LoginPage'
import LandingPage from './pages/LandingPage'
import RegisterPage from './pages/RegisterPage'
import SOS from './pages/SOS'
import LiveTracking from './pages/LiveTracking'
import Trips from './pages/Trips'
import Profile from './pages/Profile'

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true'
  })
  const [currentPage, setCurrentPage] = useState('Dashboard')
  const [students, setStudents] = useState([])
  const [studentsLoading, setStudentsLoading] = useState(true)
  
  const navigate = useNavigate()

  const fetchStudentsList = useCallback(async () => {
    if (!isLoggedIn) return;
    try {
      setStudentsLoading(true);
      const data = await getStudents();
      setStudents(data);
    } catch (err) {
      console.error('Failed to fetch students in App:', err);
    } finally {
      setStudentsLoading(false);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    fetchStudentsList();
  }, [fetchStudentsList]);

  useEffect(() => {
    const handleAppNavigate = (e) => {
      if (e.detail) {
        setCurrentPage(e.detail)
      }
    }
    window.addEventListener('app-navigate', handleAppNavigate)
    return () => window.removeEventListener('app-navigate', handleAppNavigate)
  }, [])

  const handleLogin = (user) => {
    localStorage.setItem('isLoggedIn', 'true')
    if (user) {
      localStorage.setItem('user', JSON.stringify(user))
    }
    setIsLoggedIn(true)
    navigate('/dashboard', { replace: true })
  }

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('user')
    setIsLoggedIn(false)
    navigate('/', { replace: true })
  }

  const handleAddStudent = async (newStudent) => {
    try {
      await addStudent(newStudent);
      await fetchStudentsList();
    } catch (err) {
      console.error('Failed to create student:', err);
      alert('Failed to save student: ' + (err.message || 'Unknown error'));
    }
  };

  const handleUpdateStudent = async (updatedStudent) => {
    try {
      if (updatedStudent.dbId) {
        await updateStudent(updatedStudent.dbId, updatedStudent);
        await fetchStudentsList();
      }
    } catch (err) {
      console.error('Failed to update student:', err);
      alert('Failed to update student: ' + (err.message || 'Unknown error'));
    }
  };

  const handleDeleteStudent = async (studentDbId) => {
    try {
      if (studentDbId) {
        await deleteStudent(studentDbId);
        await fetchStudentsList();
      }
    } catch (err) {
      console.error('Failed to delete student:', err);
      alert('Failed to delete student: ' + (err.message || 'Unknown error'));
    }
  };

  const renderDashboardContent = () => {
    if (currentPage === 'Parents') {
      return (
        <ParentManagment
          onLogout={handleLogout}
          onNavigate={setCurrentPage}
          currentPage={currentPage}
          students={students}
          onRefreshStudents={fetchStudentsList}
        />
      )
    }

    if (currentPage === 'AddStudent') {
      return (
        <Addstudent
          onLogout={handleLogout}
          onNavigate={setCurrentPage}
          currentPage="Students"
          onAddStudent={handleAddStudent}
        />
      )
    }

    if (currentPage === 'Students') {
      return (
        <StudentManagment
          onLogout={handleLogout}
          onNavigate={setCurrentPage}
          currentPage={currentPage}
          students={students}
          isLoading={studentsLoading}
          onAddStudent={handleAddStudent}
          onUpdateStudent={handleUpdateStudent}
          onDeleteStudent={handleDeleteStudent}
        />
      )
    }

    if (currentPage === 'Drivers') {
      return (
        <DriversManagment
          onLogout={handleLogout}
          onNavigate={setCurrentPage}
          currentPage={currentPage}
        />
      )
    }

    if (currentPage === 'Vehicles') {
      return (
        <VehicleManagment
          onLogout={handleLogout}
          onNavigate={setCurrentPage}
          currentPage={currentPage}
        />
      )
    }

    if (currentPage === 'Routes') {
      return (
        <RouteManagment
          onLogout={handleLogout}
          onNavigate={setCurrentPage}
          currentPage={currentPage}
        />
      )
    }

    if (currentPage === 'Notifications') {
      return (
        <Notifications
          onLogout={handleLogout}
          onNavigate={setCurrentPage}
          currentPage={currentPage}
        />
      )
    }

    if (currentPage === 'SOS Alerts') {
      return (
        <SOS
          onLogout={handleLogout}
          onNavigate={setCurrentPage}
          currentPage={currentPage}
        />
      )
    }

    if (currentPage === 'Live Tracking') {
      return (
        <LiveTracking
          onLogout={handleLogout}
          onNavigate={setCurrentPage}
          currentPage={currentPage}
        />
      )
    }

    if (currentPage === 'Trips') {
      return (
        <Trips
          onLogout={handleLogout}
          onNavigate={setCurrentPage}
          currentPage={currentPage}
        />
      )
    }

    if (currentPage === 'Profile') {
      return (
        <Profile
          onLogout={handleLogout}
          onNavigate={setCurrentPage}
          currentPage={currentPage}
        />
      )
    }

    return (
      <DashboardPage
        onLogout={handleLogout}
        onNavigate={setCurrentPage}
        currentPage={currentPage}
      />
    )
  }

  return (
    <Routes>
      <Route path="/" element={isLoggedIn ? <Navigate to="/dashboard" replace /> : <LandingPage />} />
      <Route path="/login" element={isLoggedIn ? <Navigate to="/dashboard" replace /> : <LoginPage onLogin={handleLogin} />} />
      <Route path="/register" element={isLoggedIn ? <Navigate to="/dashboard" replace /> : <RegisterPage onRegister={handleLogin} />} />
      <Route path="/dashboard" element={isLoggedIn ? renderDashboardContent() : <Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to={isLoggedIn ? "/dashboard" : "/"} replace />} />
    </Routes>
  )
}

export default App
