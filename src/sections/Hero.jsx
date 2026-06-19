/**
 * sections/Hero.jsx
 * ─────────────────────────────────────────────────────────────────
 * Part 2 — Hero: Cinematic 3D Can + Scroll Storytelling
 *
 * Features:
 *  • CSS 3D animated Guinness can (no external 3D lib needed)
 *  • Liquid "pour" particle canvas behind the can
 *  • SplitText word-by-word headline reveal
 *  • Scroll-driven opacity fade on the whole hero
 *  • Animated scroll indicator
 *  • Floating badge elements around the can
 */
import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion'
import { SplitText, Pill, GoldLine } from '../components/UI'
import { useReducedMotion, useMousePosition } from '../hooks'

/* ─── Can colours ─────────────────────────────────────────────── */
const CAN_COLORS = {
  body:    '#0D0D0D',
  band1:   '#1A0800',
  band2:   '#C9963A',
  band3:   '#0A0A0A',
  top:     '#1A1A1A',
  rim:     '#C9963A',
  label:   '#FAF7EE',
  red:     '#C0392B',
}

/* ─── Liquid Pour Canvas ─────────────────────────────────────── */
function PourCanvas() {
  const canvasRef  = useRef(null)
  const reduced    = useReducedMotion()

  useEffect(() => {
    if (reduced) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let W = canvas.offsetWidth
    let H = canvas.offsetHeight
    canvas.width  = W
    canvas.height = H

    // Droplets
    const DROPS = Array.from({ length: 80 }, () => spawnDrop(W, H))

    function spawnDrop(w, h) {
      return {
        x:     w * 0.5 + (Math.random() - 0.5) * w * 0.35,
        y:     -Math.random() * h * 0.3,
        vy:    2 + Math.random() * 3.5,
        vx:    (Math.random() - 0.5) * 0.8,
        r:     Math.random() * 3 + 1,
        alpha: Math.random() * 0.55 + 0.15,
        hue:   Math.random() > 0.6 ? '#C9963A' : Math.random() > 0.5 ? '#F5D98A' : '#0A0A0A',
        trail: [],
      }
    }

    let animId
    const draw = () => {
      ctx.clearRect(0, 0, W, H)

      DROPS.forEach(d => {
        // trail
        d.trail.push({ x: d.x, y: d.y })
        if (d.trail.length > 8) d.trail.shift()

        d.trail.forEach((pt, i) => {
          const ta = (i / d.trail.length) * d.alpha * 0.5
          ctx.beginPath()
          ctx.arc(pt.x, pt.y, d.r * (i / d.trail.length), 0, Math.PI * 2)
          ctx.fillStyle = d.hue.startsWith('#')
            ? hexToRgba(d.hue, ta)
            : `rgba(201,150,58,${ta})`
          ctx.fill()
        })

        // main drop
        ctx.beginPath()
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2)
        ctx.fillStyle = d.hue.startsWith('#')
          ? hexToRgba(d.hue, d.alpha)
          : `rgba(201,150,58,${d.alpha})`
        ctx.fill()

        d.x  += d.vx
        d.y  += d.vy
        d.vy *= 1.01

        if (d.y > H + 20) {
          Object.assign(d, spawnDrop(W, H))
          d.trail = []
        }
      })
      animId = requestAnimationFrame(draw)
    }

    animId = requestAnimationFrame(draw)

    const onResize = () => {
      W = canvas.offsetWidth
      H = canvas.offsetHeight
      canvas.width  = W
      canvas.height = H
    }
    window.addEventListener('resize', onResize)
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', onResize) }
  }, [reduced])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.35 }}
    />
  )
}

function hexToRgba(hex, a) {
  const r = parseInt(hex.slice(1,3),16)
  const g = parseInt(hex.slice(3,5),16)
  const b = parseInt(hex.slice(5,7),16)
  return `rgba(${r},${g},${b},${a})`
}

