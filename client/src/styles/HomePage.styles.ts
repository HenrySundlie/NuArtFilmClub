// src/styles/HeroPage.styles.ts
import styled from '@emotion/styled';
import { theme } from '../theme';

export const PageContainer = styled.div`
  --radius: 18px;
  --border: 1px solid ${theme.colors.border ?? 'rgba(255,255,255,0.12)'};
  --ring: 2px solid ${theme.colors.accent ?? 'rgba(99,102,241,0.9)'};
  --shadow: 0 28px 80px rgba(0, 0, 0, 0.28);

  min-height: 100dvh;
  color: ${theme.colors.text.primary};
  background: radial-gradient(
      1200px 500px at 50% -10%,
      rgba(255, 255, 255, 0.06),
      transparent
    ),
    ${theme.colors.background};

  ${theme.breakpoints.mobile} {
    padding: ${theme.spacing.md};
  }
`;

export const HeaderImageContainer = styled.div`
  position: relative;
  width: 100vw;
  height: 40vh;
  overflow: hidden;
  z-index: 0;
  margin-left: calc(-50vw + 50%);
  margin-right: calc(-50vw + 50%);

  /* top fade for title legibility */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 200px;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.88), transparent);
    z-index: 1;
    pointer-events: none;
  }

  /* bottom fade into page background */
  &::after {
    content: '';
    position: absolute;
    inset: 70% 0 0;
    background: linear-gradient(
      to top,
      ${theme.colors.background},
      transparent 55%
    );
    z-index: 1;
    pointer-events: none;
  }

  /* soft vignette without banding */
  &:has(img) {
    box-shadow:
      inset 0 -80px 120px -60px ${theme.colors.background},
      inset 0 60px 120px -60px rgba(0, 0, 0, 0.6);
  }

  ${theme.breakpoints.mobile} {
    height: 40vh;
  }
`;

export const Content = styled.div`
  max-width: min(1100px, 92vw);
  margin: 0 auto;
  padding: clamp(${theme.spacing.lg}, 3vw, ${theme.spacing.xl});

  ${theme.breakpoints.mobile} {
    padding: ${theme.spacing.md};
  }
`;

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

export const Text = styled.p`
  color: ${theme.colors.text.secondary};
  line-height: 1.85;
  font-size: clamp(1rem, 1.1vw, 1.125rem);
  margin: ${theme.spacing.md} 0;
  max-width: 70ch;
  text-wrap: pretty;
  hanging-punctuation: first allow-end;
  hyphens: auto;

  ${theme.breakpoints.mobile} {
    font-size: 1rem;
  }
`;