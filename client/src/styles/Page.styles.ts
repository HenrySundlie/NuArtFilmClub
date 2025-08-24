// src/styles/Page.styles.ts
import styled from '@emotion/styled';
import { theme } from '../theme';

// ============================================================================
// Layout Components
// ============================================================================

export const PageContainer = styled.div`
  --radius: 18px;
  --ring: 2px solid ${theme.colors?.accent ?? 'rgba(99, 102, 241, 0.9)'};
  --shadow-lg: 0 18px 60px rgba(0, 0, 0, 0.25);

  background: radial-gradient(
      1200px 500px at 50% -10%,
      rgba(255, 255, 255, 0.06),
      transparent
    ),
    ${theme.colors.background};
  color: ${theme.colors.text.primary};
  min-height: 100dvh;
  display: grid;
  grid-template-rows: auto 1fr auto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding-inline: max(${theme.spacing.md}, env(safe-area-inset-left));
  padding-inline-end: max(${theme.spacing.md}, env(safe-area-inset-right));

  ${theme.breakpoints.mobile} {
    padding-inline: ${theme.spacing.md};
  }
`;

// ============================================================================
// Hero / Header Image Components
// ============================================================================

export const HeaderImageContainer = styled.figure`
  position: relative;
  width: 100%;
  height: clamp(280px, 38vh, 560px);
  margin: 0;
  overflow: clip;
  border-radius: 0;
  isolation: isolate;
  box-shadow: var(--shadow-lg);

  /* Top fade for legible titles */
  &::before {
    content: '';
    position: absolute;
    inset: 0 0 60%;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.65),
      transparent 70%
    );
    z-index: 1;
    pointer-events: none;
  }

  /* Bottom fade into page */
  &::after {
    content: '';
    position: absolute;
    inset: 65% 0 0;
    background: linear-gradient(
      to top,
      ${theme.colors.background},
      transparent 55%
    );
    z-index: 1;
    pointer-events: none;
  }

  ${theme.breakpoints.mobile} {
    height: clamp(220px, 32vh, 380px);
  }
`;

// ============================================================================
// Content Area Components
// ============================================================================

export const Content = styled.main`
  width: 100%;
  max-width: 1200px;
  margin-inline: auto;
  padding: clamp(${theme.spacing.lg}, 3vw, ${theme.spacing.xl});
  display: grid;
  gap: clamp(${theme.spacing.lg}, 2.5vw, ${theme.spacing.xl});

  ${theme.breakpoints.mobile} {
    padding: ${theme.spacing.md};
    gap: ${theme.spacing.lg};
  }
`;

// ============================================================================
// Typography Components
// ============================================================================

export const PageTitle = styled.h1<{
  fontWeight?: number;
  letterSpacing?: string;
}>`
  --title-fg: ${theme.colors.text.primary};
  margin: 0;
  text-align: center;
  line-height: 1.1;
  letter-spacing: ${({ letterSpacing }) => letterSpacing || '0.01em'};
  font-weight: ${({ fontWeight }) =>
    fontWeight || theme.typography.h1.fontWeight};
  font-size: clamp(
    ${theme.typography.h1.mobile.fontSize},
    3.5vw,
    ${theme.typography.h1.fontSize}
  );
  color: transparent;
  background: linear-gradient(
    180deg,
    ${theme.colors.text.primary},
    ${theme.colors.text.secondary}
  );
  -webkit-background-clip: text;
  background-clip: text;
  text-wrap: balance;
  margin-bottom: clamp(${theme.spacing.lg}, 3vw, ${theme.spacing.xl});
`;

export const Text = styled.p`
  color: ${theme.colors.text.secondary};
  line-height: 1.85;
  font-size: clamp(1rem, 1.1vw, 1.125rem);
  max-width: 70ch;
  margin: ${theme.spacing.md} auto;
  text-wrap: pretty;
  hanging-punctuation: first allow-end;
  hyphens: auto;
`;

// ============================================================================
// Reusable UI Components
// ============================================================================

export const Section = styled.section`
  position: relative;
  border-radius: var(--radius);
  border: 1px solid ${theme.colors.border ?? 'rgba(255,255,255,0.12)'};
  background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.05),
      rgba(255, 255, 255, 0.02)
    ),
    ${theme.colors.surface ?? 'transparent'};
  box-shadow: var(--shadow-lg);
  padding: clamp(${theme.spacing.lg}, 2.5vw, ${theme.spacing.xl});
  backdrop-filter: saturate(1.2) blur(8px);
`;

export const Grid = styled.div<{
  min?: string;
}>`
  display: grid;
  gap: clamp(${theme.spacing.md}, 2vw, ${theme.spacing.lg});
  grid-template-columns: repeat(
    auto-fit,
    minmax(${({ min }) => min || '260px'}, 1fr)
  );
`;

export const Card = styled.article`
  border-radius: calc(var(--radius) - 4px);
  border: 1px solid ${theme.colors.border ?? 'rgba(255,255,255,0.12)'};
  background: ${theme.colors.surface ?? 'rgba(255,255,255,0.02)'};
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.18);
  overflow: clip;
`;

export const CardBody = styled.div`
  padding: ${theme.spacing.lg};
  display: grid;
  gap: ${theme.spacing.md};
`;

export const Button = styled.button`
  appearance: none;
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radii.sm};
  padding: 0.7rem 1rem;
  font-weight: 600;
  color: ${theme.colors.text.primary};
  background: ${theme.colors.surface};
  cursor: pointer;
  transition: background ${theme.transitions.default}, color ${theme.transitions.default}, border-color ${theme.transitions.default};

  &:hover {
    background: ${theme.colors.highlight};
  }
  &:active {
    background: ${theme.colors.surface};
  }
  &:focus-visible {
    outline: var(--ring);
    outline-offset: 3px;
  }
  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }
`;

export const Divider = styled.hr`
  border: 0;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    ${theme.colors.border ?? 'rgba(255,255,255,0.16)'},
    transparent
  );
  margin: ${theme.spacing.lg} 0;
`;

// ============================================================================
// A11y Components
// ============================================================================

export const SkipLink = styled.a`
  position: absolute;
  top: -100px;
  left: 0;
  background: ${theme.colors.background};
  color: ${theme.colors.text.primary};
  padding: 0.75rem 1rem;
  border-radius: 10px;
  border: 1px solid ${theme.colors.border ?? 'rgba(255,255,255,0.2)'};
  box-shadow: var(--shadow-lg);
  &:focus {
    top: 12px;
    left: 12px;
  }
`;

// ============================================================================
// Motion Preferences
// ============================================================================

export const ReduceMotion = styled.div`
  @media (prefers-reduced-motion: reduce) {
    * {
      animation: none !important;
      transition: none !important;
    }
  }
`;