/* ─── 3D CSS Can ──────────────────────────────────────────────── */
function GuinnessCan({ mouseX, mouseY }) {
  const reduced = useReducedMotion()

  const rotateY = useTransform(mouseX, [0, 1], [-18, 18])
  const rotateX = useTransform(mouseY, [0, 1], [10, -10])

  const springY = useSpring(rotateY, { stiffness: 80, damping: 22 })
  const springX = useSpring(rotateX, { stiffness: 80, damping: 22 })

  const CAN_W  = 130
  const CAN_H  = 260
  const RADIUS = 65

  const faces = 24
  const faceW = (2 * Math.PI * RADIUS) / faces

  return (
    <motion.div
      className="relative"
      style={{
        width: CAN_W,
        height: CAN_H,
        transformStyle: 'preserve-3d',
        perspective: 900,
      }}
      animate={reduced ? {} : { rotateY: [0, 8, 0, -8, 0] }}
      transition={reduced ? {} : { duration: 8, repeat: Infinity, ease: 'easeInOut' }}
    >
      <motion.div
        style={{
          width: CAN_W,
          height: CAN_H,
          transformStyle: 'preserve-3d',
          rotateY: reduced ? 0 : springY,
          rotateX: reduced ? 0 : springX,
        }}
      >
        {/* Can body — cylindrical faces */}
        {Array.from({ length: faces }).map((_, i) => {
          const angle  = (i / faces) * 360
          const rad    = (angle * Math.PI) / 180
          const tz     = RADIUS * Math.cos(rad)
          const tx     = RADIUS * Math.sin(rad)
          const isFont = Math.abs(angle) < 90 || angle > 270

          // Colour bands based on height
          let bg = CAN_COLORS.body
          if (i < faces * 0.08 || i > faces * 0.92) bg = CAN_COLORS.top
          else if (i > faces * 0.28 && i < faces * 0.38) bg = CAN_COLORS.band2
          else if (i > faces * 0.6  && i < faces * 0.68) bg = CAN_COLORS.band1

          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                width:  faceW + 1,
                height: CAN_H,
                top: 0,
                left: (CAN_W - faceW) / 2,
                background: bg,
                transform: `rotateY(${angle}deg) translateZ(${RADIUS}px)`,
                backfaceVisibility: 'hidden',
              }}
            />
          )
        })}

        {/* Gold band ring */}
        <div
          style={{
            position: 'absolute',
            width: CAN_W + 4,
            height: 18,
            top: '28%',
            left: -2,
            background: 'linear-gradient(180deg, #E8B84B, #C9963A, #8A6420)',
            borderRadius: 2,
            boxShadow: '0 0 20px rgba(201,150,58,0.5)',
            zIndex: 10,
          }}
        />

        {/* Label face — front only */}
        <div
          style={{
            position: 'absolute',
            width: CAN_W - 8,
            height: CAN_H * 0.55,
            top: '22%',
            left: 4,
            transform: `translateZ(${RADIUS + 1}px)`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 4,
            zIndex: 20,
          }}
        >
          {/* Harp icon — simplified Guinness harp silhouette */}
          <svg width="26" height="38" viewBox="0 0 26 38" fill="none">
            {/* Frame */}
            <path
              d="M5 35 C4 24 4 12 9 4 C12 -0.5 18 1 19 6 C20 11 16 16 11 18"
              stroke="#C9963A" strokeWidth="1.4" fill="none" strokeLinecap="round"
            />
            {/* Soundboard edge */}
            <path d="M5 35 Q11 38 17 35" stroke="#C9963A" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
            {/* Strings */}
            {[0,1,2,3,4,5].map(i => (
              <line
                key={i}
                x1={6 + i * 0.6}
                y1={6 + i * 5.2}
                x2={16 - i * 1.6}
                y2={5 + i * 5.4}
                stroke="#C9963A" strokeWidth="0.6" opacity="0.55"
              />
            ))}
          </svg>
          {/* Guinness wordmark */}
          <div style={{
            color: '#FAF7EE',
            fontSize: 11,
            fontFamily: 'Playfair Display, Georgia, serif',
            fontWeight: 700,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
          }}>GUINNESS</div>
          {/* Red stripe */}
          <div style={{
            width: '70%', height: 3,
            background: '#C0392B',
            borderRadius: 1, margin: '2px 0',
          }}/>
          <div style={{
            color: '#C9963A',
            fontSize: 7,
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 600,
          }}>EXTRA STOUT</div>
        </div>

        {/* Can top disc */}
        <div
          style={{
            position: 'absolute',
            width: CAN_W,
            height: CAN_W,
            top: -CAN_W / 2 + 8,
            left: 0,
            borderRadius: '50%',
            background: 'radial-gradient(circle at 40% 40%, #3A3A3A, #0A0A0A)',
            transform: 'rotateX(90deg)',
            transformOrigin: 'center bottom',
            boxShadow: 'inset 0 -6px 20px rgba(0,0,0,0.8)',
            border: '2px solid #C9963A',
          }}
        />

        {/* Can bottom disc */}
        <div
          style={{
            position: 'absolute',
            width: CAN_W,
            height: CAN_W,
            bottom: -CAN_W / 2 + 8,
            left: 0,
            borderRadius: '50%',
            background: 'radial-gradient(circle at 50% 50%, #222, #0A0A0A)',
            transform: 'rotateX(-90deg)',
            transformOrigin: 'center top',
          }}
        />

        {/* Ring pull tab */}
        <div style={{
          position: 'absolute',
          width: 22,
          height: 16,
          top: 6,
          left: '50%',
          transform: 'translateX(-50%) translateZ(62px)',
          border: '2px solid #C9963A',
          borderRadius: 10,
          background: 'transparent',
          zIndex: 30,
        }}/>
      </motion.div>
    </motion.div>
  )
}

