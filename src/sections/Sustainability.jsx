/**
 * sections/Sustainability.jsx
 * ─────────────────────────────────────────────────────────────────
 * Part 6 — Sustainability + Careers
 *
 * Features:
 *  • Animated SVG progress rings (stroke-dashoffset draw-in on scroll)
 *  • Sustainability stat counters
 *  • Pillar cards with icon + hover glow
 *  • Careers: glassmorphism job cards with staggered reveal
 *  • Magnetic CTA button (cursor-attraction effect)
 *  • Culture image grid with hover zoom (CSS gradients, no assets)
 */
import { useRef, useState } from 'react'
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion'
import { Pill, GoldLine, GoldButton } from '../components/UI'
import { staggerContainer, staggerItem, viewportTrigger } from '../utils/animations'
import { useCountUp } from '../hooks'
import { SUSTAINABILITY_STATS } from '../utils/constants'

/* ─── Progress Ring ───────────────────────────────────────────────── */
function ProgressRing({ value, suffix = '%', label, accentColor = '#C9963A', delay = 0 }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const count  = useCountUp(value, 2000, inView)

  const SIZE   = 140
  const STROKE = 8
  const RADIUS = (SIZE - STROKE) / 2
  const CIRC   = 2 * Math.PI * RADIUS

  // For values > 100 (e.g. 10000+), normalise ring fill to 100%
  const pct = Math.min(value, 100)

  return (
    <motion.div
      ref={ref}
      className="flex flex-col items-center text-center"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
    >
      <div className="relative" style={{ width: SIZE, height: SIZE }}>
        <svg width={SIZE} height={SIZE} style={{ transform: 'rotate(-90deg)' }}>
          {/* Track */}
          <circle
            cx={SIZE / 2} cy={SIZE / 2} r={RADIUS}
            fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={STROKE}
          />
          {/* Progress */}
          <motion.circle
            cx={SIZE / 2} cy={SIZE / 2} r={RADIUS}
            fill="none"
            stroke={accentColor}
            strokeWidth={STROKE}
            strokeLinecap="round"
            strokeDasharray={CIRC}
            initial={{ strokeDashoffset: CIRC }}
            animate={inView ? { strokeDashoffset: CIRC - (CIRC * pct) / 100 } : {}}
            transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1], delay: delay + 0.2 }}
            style={{ filter: `drop-shadow(0 0 8px ${accentColor}66)` }}
          />
        </svg>

        {/* Centre value */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="tabular-nums"
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: '1.7rem',
              fontWeight: 800,
              color: '#FAF7EE',
            }}
          >
            {count.toLocaleString()}{suffix}
          </span>
        </div>
      </div>

      <p
        className="mt-4 text-body-sm max-w-[16ch]"
        style={{ color: 'rgba(242,237,215,0.55)', lineHeight: 1.6 }}
      >
        {label}
      </p>
    </motion.div>
  )
}

/* ─── Sustainability Pillar Card ─────────────────────────────────── */
const PILLARS = [
  {
    icon: (
      <path d="M12 2C8 6 5 10 5 14a7 7 0 0014 0c0-4-3-8-7-12z" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinejoin="round"/>
    ),
    title: 'Water Stewardship',
    body: 'Every drop counts. We\u2019re investing in water replenishment programmes across Lagos and Ogun State communities.',
    accent: '#60A8D0',
  },
  {
    icon: (
      <>
        <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        <path d="M12 1v3M12 20v3M3.5 5.5l2 2M18.5 18.5l2 2M1 12h3M20 12h3M3.5 18.5l2-2M18.5 5.5l2-2"
          stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </>
    ),
    title: 'Renewable Energy',
    body: 'Our breweries are transitioning to solar and biomass power — cutting emissions while powering more.',
    accent: '#F5D98A',
  },
  {
    icon: (
      <path d="M3 21h18M5 21V10l7-6 7 6v11M9 21v-6h6v6" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    ),
    title: 'Community Impact',
    body: 'Through skills training and local sourcing, we empower thousands of Nigerian farmers and youth every year.',
    accent: '#88C888',
  },
  {
    icon: (
      <path d="M3 6h18M3 12h18M3 18h18M7 6v12M17 6v12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    ),
    title: 'Circular Packaging',
    body: 'Moving toward 100% recyclable, reusable, or compostable packaging across our entire product range.',
    accent: '#C9963A',
  },
]

function PillarCard({ pillar, index }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      className="card-dark p-6 flex flex-col gap-4"
      variants={staggerItem}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ y: -4 }}
    >
      <motion.div
        className="w-12 h-12 rounded-xl flex items-center justify-center"
        style={{
          background: `${pillar.accent}14`,
          border: `1px solid ${pillar.accent}33`,
        }}
        animate={{
          boxShadow: hovered ? `0 0 24px ${pillar.accent}33` : '0 0 0px transparent',
          scale: hovered ? 1.05 : 1,
        }}
        transition={{ duration: 0.3 }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" style={{ color: pillar.accent }}>
          {pillar.icon}
        </svg>
      </motion.div>

      <h4
        style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: '1.15rem',
          fontWeight: 700,
          color: '#FAF7EE',
        }}
      >
        {pillar.title}
      </h4>

      <p style={{ color: 'rgba(242,237,215,0.55)', fontSize: '0.9rem', lineHeight: 1.75 }}>
        {pillar.body}
      </p>
    </motion.div>
  )
}

