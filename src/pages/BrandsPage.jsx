/**
 * pages/BrandsPage.jsx — Real product images, no CSS art
 */
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Pill, GoldLine } from '../components/UI'
import { staggerContainer, staggerItem, viewportTrigger } from '../utils/animations'
import { PRODUCTS } from '../utils/constants'
import PageBannerComponent from '../components/PageBanner'
import { HERO_IMAGES } from '../utils/images'

/* ─── Single product hero panel ─────────────────────────────────── */
function ProductHero({ product, index }) {
  const isEven = index % 2 === 0

  return (
    <motion.div
      className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-10 lg:gap-16 items-center py-20 border-b`}
      style={{ borderColor: 'rgba(201,150,58,0.08)' }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Product image */}
      <div className="flex-shrink-0 flex items-end justify-center w-full lg:w-[320px]">
        <motion.div
          className="relative"
          animate={{ y: [0, -18, 0] }}
          transition={{ duration: 5 + index * 0.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          {/* Glow disc */}
          <div style={{
            position: 'absolute', bottom: -30, left: '50%', transform: 'translateX(-50%)',
            width: 220, height: 50,
            background: `radial-gradient(ellipse, ${product.accentColor}55, transparent 70%)`,
            filter: 'blur(18px)',
          }}/>
          <img
            src={product.image}
            alt={product.name}
            style={{
              height: 'clamp(260px, 35vw, 380px)',
              width: 'auto',
              objectFit: 'contain',
              filter: `drop-shadow(0 30px 70px ${product.accentColor}66)`,
              position: 'relative',
              zIndex: 10,
            }}
          />
        </motion.div>
      </div>

      {/* Text */}
      <div className="flex-1">
        <motion.div
          initial={{ opacity: 0, x: isEven ? 30 : -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        >
          <span
            className="text-label-xs uppercase tracking-widest px-3 py-1.5 rounded-full inline-block mb-5"
            style={{
              background: `${product.accentColor}18`,
              border: `1px solid ${product.accentColor}44`,
              color: product.accentColor,
            }}
          >
            {product.badge}
          </span>

          <h2
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(2rem, 4vw, 3.2rem)',
              fontWeight: 800,
              color: '#FAF7EE',
              lineHeight: 1.05,
              letterSpacing: '-0.025em',
              marginBottom: '0.5rem',
            }}
          >
            {product.name}
          </h2>

          <p
            className="text-label-sm uppercase tracking-widest mb-5"
            style={{ color: product.accentColor, opacity: 0.75 }}
          >
            {product.tagline}
          </p>

          <GoldLine className="w-12 mb-6" />

          <p style={{ color: 'rgba(242,237,215,0.65)', fontSize: '1.05rem', lineHeight: 1.85, maxWidth: '48ch', marginBottom: '2rem' }}>
            {product.description}
          </p>

          {/* Attribute grid */}
          <div className="grid grid-cols-3 gap-4 mb-8" style={{ maxWidth: 360 }}>
            {[
              { label: 'ABV',    value: product.abv },
              { label: 'Type',   value: product.badge },
              { label: 'Origin', value: 'Lagos, NG' },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="rounded-xl p-4 text-center"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.07)',
                }}
              >
                <div className="text-label-xs uppercase tracking-widest mb-1"
                  style={{ color: product.accentColor, opacity: 0.7 }}>
                  {label}
                </div>
                <div style={{ color: '#FAF7EE', fontWeight: 600, fontSize: '0.95rem' }}>
                  {value}
                </div>
              </div>
            ))}
          </div>

          <motion.button
            className="btn-ghost"
            style={{ borderColor: `${product.accentColor}55`, color: product.accentColor }}
            whileHover={{ y: -2, borderColor: product.accentColor }}
            whileTap={{ scale: 0.97 }}
          >
            Find Where to Buy
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  )
}

/* ─── Brands Page ─────────────────────────────────────────────────── */
export default function BrandsPage() {
  return (
    <div style={{ background: '#050505', minHeight: '100vh' }}>
      <PageBannerComponent
        pill="Portfolio"
        title={['Our', 'Brands.']}
        subtitle="Five iconic brands. One relentless commitment to excellence. From the darkest stout to the crispest lager — crafted for Nigeria, loved by the world."
        img={HERO_IMAGES.bar}
        overlayOpacity={0.80}
        minHeight={420}
      />

      <div className="section-container">
        {PRODUCTS.map((product, i) => (
          <ProductHero key={product.id} product={product} index={i} />
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="py-24 text-center" style={{ borderTop: '1px solid rgba(201,150,58,0.08)' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p style={{ color: 'rgba(242,237,215,0.5)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
            Can't find your nearest stockist?
          </p>
          <Link to="/contact" className="btn-ghost inline-flex items-center gap-3">
            Contact Us
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
