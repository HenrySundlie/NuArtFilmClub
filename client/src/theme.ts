export const theme = {
  colors: {
    primary: '#282828',
    secondary: '#666666',
    background: '#F7F7F7',
    surface: '#ffffff',
    highlight: '#E5E5E5',
    text: {
      primary: '#333333',
      secondary: '#555555',
      light: '#999999',
    },
    border: '#DDDDDD',
  },
  breakpoints: {
    mobile: '@media (max-width: 768px)',
    tablet: '@media (min-width: 769px) and (max-width: 1024px)',
    desktop: '@media (min-width: 1025px)',
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
