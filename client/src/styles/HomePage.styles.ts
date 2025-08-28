// src/styles/HomePage.styles.ts
import styled from '@emotion/styled';
import { theme } from '../theme';

// ============================================================================
// CSS Custom Properties
// ============================================================================

export const HEADER_IMAGE_HEIGHT = '50vh';
export const MOBILE_CARD_HEIGHT = '160px';

// ============================================================================
// Header Image Section
// ============================================================================

/**
 * Container for the header image section that spans full viewport width
 * and positions the MobileActionCard at its bottom edge
 */
export const HeaderImageContainer = styled.div<{ darkFade?: boolean }>`
  --header-image-height: ${HEADER_IMAGE_HEIGHT};
  position: relative;
  width: 100vw;
  height: var(--header-image-height);
  /* Raise stacking to ensure fade overlay can sit above page content */
  z-index: 1000;
  
  /* Full-width positioning to break out of container constraints */
  margin-left: calc(-50vw + 50%);
  margin-right: calc(-50vw + 50%);
  /* Remove negative margin to prevent title from being pushed off-screen */
  margin-top: 0;
  
  /* Center image content */
  display: flex;
  align-items: center;
  justify-content: center;

  /* Top fade overlay for title legibility: fixed so it remains on scroll */
  &::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 240px;
    background: ${({ darkFade }) =>
      darkFade
        ? 'linear-gradient(to bottom, rgba(0, 0, 0, 0.95), transparent)'
        : 'linear-gradient(to bottom, rgba(0, 0, 0, 0.85), transparent)'};
  /* Place fade above everything except the overlaid title */
  z-index: 1001;
    pointer-events: none;
  }

  /* Soft vignette effect for better image integration */
  &:has(img) {
    box-shadow:
      inset 0 -80px 120px -60px ${theme.colors.background},
      inset 0 60px 120px -60px rgba(0, 0, 0, 0.6);
  }

  /* Mobile-specific adjustments */
  ${theme.breakpoints.mobile} {
    height: var(--header-image-height);
    /* Ensure proper positioning context for MobileActionCard */
    position: relative;
  }
  
  /* Ensure this container doesn't interfere with document flow */
  &::after {
    content: '';
    display: block;
    height: 0;
    clear: both;
  }
`;

// ============================================================================
// Typography Components
// ============================================================================

export const PageTitle = styled.h1<{
  fontWeight?: number;
  letterSpacing?: string;
  overlay?: boolean;
}>`
  --fg1: ${theme.colors.text.primary};
  --fg2: ${theme.colors.text.secondary};

  margin: 0 0 clamp(${theme.spacing.lg}, 3vw, ${theme.spacing.xl});
  text-align: center;
  line-height: 1.1;
  letter-spacing: ${({ letterSpacing }) => letterSpacing || '0.01em'};
  font-weight: ${({ fontWeight }) =>
    fontWeight || theme.typography.h1.fontWeight};
  font-size: clamp(
    ${theme.typography.h1.mobile.fontSize},
    3.6vw,
    ${theme.typography.h1.fontSize}
  );  

  color: transparent;
  background: linear-gradient(180deg, var(--fg1), var(--fg2));
  -webkit-background-clip: text;
  background-clip: text;
  text-wrap: balance;
  z-index: 3;

  ${({ overlay }) =>
    overlay
      ? `
    position: absolute;
    top: ${theme.spacing.lg};
    left: 50%;
    transform: translateX(-50%);
    width: min(100%, 96vw);
    margin-bottom: 0;
  color: #fff;
  background: none;
  -webkit-text-fill-color: #fff; /* Ensure solid white on Safari */
  -webkit-background-clip: initial;
  background-clip: initial;
  /* Remove stroke and heavy shadows for the overlaid white title so it appears solid */
  -webkit-text-stroke: 0;
  text-shadow: none;
  z-index: 1002; /* Above the fade overlay */
    pointer-events: none;
    @media (max-width: 768px) { top: ${theme.spacing.lg}; }
  `
      : ''}

  ${theme.breakpoints.mobile} {
    margin-bottom: ${theme.spacing.lg};
  }
`;

