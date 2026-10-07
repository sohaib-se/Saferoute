import { useState } from 'react'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import DashboardPage from './pages/DashboardPage'
import LoginPage from './pages/LoginPage'
import LandingPage from './pages/LandingPage'
import RegisterPage from './pages/RegisterPage'

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true'
  })
  
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
