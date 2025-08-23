export const theme = {
  colors: {
    primary: '#E0E0E0',
    primaryDark: '#9E9E9E', // for gradients and pressed states
    onPrimary: '#0E0E0E', // text/icon on primary surfaces
    secondary: '#BDBDBD',
    accent: '#6366F1', // focus rings, CTAs
    link: '#C7D2FE', // link text
    nuartBlue: '#3069B3', // NuArt brand blue color
    background: '#1A1A1A',
    surface: '#282828',
    highlight: '#3C3C3C',
    text: {
      primary: '#F5F5F5',
      secondary: '#C0C0C0',
      light: '#888888',
    },
    border: '#444444',
  },
  breakpoints: {
    mobile: '@media (max-width: 768px)',
    desktop: '@media (min-width: 768px)',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
  typography: {
    fontFamily: "'Cormorant Garamond', serif",
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
      lineHeight: 1.2,
      mobile: { fontSize: '2rem' },
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.3,
      mobile: { fontSize: '1.75rem' },
    },
    body: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
  },
  transitions: {
    default: '0.2s ease-in-out',
  },
} as const;
