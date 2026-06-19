/**
 * sections/News.jsx
 * Fixed: FallbackImg replaced with plain <img> + onError handler.
 *        NewsCard wrapped in forwardRef for AnimatePresence.
 */
import { useState, useMemo, forwardRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Pill, GoldLine, GoldButton } from '../components/UI'
import { staggerContainer, staggerItem, viewportTrigger } from '../utils/animations'
import { NEWS_ITEMS } from '../utils/constants'
import { NEWS_IMAGES } from '../utils/images'

/* ─── Category config ────────────────────────────────────────────── */
const CATEGORIES = ['All', 'Innovation', 'Community', 'Awards', 'Products']

const CATEGORY_COLORS = {
  Innovation: '#C9963A',
  Community:  '#88C888',
  Awards:     '#F5D98A',
  Products:   '#E8A020',
}

const CATEGORY_IMAGE_MAP = {
  Innovation: NEWS_IMAGES.innovation,
  Community:  NEWS_IMAGES.community,
  Awards:     NEWS_IMAGES.awards,
  Products:   NEWS_IMAGES.products,
}

/* ─── Icons ──────────────────────────────────────────────────────── */
function ClockIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.2"/>
      <path d="M8 4.5V8l2.5 1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function CalendarIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
      <rect x="2" y="3" width="12" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
      <path d="M2 6.5h12M5 1.5v3M11 1.5v3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  )
}

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

