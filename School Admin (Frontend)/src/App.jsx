import { useState } from 'react'
import DashboardPage from './pages/DashboardPage'
import ParentManagment from './pages/ParentManagment'
import LoginPage from './pages/LoginPage'

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true'
  })
  const [currentPage, setCurrentPage] = useState('Parents')

  const handleLogin = (user) => {
    localStorage.setItem('isLoggedIn', 'true')
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn')
    setIsLoggedIn(false)
  }

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />
  }

  if (currentPage === 'Parents') {
    return (
      <ParentManagment
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

export default App