/* ─── Magnetic Button ────────────────────────────────────────────── */
function MagneticButton({ children, href = '#' }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springX = useSpring(x, { stiffness: 150, damping: 15 })
  const springY = useSpring(y, { stiffness: 150, damping: 15 })

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    const relX = e.clientX - rect.left - rect.width / 2
    const relY = e.clientY - rect.top - rect.height / 2
    x.set(relX * 0.35)
    y.set(relY * 0.35)
  }

  const handleLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      className="btn-primary inline-flex"
      style={{ x: springX, y: springY }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
    >
      {children}
    </motion.a>
  )
}

/* ─── Job Cards (Careers) ────────────────────────────────────────── */
const JOBS = [
  { title: 'Brand Manager',         dept: 'Marketing',     location: 'Lagos',  type: 'Full-time' },
  { title: 'Supply Chain Analyst',  dept: 'Operations',    location: 'Benin',  type: 'Full-time' },
  { title: 'Graduate Trainee',      dept: 'Multiple',      location: 'Lagos',  type: 'Programme' },
  { title: 'Sustainability Lead',   dept: 'ESG',           location: 'Lagos',  type: 'Full-time' },
]

function JobCard({ job, index }) {
  return (
    <motion.div
      className="relative rounded-2xl p-6 overflow-hidden group cursor-pointer"
      variants={staggerItem}
      style={{
        background: 'rgba(255,255,255,0.025)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255,255,255,0.08)',
      }}
      whileHover={{
        borderColor: 'rgba(201,150,58,0.35)',
        background: 'rgba(255,255,255,0.04)',
        y: -4,
      }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Hover glow */}
      <motion.div
        className="absolute -top-12 -right-12 w-32 h-32 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(201,150,58,0.25), transparent 70%)' }}
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      />

      <div className="relative z-10 flex items-start justify-between gap-4">
        <div>
          <span
            className="text-label-xs uppercase tracking-widest mb-2 inline-block"
            style={{ color: '#C9963A', opacity: 0.8 }}
          >
            {job.dept}
          </span>
          <h4
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: '1.15rem',
              fontWeight: 700,
              color: '#FAF7EE',
              marginBottom: '0.5rem',
            }}
          >
            {job.title}
          </h4>
          <div className="flex items-center gap-3 text-body-xs" style={{ color: 'rgba(242,237,215,0.5)' }}>
            <span className="flex items-center gap-1.5">
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                <path d="M8 1C5 1 3 3 3 6c0 3.5 5 9 5 9s5-5.5 5-9c0-3-2-5-5-5z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
                <circle cx="8" cy="6" r="2" stroke="currentColor" strokeWidth="1.2"/>
              </svg>
              {job.location}
            </span>
            <span>·</span>
            <span>{job.type}</span>
          </div>
        </div>

        <motion.div
          className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ border: '1px solid rgba(201,150,58,0.3)' }}
          whileHover={{ rotate: 45, borderColor: 'rgba(245,217,138,0.6)' }}
          transition={{ duration: 0.3 }}
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="#E8B84B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.div>
      </div>
    </motion.div>
  )
}

/* ─── Culture Grid (Careers visual) ──────────────────────────────── */
function CultureGrid() {
  const tiles = [
    { label: 'Brewing Excellence', accent: '#C9963A', size: 'large' },
    { label: 'Team Spirit',        accent: '#88C888', size: 'small' },
    { label: 'Innovation Labs',    accent: '#60A8D0', size: 'small' },
    { label: 'Community First',    accent: '#F5D98A', size: 'medium' },
  ]

  return (
    <div className="grid grid-cols-2 grid-rows-2 gap-4 h-full min-h-[360px]">
      {tiles.map((tile, i) => (
        <motion.div
          key={tile.label}
          className={`relative rounded-2xl overflow-hidden flex items-end p-5 ${
            i === 0 ? 'row-span-2' : ''
          }`}
          style={{
            background: `linear-gradient(145deg, ${tile.accent}1A, #0A0A0A 75%)`,
            border: '1px solid rgba(255,255,255,0.06)',
          }}
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ scale: 1.02 }}
        >
          {/* Pattern */}
          <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.06 }} preserveAspectRatio="none">
            {Array.from({ length: 6 }).map((_, j) => (
              <circle key={j} cx={j * 50} cy={j * 60} r="60" stroke={tile.accent} strokeWidth="1" fill="none" />
            ))}
          </svg>

          {/* Glow */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{ background: `radial-gradient(circle at 30% 30%, ${tile.accent}22, transparent 60%)` }}
            whileHover={{ opacity: 1.4 }}
          />

          <span
            className="relative z-10 text-label-sm uppercase tracking-widest"
            style={{ color: '#FAF7EE' }}
          >
            {tile.label}
          </span>
        </motion.div>
      ))}
    </div>
  )
}

