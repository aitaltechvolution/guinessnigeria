/**
 * sections/Footer.jsx
 * ─────────────────────────────────────────────────────────────────
 * Part 7 — Mega Footer
 *
 * Features:
 *  • Large gradient "Made of More" closing statement
 *  • Newsletter signup with animated focus state
 *  • Multi-column link grid with hover slide
 *  • Social icon row with magnetic hover
 *  • Age-restriction / responsible drinking notice
 *  • Animated gold divider lines
 *  • Back-to-top button
 */
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { staggerContainer, staggerItem, viewportTrigger } from '../utils/animations'
import { FOOTER_LINKS, SOCIAL_LINKS, BRAND } from '../utils/constants'

/* ─── Social icon ─────────────────────────────────────────────────── */
const SOCIAL_ICONS = {
  Instagram: (
    <>
      <rect x="2" y="2" width="16" height="16" rx="4" stroke="currentColor" strokeWidth="1.3" fill="none"/>
      <circle cx="10" cy="10" r="3.2" stroke="currentColor" strokeWidth="1.3" fill="none"/>
      <circle cx="14.5" cy="5.5" r="0.8" fill="currentColor"/>
    </>
  ),
  'Twitter/X': (
    <path d="M3 3l14 14M17 3L3 17" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
  ),
  Facebook: (
    <path d="M13 2h-2a4 4 0 00-4 4v2H5v3h2v7h3v-7h2.5L13 8h-3V6a1 1 0 011-1h2V2z" fill="currentColor"/>
  ),
  LinkedIn: (
    <>
      <rect x="2" y="2" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="1.3" fill="none"/>
      <circle cx="6.5" cy="6.5" r="1" fill="currentColor"/>
      <path d="M6.5 9v6M10 9v6M10 11.5c0-1.5 1-2.5 2.5-2.5S15 10 15 11.5V15" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" fill="none"/>
    </>
  ),
  YouTube: (
    <>
      <rect x="2" y="4" width="16" height="12" rx="3" stroke="currentColor" strokeWidth="1.3" fill="none"/>
      <path d="M8.5 7.5l4 2.5-4 2.5v-5z" fill="currentColor"/>
    </>
  ),
}

function SocialIcon({ label, href }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor-hover
      aria-label={label}
      className="w-11 h-11 rounded-full flex items-center justify-center"
      style={{ border: '1px solid rgba(201,150,58,0.25)', color: 'rgba(201,150,58,0.7)' }}
      whileHover={{
        scale: 1.1,
        borderColor: 'rgba(245,217,138,0.6)',
        color: '#F5D98A',
        boxShadow: '0 0 20px rgba(201,150,58,0.25)',
      }}
      transition={{ duration: 0.3 }}
    >
      <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
        {SOCIAL_ICONS[label]}
      </svg>
    </motion.a>
  )
}

/* ─── Newsletter ──────────────────────────────────────────────────── */
function Newsletter() {
  const [email, setEmail]       = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [focused, setFocused]   = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email) return
    setSubmitted(true)
  }

  return (
    <div>
      <h4
        style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: '1.1rem',
          fontWeight: 700,
          color: '#FAF7EE',
          marginBottom: '0.5rem',
        }}
      >
        Stay in the loop
      </h4>
      <p style={{ color: 'rgba(242,237,215,0.5)', fontSize: '0.85rem', marginBottom: '1.25rem', lineHeight: 1.6 }}>
        News, launches, and stories from Guinness Nigeria — straight to your inbox.
      </p>

      {submitted ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-body-sm"
          style={{ color: '#88C888' }}
        >
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
            <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.3"/>
            <path d="M6 10l3 3 5-6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          You're on the list. Made of More.
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="flex gap-2">
          <motion.div
            className="flex-1 relative"
            animate={{
              boxShadow: focused ? '0 0 0 1px rgba(201,150,58,0.5)' : '0 0 0 1px rgba(255,255,255,0.08)',
            }}
            transition={{ duration: 0.25 }}
            style={{ borderRadius: '100px' }}
          >
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholder="your@email.com"
              className="w-full px-5 py-3 rounded-full bg-transparent outline-none text-body-sm"
              style={{ color: '#FAF7EE' }}
            />
          </motion.div>
          <motion.button
            type="submit"
            data-cursor-hover
            className="px-5 py-3 rounded-full flex-shrink-0"
            style={{ background: 'linear-gradient(135deg, #8A6420, #C9963A, #E8B84B)', color: '#050505' }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.button>
        </form>
      )}
    </div>
  )
}

