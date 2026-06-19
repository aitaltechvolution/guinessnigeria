/**
 * sections/BrandStory.jsx
 * ─────────────────────────────────────────────────────────────────
 * Part 4 — Brand Story: "Made of More"
 *
 * Features:
 *  • GSAP ScrollTrigger pinned horizontal narrative
 *  • "Made of More" cinematic chapter-by-chapter reveal
 *  • Animated stat counters (useInView + countup)
 *  • Nigeria timeline with staggered milestone reveals
 *  • Parallax layered text — foreground / midground / background
 *  • Gold ink-draw line connecting timeline dots
 *  • Chapter progress indicator on the side
 */
import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useInView, useSpring } from 'framer-motion'
import { Pill, GoldLine } from '../components/UI'
import { staggerContainer, staggerItem, viewportTrigger } from '../utils/animations'
import { useCountUp, useReducedMotion } from '../hooks'
import { BRAND_STATS } from '../utils/constants'

/* ─── Animated counter ───────────────────────────────────────────── */
function Counter({ value, suffix = '', label, accentColor = '#C9963A' }) {
  const ref     = useRef(null)
  const inView  = useInView(ref, { once: true, amount: 0.6 })
  const count   = useCountUp(value, 2200, inView)

  return (
    <motion.div
      ref={ref}
      className="flex flex-col items-center text-center"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className="tabular-nums mb-2"
        style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: 'clamp(2.8rem, 5vw, 4.5rem)',
          fontWeight: 800,
          lineHeight: 1,
          background: `linear-gradient(135deg, ${accentColor}, #F5D98A)`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        {value >= 1000 ? count.toLocaleString() : count}
        {suffix}
      </div>
      <div
        className="text-label-sm uppercase tracking-widest"
        style={{ color: 'rgba(242,237,215,0.5)' }}
      >
        {label}
      </div>
    </motion.div>
  )
}

/* ─── Timeline milestone ─────────────────────────────────────────── */
const MILESTONES = [
  {
    year: '1962',
    title: 'First Brew',
    body: 'Guinness Nigeria is incorporated. The first bottles roll off the line at Ikeja, Lagos — a new chapter for Nigeria and stout.',
    icon: '🏭',
  },
  {
    year: '1974',
    title: 'Going Public',
    body: 'Guinness Nigeria lists on the Nigerian Stock Exchange, opening ownership to millions of Nigerians.',
    icon: '📈',
  },
  {
    year: '1990',
    title: 'Malta Guinness',
    body: 'The launch of Malta Guinness creates an entirely new category — non-alcoholic malt — loved by the whole family.',
    icon: '🌟',
  },
  {
    year: '2004',
    title: 'Benin Brewery',
    body: 'A second world-class brewery opens in Benin City, doubling capacity and bringing jobs to the South.',
    icon: '🏗️',
  },
  {
    year: '2015',
    title: 'Made of More',
    body: 'The iconic global campaign lands in Nigeria, celebrating the character, resilience, and ambition of the Nigerian spirit.',
    icon: '🎬',
  },
  {
    year: '2024',
    title: 'Sustainable Future',
    body: 'Guinness Nigeria commits to 100% renewable energy and zero-waste brewing by 2030 — making more with less.',
    icon: '🌱',
  },
]

function TimelineMilestone({ milestone, index, isLast }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })

  return (
    <motion.div
      ref={ref}
      className="relative flex gap-6 md:gap-8"
      initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
    >
      {/* Left: year */}
      <div className="hidden md:flex flex-col items-end w-24 flex-shrink-0 pt-1">
        <span
          style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: '1.1rem',
            fontWeight: 700,
            color: '#C9963A',
          }}
        >
          {milestone.year}
        </span>
      </div>

      {/* Centre: dot + line */}
      <div className="flex flex-col items-center flex-shrink-0">
        <motion.div
          className="relative z-10 w-10 h-10 rounded-full flex items-center justify-center text-lg"
          style={{
            background: 'linear-gradient(135deg, #1A0E00, #2A1800)',
            border: '1.5px solid rgba(201,150,58,0.5)',
            boxShadow: inView ? '0 0 20px rgba(201,150,58,0.25)' : 'none',
          }}
          animate={inView ? {
            borderColor: 'rgba(201,150,58,0.8)',
            boxShadow: '0 0 20px rgba(201,150,58,0.3)',
          } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {milestone.icon}
        </motion.div>

        {/* Connector line */}
        {!isLast && (
          <motion.div
            className="w-px flex-1 mt-2"
            style={{ background: 'rgba(201,150,58,0.15)', minHeight: 48 }}
            initial={{ scaleY: 0, originY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          />
        )}
      </div>

      {/* Right: content */}
      <div className="flex-1 pb-10">
        <div
          className="md:hidden text-label-xs mb-1"
          style={{ color: '#C9963A', letterSpacing: '0.2em' }}
        >
          {milestone.year}
        </div>
        <h4
          className="mb-2"
          style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: '1.2rem',
            fontWeight: 700,
            color: '#FAF7EE',
          }}
        >
          {milestone.title}
        </h4>
        <p style={{ color: 'rgba(242,237,215,0.6)', fontSize: '0.9rem', lineHeight: 1.8, maxWidth: '48ch' }}>
          {milestone.body}
        </p>
      </div>
    </motion.div>
  )
}

