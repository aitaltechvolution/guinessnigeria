/**
 * components/AgeGate.jsx
 * ─────────────────────────────────────────────────────────────────
 * Legal age verification gate — required for alcohol brand sites.
 * Stores consent in sessionStorage.
 */
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function AgeGate({ onEnter }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const passed = sessionStorage.getItem('gn_age_verified')
    if (!passed) setVisible(true)
    else onEnter?.()
  }, [])

  const handleYes = () => {
    sessionStorage.setItem('gn_age_verified', '1')
    setVisible(false)
    onEnter?.()
  }

  const handleNo = () => {
    window.location.href = 'https://www.responsibility.org'
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9998] flex items-center justify-center"
          style={{ background: '#050505' }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }}
        >
          {/* Radial glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at 50% 50%, rgba(201,150,58,0.08) 0%, transparent 65%)',
            }}
          />

          <motion.div
            className="relative z-10 text-center max-w-lg w-full px-6 sm:px-8"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.3, duration: 1, ease: [0.22, 1, 0.36, 1] } }}
          >
            {/* Logo */}
            <motion.div
              className="mb-10 flex justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1, transition: { delay: 0.5, duration: 0.8 } }}
            >
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="40" cy="40" r="38" stroke="rgba(201,150,58,0.4)" strokeWidth="1" />
                <circle cx="40" cy="40" r="30" stroke="rgba(201,150,58,0.2)" strokeWidth="0.5" />
                <text x="40" y="46" textAnchor="middle" fill="#C9963A" fontSize="22" fontFamily="Playfair Display, Georgia, serif" fontWeight="700">G</text>
              </svg>
            </motion.div>

            {/* Harp divider */}
            <div className="flex justify-center mb-8">
              <div className="h-px w-16 bg-gradient-to-r from-transparent via-g-gold to-transparent" />
            </div>

            <h1
              className="text-g-creamHi mb-3"
              style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.4rem,4vw,2rem)', fontWeight: 700 }}
            >
              Welcome to<br />Guinness Nigeria
            </h1>

            <p className="text-g-muted text-body-sm mb-10 leading-relaxed">
              This website contains content about alcohol.
              Please confirm you are of legal drinking age in your country of residence.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center w-full">
              <motion.button
                onClick={handleYes}
                className="btn-primary justify-center text-center"
                style={{
                  whiteSpace: 'nowrap',
                  fontSize: 'clamp(0.7rem, 2.2vw, 0.875rem)',
                  letterSpacing: '0.05em',
                  paddingLeft: 'clamp(1.25rem, 4vw, 2rem)',
                  paddingRight: 'clamp(1.25rem, 4vw, 2rem)',
                }}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                Yes, I Am of Legal Age
              </motion.button>
              <motion.button
                onClick={handleNo}
                className="btn-ghost justify-center text-center"
                style={{
                  whiteSpace: 'nowrap',
                  fontSize: 'clamp(0.7rem, 2.2vw, 0.875rem)',
                  letterSpacing: '0.05em',
                  paddingLeft: 'clamp(1.25rem, 4vw, 2rem)',
                  paddingRight: 'clamp(1.25rem, 4vw, 2rem)',
                }}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                No, Take Me Back
              </motion.button>
            </div>

            <p className="mt-8 text-g-ghost text-body-xs leading-relaxed">
              By entering, you accept our{' '}
              <a href="#" className="text-g-muted hover:text-g-gold transition-colors">Terms</a>
              {' '}&amp;{' '}
              <a href="#" className="text-g-muted hover:text-g-gold transition-colors">Privacy Policy</a>.
              <br />Guinness Nigeria promotes responsible drinking.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
