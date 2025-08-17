export const theme = {
  colors: {
    primary: '#1a1a1a',
    secondary: '#404040',
    background: '#f5f5f5',
    surface: '#ffffff',
    text: {
      primary: '#1a1a1a',
      secondary: '#404040',
      light: '#757575',
    },
    border: '#e0e0e0',
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
    fontFamily: "'Inter', 'system-ui', sans-serif",
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
      lineHeight: 1.2,
      mobile: {
        fontSize: '2rem',
      },
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.3,
      mobile: {
        fontSize: '1.75rem',
      },
    },
    body: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
  },
  transitions: {
    default: '0.2s ease-in-out',
  },
};
