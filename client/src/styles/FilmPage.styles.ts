// src/styles/FilmPage.styles.ts
import styled from '@emotion/styled';
import { theme } from '../theme';

export const Container = styled.div`
  --radius: 18px;
  --border: 1px solid ${theme.colors.border ?? 'rgba(255,255,255,0.12)'};
  --shadow: ${theme.shadows.lg};

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
  grid-template-columns: 1fr;
  gap: clamp(${theme.spacing.lg}, 3vw, ${theme.spacing.xl});
  align-items: start;
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
  letter-spacing: 0.08em;
  font-weight: 400;

  color: transparent;
  background: ${theme.textStyles.gradientPrimary};
  -webkit-background-clip: text;
  background-clip: text;
  text-wrap: balance;
`;

/* Poster image removed from FilmPage */

export const InfoSection = styled.div`
  position: relative;
  border: 1px solid ${theme.colors.text.light};
  border-radius: ${theme.radii.md};
  background: ${theme.surfaces.elevatedOverlay}, ${theme.colors.surfaceDeep};
  padding: clamp(${theme.spacing.lg}, 2.5vw, ${theme.spacing.xl});
  box-shadow: none;
  display: grid;
  gap: ${theme.spacing.md};
  backdrop-filter: saturate(1.2) blur(8px);
  color: ${theme.colors.text.primary};
`;

export const InfoItem = styled.p`
  margin: 0;
  display: grid;
  grid-template-columns: max(110px, 28%) 1fr;
  align-items: baseline;
  gap: calc(${theme.spacing.md} * 0.5);
  line-height: 1.6;
  color: ${theme.colors.text.primary};
`;

export const Label = styled.strong`
  color: ${theme.colors.text.primary};
  letter-spacing: 0.04em;
  text-transform: uppercase;
  font-size: 0.85rem;
`;

export const Description = styled.p`
  grid-column: 1 / -1;
  margin: clamp(${theme.spacing.md}, 3vw, ${theme.spacing.lg}) 0;
  color: ${theme.colors.text.primary};
  font-size: clamp(1rem, 1.1vw, 1.125rem);
  line-height: 1.85;
  text-wrap: pretty;
  hanging-punctuation: first allow-end;
  hyphens: auto;
`;
