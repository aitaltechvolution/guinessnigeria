/**
 * pages/HomePage.jsx
 * Full home page — Hero + condensed section teasers with CTAs to full pages
 */
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Hero from '../sections/Hero'
import Products from '../sections/Products'
import BrandStory from '../sections/BrandStory'
import News from '../sections/News'
import { SustainabilitySection } from '../sections/Sustainability'
import { staggerContainer, staggerItem, viewportTrigger } from '../utils/animations'
import { Pill } from '../components/UI'
import { PRODUCTS } from '../utils/constants'

export default function HomePage() {
  return (
    <div>
      <Hero />
      <Products />
      <BrandStory />
      <News />
      <SustainabilitySection />

      {/* ── Careers teaser CTA ── */}
      <section
        className="relative py-32 overflow-hidden"
        style={{ background: 'linear-gradient(180deg,#050505 0%,#0D0800 50%,#050505 100%)' }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(201,150,58,0.07), transparent 70%)' }}
        />
        <div className="section-container text-center relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportTrigger}
            variants={staggerContainer(0.1)}
          >
            <motion.div variants={staggerItem} className="mb-5 flex justify-center">
              <Pill>Join the Team</Pill>
            </motion.div>
            <motion.h2
              variants={staggerItem}
              style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: 'clamp(2.4rem, 5vw, 5rem)',
                fontWeight: 800,
                color: '#FAF7EE',
                lineHeight: 1,
                letterSpacing: '-0.025em',
                marginBottom: '1.25rem',
              }}
            >
              Be Part of{' '}
              <span style={{
                background: 'linear-gradient(135deg,#8A6420,#C9963A,#F5D98A)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                Something More.
              </span>
            </motion.h2>
            <motion.p
              variants={staggerItem}
              style={{ color: 'rgba(242,237,215,0.6)', fontSize: '1.1rem', maxWidth: '50ch', margin: '0 auto 2.5rem' }}
            >
              3,000+ people. Infinite ambition. Discover open roles at Guinness Nigeria.
            </motion.p>
            <motion.div variants={staggerItem}>
              <Link to="/careers" className="btn-primary inline-flex items-center gap-3">
                Explore Careers
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