/* ─── Card visual thumbnail ──────────────────────────────────────── */
function CardVisual({ category, isHovered }) {
  const color = CATEGORY_COLORS[category] || '#C9963A'
  const img   = CATEGORY_IMAGE_MAP[category] || NEWS_IMAGES.products

  // Local product PNGs have transparent bg — show on dark radial bg
  const isProductImg = img.src.startsWith('/images/products/')

  const handleError = (e) => {
    e.currentTarget.style.display = 'none'
    if (e.currentTarget.parentElement) {
      e.currentTarget.parentElement.style.background = img.fallbackGradient
    }
  }

  return (
    <div
      className="relative w-full rounded-xl overflow-hidden flex-shrink-0"
      style={{
        height: 200,
        background: isProductImg
          ? `radial-gradient(ellipse at 50% 80%, ${color}33, #0A0A0A 60%), linear-gradient(145deg,#0D0D0D,#111111)`
          : img.fallbackGradient,
      }}
    >
      {isProductImg ? (
        <motion.div
          className="absolute inset-0 flex items-end justify-center pb-2"
          animate={{ scale: isHovered ? 1.08 : 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <img
            src={img.src}
            alt={img.alt}
            onError={handleError}
            style={{ height: '88%', width: 'auto', objectFit: 'contain',
                     filter: `drop-shadow(0 10px 30px ${color}55)` }}
          />
        </motion.div>
      ) : (
        <motion.div
          className="absolute inset-0"
          animate={{ scale: isHovered ? 1.06 : 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <img
            src={img.src}
            alt={img.alt}
            onError={handleError}
            className="w-full h-full object-cover"
            style={{ opacity: 0.75 }}
          />
        </motion.div>
      )}

      {/* Bottom vignette */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(180deg,transparent 45%,rgba(5,5,5,0.8) 100%)' }}/>

      {/* Colour tint overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(circle at 30% 30%, ${color}22, transparent 65%)` }}
        animate={{ opacity: isHovered ? 0.9 : 0.5 }}
        transition={{ duration: 0.4 }}
      />

      {/* Category tag */}
      <div className="absolute top-3 left-3 z-10">
        <span
          className="text-label-xs uppercase tracking-widest px-2.5 py-1 rounded-full backdrop-blur-sm"
          style={{ background: 'rgba(10,10,10,0.65)', border: `1px solid ${color}44`, color }}
        >
          {category}
        </span>
      </div>
    </div>
  )
}

/* ─── News card — forwardRef required by AnimatePresence/PopChild ── */
const NewsCard = forwardRef(function NewsCard({ item }, ref) {
  const [hovered, setHovered] = useState(false)
  const color = CATEGORY_COLORS[item.category] || '#C9963A'

  return (
    <motion.article
      ref={ref}
      layout
      variants={staggerItem}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.3 } }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="card-dark p-5 flex flex-col gap-4 cursor-pointer"
      whileHover={{ y: -6 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <CardVisual category={item.category} isHovered={hovered} />

      <div className="flex-1 flex flex-col">
        <div className="flex items-center gap-4 mb-3 text-body-xs" style={{ color: 'rgba(242,237,215,0.4)' }}>
          <span className="flex items-center gap-1.5"><CalendarIcon/> {item.date}</span>
          <span className="flex items-center gap-1.5"><ClockIcon/> {item.readTime}</span>
        </div>

        <h3 className="mb-3 flex-1" style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: '1.15rem', fontWeight: 700, lineHeight: 1.35, color: '#FAF7EE',
        }}>
          {item.title}
        </h3>

        <p className="mb-4 text-body-sm" style={{ color: 'rgba(242,237,215,0.5)', lineHeight: 1.7 }}>
          {item.excerpt}
        </p>

        <motion.div
          className="flex items-center gap-2 text-body-xs font-semibold tracking-widest uppercase mt-auto"
          style={{ color }}
          animate={{ x: hovered ? 4 : 0 }}
          transition={{ duration: 0.3 }}
        >
          Read Story
          <motion.span animate={{ x: hovered ? 4 : 0 }} transition={{ duration: 0.3 }}>
            <ArrowIcon />
          </motion.span>
        </motion.div>
      </div>
    </motion.article>
  )
})

/* ─── Featured story ─────────────────────────────────────────────── */
function FeaturedStory() {
  const [hovered, setHovered] = useState(false)
  const img = NEWS_IMAGES.featured

  /* Inline onError handler — no FallbackImg component needed */
  const handleImgError = (e) => {
    e.currentTarget.style.display = 'none'
    const parent = e.currentTarget.parentElement
    if (parent) parent.style.background = img.fallbackGradient
  }

  const orbs = [
    { size: 400, x: '10%', y: '20%', color: '#C9963A', delay: 0 },
    { size: 300, x: '70%', y: '60%', color: '#F5D98A', delay: 1 },
  ]

  return (
    <motion.div
      className="relative rounded-3xl overflow-hidden cursor-pointer mb-12"
      style={{ minHeight: 360, border: '1px solid rgba(201,150,58,0.15)', background: img.fallbackGradient }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportTrigger}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ scale: 1.005 }}
    >
      {/* Real background photo */}
      <motion.div
        className="absolute inset-0"
        animate={{ scale: hovered ? 1.04 : 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <img
          src={img.src}
          alt={img.alt}
          onError={handleImgError}
          className="w-full h-full object-cover"
          style={{ opacity: 0.45 }}
        />
      </motion.div>

      {/* Dark overlay */}
      <div className="absolute inset-0"
        style={{ background: 'linear-gradient(135deg,rgba(5,5,5,0.88) 0%,rgba(10,8,0,0.65) 50%,rgba(5,5,5,0.75) 100%)' }}/>

      {/* Gold glow orbs */}
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: orb.size, height: orb.size,
            left: orb.x, top: orb.y,
            background: `radial-gradient(circle,${orb.color}18,transparent 70%)`,
            filter: 'blur(40px)',
          }}
          animate={{ x: [0,20,0], y: [0,-15,0], scale: hovered ? [1,1.1,1] : 1 }}
          transition={{ duration: 10+i*2, repeat: Infinity, ease: 'easeInOut', delay: orb.delay }}
        />
      ))}

      {/* Bottom vignette */}
      <div className="absolute inset-0"
        style={{ background: 'linear-gradient(180deg,transparent 30%,rgba(5,5,5,0.88) 100%)' }}/>

      {/* Play button */}
      <motion.div
        className="absolute top-8 right-8 md:top-10 md:right-10 w-16 h-16 rounded-full flex items-center justify-center"
        style={{ background: 'rgba(10,10,10,0.5)', border: '1px solid rgba(201,150,58,0.4)', backdropFilter: 'blur(8px)' }}
        animate={{ scale: hovered ? 1.1 : 1, borderColor: hovered ? 'rgba(245,217,138,0.7)' : 'rgba(201,150,58,0.4)' }}
        transition={{ duration: 0.3 }}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M6 4l10 6-10 6V4z" fill="#E8B84B"/>
        </svg>
      </motion.div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
        <span
          className="text-label-xs uppercase tracking-widest px-3 py-1.5 rounded-full inline-block mb-4"
          style={{ background: 'rgba(201,150,58,0.12)', border: '1px solid rgba(201,150,58,0.4)', color: '#E8B84B' }}
        >
          Featured Story
        </span>
        <h3 style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: 'clamp(1.6rem,4vw,3rem)', fontWeight: 800, color: '#FAF7EE',
          lineHeight: 1.1, letterSpacing: '-0.02em', maxWidth: '32ch', marginBottom: '0.75rem',
        }}>
          Inside the Brewery: How Guinness Nigeria Makes the World's Most Famous Stout
        </h3>
        <p style={{ color: 'rgba(242,237,215,0.6)', fontSize: '1rem', maxWidth: '50ch', marginBottom: '1.5rem' }}>
          A behind-the-scenes look at the Ikeja and Benin breweries — where tradition meets technology.
        </p>
        <div className="flex items-center gap-4 text-body-xs" style={{ color: 'rgba(242,237,215,0.4)' }}>
          <span className="flex items-center gap-1.5"><CalendarIcon/> June 2025</span>
          <span className="flex items-center gap-1.5"><ClockIcon/> 6 min watch</span>
        </div>
      </div>
    </motion.div>
  )
}