/* ─── Floating Badges ─────────────────────────────────────────── */
function FloatingBadge({ children, style, delay = 0 }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={style}
      initial={{ opacity: 0, scale: 0.7, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4 + Math.random() * 2, repeat: Infinity, ease: 'easeInOut' }}
        className="backdrop-blur-sm rounded-2xl px-4 py-2 text-xs font-semibold tracking-widest uppercase"
        style={{
          background: 'rgba(10,10,10,0.7)',
          border: '1px solid rgba(201,150,58,0.3)',
          color: '#E8B84B',
          boxShadow: '0 0 20px rgba(201,150,58,0.15)',
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}

/* ─── Scroll Indicator ────────────────────────────────────────── */
function ScrollIndicator() {
  return (
    <motion.div
      className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2.8, duration: 1 }}
    >
      <span className="text-g-muted text-label-xs tracking-[0.25em] uppercase">Scroll</span>
      <motion.div
        className="w-px h-12 origin-top"
        style={{ background: 'linear-gradient(180deg, rgba(201,150,58,0.8), transparent)' }}
        animate={{ scaleY: [0, 1, 0], originY: 0 }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
      />
    </motion.div>
  )
}

/* ─── Video Sound Toggle ──────────────────────────────────────── */
function VideoSoundToggle() {
  const [muted, setMuted] = useState(true)

  const toggle = () => {
    const video = document.querySelector('#hero video')
    if (video) {
      video.muted = !video.muted
      setMuted(video.muted)
    }
  }

  return (
    <motion.button
      onClick={toggle}
      data-cursor-hover
      aria-label={muted ? 'Unmute background video' : 'Mute background video'}
      className="absolute bottom-10 right-6 md:right-10 z-20 w-11 h-11 rounded-full flex items-center justify-center"
      style={{
        border: '1px solid rgba(201,150,58,0.35)',
        background: 'rgba(5,5,5,0.4)',
        backdropFilter: 'blur(8px)',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2.4, duration: 0.8 }}
      whileHover={{ scale: 1.08, borderColor: 'rgba(245,217,138,0.6)' }}
      whileTap={{ scale: 0.95 }}
    >
      {muted ? (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M11 5L6 9H2v6h4l5 4V5z" stroke="#E8B84B" strokeWidth="1.5" strokeLinejoin="round" fill="none"/>
          <path d="M16 9l5 6M21 9l-5 6" stroke="#E8B84B" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      ) : (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M11 5L6 9H2v6h4l5 4V5z" stroke="#E8B84B" strokeWidth="1.5" strokeLinejoin="round" fill="none"/>
          <path d="M15.5 8.5a5 5 0 010 7M18 6a8 8 0 010 12" stroke="#E8B84B" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
        </svg>
      )}
    </motion.button>
  )
}

/* ─── Hero Section ────────────────────────────────────────────── */
export default function Hero() {
  const sectionRef  = useRef(null)
  const reduced     = useReducedMotion()
  const mouse       = useMousePosition(true)   // normalised 0–1

  const mouseX = useSpring(mouse.x, { stiffness: 60, damping: 20 })
  const mouseY = useSpring(mouse.y, { stiffness: 60, damping: 20 })

  // Scroll-driven fade-out
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  const opacity  = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const yShift   = useTransform(scrollYProgress, [0, 1], ['0%', '-15%'])
  const canScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.85])

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: 'var(--g-void)' }}
    >
      {/* ── Video background ──────────────────────────────── */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: 'brightness(0.55) saturate(1.15)' }}
        >
          <source src="/videos/hero-bg.mp4" type="video/mp4" />
        </video>

        {/* Dark gradient overlay for text legibility */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(90deg, rgba(5,5,5,0.92) 0%, rgba(5,5,5,0.65) 45%, rgba(5,5,5,0.35) 75%, rgba(5,5,5,0.55) 100%),
              linear-gradient(180deg, rgba(5,5,5,0.4) 0%, transparent 25%, transparent 70%, rgba(5,5,5,0.9) 100%)
            `,
          }}
        />

        {/* Gold tint wash to keep brand palette consistent */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 70% 60% at 75% 50%, rgba(201,150,58,0.10) 0%, transparent 65%)',
            mixBlendMode: 'overlay',
          }}
        />
      </div>

      {/* ── Deep radial glow behind can ──────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 55% 50% at 50% 55%,
              rgba(201,150,58,0.08) 0%,
              rgba(201,150,58,0.03) 40%,
              transparent 70%)
          `,
        }}
      />

      {/* ── Liquid pour canvas ─────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <PourCanvas />
      </div>

      {/* ── Horizontal gold lines (cinema bars) ────────────── */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(201,150,58,0.4), transparent)' }}
        initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
        transition={{ duration: 1.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(201,150,58,0.4), transparent)' }}
        initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
        transition={{ duration: 1.5, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* ── Main content ───────────────────────────────────── */}
      <motion.div
        className="relative z-10 w-full max-w-[1440px] mx-auto px-[var(--section-px)]"
        style={{ opacity, y: yShift }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-12 lg:gap-8 items-center min-h-screen py-24">

          {/* LEFT — Text block */}
          <div className="flex flex-col justify-center">
            {/* Overline pill */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="mb-6"
            >
              <Pill>Since 1962 · Lagos, Nigeria</Pill>
            </motion.div>

            {/* Main headline */}
            <h1
              className="font-display mb-6"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              <div className="overflow-hidden mb-1">
                <motion.span
                  className="block text-g-creamHi"
                  style={{ fontSize: 'clamp(3.2rem, 7vw, 7rem)', lineHeight: 0.92, letterSpacing: '-0.03em', fontWeight: 800 }}
                  initial={{ y: '110%' }}
                  animate={{ y: '0%' }}
                  transition={{ delay: 0.7, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                >
                  Made
                </motion.span>
              </div>
              <div className="overflow-hidden mb-1">
                <motion.span
                  className="block"
                  style={{
                    fontSize: 'clamp(3.2rem, 7vw, 7rem)',
                    lineHeight: 0.92,
                    letterSpacing: '-0.03em',
                    fontWeight: 800,
                    background: 'linear-gradient(135deg, #8A6420 0%, #C9963A 35%, #E8B84B 55%, #F5D98A 80%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                  initial={{ y: '110%' }}
                  animate={{ y: '0%' }}
                  transition={{ delay: 0.88, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                >
                  of More.
                </motion.span>
              </div>
            </h1>

            {/* Subheadline */}
            <motion.p
              className="text-g-cream mb-10 max-w-md"
              style={{ fontSize: 'clamp(1rem, 1.4vw, 1.2rem)', lineHeight: 1.75, opacity: 0.75 }}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 0.75, y: 0 }}
              transition={{ delay: 1.3, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              Nigeria's most iconic stout — dark, rich, unmistakable.
              Brewed with passion in the heart of Lagos since 1962.
              Pour the world's most famous stout.
            </motion.p>

            {/* CTA row */}
            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.55, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.a
                href="#products"
                className="btn-primary"
                whileHover={{ y: -3, boxShadow: '0 0 30px rgba(201,150,58,0.5)' }}
                whileTap={{ scale: 0.97 }}
              >
                Explore Products
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.a>
              <motion.a
                href="#story"
                className="btn-ghost"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.97 }}
              >
                Our Story
              </motion.a>
            </motion.div>

            {/* Gold divider + stat row */}
            <motion.div
              className="mt-14 pt-8 border-t"
              style={{ borderColor: 'rgba(201,150,58,0.15)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.9, duration: 0.8 }}
            >
              <div className="flex gap-10">
                {[
                  { val: '60+', label: 'Years of brewing' },
                  { val: '5',   label: 'Iconic brands' },
                  { val: '#1',  label: 'Stout in Nigeria' },
                ].map(({ val, label }) => (
                  <div key={label}>
                    <div
                      style={{
                        fontSize: 'clamp(1.4rem, 2.5vw, 2rem)',
                        fontFamily: 'Playfair Display, serif',
                        fontWeight: 700,
                        background: 'linear-gradient(135deg, #C9963A, #F5D98A)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                      }}
                    >{val}</div>
                    <div className="text-g-muted text-body-xs mt-0.5">{label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* RIGHT — Minimal: Malta Guinness can as accent over video */}
          <div className="relative hidden lg:flex items-end justify-center min-h-[520px] pb-8">

            {/* Malta Guinness can — single, large, centred, beautifully lit */}
            <motion.div
              className="relative flex flex-col items-center"
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 1.0, duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Ambient glow behind can */}
              <motion.div
                className="absolute pointer-events-none"
                style={{
                  width: 280, height: 280,
                  background: 'radial-gradient(circle, rgba(212,160,32,0.30) 0%, rgba(201,150,58,0.12) 40%, transparent 70%)',
                  filter: 'blur(32px)',
                  top: '50%', left: '50%',
                  transform: 'translate(-50%, -40%)',
                  zIndex: 0,
                }}
                animate={{ scale: [1, 1.12, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              />

              {/* The can — floating animation */}
              <motion.div
                className="relative z-10"
                animate={{ y: [0, -18, 0] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <img
                  src="/images/products/malta-can.png"
                  alt="Malta Guinness"
                  style={{
                    height: 340,
                    width: 'auto',
                    filter: 'drop-shadow(0 24px 56px rgba(212,160,32,0.55)) drop-shadow(0 8px 20px rgba(0,0,0,0.5))',
                  }}
                />
              </motion.div>

              {/* Ground glow disc */}
              <motion.div
                className="relative z-0 pointer-events-none"
                style={{
                  width: 160, height: 24,
                  background: 'radial-gradient(ellipse, rgba(212,160,32,0.45), transparent 70%)',
                  filter: 'blur(10px)',
                  marginTop: -12,
                }}
                animate={{ scaleX: [1, 1.15, 1], opacity: [0.5, 0.9, 0.5] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
              />

              {/* Malta badge label */}
              <motion.div
                className="mt-5 px-4 py-2 rounded-full text-center"
                style={{
                  background: 'rgba(212,160,32,0.12)',
                  border: '1px solid rgba(212,160,32,0.35)',
                  backdropFilter: 'blur(8px)',
                }}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.0, duration: 0.8 }}
              >
                <span
                  className="text-label-xs uppercase tracking-widest"
                  style={{ color: '#D4A020' }}
                >
                  Malta Guinness · Non-Alcoholic
                </span>
              </motion.div>
            </motion.div>

            {/* Vertical label */}
            <motion.div
              className="absolute right-0 top-1/2 -translate-y-1/2"
              style={{
                writingMode: 'vertical-rl',
                fontSize: '0.6rem',
                letterSpacing: '0.3em',
                color: 'rgba(201,150,58,0.3)',
                fontWeight: 600,
                textTransform: 'uppercase',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.8 }}
            >
              GUINNESS NIGERIA PLC
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* ── Mute / unmute video toggle ─────────────────────── */}
      <VideoSoundToggle />

      {/* ── Scroll indicator ───────────────────────────────── */}
      <ScrollIndicator />

      {/* ── Bottom vignette into next section ──────────────── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, #050505)' }}
      />
    </section>
  )
}
