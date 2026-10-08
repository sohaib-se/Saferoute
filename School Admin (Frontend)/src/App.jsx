import { useState } from 'react'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import DashboardPage from './pages/DashboardPage'
import ParentManagment from './pages/ParentManagment'
import StudentManagment from './pages/StudentManagment'
import Addstudent from './pages/Addstudent'
import LoginPage from './pages/LoginPage'
import LandingPage from './pages/LandingPage'
import RegisterPage from './pages/RegisterPage'

const initialStudents = [
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
];

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true'
  })
  const [currentPage, setCurrentPage] = useState('Parents')
  const [currentPage, setCurrentPage] = useState('Dashboard')
  const [students, setStudents] = useState(initialStudents)
  
  const navigate = useNavigate()

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

  const handleAddStudent = (newStudent) => {
    setStudents((prev) => [
      ...prev,
      {
        ...newStudent,
        num: prev.length + 1,
      },
    ]);
  };

  const handleUpdateStudent = (updatedStudent) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === updatedStudent.id ? updatedStudent : s))
    );
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />
  }

  if (currentPage === 'Parents') {
    return (
      <ParentManagment
        onLogout={handleLogout}
        onNavigate={setCurrentPage}
        currentPage={currentPage}
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
        onAddStudent={handleAddStudent}
        onUpdateStudent={handleUpdateStudent}
      />
    )
  }

  return (
    <DashboardPage
      onLogout={handleLogout}
      onNavigate={setCurrentPage}
      currentPage={currentPage}
    />
  return (
    <Routes>
      <Route path="/" element={isLoggedIn ? <Navigate to="/dashboard" replace /> : <LandingPage />} />
      <Route path="/login" element={isLoggedIn ? <Navigate to="/dashboard" replace /> : <LoginPage onLogin={handleLogin} />} />
      <Route path="/register" element={isLoggedIn ? <Navigate to="/dashboard" replace /> : <RegisterPage onRegister={handleLogin} />} />
      <Route path="/dashboard" element={isLoggedIn ? <DashboardPage onLogout={handleLogout} /> : <Navigate to="/login" replace />} />
    </Routes>
  )
}

export default App
