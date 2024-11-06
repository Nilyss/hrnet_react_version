// hooks | libraries
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom'

import AOS from 'aos'
import 'aos/dist/aos.css'

import { useEffect, ReactElement } from 'react'

// components
import Header from './components/header/Header'
import NavigationBanner from './components/navigationBanner/NavigationBanner.tsx'
import Footer from './components/footer/Footer'

// views
import HomePage from './views/homePage/HomePage'
import CurrentEmployees from './views/currentEmployees/CurrentEmployees.tsx'
import CreateEmployee from './views/createEmployee/CreateEmployee'

function App(): ReactElement {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    })
  }, [])

  return (
    <Router>
      <Header />
      <NavigationBanner />
      <Routes>
        <Route path="/" element={<Navigate to={'/home'} />}></Route>
        <Route path={'/home'} element={<HomePage />}></Route>
        <Route
          path={'/current_employees'}
          element={<CurrentEmployees />}
        ></Route>
        <Route path={'/create_employee'} element={<CreateEmployee />}></Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
