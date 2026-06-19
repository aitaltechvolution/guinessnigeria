/**
 * utils/images.jsx
 * All image paths. Local product images (user-supplied, white bg removed).
 * Page hero images: Wikimedia Commons public domain (load in real browser).
 */

/* ─── Local product images (bundled in /public) ─────────────────── */
export const PRODUCT_IMAGES = {
  fesBottle: {
    src: '/images/products/fes-bottle.png',
    alt: 'Guinness Foreign Extra Stout bottle',
    fallbackGradient: 'linear-gradient(145deg,#0D0D10,#1A1A20,#0A0A0A)',
  },
  fesBottle2: {
    src: '/images/products/fes-bottle-2.png',
    alt: 'Guinness Foreign Extra Stout bottle large',
    fallbackGradient: 'linear-gradient(145deg,#0D0D10,#1A0800,#0A0A0A)',
  },
  pintGlass: {
    src: '/images/products/pint-glass.png',
    alt: 'Guinness pint glass with cream foam head',
    fallbackGradient: 'linear-gradient(145deg,#0A0A0A,#1A1410,#C9963A22)',
  },
  smoothCan: {
    src: '/images/products/smooth-can.png',
    alt: 'Guinness Smooth can',
    fallbackGradient: 'linear-gradient(145deg,#0A1A00,#1A2800,#88C88822)',
  },
  fesCan: {
    src: '/images/products/fes-can-new.png',
    alt: 'Guinness Foreign Extra Stout can',
    fallbackGradient: 'linear-gradient(145deg,#0A0A0A,#1A1A20)',
  },
  maltaCan: {
    src: '/images/products/malta-can.png',
    alt: 'Malta Guinness can',
    fallbackGradient: 'linear-gradient(145deg,#1A0800,#2A1200,#D4A02022)',
  },
  draughtCan: {
    src: '/images/products/draught-can.png',
    alt: 'Guinness Draught can',
    fallbackGradient: 'linear-gradient(145deg,#0A0A0A,#111111)',
  },
  /* Aliases */
  stout:  { src: '/images/products/fes-bottle.png',   alt: 'Guinness stout bottle',   fallbackGradient: 'linear-gradient(145deg,#0D0D10,#1A1A20)' },
  pint:   { src: '/images/products/pint-glass.png',   alt: 'Guinness pint glass',     fallbackGradient: 'linear-gradient(145deg,#0A0A0A,#1A1410)' },
  fes:    { src: '/images/products/fes-bottle-2.png', alt: 'Guinness FES bottle',     fallbackGradient: 'linear-gradient(145deg,#1A0800,#0D0500)' },
  harp:   { src: '/images/products/smooth-can.png',   alt: 'Guinness Smooth can',     fallbackGradient: 'linear-gradient(145deg,#0A1A00,#1A2800)' },
  malta:  { src: '/images/products/malta-can.png',    alt: 'Malta Guinness can',      fallbackGradient: 'linear-gradient(145deg,#1A0800,#2A1200)' },
}

/* ─── Hero / banner backgrounds (Wikimedia public domain) ────────── */
export const HERO_IMAGES = {
  bar: {
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Guinness_storehouse_dublin.jpg/1200px-Guinness_storehouse_dublin.jpg',
    alt: 'Guinness Storehouse Dublin',
    fallbackGradient: 'linear-gradient(145deg,#050505,#0D0800,#1A1000)',
    overlay: 'rgba(5,5,5,0.78)',
  },
  barley: {
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Barley_field.jpg/1200px-Barley_field.jpg',
    alt: 'Golden barley field',
    fallbackGradient: 'linear-gradient(145deg,#1A1000,#0D0800,#050505)',
    overlay: 'rgba(5,5,5,0.80)',
  },
  foam: {
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/GinessGlas.jpg/1200px-GinessGlas.jpg',
    alt: 'Guinness cream foam head',
    fallbackGradient: 'linear-gradient(180deg,#F5D98A22,#C9963A11,#0A0A0A)',
    overlay: 'rgba(5,5,5,0.80)',
  },
  lagos: {
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Lagos_collage.jpg/1200px-Lagos_collage.jpg',
    alt: 'Lagos Nigeria cityscape',
    fallbackGradient: 'linear-gradient(145deg,#0A0A1A,#0D0D20,#050510)',
    overlay: 'rgba(5,5,5,0.78)',
  },
  green: {
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Barley_field.jpg/1200px-Barley_field.jpg',
    alt: 'Green barley field',
    fallbackGradient: 'linear-gradient(145deg,#050D05,#0A1A0A,#051005)',
    overlay: 'rgba(5,5,5,0.82)',
  },
  brewery: {
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Guinness_storehouse_dublin.jpg/1200px-Guinness_storehouse_dublin.jpg',
    alt: 'Guinness brewery',
    fallbackGradient: 'linear-gradient(145deg,#0D0800,#1A1000,#0A0800)',
    overlay: 'rgba(5,5,5,0.80)',
  },
}

/* ─── News card images ───────────────────────────────────────────── */
export const NEWS_IMAGES = {
  innovation: {
    src: '/images/products/fes-bottle.png',
    alt: 'Guinness brewery innovation',
    fallbackGradient: 'linear-gradient(145deg,#0D0800,#C9963A15,#0A0A0A)',
  },
  community: {
    src: '/images/products/draught-can.png',
    alt: 'Lagos community',
    fallbackGradient: 'linear-gradient(145deg,#082008,#88C88815,#050505)',
  },
  awards: {
    src: '/images/products/fes-bottle.png',
    alt: 'Guinness award winning stout',
    fallbackGradient: 'linear-gradient(145deg,#1A1000,#F5D98A15,#0A0A0A)',
  },
  products: {
    src: '/images/products/pint-glass.png',
    alt: 'Guinness product launch',
    fallbackGradient: 'linear-gradient(145deg,#1A0800,#C9963A15,#0A0A0A)',
  },
  featured: {
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Guinness_storehouse_dublin.jpg/1200px-Guinness_storehouse_dublin.jpg',
    alt: 'Inside the Guinness brewery',
    fallbackGradient: 'linear-gradient(135deg,#1A0E00,#0A0A0A,#1A0800)',
  },
}

/* ─── Chapter background images ─────────────────────────────────── */
export const CHAPTER_IMAGES = {
  dark: {
    src: '/images/products/pint-glass.png',
    alt: 'Dark Guinness stout in glass',
    fallbackGradient: 'linear-gradient(145deg,#0A0A0A,#111111)',
    overlay: 'rgba(5,5,5,0.72)',
  },
  cream: {
    src: '/images/products/fes-bottle.png',
    alt: 'Guinness stout bottle',
    fallbackGradient: 'linear-gradient(145deg,#1A1000,#0D0800)',
    overlay: 'rgba(5,5,5,0.72)',
  },
  character: {
    src: '/images/products/fes-can-new.png',
    alt: 'Guinness FES can',
    fallbackGradient: 'linear-gradient(145deg,#0D0800,#1A0E00)',
    overlay: 'rgba(5,5,5,0.72)',
  },
}

/* ─── FallbackImg component ─────────────────────────────────────── */
export function FallbackImg({ img, className = '', style = {} }) {
  const handleError = (e) => {
    e.currentTarget.style.display = 'none'
    if (e.currentTarget.parentElement) {
      e.currentTarget.parentElement.style.background = img.fallbackGradient
    }
  }

  return (
    <img
      src={img.src}
      alt={img.alt}
      className={className}
      style={style}
      onError={handleError}
      loading="lazy"
      decoding="async"
    />
  )
}