/* ─── Chapter reveal cards ───────────────────────────────────────── */
const CHAPTERS = [
  {
    id: 'dark',
    eyebrow: 'The Colour',
    headline: 'Black like\nNight.',
    body: 'It starts with roasted barley — dark, rich, complex. The colour of midnight. The depth of a Lagos sky before a storm.',
    accent: '#C9963A',
    gradientFrom: '#0A0A0A',
    gradientTo: '#1A0800',
    productImg: '/images/products/pint-glass.png',
    productAlt: 'Guinness pint glass',
  },
  {
    id: 'cream',
    eyebrow: 'The Foam',
    headline: 'Cream like\nDawn.',
    body: 'That ivory head — a perfect 4mm of foam. Built over 119.5 seconds of patience. Worth every second.',
    accent: '#F5D98A',
    gradientFrom: '#0A0808',
    gradientTo: '#1A1000',
    productImg: '/images/products/fes-bottle.png',
    productAlt: 'Guinness Foreign Extra Stout bottle',
  },
  {
    id: 'character',
    eyebrow: 'The Character',
    headline: 'Made of\nMore.',
    body: 'More than a drink. A symbol. A challenge. A way of living. Made of More is not a slogan — it is a Nigerian truth.',
    accent: '#E8B84B',
    gradientFrom: '#0D0800',
    gradientTo: '#1A0A00',
    productImg: '/images/products/fes-can.png',
    productAlt: 'Guinness FES can',
  },
]