/* ─── Main Component ─────────────────────────────────────────────── */
export function SustainabilitySection() {
  const ringAccents = ['#60A8D0', '#F5D98A', '#88C888', '#C9963A']

  return (
      <section
        id="sustainability"
        className="relative w-full overflow-hidden py-[var(--section-py)]"
        style={{ background: 'linear-gradient(180deg, #0A0A0A 0%, #050505 100%)' }}
      >
        {/* Background accent */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 50% 50% at 20% 30%, rgba(136,200,136,0.05), transparent 70%)' }}
        />

        <div className="section-container">
          {/* Header */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportTrigger}
            variants={staggerContainer(0.1)}
            className="mb-16 max-w-2xl"
          >
            <motion.div variants={staggerItem} className="mb-4">
              <Pill>Sustainability</Pill>
            </motion.div>
            <motion.h2
              variants={staggerItem}
              style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: 'clamp(2.4rem, 5vw, 4.5rem)',
                fontWeight: 800,
                lineHeight: 0.98,
                letterSpacing: '-0.025em',
                color: '#FAF7EE',
                marginBottom: '1.25rem',
              }}
            >
              Brewing Good,{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #88C888, #F5D98A)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                For Nigeria.
              </span>
            </motion.h2>
            <motion.p
              variants={staggerItem}
              style={{ color: 'rgba(242,237,215,0.6)', fontSize: '1.05rem', lineHeight: 1.8 }}
            >
              Our ambition goes beyond business. By 2030, we're targeting bold water,
              energy, and community goals that will shape a more sustainable Nigeria
              for generations to come.
            </motion.p>
            <motion.div variants={staggerItem} className="mt-6">
              <GoldLine className="w-16" />
            </motion.div>
          </motion.div>

          {/* Progress Rings */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
            {SUSTAINABILITY_STATS.map((stat, i) => (
              <ProgressRing
                key={stat.label}
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
                accentColor={ringAccents[i]}
                delay={i * 0.1}
              />
            ))}
          </div>

          {/* Pillars */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer(0.1)}
          >
            {PILLARS.map((pillar, i) => (
              <PillarCard key={pillar.title} pillar={pillar} index={i} />
            ))}
          </motion.div>
        </div>

        {/* Bottom vignette */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, transparent, #050505)' }}
        />
      </section>
  )
}

/* ─── Careers Section (standalone export) ───────────────────────── */
export function CareersSection() {
  return (
      <section
        id="careers"
        className="relative w-full overflow-hidden py-[var(--section-py)]"
        style={{ background: 'linear-gradient(180deg, #050505 0%, #0A0A0A 50%, #080808 100%)' }}
      >
        {/* Background accent */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 60% 50% at 80% 30%, rgba(201,150,58,0.06), transparent 70%)' }}
        />

        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">
            {/* Left — text */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewportTrigger}
              variants={staggerContainer(0.1)}
            >
              <motion.div variants={staggerItem} className="mb-4">
                <Pill>Careers</Pill>
              </motion.div>
              <motion.h2
                variants={staggerItem}
                style={{
                  fontFamily: 'Playfair Display, serif',
                  fontSize: 'clamp(2.4rem, 5vw, 4.5rem)',
                  fontWeight: 800,
                  lineHeight: 0.98,
                  letterSpacing: '-0.025em',
                  color: '#FAF7EE',
                  marginBottom: '1.25rem',
                }}
              >
                Be Part of{' '}
                <span
                  style={{
                    background: 'linear-gradient(135deg, #8A6420, #C9963A, #F5D98A)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Something More.
                </span>
              </motion.h2>
              <motion.p
                variants={staggerItem}
                style={{ color: 'rgba(242,237,215,0.6)', fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '2rem' }}
              >
                Join 3,000+ talented people building Nigeria's most loved brands.
                We invest in our people — through training, mentorship, and a culture
                that celebrates ambition.
              </motion.p>
              <motion.div variants={staggerItem}>
                <MagneticButton href="/careers">
                  Explore Open Roles
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </MagneticButton>
              </motion.div>
            </motion.div>

            {/* Right — culture grid */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={viewportTrigger}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <CultureGrid />
            </motion.div>
          </div>

          {/* Job listings */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer(0.1)}
          >
            <motion.h3
              variants={staggerItem}
              className="mb-6 text-label-sm uppercase tracking-widest"
              style={{ color: 'rgba(242,237,215,0.5)' }}
            >
              Featured Openings
            </motion.h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {JOBS.map((job, i) => (
                <JobCard key={job.title} job={job} index={i} />
              ))}
            </div>
          </motion.div>
        </div>
      </section>
  )
}

/* ─── Combined (legacy default export) ───────────────────────────── */
export default function Sustainability() {
  return (
    <>
      <SustainabilitySection />
      <CareersSection />
    </>
  )
}
