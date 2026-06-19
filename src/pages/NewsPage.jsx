import News from '../sections/News'
import PageBanner from '../components/PageBanner'
import { HERO_IMAGES } from '../utils/images'

export default function NewsPage() {
  return (
    <div style={{ background: 'var(--color-bg,#050505)', minHeight: '100vh' }}>
      <PageBanner
        pill="Newsroom"
        title={["What's", 'Brewing.']}
        subtitle="The latest stories, announcements, and perspectives from Guinness Nigeria."
        img={HERO_IMAGES.brewery}
        overlayOpacity={0.80}
        minHeight={380}
      />
      <News />
    </div>
  )
}