/* ─── Category filter ────────────────────────────────────────────── */
function CategoryFilter({ active, onChange }) {
  return (
    <div className="flex flex-wrap gap-2 mb-10">
      {CATEGORIES.map(cat => {
        const isActive = active === cat
        return (
          <motion.button
            key={cat}
            onClick={() => onChange(cat)}
            className="relative px-5 py-2.5 rounded-full text-body-sm font-medium transition-colors"
            style={{
              color: isActive ? '#050505' : 'rgba(242,237,215,0.7)',
              border: isActive ? 'none' : '1px solid rgba(255,255,255,0.1)',
            }}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.96 }}
          >
            {isActive && (
              <motion.div
                layoutId="category-pill"
                className="absolute inset-0 rounded-full"
                style={{ background: 'linear-gradient(135deg,#C9963A,#E8B84B)' }}
                transition={{ type: 'spring', stiffness: 350, damping: 30 }}
              />
            )}
            <span className="relative z-10">{cat}</span>
          </motion.button>
        )
      })}
    </div>
  )
}

/* ─── News Section ───────────────────────────────────────────────── */
export default function News() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = useMemo(() => {
    if (activeCategory === 'All') return NEWS_ITEMS
    return NEWS_ITEMS.filter(item => item.category === activeCategory)
  }, [activeCategory])

  return (
    <section
      id="news"
      className="relative w-full overflow-hidden py-[var(--section-py)]"
      style={{ background: 'linear-gradient(180deg,#050505 0%,#0A0A0A 100%)' }}
    >
      <div className="section-container">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportTrigger}
          variants={staggerContainer(0.1)}
          className="mb-12"
        >
          <motion.div variants={staggerItem} className="mb-4">
            <Pill>Newsroom</Pill>
          </motion.div>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-6">
            <motion.h2
              variants={staggerItem}
              style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: 'clamp(2.4rem,5vw,4.5rem)', fontWeight: 800,
                lineHeight: 0.95, letterSpacing: '-0.025em', color: '#FAF7EE',
              }}
            >
              What's<br/>
              <span style={{
                background: 'linear-gradient(135deg,#8A6420,#C9963A,#F5D98A)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>
                Brewing.
              </span>
            </motion.h2>

            <motion.div variants={staggerItem}>
              <GoldButton ghost href="#">
                View All Stories
                <ArrowIcon/>
              </GoldButton>
            </motion.div>
          </div>

          <motion.div variants={staggerItem}>
            <GoldLine className="w-16"/>
          </motion.div>
        </motion.div>

        {/* Featured */}
        <FeaturedStory/>

        {/* Filter */}
        <CategoryFilter active={activeCategory} onChange={setActiveCategory}/>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map(item => (
              <NewsCard key={item.id} item={item}/>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <motion.div className="text-center py-16" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <p style={{ color: 'rgba(242,237,215,0.4)' }}>No stories in this category yet.</p>
          </motion.div>
        )}
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom,transparent,#050505)' }}/>
    </section>
  )
}