import BrandStory from '../sections/BrandStory'
import PageBanner from '../components/PageBanner'
import { HERO_IMAGES } from '../utils/images'

export default function StoryPage() {
  return (
    <div style={{ background: 'var(--color-bg,#050505)', minHeight: '100vh' }}>
      <PageBanner
        pill="Our Story"
        title={['Born Nigerian.', 'Made of More.']}
        subtitle="Sixty years of brewing greatness in the heart of Nigeria — a story of passion, community, and relentless ambition."
        img={HERO_IMAGES.bar}
        overlayOpacity={0.78}
        minHeight={400}
      />
      <BrandStory />
    </div>
  )
}
