import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Pill, GoldLine } from '../components/UI'
import PageBanner from '../components/PageBanner'
import { staggerContainer, staggerItem, viewportTrigger } from '../utils/animations'
import { CareersSection } from '../sections/Sustainability'
import { HERO_IMAGES } from '../utils/images'

const DEPARTMENTS = ['All','Marketing','Operations','ESG','Finance','Technology','Graduate']

const ALL_JOBS = [
  { title:'Brand Manager',           dept:'Marketing',  location:'Lagos',      type:'Full-time',  posted:'2 days ago'  },
  { title:'Supply Chain Analyst',    dept:'Operations', location:'Benin City', type:'Full-time',  posted:'5 days ago'  },
  { title:'Graduate Trainee',        dept:'Graduate',   location:'Lagos',      type:'Programme',  posted:'1 week ago'  },
  { title:'Sustainability Lead',     dept:'ESG',        location:'Lagos',      type:'Full-time',  posted:'3 days ago'  },
  { title:'Digital Marketing Exec',  dept:'Marketing',  location:'Lagos',      type:'Full-time',  posted:'1 week ago'  },
  { title:'Finance Business Partner',dept:'Finance',    location:'Lagos',      type:'Full-time',  posted:'2 weeks ago' },
  { title:'IT Systems Engineer',     dept:'Technology', location:'Benin City', type:'Full-time',  posted:'4 days ago'  },
  { title:'Graduate Trainee (Tech)', dept:'Graduate',   location:'Lagos',      type:'Programme',  posted:'1 week ago'  },
  { title:'Operations Manager',      dept:'Operations', location:'Aba',        type:'Full-time',  posted:'3 weeks ago' },
  { title:'ESG Analyst',             dept:'ESG',        location:'Lagos',      type:'Full-time',  posted:'6 days ago'  },
]

const BENEFITS = [
  { icon:'🏥', title:'Health & Wellness',    desc:'Comprehensive medical cover for you and your family.' },
  { icon:'📚', title:'Learning & Growth',    desc:'Annual L&D budget plus access to Diageo Learning Academy.' },
  { icon:'🌍', title:'Global Opportunities', desc:'Secondment and transfer opportunities across 180+ markets.' },
  { icon:'💰', title:'Competitive Pay',      desc:'Market-leading salary, bonus scheme and pension plan.' },
  { icon:'🤝', title:'Inclusive Culture',    desc:'A diverse, welcoming workplace where everyone belongs.' },
  { icon:'🌱', title:'Purpose-Driven Work',  desc:'Build a more sustainable Nigeria — from day one.' },
]

function JobRow({ job }) {
  return (
    <motion.div
      layout
      initial={{ opacity:0, y:20 }}
      animate={{ opacity:1, y:0 }}
      exit={{ opacity:0, scale:0.96 }}
      transition={{ duration:0.4, ease:[0.22,1,0.36,1] }}
      className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl cursor-pointer"
      style={{ background:'rgba(255,255,255,0.025)', border:'1px solid rgba(255,255,255,0.07)' }}
      whileHover={{ borderColor:'rgba(201,150,58,0.35)', background:'rgba(255,255,255,0.04)', y:-2 }}
    >
      <div>
        <h4 style={{ fontFamily:'Playfair Display,serif', fontSize:'1.1rem', fontWeight:700, color:'var(--color-heading,#FAF7EE)', marginBottom:'0.25rem' }}>
          {job.title}
        </h4>
        <div className="flex flex-wrap gap-3 text-body-xs" style={{ color:'var(--color-text-muted,rgba(242,237,215,0.5))' }}>
          <span style={{ color:'#C9963A', opacity:0.8 }}>{job.dept}</span>
          <span>·</span>
          <span>{job.location}</span>
          <span>·</span>
          <span>{job.type}</span>
          <span>·</span>
          <span>{job.posted}</span>
        </div>
      </div>
      <motion.div
        className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
        style={{ border:'1px solid rgba(201,150,58,0.25)' }}
        whileHover={{ rotate:45, borderColor:'rgba(245,217,138,0.6)' }}
      >
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
          <path d="M3 8h10M9 4l4 4-4 4" stroke="#E8B84B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </motion.div>
    </motion.div>
  )
}

