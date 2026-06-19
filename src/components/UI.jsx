/**
 * components/UI.jsx
 * ─────────────────────────────────────────────────────────────────
 * Reusable atomic UI components used across all sections.
 */
import { motion } from 'framer-motion'
import { fadeUp, pourIn, staggerContainer, staggerItem, viewportTrigger, lineGrow } from '../utils/animations'

/* ─── AnimatedText ───────────────────────────────────────────────── */
/**
 * Wraps a block of text in a Framer Motion reveal.
 * variant: 'pourIn' | 'fadeUp' | 'fadeIn'
 */
export function AnimatedText({ children, variant = 'fadeUp', delay = 0, className = '', as: Tag = 'div' }) {
  const variants = { pourIn, fadeUp }
  const chosen = variants[variant] || fadeUp

  const adjusted = {
    ...chosen,
    visible: {
      ...chosen.visible,
      transition: {
        ...chosen.visible.transition,
        delay: (chosen.visible.transition?.delay || 0) + delay,
      },
    },
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={viewportTrigger}
      variants={adjusted}
    >
      {children}
    </motion.div>
  )
}

/* ─── SplitText ──────────────────────────────────────────────────── */
/**
 * Animates each word individually for a dramatic reveal.
 */
export function SplitText({ text, className = '', wordClassName = '', delay = 0 }) {
  const words = text.split(' ')

  return (
    <motion.span
      className={`inline-flex flex-wrap gap-x-[0.3em] ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={viewportTrigger}
      variants={staggerContainer(0.08, delay)}
    >
      {words.map((word, i) => (
        <span key={i} className="overflow-hidden inline-block">
          <motion.span
            className={`inline-block ${wordClassName}`}
            variants={{
              hidden: { y: '110%', opacity: 0 },
              visible: {
                y: '0%',
                opacity: 1,
                transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
              },
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.span>
  )
}

/* ─── GoldLine ───────────────────────────────────────────────────── */
/** Animated gold horizontal rule */
export function GoldLine({ className = '', delay = 0 }) {
  return (
    <motion.div
      className={`h-[2px] bg-gradient-to-r from-g-gold to-g-goldHi rounded-full ${className}`}
      initial={{ scaleX: 0, originX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={viewportTrigger}
      transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1], delay }}
    />
  )
}

/* ─── Pill ───────────────────────────────────────────────────────── */
/** Small overline badge — e.g. "Our Products", "Since 1962" */
export function Pill({ children, className = '' }) {
  return (
    <motion.span
      className={`pill-gold ${className}`}
      initial={{ opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={viewportTrigger}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-g-gold inline-block" />
      {children}
    </motion.span>
  )
}

/* ─── SectionWrapper ─────────────────────────────────────────────── */
/**
 * Standard section container with consistent vertical padding.
 * id: used for nav anchor scrolling
 */
export function SectionWrapper({ id, className = '', children, noPad = false }) {
  return (
    <section
      id={id}
      className={`relative w-full overflow-hidden ${noPad ? '' : 'py-[var(--section-py)]'} ${className}`}
    >
      <div className="section-container">
        {children}
      </div>
    </section>
  )
}

/* ─── StaggerList ────────────────────────────────────────────────── */
/**
 * Stagger-animates a list of children.
 */
export function StaggerList({ children, className = '', delay = 0 }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={viewportTrigger}
      variants={staggerContainer(0.1, delay)}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children, className = '' }) {
  return (
    <motion.div className={className} variants={staggerItem}>
      {children}
    </motion.div>
  )
}

/* ─── GoldButton ─────────────────────────────────────────────────── */
export function GoldButton({ children, href, onClick, ghost = false, className = '' }) {
  const cls = `${ghost ? 'btn-ghost' : 'btn-primary'} ${className}`

  if (href) {
    return (
      <motion.a
        href={href}
        className={cls}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.97 }}
      >
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button
      onClick={onClick}
      className={cls}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
    >
      {children}
    </motion.button>
  )
}

/* ─── GoldBorderCard ─────────────────────────────────────────────── */
export function GoldBorderCard({ children, className = '' }) {
  return (
    <motion.div
      className={`card-dark p-6 ${className}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportTrigger}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{
        borderColor: 'rgba(201,150,58,0.4)',
        y: -4,
        transition: { duration: 0.3 },
      }}
    >
      {children}
    </motion.div>
  )
}