// ============================================================================
// Floating Logo (mobile only)
// ============================================================================

export const FloatingLogo = styled.div<{ visible?: boolean }>`
  position: fixed;
  /* Position so the logo vertically centers with the MenuIcon (44px height).
    We offset by half the difference between the icon height and the responsive font-size. */
  top: calc(${theme.spacing.md} + (44px - clamp(22px, 10vw, 30px)) / 2);
  left: ${theme.spacing.md};
  z-index: 1100; /* Above fades and content */
  color: #fff;
  font-family: ${theme.typography.fontFamily};
  font-weight: 600;
  letter-spacing: 0.12em;
  font-size: clamp(22px, 10vw, 30px);
  line-height: 1;
  text-transform: uppercase;
  pointer-events: none;
  opacity: 0;
  transition: opacity ${theme.transitions.default};

  ${theme.breakpoints.mobile} {
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  }

  ${theme.breakpoints.desktop} {
    display: none;
  }
`;

// ============================================================================
// Content Section
// ============================================================================

/**
 * Container for the main content below the header image section
 * Provides proper spacing from the mobile action card and flows with page scroll
 */
export const ContentSection = styled.section`
  padding: ${theme.spacing.xl} ${theme.spacing.md};
  max-width: 1200px;
  margin: 0 auto;
  
  /* Default desktop spacing: sit just below the header image */
  /* Previously we added HEADER_IMAGE_HEIGHT again which created a huge gap. */
  margin-top: clamp(${theme.spacing.md}, 2.5vw, ${theme.spacing.xl});
  
  /* Ensure content appears above the header image section and flows properly */
  position: relative;
  z-index: 10;
  
  /* Clear any floating or positioning issues */
  clear: both;
  
  /* Ensure content flows naturally after the header */
  display: block;
  
  /* Typography using the theme's default font */
  font-family: ${theme.typography.fontFamily};
  font-size: clamp(15px, 0.6vw + 12px, 18px);
  line-height: 1.6;
  color: ${theme.colors.text.secondary};
  
  /* Remove scrollable container - let content flow with page */
  /* overflow-y: auto; */
  /* max-height: 60vh; */
  
  /* Responsive adjustments */
  ${theme.breakpoints.mobile} {
  /* Use shared mobile content padding so text doesn't hug the edges */
  padding: ${theme.layout.contentPadding.mobile.y} ${theme.layout.contentPadding.mobile.x};
  /* Card has its own bottom margin; start content immediately after and use padding for spacing */
  margin-top: 0;
  /* Use a comfortable default body size on mobile (about 16px) */
  font-size: ${theme.typography.body.mobile?.fontSize ?? '16px'};
    /* max-height: 50vh; */
  }
`;

/**
 * Container for the content text with proper spacing and readability
 */
export const ContentText = styled.div`
  /* Sample text styling */
  p {
    margin-bottom: ${theme.spacing.md};
  text-align: justify;
    hyphens: auto;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
  
  /* Headings within content */
  h2, h3 {
    color: ${theme.colors.text.primary};
  margin: ${theme.spacing.lg} 0 ${theme.spacing.md} 0;
    font-weight: 600;
  }
  
  h2 {
    font-size: 1.2em;
  }
  
  h3 {
    font-size: 1.1em;
  }
  
  /* Lists */
  ul, ol {
    margin: ${theme.spacing.md} 0;
    padding-left: ${theme.spacing.lg};
  }
  
  li {
    margin-bottom: ${theme.spacing.sm};
  }

  /* Ensure links are visibly underlined within content */
  a {
    color: ${theme.colors.link};
    text-decoration: underline;
    text-underline-offset: 2px;
  }

  /* Improve readability on smaller screens */
  ${theme.breakpoints.mobile} {
  p { text-align: left; hyphens: auto; }
  h2, h3 { margin-top: ${theme.spacing.md}; }
  & > :first-of-type { margin-top: 0; }
  ul, ol { margin: ${theme.spacing.sm} 0 ${theme.spacing.md}; }
  }
`;