/**
 * pages/ContactPage.jsx
 * Contact page: offices, enquiry form, responsible drinking statement.
 */
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Pill, GoldLine } from '../components/UI'
import PageBanner from '../components/PageBanner'
import { staggerContainer, staggerItem, viewportTrigger } from '../utils/animations'
import { SOCIAL_LINKS } from '../utils/constants'
import { HERO_IMAGES } from '../utils/images'

const OFFICES = [
  {
    city: 'Lagos — HQ',
    address: '24 Oba Akran Avenue, Ikeja, Lagos State',
    phone: '+234 1 280 2100',
    email: 'info@guinness-nigeria.com',
    accent: '#C9963A',
  },
  {
    city: 'Benin City — Brewery',
    address: 'Brewery Road, Benin City, Edo State',
    phone: '+234 52 253 0100',
    email: 'benin@guinness-nigeria.com',
    accent: '#88C888',
  },
]

const ENQUIRY_TYPES = ['General Enquiry', 'Press & Media', 'Investor Relations', 'Sustainability', 'Careers', 'Trade / Distribution']

function OfficeCard({ office }) {
  return (
    <motion.div
      className="card-dark p-8 flex flex-col gap-5"
      initial={{ opacity:0, y:30 }}
      whileInView={{ opacity:1, y:0 }}
      viewport={{ once:true, amount:0.4 }}
      transition={{ duration:0.7, ease:[0.22,1,0.36,1] }}
      whileHover={{ y:-4 }}
    >
      <div>
        <div className="text-label-xs uppercase tracking-widest mb-2" style={{ color:office.accent, opacity:0.8 }}>
          Office
        </div>
        <h3 style={{ fontFamily:'Playfair Display,serif', fontSize:'1.3rem', fontWeight:700, color:'#FAF7EE' }}>
          {office.city}
        </h3>
      </div>

      <GoldLine className="w-10" />

      <div className="flex flex-col gap-3">
        {[
          { icon:(
            <path d="M3 4h10l-1 9H4L3 4zM3 4l-1-2M10 4l1-2M6 10V7M8 10V7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          ), label: office.address },
          { icon:(
            <path d="M3 5.5l2 1.5.5 3 3.5-.5 1.5 2.5S8 14 5 12 2 7 3 5.5z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          ), label: office.phone },
          { icon:(
            <>
              <rect x="2" y="4" width="12" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.2" fill="none"/>
              <path d="M2 6l6 4 6-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
            </>
          ), label: office.email },
        ].map(({ icon, label }) => (
          <div key={label} className="flex items-start gap-3">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ color:office.accent, opacity:0.7, flexShrink:0, marginTop:2 }}>
              {icon}
            </svg>
            <span style={{ color:'rgba(242,237,215,0.6)', fontSize:'0.9rem', lineHeight:1.6 }}>{label}</span>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

function ContactForm() {
  const [form, setForm]       = useState({ name:'', email:'', type:'General Enquiry', message:'' })
  const [submitted, setSubmit] = useState(false)
  const [focused, setFocused]  = useState(null)

  const fieldStyle = (field) => ({
    width:'100%', background:'rgba(255,255,255,0.03)', border:`1px solid ${focused===field?'rgba(201,150,58,0.6)':'rgba(255,255,255,0.09)'}`,
    borderRadius:12, padding:'0.875rem 1.1rem', color:'#FAF7EE', fontSize:'0.95rem',
    outline:'none', transition:'border-color 0.25s',
  })

  const update = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  if (submitted) {
    return (
      <motion.div
        className="flex flex-col items-center justify-center gap-6 py-20 text-center"
        initial={{ opacity:0, scale:0.9 }}
        animate={{ opacity:1, scale:1 }}
        transition={{ duration:0.6, ease:[0.22,1,0.36,1] }}
      >
        <motion.div
          className="w-20 h-20 rounded-full flex items-center justify-center"
          style={{ background:'rgba(136,200,136,0.1)', border:'1px solid rgba(136,200,136,0.4)' }}
          initial={{ scale:0 }} animate={{ scale:1 }}
          transition={{ delay:0.2, type:'spring', stiffness:250, damping:20 }}
        >
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path d="M7 16l6 6 12-12" stroke="#88C888" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.div>
        <div>
          <h3 style={{ fontFamily:'Playfair Display,serif', fontSize:'1.6rem', fontWeight:700, color:'#FAF7EE', marginBottom:'0.5rem' }}>
            Message Received
          </h3>
          <p style={{ color:'rgba(242,237,215,0.55)', lineHeight:1.7 }}>
            Thank you for reaching out. A member of our team will be in touch within 2 business days.
          </p>
        </div>
      </motion.div>
    )
  }

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); setSubmit(true) }}
      className="flex flex-col gap-5"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-label-xs uppercase tracking-widest mb-2" style={{ color:'rgba(201,150,58,0.7)' }}>
            Full Name
          </label>
          <input
            name="name" required value={form.name} onChange={update}
            placeholder="Your name"
            style={fieldStyle('name')}
            onFocus={() => setFocused('name')} onBlur={() => setFocused(null)}
          />
        </div>
        <div>
          <label className="block text-label-xs uppercase tracking-widest mb-2" style={{ color:'rgba(201,150,58,0.7)' }}>
            Email Address
          </label>
          <input
            name="email" type="email" required value={form.email} onChange={update}
            placeholder="your@email.com"
            style={fieldStyle('email')}
            onFocus={() => setFocused('email')} onBlur={() => setFocused(null)}
          />
        </div>
      </div>

      <div>
        <label className="block text-label-xs uppercase tracking-widest mb-2" style={{ color:'rgba(201,150,58,0.7)' }}>
          Enquiry Type
        </label>
        <select
          name="type" value={form.type} onChange={update}
          style={{ ...fieldStyle('type'), appearance:'none', cursor:'pointer' }}
          onFocus={() => setFocused('type')} onBlur={() => setFocused(null)}
        >
          {ENQUIRY_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>

      <div>
        <label className="block text-label-xs uppercase tracking-widest mb-2" style={{ color:'rgba(201,150,58,0.7)' }}>
          Message
        </label>
        <textarea
          name="message" required value={form.message} onChange={update}
          placeholder="Tell us how we can help..."
          rows={5}
          style={{ ...fieldStyle('message'), resize:'vertical' }}
          onFocus={() => setFocused('message')} onBlur={() => setFocused(null)}
        />
      </div>

      <motion.button
        type="submit"
        className="btn-primary self-start"
        whileHover={{ y:-2 }}
        whileTap={{ scale:0.97 }}
      >
        Send Message
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </motion.button>
    </form>
  )
}

export default function ContactPage() {
  return (
    <div style={{ background:'var(--color-bg,#050505)', minHeight:'100vh' }}>
      <PageBanner
        pill="Get in Touch"
        title={["Let's", 'Connect.']}
        subtitle="Whether it's a partnership, a press enquiry, or just a question — we're here."
        img={HERO_IMAGES.brewery}
        overlayOpacity={0.82}
        minHeight={360}
      />

      {/* Offices */}
      <section className="py-[var(--section-py)]">
        <div className="section-container">
          <motion.div initial="hidden" whileInView="visible" viewport={viewportTrigger} variants={staggerContainer(0.1)} className="mb-12">
            <motion.div variants={staggerItem} className="mb-3"><Pill>Our Offices</Pill></motion.div>
            <motion.h2 variants={staggerItem} style={{ fontFamily:'Playfair Display,serif', fontSize:'clamp(2rem,4vw,3rem)', fontWeight:800, color:'var(--color-heading,#FAF7EE)', letterSpacing:'-0.02em' }}>
              Where to Find Us
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
            {OFFICES.map(o => <OfficeCard key={o.city} office={o} />)}
          </div>

          {/* Divider */}
          <div className="h-px mb-20" style={{ background:'linear-gradient(90deg,rgba(201,150,58,0.3),transparent)' }}/>

          {/* Form */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
            <div className="lg:col-span-2">
              <motion.div initial="hidden" whileInView="visible" viewport={viewportTrigger} variants={staggerContainer(0.1)}>
                <motion.div variants={staggerItem} className="mb-4"><Pill>Enquiries</Pill></motion.div>
                <motion.h2 variants={staggerItem} style={{ fontFamily:'Playfair Display,serif', fontSize:'clamp(1.8rem,3.5vw,2.8rem)', fontWeight:800, color:'#FAF7EE', letterSpacing:'-0.02em', marginBottom:'1rem' }}>
                  Send Us a Message
                </motion.h2>
                <motion.p variants={staggerItem} style={{ color:'rgba(242,237,215,0.55)', fontSize:'0.95rem', lineHeight:1.8, marginBottom:'2rem' }}>
                  We aim to respond to all enquiries within 2 business days.
                  For urgent matters, please call our Lagos office directly.
                </motion.p>
                <GoldLine className="w-12" />

                {/* Social row */}
                <div className="mt-10 flex gap-3 flex-wrap">
                  {SOCIAL_LINKS.slice(0,4).map(s => (
                    <motion.a
                      key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                      className="text-body-xs px-4 py-2 rounded-full"
                      style={{ border:'1px solid rgba(201,150,58,0.25)', color:'rgba(242,237,215,0.6)' }}
                      whileHover={{ borderColor:'rgba(201,150,58,0.6)', color:'#F5D98A', y:-2 }}
                    >
                      {s.label}
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </div>

            <motion.div
              className="lg:col-span-3"
              initial={{ opacity:0, x:30 }}
              whileInView={{ opacity:1, x:0 }}
              viewport={{ once:true, amount:0.2 }}
              transition={{ duration:0.8, ease:[0.22,1,0.36,1] }}
            >
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Responsible drinking footer notice */}
      <div className="section-container pb-16">
        <div className="rounded-2xl p-6 text-center"
          style={{ background:'rgba(255,255,255,0.02)', border:'1px solid rgba(255,255,255,0.06)' }}>
          <p style={{ color:'rgba(242,237,215,0.35)', fontSize:'0.78rem', lineHeight:1.7 }}>
            Guinness Nigeria promotes responsible drinking. This website is intended for persons of legal drinking age only.
            Not for sale to persons under the age of 18 years.
          </p>
        </div>
      </div>
    </div>
  )
}
