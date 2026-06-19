/**
 * sections/Products.jsx — real product images, no more SVG cans
 */
import { useRef, useState, useEffect } from 'react'
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion'
import { Pill, GoldLine } from '../components/UI'
import { staggerContainer, staggerItem, viewportTrigger } from '../utils/animations'
import { PRODUCTS } from '../utils/constants'
import { useTilt } from '../hooks'

/* ─── Real product image card ─────────────────────────────────────── */
function ProductCard({ product, isActive, onClick }) {
  const [hovered, setHovered] = useState(false)
  const { ref, style: tiltStyle, onMouseMove, onMouseLeave: tiltLeave } = useTilt(8)

  return (
    <motion.div
      ref={ref}
      className="relative flex-shrink-0 cursor-pointer select-none"
      style={{
        width: isActive ? 300 : 220,
        transition: 'width 0.5s cubic-bezier(0.22,1,0.36,1)',
        ...tiltStyle,
      }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7 }}
      onMouseMove={onMouseMove}
      onMouseLeave={() => { setHovered(false); tiltLeave() }}
      onMouseEnter={() => setHovered(true)}
      onClick={onClick}
      whileTap={{ scale: 0.98 }}
    >
      <div
        className="relative rounded-2xl overflow-hidden flex flex-col"
        style={{
          background: `linear-gradient(160deg, ${product.color}ee 0%, #0D0D0D 100%)`,
          border: isActive
            ? `1px solid ${product.accentColor}66`
            : hovered
              ? `1px solid ${product.accentColor}33`
              : '1px solid rgba(255,255,255,0.07)',
          boxShadow: isActive
            ? `0 0 50px ${product.accentColor}30, 0 20px 60px rgba(0,0,0,0.8)`
            : hovered
              ? `0 0 20px ${product.accentColor}20, 0 10px 40px rgba(0,0,0,0.6)`
              : '0 4px 24px rgba(0,0,0,0.5)',
          minHeight: isActive ? 420 : 380,
          transition: 'all 0.4s cubic-bezier(0.22,1,0.36,1)',
        }}
      >
        {/* Badge */}
        <div className="p-4 pb-0">
          <span
            className="text-label-xs px-3 py-1 rounded-full uppercase tracking-widest"
            style={{
              background: `${product.accentColor}22`,
              border: `1px solid ${product.accentColor}44`,
              color: product.accentColor,
            }}
          >
            {product.badge}
          </span>
        </div>

        {/* Product image */}
        <div
          className="flex items-end justify-center flex-1 relative"
          style={{ minHeight: isActive ? 280 : 240, padding: '1rem 1.5rem 0' }}
        >
          {/* Glow disc below product */}
          <motion.div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-full pointer-events-none"
            style={{
              width: 160, height: 40,
              background: `radial-gradient(ellipse, ${product.accentColor}44, transparent 70%)`,
              filter: 'blur(12px)',
            }}
            animate={{ opacity: hovered || isActive ? 1 : 0.4 }}
          />
          <motion.img
            src={product.image}
            alt={product.name}
            className="relative z-10 object-contain"
            style={{
              maxHeight: isActive ? 260 : 220,
              width: 'auto',
              filter: `drop-shadow(0 20px 40px ${product.accentColor}55)`,
              transition: 'max-height 0.4s cubic-bezier(0.22,1,0.36,1)',
            }}
            animate={{
              y: hovered || isActive ? -10 : 0,
              scale: hovered || isActive ? 1.05 : 1,
            }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>

        {/* Info */}
        <div className="p-5 pt-3">
          <p className="text-label-xs mb-1 uppercase tracking-widest" style={{ color: product.accentColor, opacity: 0.8 }}>
            {product.tagline}
          </p>
          <h3
            className="mb-2"
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: isActive ? '1.3rem' : '1.05rem',
              fontWeight: 700,
              color: '#FAF7EE',
              transition: 'font-size 0.4s',
            }}
          >
            {product.name}
          </h3>
          <span
            className="inline-flex items-center gap-1.5 text-body-xs px-2.5 py-1 rounded-full"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(242,237,215,0.55)' }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: product.accentColor }} />
            {product.abv} ABV
          </span>

          <motion.div
            initial={false}
            animate={{ height: isActive ? 'auto' : 0, opacity: isActive ? 1 : 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <p className="mt-3 text-body-sm" style={{ color: 'rgba(242,237,215,0.6)', lineHeight: 1.75 }}>
              {product.description}
            </p>
            <motion.button
              className="mt-3 flex items-center gap-2 text-body-xs font-semibold tracking-widest uppercase"
              style={{ color: product.accentColor }}
              whileHover={{ x: 4 }}
            >
              Explore
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.button>
          </motion.div>
        </div>

        {/* Bottom glow */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-24 rounded-b-2xl pointer-events-none"
          style={{ background: `linear-gradient(to top, ${product.accentColor}18, transparent)` }}
          animate={{ opacity: hovered || isActive ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  )
}

/* ─── Drag carousel ──────────────────────────────────────────────── */
function Carousel({ children }) {
  const trackRef = useRef(null)
  const x = useMotionValue(0)
  const [maxDrag, setMaxDrag] = useState(0)

  useEffect(() => {
    const update = () => {
      if (!trackRef.current) return
      const parent = trackRef.current.parentElement
      const full = trackRef.current.scrollWidth
      const vis = parent?.clientWidth || 0
      setMaxDrag(Math.max(0, full - vis + 64))
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [children])

  const progress = useTransform(x, [-maxDrag, 0], [1, 0])

  return (
    <div className="relative overflow-hidden cursor-grab active:cursor-grabbing">
      <motion.div
        ref={trackRef}
        className="flex gap-5 px-[var(--section-px)] pb-4"
        style={{ x }}
        drag="x"
        dragConstraints={{ left: -maxDrag, right: 0 }}
        dragElastic={0.08}
        dragTransition={{ bounceStiffness: 200, bounceDamping: 30 }}
      >
        {children}
      </motion.div>

      {/* Progress bar */}
      <div className="mx-[var(--section-px)] mt-6 h-px rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
        <motion.div
          className="h-full rounded-full"
          style={{
            background: 'linear-gradient(90deg, #C9963A, #F5D98A)',
            scaleX: progress,
            originX: 0,
          }}
        />
      </div>
    </div>
  )
}

/* ─── Active product feature panel ──────────────────────────────── */
function ActiveProductPanel({ product }) {
  return (
    <motion.div
      key={product.id}
      className="rounded-2xl overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${product.color}cc, #111111)`,
        border: `1px solid ${product.accentColor}33`,
        boxShadow: `0 0 60px ${product.accentColor}18`,
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex flex-col md:flex-row gap-0 items-stretch">
        {/* Image panel */}
        <div
          className="flex items-end justify-center flex-shrink-0 relative"
          style={{
            width: '100%',
            maxWidth: 260,
            minHeight: 280,
            padding: '2rem 2rem 0',
            background: `radial-gradient(ellipse at 50% 80%, ${product.accentColor}22, transparent 70%)`,
          }}
        >
          <motion.img
            src={product.image}
            alt={product.name}
            className="object-contain relative z-10"
            style={{
              maxHeight: 240,
              width: 'auto',
              filter: `drop-shadow(0 20px 50px ${product.accentColor}66)`,
            }}
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>

        {/* Text + grid panel */}
        <div className="flex-1 p-8 flex flex-col justify-center">
          <span
            className="text-label-xs uppercase tracking-widest mb-2 block"
            style={{ color: product.accentColor, opacity: 0.8 }}
          >
            {product.tagline}
          </span>
          <h3
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
              fontWeight: 700,
              color: '#FAF7EE',
              marginBottom: '0.75rem',
            }}
          >
            {product.name}
          </h3>
          <p style={{ color: 'rgba(242,237,215,0.65)', fontSize: '0.95rem', lineHeight: 1.8, maxWidth: '42ch', marginBottom: '1.5rem' }}>
            {product.description}
          </p>

          {/* Attribute grid */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'ABV',    value: product.abv },
              { label: 'Type',   value: product.badge },
              { label: 'Origin', value: 'Lagos, NG' },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="rounded-xl p-3 text-center"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
              >
                <div className="text-label-xs uppercase tracking-widest mb-0.5" style={{ color: product.accentColor, opacity: 0.7 }}>{label}</div>
                <div style={{ color: '#FAF7EE', fontWeight: 600, fontSize: '0.9rem' }}>{value}</div>
              </div>
            ))}
          </div>

          {/* Dot nav */}
          <div className="flex gap-3 mt-6">
            {PRODUCTS.map(p => (
              <div
                key={p.id}
                className="w-2 h-2 rounded-full transition-all duration-300"
                style={{
                  background: p.id === product.id ? product.accentColor : 'rgba(255,255,255,0.2)',
                  transform: p.id === product.id ? 'scale(1.5)' : 'scale(1)',
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

/* ─── Products Section ───────────────────────────────────────────── */
export default function Products() {
  const [activeId, setActiveId] = useState(PRODUCTS[0].id)
  const active = PRODUCTS.find(p => p.id === activeId)

  return (
    <section
      id="products"
      className="relative w-full overflow-hidden py-[var(--section-py)]"
      style={{ background: 'linear-gradient(180deg,#050505 0%,#0A0A0A 40%,#080808 100%)' }}
    >
      {/* Ambient bg glow keyed to active product */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ background: `radial-gradient(ellipse 60% 50% at 80% 40%, ${active?.accentColor}0C, transparent 70%)` }}
        transition={{ duration: 0.8 }}
      />

      <div className="section-container mb-12">
        <motion.div initial="hidden" whileInView="visible" viewport={viewportTrigger} variants={staggerContainer(0.1)}>
          <motion.div variants={staggerItem} className="mb-4">
            <Pill>Our Portfolio</Pill>
          </motion.div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <motion.h2
              variants={staggerItem}
              style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: 'clamp(2.4rem, 5vw, 4.5rem)',
                fontWeight: 800,
                color: '#FAF7EE',
                lineHeight: 0.95,
                letterSpacing: '-0.025em',
              }}
            >
              Five Icons.<br />
              <span style={{
                background: 'linear-gradient(135deg,#8A6420,#C9963A,#F5D98A)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>One Legacy.</span>
            </motion.h2>
            <motion.p variants={staggerItem} style={{ color: 'rgba(242,237,215,0.55)', fontSize: '0.95rem', maxWidth: '36ch', lineHeight: 1.75 }}>
              Drag to explore every drop.
            </motion.p>
          </div>
          <motion.div variants={staggerItem} className="mt-6">
            <GoldLine className="w-16" />
          </motion.div>
        </motion.div>
      </div>

      {/* Drag hint */}
      <motion.div
        className="section-container mb-5 flex items-center gap-2"
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={viewportTrigger}
      >
        <motion.div
          className="flex items-center gap-2 text-g-muted text-label-xs tracking-widest uppercase"
          animate={{ x: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <svg width="18" height="12" viewBox="0 0 18 12" fill="none">
            <path d="M1 6h16M11 1l5 5-5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Drag to explore
        </motion.div>
      </motion.div>

      {/* Cards */}
      <Carousel>
        {PRODUCTS.map(p => (
          <ProductCard
            key={p.id}
            product={p}
            isActive={activeId === p.id}
            onClick={() => setActiveId(p.id)}
          />
        ))}
      </Carousel>

      {/* Active panel */}
      <div className="section-container mt-14">
        <AnimatePresence mode="wait">
          <ActiveProductPanel key={activeId} product={active} />
        </AnimatePresence>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom,transparent,#050505)' }} />
    </section>
  )
}
