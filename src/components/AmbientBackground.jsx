/**
 * components/AmbientBackground.jsx
 * ─────────────────────────────────────────────────────────────────
 * Subtle ambient gold particle field used as a global background layer.
 * Lightweight canvas-based — no heavy libraries.
 */
import { useEffect, useRef } from 'react'
import { useReducedMotion } from '../hooks'

export default function AmbientBackground() {
  const canvasRef = useRef(null)
  const reduced   = useReducedMotion()

  useEffect(() => {
    if (reduced) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    let W = window.innerWidth
    let H = window.innerHeight
    canvas.width  = W
    canvas.height = H

    // Particle config
    const COUNT = Math.min(60, Math.floor(W / 25))
    const particles = Array.from({ length: COUNT }, () => ({
      x:    Math.random() * W,
      y:    Math.random() * H,
      r:    Math.random() * 1.5 + 0.5,
      vx:   (Math.random() - 0.5) * 0.3,
      vy:   (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.4 + 0.05,
      pulse: Math.random() * Math.PI * 2,
    }))

    let animId

    const draw = (t) => {
      ctx.clearRect(0, 0, W, H)

      particles.forEach(p => {
        p.pulse += 0.012
        const a = p.alpha * (0.6 + 0.4 * Math.sin(p.pulse))

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(201, 150, 58, ${a})`
        ctx.fill()

        p.x += p.vx
        p.y += p.vy

        if (p.x < -10) p.x = W + 10
        if (p.x > W + 10) p.x = -10
        if (p.y < -10) p.y = H + 10
        if (p.y > H + 10) p.y = -10
      })

      animId = requestAnimationFrame(draw)
    }

    animId = requestAnimationFrame(draw)

    const onResize = () => {
      W = window.innerWidth
      H = window.innerHeight
      canvas.width  = W
      canvas.height = H
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', onResize)
    }
  }, [reduced])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ opacity: 0.6 }}
      aria-hidden="true"
    />
  )
}
