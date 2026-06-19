/**
 * hooks/index.js
 * ─────────────────────────────────────────────────────────────────
 * Shared custom hooks used across all sections.
 */
import { useState, useEffect, useRef, useCallback } from 'react'

/* ─── useScrollPosition ──────────────────────────────────────────── */
/**
 * Returns the current scroll Y position.
 * Throttled to rAF for performance.
 */
export function useScrollPosition() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrollY(window.scrollY)
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return scrollY
}

/* ─── useMousePosition ───────────────────────────────────────────── */
/**
 * Tracks mouse position as { x, y } (normalised 0–1 if normalize=true).
 */
export function useMousePosition(normalize = false) {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (e) => {
      setPosition(
        normalize
          ? { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight }
          : { x: e.clientX, y: e.clientY }
      )
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [normalize])

  return position
}

/* ─── useReducedMotion ───────────────────────────────────────────── */
/**
 * Returns true if the user prefers reduced motion.
 */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const handler = (e) => setReduced(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return reduced
}

/* ─── useTilt ────────────────────────────────────────────────────── */
/**
 * 3D tilt effect based on mouse position within element.
 * Returns ref + style object.
 */
export function useTilt(maxTilt = 12) {
  const ref = useRef(null)
  const [style, setStyle] = useState({})

  const onMouseMove = useCallback((e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = (e.clientX - cx) / (rect.width / 2)
    const dy = (e.clientY - cy) / (rect.height / 2)
    setStyle({
      transform: `perspective(800px) rotateY(${dx * maxTilt}deg) rotateX(${-dy * maxTilt}deg) scale(1.03)`,
      transition: 'transform 0.1s ease-out',
    })
  }, [maxTilt])

  const onMouseLeave = useCallback(() => {
    setStyle({
      transform: 'perspective(800px) rotateY(0deg) rotateX(0deg) scale(1)',
      transition: 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
    })
  }, [])

  return { ref, style, onMouseMove, onMouseLeave }
}

/* ─── useCountUp ──────────────────────────────────────────────────── */
/**
 * Animates a number from 0 to `end` over `duration` ms.
 * Starts when `start` becomes true.
 */
export function useCountUp(end, duration = 2000, start = false) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!start) return
    let startTime = null
    const startVal = 0

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      // Ease out expo
      const ease = 1 - Math.pow(1 - progress, 4)
      setCount(Math.floor(startVal + (end - startVal) * ease))
      if (progress < 1) requestAnimationFrame(step)
    }

    requestAnimationFrame(step)
  }, [end, duration, start])

  return count
}

/* ─── useWindowSize ──────────────────────────────────────────────── */
export function useWindowSize() {
  const [size, setSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const update = () => setSize({ width: window.innerWidth, height: window.innerHeight })
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  return size
}
