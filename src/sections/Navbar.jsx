/**
 * sections/Navbar.jsx
 * ─────────────────────────────────────────────────────────────────
 * Part 7 — Navigation (multi-page)
 *
 * Features:
 *  • Transparent → solid background transition on scroll
 *  • Animated underline indicator on nav links (layoutId)
 *  • Active route highlighting via useLocation
 *  • Animated hamburger → X morph
 *  • Full-screen mobile menu with staggered link reveal
 *  • Logo scale + glow pulse
 *  • "Find Us" CTA → Contact page
 */
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { NAV_LINKS } from '../utils/constants'
import { useScrollPosition } from '../hooks'



/* ─── Logo mark ───────────────────────────────────────────────────── */
function Logo() {
  return (
    <Link to="/" data-cursor-hover className="flex items-center gap-3 group">
      <img src="/favicon.ico" alt="Guiness logo" 
      className='w-3/12'/>
    </Link>
  )
}

/* ─── Desktop nav links ───────────────────────────────────────────── */
function DesktopLinks() {
  const [hovered, setHovered] = useState(null)
  const location = useLocation()

  return (
    <div className="hidden lg:flex items-center gap-1">
      {NAV_LINKS.map(link => {
        const isActive = location.pathname === link.href
        return (
          <NavLink
            key={link.label}
            to={link.href}
            data-cursor-hover
            className="relative px-4 py-2 text-body-sm font-medium transition-colors"
            style={{ color: hovered === link.label || isActive ? '#F5D98A' : 'rgba(242,237,215,0.75)' }}
            onMouseEnter={() => setHovered(link.label)}
            onMouseLeave={() => setHovered(null)}
          >
            {link.label}
            {(hovered === link.label || isActive) && (
              <motion.div
                layoutId="nav-underline"
                className="absolute left-4 right-4 -bottom-0.5 h-px"
                style={{ background: 'linear-gradient(90deg, #C9963A, #F5D98A)' }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
          </NavLink>
        )
      })}
    </div>
  )
}

/* ─── Hamburger morph icon ────────────────────────────────────────── */
function Hamburger({ open }) {
  return (
    <div className="relative w-6 h-5 flex flex-col justify-between">
      {[0, 1, 2].map(i => (
        <motion.span
          key={i}
          className="block h-px w-full"
          style={{ background: '#F5D98A' }}
          animate={
            open
              ? i === 0
                ? { rotate: 45, y: 9, width: '100%' }
                : i === 1
                  ? { opacity: 0, x: -10 }
                  : { rotate: -45, y: -9, width: '100%' }
              : { rotate: 0, y: 0, x: 0, opacity: 1 }
          }
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        />
      ))}
    </div>
  )
}

/* ─── Mobile fullscreen menu ──────────────────────────────────────── */
function MobileMenu({ open, onClose }) {
  const location = useLocation()

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-40 flex flex-col"
          style={{ background: '#050505' }}
          initial={{ clipPath: 'circle(0% at 95% 5%)' }}
          animate={{ clipPath: 'circle(150% at 95% 5%)' }}
          exit={{ clipPath: 'circle(0% at 95% 5%)' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Ambient glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse 60% 50% at 80% 10%, rgba(201,150,58,0.08), transparent 70%)' }}
          />

          <div className="flex-1 flex flex-col items-start justify-center px-8 gap-2 overflow-y-auto py-20">
            {NAV_LINKS.map((link, i) => {
              const isActive = location.pathname === link.href
              return (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    to={link.href}
                    onClick={onClose}
                    className="relative block"
                    style={{
                      fontFamily: 'Playfair Display, serif',
                      fontSize: 'clamp(2rem, 8vw, 3.2rem)',
                      fontWeight: 700,
                      color: isActive ? '#E8B84B' : '#FAF7EE',
                      lineHeight: 1.5,
                    }}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              )
            })}
          </div>

          {/* Footer in mobile menu */}
          <motion.div
            className="px-8 pb-10 flex items-center justify-between border-t pt-6"
            style={{ borderColor: 'rgba(201,150,58,0.1)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <span className="text-body-xs" style={{ color: 'rgba(242,237,215,0.4)' }}>
              Made of More © 2026
            </span>
            <span className="text-body-xs" style={{ color: 'rgba(201,150,58,0.5)' }}>
              Lagos, Nigeria
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ─── Navbar ──────────────────────────────────────────────────────── */
export default function Navbar() {
  const scrollY = useScrollPosition()
  const scrolled = scrollY > 40
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled
            ? 'var(--color-surface, rgba(5,5,5,0.75))'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(201,150,58,0.12)' : '1px solid transparent',
        }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
      >
        <div className="section-container">
          <div className="flex items-center justify-between h-20">
            <Logo />
            <DesktopLinks />

            <div className="flex items-center gap-3">
              <Link
                to="/contact"
                data-cursor-hover
                className="hidden md:inline-flex btn-ghost py-2.5 px-5 text-xs"
              >
                Find Us
              </Link>

              {/* Hamburger — mobile only */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                data-cursor-hover
                className="lg:hidden relative z-50 p-2"
                aria-label="Toggle menu"
              >
                <Hamburger open={menuOpen} />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}
