import { SustainabilitySection } from '../sections/Sustainability'
import PageBanner from '../components/PageBanner'
import { HERO_IMAGES } from '../utils/images'

export default function SustainabilityPage() {
  return (
    <div style={{ background: 'var(--color-bg,#050505)', minHeight: '100vh' }}>
      <PageBanner
        pill="Sustainability"
        title={['Brewing Good,', 'For Nigeria.']}
        subtitle="Our commitment to a sustainable future — from water stewardship to renewable energy and community empowerment."
        img={HERO_IMAGES.green}
        overlayOpacity={0.80}
        minHeight={380}
      />
      <SustainabilitySection />
    </div>
  )
}
