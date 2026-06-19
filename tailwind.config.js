/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      /* ─── GUINNESS BRAND TOKENS ─────────────────────────────── */
      colors: {
        /* Core palette */
        g: {
          black:    '#0A0A0A',   /* Near-black canvas — the pint glass */
          void:     '#050505',   /* True background black */
          obsidian: '#111111',   /* Surface elevation 1 */
          charcoal: '#1A1A1A',   /* Surface elevation 2 */
          carbon:   '#222222',   /* Surface elevation 3 (cards) */
          iron:     '#2E2E2E',   /* Borders, dividers */
          ash:      '#3D3D3D',   /* Muted borders */

          /* Gold / Harp string */
          gold:     '#C9963A',   /* Primary accent — brand gold */
          goldHi:   '#E8B84B',   /* Highlight gold */
          goldLo:   '#8A6420',   /* Deep gold (shadows) */
          goldFoam: '#F5D98A',   /* Cream-gold, top of pint */

          /* Cream / Foam */
          cream:    '#F2EDD7',   /* Guinness cream / foam white */
          creamHi:  '#FAF7EE',   /* High-key cream */
          creamLo:  '#C8C0A0',   /* Muted cream */

          /* Red — Guinness label red */
          red:      '#C0392B',
          redHi:    '#E8453A',

          /* Utility */
          muted:    '#6B6B6B',   /* Secondary text */
          ghost:    '#3A3A3A',   /* Placeholder / disabled */
        },
      },

      /* ─── TYPOGRAPHY ────────────────────────────────────────── */
      fontFamily: {
        display:  ['"Playfair Display"', 'Georgia', 'serif'],
        sans:     ['"Inter"', 'system-ui', 'sans-serif'],
        mono:     ['"JetBrains Mono"', 'monospace'],
        /*
         * Playfair Display = editorial gravitas for headlines
         * Inter           = clean legibility for body/UI
         */
      },

      fontSize: {
        /* Display scale — hero headlines */
        'display-2xl': ['clamp(4rem,   10vw, 9rem)',   { lineHeight: '0.9',  letterSpacing: '-0.04em', fontWeight: '700' }],
        'display-xl':  ['clamp(3rem,   7vw,  6.5rem)', { lineHeight: '0.92', letterSpacing: '-0.03em', fontWeight: '700' }],
        'display-lg':  ['clamp(2rem,   5vw,  4.5rem)', { lineHeight: '1.0',  letterSpacing: '-0.025em', fontWeight: '700' }],
        'display-md':  ['clamp(1.5rem, 4vw,  3rem)',   { lineHeight: '1.1',  letterSpacing: '-0.02em', fontWeight: '600' }],
        'display-sm':  ['clamp(1.2rem, 3vw,  2rem)',   { lineHeight: '1.2',  letterSpacing: '-0.015em', fontWeight: '600' }],
        /* Body scale */
        'body-xl':   ['1.25rem',  { lineHeight: '1.7' }],
        'body-lg':   ['1.125rem', { lineHeight: '1.7' }],
        'body-base': ['1rem',     { lineHeight: '1.7' }],
        'body-sm':   ['0.875rem', { lineHeight: '1.6' }],
        'body-xs':   ['0.75rem',  { lineHeight: '1.5' }],
        /* Label scale */
        'label-lg':  ['0.875rem', { letterSpacing: '0.15em', fontWeight: '600' }],
        'label-sm':  ['0.75rem',  { letterSpacing: '0.2em',  fontWeight: '600' }],
        'label-xs':  ['0.625rem', { letterSpacing: '0.25em', fontWeight: '700' }],
      },

      /* ─── SPACING ────────────────────────────────────────────── */
      spacing: {
        '18':  '4.5rem',
        '22':  '5.5rem',
        '26':  '6.5rem',
        '30':  '7.5rem',
        '34':  '8.5rem',
        '38':  '9.5rem',
        '42':  '10.5rem',
        '46':  '11.5rem',
        '50':  '12.5rem',
        '128': '32rem',
        '144': '36rem',
        '160': '40rem',
      },

      /* ─── ANIMATION ──────────────────────────────────────────── */
      animation: {
        'pour-in':    'pourIn 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'fade-up':    'fadeUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'fade-in':    'fadeIn 0.6s ease forwards',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'float':      'float 6s ease-in-out infinite',
        'shimmer':    'shimmer 2.5s linear infinite',
        'spin-slow':  'spin 20s linear infinite',
        'gold-flow':  'goldFlow 4s ease-in-out infinite',
      },

      keyframes: {
        pourIn: {
          '0%':   { opacity: '0', transform: 'translateY(60px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%':      { opacity: '0.8', transform: 'scale(1.05)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-20px)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        goldFlow: {
          '0%, 100%': { opacity: '0.6' },
          '50%':      { opacity: '1' },
        },
      },

      /* ─── EFFECTS ────────────────────────────────────────────── */
      backgroundImage: {
        'gold-shimmer': 'linear-gradient(90deg, transparent 0%, #C9963A 40%, #F5D98A 50%, #C9963A 60%, transparent 100%)',
        'gold-gradient': 'linear-gradient(135deg, #8A6420 0%, #C9963A 40%, #E8B84B 60%, #F5D98A 100%)',
        'dark-gradient': 'linear-gradient(180deg, #050505 0%, #0A0A0A 50%, #111111 100%)',
        'radial-gold':  'radial-gradient(ellipse at center, #C9963A22 0%, transparent 70%)',
        'radial-glow':  'radial-gradient(ellipse at 50% 50%, #C9963A15 0%, transparent 60%)',
        'pour-gradient':'linear-gradient(180deg, #F5D98A 0%, #C9963A 30%, #1A0E00 70%, #0A0A0A 100%)',
      },

      boxShadow: {
        'gold-sm':  '0 0 12px rgba(201,150,58,0.3)',
        'gold-md':  '0 0 30px rgba(201,150,58,0.4)',
        'gold-lg':  '0 0 60px rgba(201,150,58,0.35)',
        'gold-xl':  '0 0 100px rgba(201,150,58,0.25)',
        'inset-gold': 'inset 0 1px 0 rgba(201,150,58,0.3)',
        'card':     '0 4px 24px rgba(0,0,0,0.6)',
        'card-hover':'0 12px 48px rgba(0,0,0,0.8), 0 0 24px rgba(201,150,58,0.15)',
      },

      borderColor: {
        'gold-dim':  'rgba(201,150,58,0.2)',
        'gold-mid':  'rgba(201,150,58,0.4)',
        'gold-full': 'rgba(201,150,58,0.8)',
      },

      /* ─── LAYOUT ─────────────────────────────────────────────── */
      screens: {
        'xs': '475px',
      },
      maxWidth: {
        'site': '1440px',
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },

      /* ─── BLUR / BACKDROP ────────────────────────────────────── */
      backdropBlur: {
        'xs': '2px',
      },

      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.22, 1, 0.36, 1)',
        'expo':   'cubic-bezier(0.19, 1, 0.22, 1)',
      },
    },
  },
  plugins: [],
}
