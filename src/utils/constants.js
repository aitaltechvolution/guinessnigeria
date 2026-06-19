/**
 * constants.js
 * ─────────────────────────────────────────────────────────────────
 * Brand constants, nav data, product data, and site config.
 */

/* ─── BRAND ────────────────────────────────────────────────────────── */
export const BRAND = {
  name: 'Guinness Nigeria',
  tagline: 'Made of More',
  founded: 1962,
  hq: 'Lagos, Nigeria',
}

/* ─── NAV LINKS ───────────────────────────────────────────────────── */
export const NAV_LINKS = [
  { label: 'Our Brands',     href: '/brands' },
  { label: 'Our Story',      href: '/story' },
  { label: 'Sustainability', href: '/sustainability' },
  { label: 'Newsroom',       href: '/news' },
  { label: 'Careers',        href: '/careers' },
  { label: 'Contact',        href: '/contact' },
]

/* ─── PRODUCTS ────────────────────────────────────────────────────── */
export const PRODUCTS = [
  {
    id: 'guinness-stout',
    name: 'Guinness Stout',
    tagline: 'The Black Stuff',
    abv: '7.5%',
    description: 'The iconic dark stout brewed in Nigeria since 1962. Rich roasted barley, creamy head, unmistakable character.',
    color: '#0A0A0A',
    accentColor: '#F5D98A',
    badge: 'Iconic',
    image: '/images/products/pint-glass.png',
  },
  {
    id: 'guinness-fes',
    name: 'Guinness FES',
    tagline: 'Foreign Extra Stout',
    abv: '7.5%',
    description: 'Extra-strength. Extra bold. Brewed with extra hops for a distinctly bitter, deeply satisfying finish.',
    color: '#1A0800',
    accentColor: '#C9963A',
    badge: 'Bold',
    image: '/images/products/fes-can-new.png',
  },
  {
    id: 'harp-lager',
    name: 'Harp Lager',
    tagline: 'The Crisp One',
    abv: '5.2%',
    description: 'Light golden lager with a clean, crisp finish. Refreshment perfected over decades.',
    color: '#0A1A00',
    accentColor: '#A8D060',
    badge: 'Refreshing',
    image: '/images/products/smooth-can.png',
  },
  {
    id: 'malta-guinness',
    name: 'Malta Guinness',
    tagline: 'The Power of Goodness',
    abv: '0%',
    description: "Nigeria's favourite non-alcoholic malt drink. Packed with vitamins, rich in energy, loved by all.",
    color: '#1A0A00',
    accentColor: '#D4A020',
    badge: 'Non-Alcoholic',
    image: '/images/products/malta-can.png',
  },
  {
    id: 'satzenbrau',
    name: 'Satzenbrau',
    tagline: 'Light & Smooth',
    abv: '4.2%',
    description: 'Smooth, easy-drinking lager with European heritage and Nigerian soul.',
    color: '#001020',
    accentColor: '#60A8D0',
    badge: 'Premium',
    image: '/images/products/fes-can-new.png',
  },
]

/* ─── STATS ───────────────────────────────────────────────────────── */
export const BRAND_STATS = [
  { value: 1962,  label: 'Year Founded',        suffix: '' },
  { value: 60,    label: 'Years of Excellence',  suffix: '+' },
  { value: 5,     label: 'Iconic Brands',        suffix: '' },
  { value: 3000,  label: 'Employees Nationwide', suffix: '+' },
]

/* ─── NEWS ────────────────────────────────────────────────────────── */
export const NEWS_ITEMS = [
  {
    id: 1,
    category: 'Innovation',
    title: 'Guinness Nigeria Launches New Sustainable Brewing Technology',
    excerpt: 'A landmark step in reducing carbon emissions across our Nigerian operations.',
    date: 'June 2025',
    readTime: '4 min read',
  },
  {
    id: 2,
    category: 'Community',
    title: 'Made of More: 10,000 Youth Empowered Through Skills Programme',
    excerpt: 'Our flagship youth development initiative reaches a new milestone.',
    date: 'May 2025',
    readTime: '3 min read',
  },
  {
    id: 3,
    category: 'Awards',
    title: 'Guinness Nigeria Wins Most Admired Brand at Marketing Edge Summit',
    excerpt: 'Recognised for exceptional brand consistency and consumer engagement.',
    date: 'April 2025',
    readTime: '2 min read',
  },
  {
    id: 4,
    category: 'Products',
    title: 'Malta Guinness Unveils Limited Edition Packaging Celebrating Nigeria',
    excerpt: 'Vibrant new designs honouring the richness of Nigerian culture.',
    date: 'March 2025',
    readTime: '3 min read',
  },
]

/* ─── SUSTAINABILITY STATS ───────────────────────────────────────── */
export const SUSTAINABILITY_STATS = [
  { value: 30,   suffix: '%', label: 'Water Reduction Target by 2030' },
  { value: 100,  suffix: '%', label: 'Renewable Energy Goal' },
  { value: 50,   suffix: '%', label: 'Carbon Emission Reduction' },
  { value: 10000,suffix: '+', label: 'Farmers in Supply Chain' },
]

/* ─── SOCIAL LINKS ────────────────────────────────────────────────── */
export const SOCIAL_LINKS = [
  { label: 'Instagram', href: 'https://instagram.com/guinnessnigeria' },
  { label: 'Twitter/X', href: 'https://twitter.com/guinnessnigeria' },
  { label: 'Facebook',  href: 'https://facebook.com/guinnessnigeria' },
  { label: 'LinkedIn',  href: 'https://linkedin.com/company/guinness-nigeria' },
  { label: 'YouTube',   href: 'https://youtube.com/@guinnessnigeria' },
]

/* ─── FOOTER LINKS ────────────────────────────────────────────────── */
export const FOOTER_LINKS = {
  Company: [
    { label: 'About Us',      href: '/story' },
    { label: 'Our Brands',    href: '/brands' },
    { label: 'Newsroom',      href: '/news' },
    { label: 'Investor Relations', href: '/contact' },
    { label: 'Annual Reports', href: '/news' },
  ],
  Responsibility: [
    { label: 'Sustainability',   href: '/sustainability' },
    { label: 'Drink Responsibly', href: '/sustainability' },
    { label: 'Community Impact', href: '/sustainability' },
    { label: 'Environment',      href: '/sustainability' },
  ],
  Careers: [
    { label: 'Open Roles',     href: '/careers' },
    { label: 'Culture & Life', href: '/careers' },
    { label: 'Graduate Programme', href: '/careers' },
    { label: 'Internships',    href: '/careers' },
  ],
  Legal: [
    { label: 'Privacy Policy',    href: '/contact' },
    { label: 'Terms of Use',      href: '/contact' },
    { label: 'Cookie Settings',   href: '/contact' },
    { label: 'Accessibility',     href: '/contact' },
  ],
}