export default function CareersPage() {
  const [activeDept, setActiveDept] = useState('All')
  const filtered = activeDept === 'All' ? ALL_JOBS : ALL_JOBS.filter(j => j.dept === activeDept)

  return (
    <div style={{ background:'var(--color-bg,#050505)', minHeight:'100vh' }}>
      <PageBanner
        pill="Careers"
        title={['Be Part of', 'Something More.']}
        subtitle="Join 3,000+ talented people building Nigeria's most iconic brands."
        img={HERO_IMAGES.lagos}
        overlayOpacity={0.80}
        minHeight={380}
      />

      {/* Benefits */}
      <section className="py-[var(--section-py)]" style={{ background:'linear-gradient(180deg,var(--color-bg,#050505),var(--color-surface,#080808))' }}>
        <div className="section-container">
          <motion.div initial="hidden" whileInView="visible" viewport={viewportTrigger} variants={staggerContainer(0.1)} className="mb-14">
            <motion.div variants={staggerItem} className="mb-4"><Pill>Why Guinness Nigeria</Pill></motion.div>
            <motion.h2 variants={staggerItem} style={{ fontFamily:'Playfair Display,serif', fontSize:'clamp(2rem,4vw,3.5rem)', fontWeight:800, color:'var(--color-heading,#FAF7EE)', letterSpacing:'-0.02em' }}>
              More than a job.<br/>
              <span style={{ background:'linear-gradient(135deg,#C9963A,#F5D98A)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>A career built to last.</span>
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {BENEFITS.map((b, i) => (
              <motion.div key={b.title} className="card-dark p-6 flex gap-4"
                initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true, amount:0.3 }}
                transition={{ duration:0.6, delay:i*0.08, ease:[0.22,1,0.36,1] }}
                whileHover={{ y:-4 }}
              >
                <div className="text-2xl flex-shrink-0 mt-1">{b.icon}</div>
                <div>
                  <h4 style={{ fontFamily:'Playfair Display,serif', fontWeight:700, color:'var(--color-heading,#FAF7EE)', fontSize:'1rem', marginBottom:'0.4rem' }}>{b.title}</h4>
                  <p style={{ color:'var(--color-text-muted,rgba(242,237,215,0.55))', fontSize:'0.875rem', lineHeight:1.7 }}>{b.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Jobs */}
      <section className="py-[var(--section-py)]">
        <div className="section-container">
          <motion.div initial="hidden" whileInView="visible" viewport={viewportTrigger} variants={staggerContainer(0.1)} className="mb-10">
            <motion.div variants={staggerItem} className="mb-4"><Pill>Open Roles</Pill></motion.div>
            <motion.h2 variants={staggerItem} style={{ fontFamily:'Playfair Display,serif', fontSize:'clamp(2rem,4vw,3.5rem)', fontWeight:800, color:'var(--color-heading,#FAF7EE)', letterSpacing:'-0.02em', marginBottom:'0.75rem' }}>
              Find Your Role.
            </motion.h2>
            <motion.div variants={staggerItem}><GoldLine className="w-12" /></motion.div>
          </motion.div>

          {/* Dept filter */}
          <div className="flex flex-wrap gap-2 mb-8">
            {DEPARTMENTS.map(d => {
              const isActive = activeDept === d
              return (
                <motion.button key={d} onClick={() => setActiveDept(d)}
                  className="relative px-5 py-2.5 rounded-full text-body-sm font-medium"
                  style={{ color: isActive ? '#050505' : 'var(--color-text-muted,rgba(242,237,215,0.7))', border: isActive ? 'none' : '1px solid rgba(255,255,255,0.1)' }}
                  whileHover={{ y:-2 }} whileTap={{ scale:0.96 }}
                >
                  {isActive && (
                    <motion.div layoutId="careers-pill" className="absolute inset-0 rounded-full"
                      style={{ background:'linear-gradient(135deg,#C9963A,#E8B84B)' }}
                      transition={{ type:'spring', stiffness:350, damping:30 }}
                    />
                  )}
                  <span className="relative z-10">{d}</span>
                </motion.button>
              )
            })}
          </div>

          <motion.div layout className="flex flex-col gap-3">
            <AnimatePresence mode="popLayout">
              {filtered.map(job => <JobRow key={job.title+job.dept} job={job} />)}
            </AnimatePresence>
          </motion.div>

          <div className="mt-10 pt-10 border-t text-center" style={{ borderColor:'rgba(201,150,58,0.1)' }}>
            <p style={{ color:'var(--color-text-muted,rgba(242,237,215,0.5))', fontSize:'0.9rem', marginBottom:'1.25rem' }}>
              Don't see a role that fits? Send us your CV anyway.
            </p>
            <motion.a href="mailto:careers@guinness-nigeria.com" className="btn-ghost inline-flex items-center gap-2"
              whileHover={{ y:-2 }} whileTap={{ scale:0.97 }}>
              Send Speculative Application
            </motion.a>
          </div>
        </div>
      </section>
    </div>
  )
}
