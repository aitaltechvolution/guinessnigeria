/**
 * App.jsx — Multi-page, light/dark mode, React Router 6
 */
import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'

import { ThemeProvider, useTheme } from './context/ThemeContext'
import Cursor            from './components/Cursor'
import AmbientBackground from './components/AmbientBackground'
import AgeGate           from './components/AgeGate'
import PageLoader        from './components/PageLoader'

import Navbar from './sections/Navbar'
import Footer from './sections/Footer'

import HomePage           from './pages/HomePage'
import BrandsPage         from './pages/BrandsPage'
import StoryPage          from './pages/StoryPage'
import NewsPage           from './pages/NewsPage'
import SustainabilityPage from './pages/SustainabilityPage'
import CareersPage        from './pages/CareersPage'
import ContactPage        from './pages/ContactPage'

function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/"              element={<PageTransition><HomePage /></PageTransition>} />
        <Route path="/brands"        element={<PageTransition><BrandsPage /></PageTransition>} />
        <Route path="/story"         element={<PageTransition><StoryPage /></PageTransition>} />
        <Route path="/news"          element={<PageTransition><NewsPage /></PageTransition>} />
        <Route path="/sustainability" element={<PageTransition><SustainabilityPage /></PageTransition>} />
        <Route path="/careers"       element={<PageTransition><CareersPage /></PageTransition>} />
        <Route path="/contact"       element={<PageTransition><ContactPage /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  )
}

function AppShell() {
  const [loaderDone, setLoaderDone] = useState(false)
  const [entered, setEntered]       = useState(false)
  const { isDark } = useTheme()

  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <Cursor />
      {!loaderDone && <PageLoader onComplete={() => setLoaderDone(true)} />}
      {loaderDone  && <AgeGate onEnter={() => setEntered(true)} />}
      <AmbientBackground />

      <AnimatePresence>
        {entered && (
          <motion.div
            key="site"
            className="relative z-10"
            style={{ background: 'var(--color-bg)', color: 'var(--color-text)', transition: 'background 0.4s, color 0.4s' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <ScrollToTop />
            <Navbar />
            <main id="main">
              <AnimatedRoutes />
            </main>
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <AppShell />
      </Router>
    </ThemeProvider>
  )
}
