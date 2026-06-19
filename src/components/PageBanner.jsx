/**
 * components/PageBanner.jsx
 * ─────────────────────────────────────────────────────────────────
 * Reusable full-width page hero banner.
 * Accepts a real background image with configurable overlay opacity.
 * Gracefully falls back to gradient if image fails to load.
 */
import { motion } from 'framer-motion'
import { Pill } from './UI'
import { staggerContainer, staggerItem } from '../utils/animations'
import { FallbackImg } from '../utils/images'

export default function PageBanner({
  pill,
  title,           // Array of strings — first item is white, second gets gold gradient
  subtitle,
  img,             // from images.js: { src, alt, fallbackGradient, overlay }
  overlayOpacity = 0.82,
  minHeight = 380,
  children,
}) {
  const overlay = img?.overlay || `rgba(5,5,5,${overlayOpacity})`

  return (
    <div
      className="relative flex items-end overflow-hidden"
      style={{
        minHeight,
        background: img?.fallbackGradient || 'linear-gradient(145deg,#050505,#0D0800)',
        paddingTop: 100,
      }}
    >
      {/* Real background image */}
      {img && (
        <div className="absolute inset-0 z-0">
          <FallbackImg
            img={img}
            className="w-full h-full object-cover"
            style={{ opacity: 0.35 }}
          />
          {/* Main dark overlay — keeps text legible */}
          <div className="absolute inset-0" style={{ background: overlay }} />
          {/* Gradient directional fade */}
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(180deg, rgba(5,5,5,0.3) 0%, rgba(5,5,5,0.0) 40%, rgba(5,5,5,0.5) 100%)' }}
          />
        </div>
      )}

      {/* Content */}
      <div className="section-container pb-16 relative z-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer(0.1)}
        >
          {pill && (
            <motion.div variants={staggerItem} className="mb-5">
              <Pill>{pill}</Pill>
            </motion.div>
          )}

          <motion.h1
            variants={staggerItem}
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(3rem, 7vw, 6rem)',
              fontWeight: 800,
              color: 'var(--color-heading, #FAF7EE)',
              lineHeight: 0.95,
              letterSpacing: '-0.03em',
              marginBottom: '1rem',
            }}
          >
            {Array.isArray(title) ? (
              <>
                {title[0]}<br />
                <span style={{
                  background: 'linear-gradient(135deg,#8A6420,#C9963A,#F5D98A)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                  {title[1]}
                </span>
              </>
            ) : title}
          </motion.h1>

          {subtitle && (
            <motion.p
              variants={staggerItem}
              style={{ color: 'rgba(242,237,215,0.65)', fontSize: '1.1rem', maxWidth: '52ch', lineHeight: 1.75 }}
            >
              {subtitle}
            </motion.p>
          )}

          {children && (
            <motion.div variants={staggerItem} className="mt-6">
              {children}
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Bottom fade into page */}
      <div
        className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, var(--color-bg, #050505))' }}
      />
    </div>
  )
}
