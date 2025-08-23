// src/styles/HomePage.styles.ts
import styled from '@emotion/styled';
import { theme } from '../theme';

// ============================================================================
// CSS Custom Properties
// ============================================================================

export const HEADER_IMAGE_HEIGHT = '40vh';

// ============================================================================
// Header Image Section
// ============================================================================

/**
 * Container for the header image section that spans full viewport width
 * and positions the MobileActionCard at its bottom edge
 */
export const HeaderImageContainer = styled.div`
  --header-image-height: ${HEADER_IMAGE_HEIGHT};
  position: relative;
  width: 100vw;
  height: var(--header-image-height);
  z-index: 0;
  
  /* Full-width positioning to break out of container constraints */
  margin-left: calc(-50vw + 50%);
  margin-right: calc(-50vw + 50%);
  margin-top: calc(-1 * ${theme.spacing.sm});
  
  /* Center image content */
  display: flex;
  align-items: center;
  justify-content: center;

  /* Top fade overlay for title legibility */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 300px;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.88), transparent);
    z-index: 1;
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
  z-index: 2;

  ${({ overlay }) =>
    overlay
      ? `
    position: absolute;
    top: ${theme.spacing.md};
    left: 50%;
    transform: translateX(-50%) translateY(-.6em);
    width: min(100%, 96vw);
    margin-bottom: 0;
    color: #fff;
    background: none;
    -webkit-text-stroke: 0.6px rgba(0,0,0,0.35);
    text-shadow:
      0 2px 16px rgba(0,0,0,0.7),
      0 1px 2px rgba(0,0,0,0.8);
    pointer-events: none;
    @media (max-width: 768px) { top: ${theme.spacing.md}; }
  `
      : ''}

  ${theme.breakpoints.mobile} {
    margin-bottom: ${theme.spacing.lg};
  }
`;