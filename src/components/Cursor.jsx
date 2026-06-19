/**
 * components/Cursor.jsx
 * ─────────────────────────────────────────────────────────────────
 * Custom gold magnetic cursor that replaces the default on desktop.
 */
import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function Cursor() {
  const cursorRef = useRef(null)
  const dotRef    = useRef(null)

  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  // Ring follows with spring lag
  const springX = useSpring(mouseX, { stiffness: 150, damping: 20, mass: 0.5 })
  const springY = useSpring(mouseY, { stiffness: 150, damping: 20, mass: 0.5 })

  const [hovered, setHovered]   = useState(false)
  const [clicking, setClicking] = useState(false)
  const [hidden, setHidden]     = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Hide on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsMobile(true)
      return
    }

    const move = (e) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      setHidden(false)
    }
    const leave  = () => setHidden(true)
    const enter  = () => setHidden(false)
    const down   = () => setClicking(true)
    const up     = () => setClicking(false)

    // Detect hoverable elements
    const addHover = () => {
      document.querySelectorAll('a, button, [data-cursor-hover]').forEach(el => {
        el.addEventListener('mouseenter', () => setHovered(true))
        el.addEventListener('mouseleave', () => setHovered(false))
      })
    }

    window.addEventListener('mousemove', move)
    document.addEventListener('mouseleave', leave)
    document.addEventListener('mouseenter', enter)
    window.addEventListener('mousedown', down)
    window.addEventListener('mouseup', up)

    // Run once + re-run on DOM changes
    addHover()
    const observer = new MutationObserver(addHover)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseleave', leave)
      document.removeEventListener('mouseenter', enter)
      window.removeEventListener('mousedown', down)
      window.removeEventListener('mouseup', up)
      observer.disconnect()
    }
  }, [mouseX, mouseY])

  if (isMobile) return null

  return (
    <>
      {/* Outer ring */}
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
          border: '1.5px solid rgba(201,150,58,0.7)',
          borderRadius: '50%',
        }}
        animate={{
          width:   hovered ? 52 : clicking ? 20 : 32,
          height:  hovered ? 52 : clicking ? 20 : 32,
          opacity: hidden  ? 0  : 1,
          borderColor: hovered
            ? 'rgba(245,217,138,0.9)'
            : 'rgba(201,150,58,0.7)',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      />

      {/* Inner dot */}
      <motion.div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
          width: 6,
          height: 6,
          background: '#E8B84B',
        }}
        animate={{ opacity: hidden ? 0 : 1, scale: clicking ? 0.5 : 1 }}
        transition={{ duration: 0.15 }}
      />
    </>
  )
}
