import { useState, useEffect, useCallback } from 'react'
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom'
import { getStudents, addStudent, updateStudent, deleteStudent } from './services/studentsService'
import { clearAllCaches } from './services/cacheUtils'
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

const PAGE_ROUTES = {
  'Dashboard': '/dashboard',
  'Students': '/students',
  'AddStudent': '/students/add',
  'Parents': '/parents',
  'Drivers': '/drivers',
  'Vehicles': '/vehicles',
  'Routes': '/routes',
  'Trips': '/trips',
  'Live Tracking': '/live-tracking',
  'Notifications': '/notifications',
  'SOS Alerts': '/sos',
  'SOS': '/sos',
  'Profile': '/profile',
};

const getPageFromPathname = (pathname) => {
  if (pathname.startsWith('/students/add')) return 'AddStudent';
  if (pathname.startsWith('/students')) return 'Students';
  if (pathname.startsWith('/parents')) return 'Parents';
  if (pathname.startsWith('/drivers')) return 'Drivers';
  if (pathname.startsWith('/vehicles')) return 'Vehicles';
  if (pathname.startsWith('/routes')) return 'Routes';
  if (pathname.startsWith('/trips')) return 'Trips';
  if (pathname.startsWith('/live-tracking')) return 'Live Tracking';
  if (pathname.startsWith('/notifications')) return 'Notifications';
  if (pathname.startsWith('/sos')) return 'SOS Alerts';
  if (pathname.startsWith('/profile')) return 'Profile';
  return 'Dashboard';
};

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true'
  })
  const [students, setStudents] = useState([])
  const [editingStudent, setEditingStudent] = useState(null)
  const [studentsLoading, setStudentsLoading] = useState(true)
  
  const navigate = useNavigate()
  const location = useLocation()
  const currentPage = getPageFromPathname(location.pathname)

  const handleNavigate = useCallback((targetPage, extraParam = null) => {
    if (targetPage === 'AddStudent') {
      if (extraParam) {
        setEditingStudent(extraParam)
      } else {
        setEditingStudent(null)
      }
      navigate('/students/add')
      return
    }

    if (targetPage !== 'AddStudent') {
      setEditingStudent(null)
    }

    const route = PAGE_ROUTES[targetPage] || '/dashboard'
    navigate(route)
  }, [navigate])

  const fetchStudentsList = useCallback(async () => {
    if (!isLoggedIn) return;
    try {
      setStudentsLoading(true);
      const data = await getStudents(true);
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
        handleNavigate(e.detail)
      }
    }
    window.addEventListener('app-navigate', handleAppNavigate)
    return () => window.removeEventListener('app-navigate', handleAppNavigate)
  }, [handleNavigate])

  const handleLogin = (user) => {
    localStorage.setItem('isLoggedIn', 'true')
    if (user) {
      localStorage.setItem('user', JSON.stringify(user))
    }
    setIsLoggedIn(true)
    navigate('/dashboard', { replace: true })
  }

  const handleLogout = () => {
    clearAllCaches()
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('user')
    setIsLoggedIn(false)
    navigate('/', { replace: true })
  }

  const handleAddStudent = async (newStudent) => {
    setStudentsLoading(true);
    try {
      await addStudent(newStudent);
      await fetchStudentsList();
    } catch (err) {
      console.error('Failed to create student:', err);
      alert('Failed to save student: ' + (err.message || 'Unknown error'));
      await fetchStudentsList();
    } finally {
      setStudentsLoading(false);
    }
  };

  const handleUpdateStudent = async (updatedStudent) => {
    setStudentsLoading(true);
    setEditingStudent(null);
    try {
      const studentId = updatedStudent.dbId || updatedStudent.id;
      if (studentId) {
        await updateStudent(studentId, updatedStudent);
        await fetchStudentsList();
      }
    } catch (err) {
      console.error('Failed to update student:', err);
      alert('Failed to update student: ' + (err.message || 'Unknown error'));
      await fetchStudentsList();
    } finally {
      setStudentsLoading(false);
    }
  };

  const handleDeleteStudent = async (studentDbId) => {
    setStudentsLoading(true);
    // Optimistic removal for instant UI feedback
    setStudents((prev) => prev.filter((s) => s.dbId !== studentDbId && s.id !== studentDbId));

    try {
      if (studentDbId) {
        await deleteStudent(studentDbId);
        await fetchStudentsList();
      }
    } catch (err) {
      console.error('Failed to delete student:', err);
      alert('Failed to delete student: ' + (err.message || 'Unknown error'));
      await fetchStudentsList();
    } finally {
      setStudentsLoading(false);
    }
  };

  return (
    <Routes>
      <Route path="/" element={isLoggedIn ? <Navigate to="/dashboard" replace /> : <LandingPage />} />
      <Route path="/login" element={isLoggedIn ? <Navigate to="/dashboard" replace /> : <LoginPage onLogin={handleLogin} />} />
      <Route path="/register" element={isLoggedIn ? <Navigate to="/dashboard" replace /> : <RegisterPage onRegister={handleLogin} />} />

      {/* Authenticated Admin Routes with dedicated URLs */}
      <Route
        path="/dashboard"
        element={
          isLoggedIn ? (
            <DashboardPage
              onLogout={handleLogout}
              onNavigate={handleNavigate}
              currentPage="Dashboard"
            />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/students"
        element={
          isLoggedIn ? (
            <StudentManagment
              onLogout={handleLogout}
              onNavigate={handleNavigate}
              currentPage="Students"
              students={students}
              isLoading={studentsLoading}
              onAddStudent={handleAddStudent}
              onUpdateStudent={handleUpdateStudent}
              onDeleteStudent={handleDeleteStudent}
              onEditStudent={(student) => {
                setEditingStudent(student);
                navigate('/students/add');
              }}
            />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/students/add"
        element={
          isLoggedIn ? (
            <Addstudent
              onLogout={handleLogout}
              onNavigate={handleNavigate}
              currentPage="Students"
              onAddStudent={handleAddStudent}
              onUpdateStudent={handleUpdateStudent}
              studentToEdit={editingStudent}
            />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/parents"
        element={
          isLoggedIn ? (
            <ParentManagment
              onLogout={handleLogout}
              onNavigate={handleNavigate}
              currentPage="Parents"
              students={students}
              onRefreshStudents={fetchStudentsList}
            />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/drivers"
        element={
          isLoggedIn ? (
            <DriversManagment
              onLogout={handleLogout}
              onNavigate={handleNavigate}
              currentPage="Drivers"
            />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/vehicles"
        element={
          isLoggedIn ? (
            <VehicleManagment
              onLogout={handleLogout}
              onNavigate={handleNavigate}
              currentPage="Vehicles"
            />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/routes"
        element={
          isLoggedIn ? (
            <RouteManagment
              onLogout={handleLogout}
              onNavigate={handleNavigate}
              currentPage="Routes"
            />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/trips"
        element={
          isLoggedIn ? (
            <Trips
              onLogout={handleLogout}
              onNavigate={handleNavigate}
              currentPage="Trips"
            />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/live-tracking"
        element={
          isLoggedIn ? (
            <LiveTracking
              onLogout={handleLogout}
              onNavigate={handleNavigate}
              currentPage="Live Tracking"
            />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/notifications"
        element={
          isLoggedIn ? (
            <Notifications
              onLogout={handleLogout}
              onNavigate={handleNavigate}
              currentPage="Notifications"
            />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/sos"
        element={
          isLoggedIn ? (
            <SOS
              onLogout={handleLogout}
              onNavigate={handleNavigate}
              currentPage="SOS Alerts"
            />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route path="/sos-alerts" element={<Navigate to="/sos" replace />} />
      <Route
        path="/profile"
        element={
          isLoggedIn ? (
            <Profile
              onLogout={handleLogout}
              onNavigate={handleNavigate}
              currentPage="Profile"
            />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route path="*" element={<Navigate to={isLoggedIn ? "/dashboard" : "/"} replace />} />
    </Routes>
  )
}

export default App
