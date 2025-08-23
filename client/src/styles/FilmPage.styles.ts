// src/styles/FilmPage.styles.ts
import styled from '@emotion/styled';
import { theme } from '../theme';

export const Container = styled.div`
  --radius: 18px;
  --border: 1px solid ${theme.colors.border ?? 'rgba(255,255,255,0.12)'};
  --shadow: 0 24px 60px rgba(0, 0, 0, 0.25);

  min-height: 100dvh;
  color: ${theme.colors.text.primary};
  background: radial-gradient(
      1200px 500px at 50% -10%,
      rgba(255, 255, 255, 0.06),
      transparent
    ),
    ${theme.colors.background};
  padding: clamp(${theme.spacing.lg}, 3vw, ${theme.spacing.xl});

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
`;

export const Content = styled.div`
  max-width: min(1200px, 92vw);
  margin: 0 auto;
  display: grid;
  grid-template-columns: minmax(260px, 1fr) minmax(0, 1.8fr);
  gap: clamp(${theme.spacing.lg}, 3vw, ${theme.spacing.xl});
  align-items: start;

  ${theme.breakpoints.mobile} {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.lg};
  }
`;

export const Title = styled.h1`
  grid-column: 1 / -1;
  margin: 0 0 clamp(${theme.spacing.md}, 2vw, ${theme.spacing.lg});
  font-size: clamp(
    ${theme.typography.h1.mobile.fontSize},
    4vw,
    ${theme.typography.h1.fontSize}
  );
  line-height: 1.1;
  text-align: center;
  letter-spacing: 0.01em;

  color: transparent;
  background: linear-gradient(
    180deg,
    ${theme.colors.text.primary},
    ${theme.colors.text.secondary}
  );
  -webkit-background-clip: text;
  background-clip: text;
  text-wrap: balance;
`;

export const Image = styled.img`
  width: 100%;
  aspect-ratio: 2 / 3; /* poster-friendly; auto on mobile */
  object-fit: cover;
  border-radius: 16px;
  border: var(--border);
  box-shadow: var(--shadow);
  transform: translateZ(0);
  transition:
    transform 450ms cubic-bezier(0.2, 0.7, 0, 1),
    filter 250ms ease;

  position: sticky;
  top: clamp(12px, 6vh, 48px);

  @media (hover: hover) and (prefers-reduced-motion: no-preference) {
    &:hover {
      transform: scale(1.02);
      filter: saturate(1.05) contrast(1.02);
    }
  }

  ${theme.breakpoints.mobile} {
    position: static;
    aspect-ratio: auto;
    height: auto;
  }
`;

export const InfoSection = styled.div`
  position: relative;
  border: var(--border);
  border-radius: 16px;
  background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.05),
      rgba(255, 255, 255, 0.02)
    ),
    ${theme.colors.surface ?? 'transparent'};
  padding: clamp(${theme.spacing.lg}, 2.5vw, ${theme.spacing.xl});
  box-shadow: var(--shadow);
  display: grid;
  gap: ${theme.spacing.md};
  backdrop-filter: saturate(1.2) blur(8px);
`;

export const InfoItem = styled.p`
  margin: 0;
  display: grid;
  grid-template-columns: max(110px, 28%) 1fr;
  align-items: baseline;
  gap: calc(${theme.spacing.md} * 0.5);
  line-height: 1.6;
`;

export const Label = styled.strong`
  color: ${theme.colors.text.secondary};
  letter-spacing: 0.04em;
  text-transform: uppercase;
  font-size: 0.85rem;
`;

export const Description = styled.p`
  grid-column: 1 / -1;
  margin: clamp(${theme.spacing.md}, 3vw, ${theme.spacing.lg}) 0;
  color: ${theme.colors.text.secondary};
  font-size: clamp(1rem, 1.1vw, 1.125rem);
  line-height: 1.85;
  text-wrap: pretty;
  hanging-punctuation: first allow-end;
  hyphens: auto;
`;