/* ─── Footer link column ─────────────────────────────────────────── */
function LinkColumn({ title, links }) {
  return (
    <motion.div variants={staggerItem}>
      <h5
        className="text-label-xs uppercase tracking-widest mb-4"
        style={{ color: 'rgba(201,150,58,0.6)' }}
      >
        {title}
      </h5>
      <ul className="flex flex-col gap-3">
        {links.map(link => (
          <li key={link.label}>
            <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
              <Link
                to={link.href}
                data-cursor-hover
                className="text-body-sm inline-block transition-colors hover:text-g-goldFoam"
                style={{ color: 'rgba(242,237,215,0.6)' }}
              >
                {link.label}
              </Link>
            </motion.div>
          </li>
        ))}
      </ul>
    </motion.div>
  )
}

/* ─── Back to top ─────────────────────────────────────────────────── */
function BackToTop() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <motion.button
      onClick={scrollTop}
      data-cursor-hover
      aria-label="Back to top"
      className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
      style={{ border: '1px solid rgba(201,150,58,0.3)' }}
      whileHover={{ y: -4, borderColor: 'rgba(245,217,138,0.6)', boxShadow: '0 0 20px rgba(201,150,58,0.25)' }}
      transition={{ duration: 0.3 }}
    >
      <motion.svg
        width="16" height="16" viewBox="0 0 16 16" fill="none"
        style={{ color: '#E8B84B' }}
        animate={{ y: [0, -2, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <path d="M8 13V3M3 8l5-5 5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </motion.svg>
    </motion.button>
  )
}

/* ─── Footer ──────────────────────────────────────────────────────── */
export default function Footer() {
  return (
    <footer
      className="relative w-full overflow-hidden pt-24 pb-10"
      style={{ background: '#050505', borderTop: '1px solid rgba(201,150,58,0.1)' }}
    >
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(201,150,58,0.06), transparent 70%)' }}
      />

      <div className="section-container relative z-10">

        {/* Big closing statement */}
        <motion.div
          className="mb-20 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={viewportTrigger}
          variants={staggerContainer(0.1)}
        >
          <motion.div variants={staggerItem} className="mb-4">
            <span
              className="text-label-sm uppercase tracking-[0.3em]"
              style={{ color: 'rgba(201,150,58,0.5)' }}
            >
              Guinness Nigeria · Est. 1962
            </span>
          </motion.div>
          <motion.h2
            variants={staggerItem}
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(2.8rem, 8vw, 7rem)',
              fontWeight: 800,
              lineHeight: 0.95,
              letterSpacing: '-0.03em',
              background: 'linear-gradient(135deg, #8A6420 0%, #C9963A 35%, #E8B84B 55%, #F5D98A 80%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Made of More.
          </motion.h2>
        </motion.div>

        {/* Gold divider */}
        <motion.div
          className="h-px mb-16 origin-left"
          style={{ background: 'linear-gradient(90deg, rgba(201,150,58,0.5), transparent)' }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={viewportTrigger}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Link grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer(0.08)}
        >
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <LinkColumn key={title} title={title} links={links} />
          ))}

          {/* Newsletter spans remaining column on large screens */}
          <motion.div variants={staggerItem} className="col-span-2 md:col-span-1 lg:col-span-1">
            <Newsletter />
          </motion.div>
        </motion.div>

        {/* Gold divider */}
        <motion.div
          className="h-px mb-10 origin-left"
          style={{ background: 'linear-gradient(90deg, rgba(201,150,58,0.3), transparent)' }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={viewportTrigger}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        />

        {/* Bottom row */}
        <motion.div
          className="flex flex-col md:flex-row items-center justify-between gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportTrigger}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="flex items-center gap-4">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center"
              style={{ border: '1px solid rgba(201,150,58,0.4)' }}
            >
              <span style={{ fontFamily: 'Playfair Display, serif', fontWeight: 800, color: '#C9963A', fontSize: '0.9rem' }}>G</span>
            </div>
            <div className="leading-tight">
              <p style={{ color: 'rgba(242,237,215,0.5)', fontSize: '0.8rem' }}>
                © 2026 {BRAND.name}. All rights reserved.
              </p>
              <p style={{ color: 'rgba(201,150,58,0.4)', fontSize: '0.75rem' }}>
                {BRAND.hq}
              </p>
            </div>
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-3">
            {SOCIAL_LINKS.map(s => (
              <SocialIcon key={s.label} label={s.label} href={s.href} />
            ))}
            <BackToTop />
          </div>
        </motion.div>

        {/* Responsible drinking notice */}
        <motion.div
          className="mt-10 pt-8 border-t text-center"
          style={{ borderColor: 'rgba(255,255,255,0.04)' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportTrigger}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <p style={{ color: 'rgba(242,237,215,0.3)', fontSize: '0.75rem', lineHeight: 1.7, maxWidth: '60ch', margin: '0 auto' }}>
            This site is intended for individuals of legal drinking age. Guinness Nigeria
            promotes responsible drinking. Not for sale to persons under the age of 18.
            Please drink responsibly.
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
