/**
 * animations.js
 * ─────────────────────────────────────────────────────────────────
 * Shared Framer Motion variants + GSAP helpers for Guinness Nigeria.
 * Import from any section component.
 */

/* ─── FRAMER MOTION VARIANTS ──────────────────────────────────────── */

/** Standard fade-up entrance — use on most text/content blocks */
export const fadeUp = {
  hidden:  { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
}

/** Dramatic pour-in from bottom — hero headlines */
export const pourIn = {
  hidden:  { opacity: 0, y: 80, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
  },
}

/** Fade in place — no translation */
export const fadeIn = {
  hidden:  { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}

/** Slide in from left */
export const slideLeft = {
  hidden:  { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
}

/** Slide in from right */
export const slideRight = {
  hidden:  { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
}

/** Scale pop — product cards, images */
export const scalePop = {
  hidden:  { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
}

/** Stagger container — wraps a list of staggered children */
export const staggerContainer = (staggerChildren = 0.12, delayChildren = 0) => ({
  hidden:  {},
  visible: {
    transition: { staggerChildren, delayChildren },
  },
})

/** Stagger item — the child variant */
export const staggerItem = {
  hidden:  { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
}

/** Character-by-character text reveal */
export const charReveal = {
  hidden:  { opacity: 0, y: '100%' },
  visible: {
    opacity: 1,
    y: '0%',
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
}

/** Gold line draw (width from 0 → 100%) */
export const lineGrow = {
  hidden:  { scaleX: 0, originX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 1.0, ease: [0.22, 1, 0.36, 1], delay: 0.3 },
  },
}

/** 3D card tilt — product cards hover state */
export const cardTilt = {
  rest:  { rotateX: 0, rotateY: 0, scale: 1 },
  hover: { scale: 1.04, transition: { duration: 0.3, ease: 'easeOut' } },
}

/** Parallax viewport variant factory */
export const parallaxFadeUp = (yOffset = 40) => ({
  hidden:  { opacity: 0, y: yOffset },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
})

/* ─── TRANSITION PRESETS ──────────────────────────────────────────── */

export const transitions = {
  spring:  { type: 'spring', stiffness: 300, damping: 28 },
  smooth:  { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  slow:    { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
  fast:    { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
  expo:    { duration: 0.8, ease: [0.19, 1, 0.22, 1] },
}

/* ─── VIEWPORT TRIGGER DEFAULTS ──────────────────────────────────── */

/** Standard viewport trigger — triggers once when 15% visible */
export const viewportTrigger = {
  once: true,
  amount: 0.15,
}

/** Eager trigger — starts when element just enters viewport */
export const viewportEager = {
  once: true,
  amount: 0.05,
}

/* ─── GSAP HELPER FACTORIES ───────────────────────────────────────── */

/**
 * Creates a GSAP ScrollTrigger config for a pinned section.
 * @param {string} trigger — CSS selector for the trigger element
 * @param {number} scrubSpeed — scrub speed (1 = synced, 2 = lagged)
 */
export const pinnedScrollConfig = (trigger, scrubSpeed = 1) => ({
  trigger,
  start: 'top top',
  end: '+=200%',
  pin: true,
  scrub: scrubSpeed,
  anticipatePin: 1,
})

/**
 * GSAP fade-up config factory
 */
export const gsapFadeUp = (delay = 0) => ({
  opacity: 0,
  y: 60,
  duration: 1,
  delay,
  ease: 'expo.out',
})

/**
 * GSAP stagger config
 */
export const gsapStagger = (stagger = 0.1, delay = 0) => ({
  opacity: 0,
  y: 40,
  duration: 0.8,
  stagger,
  delay,
  ease: 'expo.out',
})