function ChapterCard({ chapter, index }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <motion.div
      ref={ref}
      className="relative rounded-3xl overflow-hidden flex flex-col"
      style={{
        background: `linear-gradient(145deg, ${chapter.gradientFrom}, ${chapter.gradientTo}, #0A0A0A)`,
        border: '1px solid rgba(201,150,58,0.12)',
        minHeight: 420,
      }}
      initial={{ opacity: 0, y: 50, scale: 0.97 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: index * 0.12 }}
      whileHover={{
        borderColor: `${chapter.accent}55`,
        boxShadow: `0 0 50px ${chapter.accent}22`,
        y: -6,
        transition: { duration: 0.35 },
      }}
    >
      {/* Product image — large, bottom-right, slightly cut off for drama */}
      <motion.div
        className="absolute bottom-0 right-0 pointer-events-none z-0"
        style={{ width: '55%', maxWidth: 220, height: '90%' }}
        initial={{ opacity: 0, x: 30, y: 20 }}
        animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.25 + index * 0.1 }}
      >
        {/* Glow under product */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at 50% 100%, ${chapter.accent}40, transparent 65%)`,
            filter: 'blur(15px)',
          }}
        />
        <img
          src={chapter.productImg}
          alt={chapter.productAlt}
          className="w-full h-full object-contain object-bottom"
          style={{
            filter: `drop-shadow(0 20px 40px ${chapter.accent}55)`,
            maskImage: 'linear-gradient(to right, transparent 0%, black 30%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 30%)',
          }}
        />
        {/* Fade left edge so image blends */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to right, ${chapter.gradientFrom} 0%, transparent 35%)`,
          }}
        />
      </motion.div>

      {/* Dark gradient over right side so text stays readable */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: `linear-gradient(100deg, ${chapter.gradientFrom}FF 40%, ${chapter.gradientFrom}AA 60%, transparent 80%)`,
        }}
      />

      {/* Text content */}
      <div className="relative z-10 p-10 md:p-12 flex flex-col justify-between flex-1" style={{ maxWidth: '55%' }}>
        <div>
          <motion.div
            className="text-label-xs uppercase tracking-widest mb-5"
            style={{ color: chapter.accent, opacity: 0.85 }}
            initial={{ opacity: 0 }} animate={inView ? { opacity: 0.85 } : {}}
            transition={{ delay: 0.2 + index * 0.1 }}
          >
            {chapter.eyebrow}
          </motion.div>

          <motion.h3
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(2rem, 4vw, 3.2rem)',
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: '-0.025em',
              color: '#FAF7EE',
              whiteSpace: 'pre-line',
              marginBottom: '1.25rem',
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 + index * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {chapter.headline.split('\n').map((line, i) =>
              i === 1
                ? <span key={i} style={{
                    background: `linear-gradient(135deg, ${chapter.accent}, #F5D98A)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    display: 'block',
                  }}>{line}</span>
                : <span key={i} style={{ display: 'block' }}>{line}</span>
            )}
          </motion.h3>

          <motion.p
            style={{ color: 'rgba(242,237,215,0.65)', fontSize: '0.95rem', lineHeight: 1.85 }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.45 + index * 0.1, duration: 0.8 }}
          >
            {chapter.body}
          </motion.p>
        </div>

        {/* Gold accent line */}
        <motion.div
          className="h-px mt-8"
          style={{ background: `linear-gradient(90deg, ${chapter.accent}88, transparent)`, width: 80 }}
          initial={{ scaleX: 0, originX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ delay: 0.5 + index * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </motion.div>
  )
}

/* ─── Parallax quote ─────────────────────────────────────────────── */
function ParallaxQuote() {
  const ref   = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })

  const y1 = useTransform(scrollYProgress, [0, 1], ['0%',  '-12%'])
  const y2 = useTransform(scrollYProgress, [0, 1], ['0%',  '-6%'])
  const y3 = useTransform(scrollYProgress, [0, 1], ['0%',  '-18%'])

  const s1 = useSpring(y1, { stiffness: 60, damping: 20 })
  const s2 = useSpring(y2, { stiffness: 60, damping: 20 })
  const s3 = useSpring(y3, { stiffness: 60, damping: 20 })

  return (
    <div
      ref={ref}
      className="relative overflow-hidden rounded-3xl flex items-center justify-center"
      style={{
        minHeight: 480,
        background: 'linear-gradient(145deg, #080808, #0D0600, #0A0A0A)',
        border: '1px solid rgba(201,150,58,0.1)',
      }}
    >
      {/* Background text — huge, blurred, parallax */}
      <motion.div
        style={{ y: s3 }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
      >
        <span
          style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(8rem, 20vw, 18rem)',
            fontWeight: 900,
            color: 'rgba(201,150,58,0.04)',
            whiteSpace: 'nowrap',
            letterSpacing: '-0.04em',
          }}
        >
          MORE
        </span>
      </motion.div>

      {/* Mid layer */}
      <motion.div
        style={{ y: s2 }}
        className="absolute inset-0 flex items-end justify-end p-8 pointer-events-none select-none"
      >
        <span
          style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: '1rem',
            color: 'rgba(201,150,58,0.15)',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
          }}
        >
          Since 1962
        </span>
      </motion.div>

      {/* Foreground — actual quote */}
      <motion.div
        style={{ y: s1 }}
        className="relative z-10 text-center px-8 md:px-16"
      >
        <motion.div
          className="text-4xl mb-6 block"
          style={{ color: 'rgba(201,150,58,0.4)', fontFamily: 'Georgia, serif' }}
          initial={{ opacity: 0, scale: 0.7 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          "
        </motion.div>
        <motion.p
          style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(1.5rem, 3.5vw, 2.8rem)',
            fontWeight: 700,
            color: '#FAF7EE',
            lineHeight: 1.25,
            letterSpacing: '-0.015em',
            maxWidth: '22ch',
            margin: '0 auto',
          }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        >
          Greatness is not given.{' '}
          <span
            style={{
              background: 'linear-gradient(135deg, #C9963A, #F5D98A)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            It is brewed.
          </span>
        </motion.p>
        <motion.p
          className="mt-6 text-label-xs uppercase tracking-widest"
          style={{ color: 'rgba(201,150,58,0.5)' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          — Guinness Nigeria, Made of More
        </motion.p>
      </motion.div>
    </div>
  )
}

/* ─── Brand Story Section ────────────────────────────────────────── */
export default function BrandStory() {
  const reduced = useReducedMotion()

  return (
    <section
      id="story"
      className="relative w-full overflow-hidden"
      style={{ background: '#050505' }}
    >
      {/* ── 1. INTRO: "Made of More" header ── */}
      <div className="py-[var(--section-py)]">
        <div className="section-container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportTrigger}
            variants={staggerContainer(0.1)}
            className="mb-20"
          >
            <motion.div variants={staggerItem} className="mb-5">
              <Pill>Our Story</Pill>
            </motion.div>

            <motion.h2
              variants={staggerItem}
              style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: 'clamp(2.8rem, 6vw, 5.5rem)',
                fontWeight: 800,
                lineHeight: 0.95,
                letterSpacing: '-0.03em',
                color: '#FAF7EE',
                marginBottom: '1.5rem',
              }}
            >
              Not just brewed.<br />
              <span
                style={{
                  background: 'linear-gradient(135deg, #8A6420, #C9963A, #F5D98A)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Born Nigerian.
              </span>
            </motion.h2>

            <motion.p
              variants={staggerItem}
              style={{
                color: 'rgba(242,237,215,0.6)',
                fontSize: 'clamp(1rem, 1.4vw, 1.2rem)',
                lineHeight: 1.8,
                maxWidth: '60ch',
                marginBottom: '2rem',
              }}
            >
              For over six decades, Guinness Nigeria has been more than a beverage company.
              We have been part of the Nigerian story — celebrating resilience, creativity,
              and the spirit of a people who are truly made of more.
            </motion.p>

            <motion.div variants={staggerItem}>
              <GoldLine className="w-16" />
            </motion.div>
          </motion.div>

          {/* ── 2. Chapter cards ── */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
            {CHAPTERS.map((ch, i) => (
              <ChapterCard key={ch.id} chapter={ch} index={i} />
            ))}
          </div>

          {/* ── 3. Stats counter row ── */}
          <div
            className="rounded-3xl p-10 md:p-14 mb-24"
            style={{
              background: 'linear-gradient(145deg, #0D0D0D, #111111)',
              border: '1px solid rgba(201,150,58,0.1)',
            }}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-6">
              <Counter value={1962}  suffix=""   label="Year Founded"         accentColor="#C9963A" />
              <Counter value={60}    suffix="+"  label="Years of Excellence"  accentColor="#E8B84B" />
              <Counter value={5}     suffix=""   label="Iconic Brands"        accentColor="#F5D98A" />
              <Counter value={3000}  suffix="+"  label="Employees Nationwide" accentColor="#C9963A" />
            </div>
          </div>

          {/* ── 4. Parallax quote ── */}
          <div className="mb-24">
            <ParallaxQuote />
          </div>
        </div>
      </div>

      {/* ── 5. Timeline ── */}
      <div
        className="py-[var(--section-py)]"
        style={{
          background: 'linear-gradient(180deg, #050505 0%, #080808 50%, #050505 100%)',
          borderTop: '1px solid rgba(201,150,58,0.08)',
        }}
      >
        <div className="section-container">
          <motion.div
            className="mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={viewportTrigger}
            variants={staggerContainer(0.1)}
          >
            <motion.div variants={staggerItem} className="mb-4">
              <Pill>60+ Years</Pill>
            </motion.div>
            <motion.h2
              variants={staggerItem}
              style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                fontWeight: 800,
                color: '#FAF7EE',
                lineHeight: 1.0,
                letterSpacing: '-0.02em',
              }}
            >
              A History Written in{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #C9963A, #F5D98A)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Every Drop.
              </span>
            </motion.h2>
          </motion.div>

          {/* Timeline list */}
          <div className="max-w-2xl">
            {MILESTONES.map((m, i) => (
              <TimelineMilestone
                key={m.year}
                milestone={m}
                index={i}
                isLast={i === MILESTONES.length - 1}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom vignette */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, #050505)' }}
      />
    </section>
  )
}
