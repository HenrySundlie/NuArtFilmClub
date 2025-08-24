// src/styles/FilmMenu.styles.ts
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { theme } from '../theme';

export const Container = styled.div`
  --radius: 16px;
  --border: 1px solid ${theme.colors.border ?? 'rgba(255,255,255,0.12)'};
  --ring: 2px solid ${theme.colors.accent ?? 'rgba(99,102,241,0.9)'};
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

  ${theme.breakpoints.mobile} {
    padding: ${theme.spacing.md};
  }
`;

export const Title = styled.h1`
  margin: 0 0 clamp(${theme.spacing.lg}, 3vw, ${theme.spacing.xl});
  text-align: center;
  letter-spacing: 0.06em;
  line-height: 1.08;
  font-weight: 400;
  font-size: clamp(
    ${theme.typography.h1.mobile.fontSize},
    4vw,
    ${theme.typography.h1.fontSize}
  );

  color: transparent;
  background: ${theme.textStyles.gradientPrimary};
  -webkit-background-clip: text;
  background-clip: text;
  text-wrap: balance;
`;

export const FilmGrid = styled.div`
  max-width: 1300px;
  margin: 0 auto;
  display: grid;
  gap: clamp(${theme.spacing.md}, 2.5vw, ${theme.spacing.lg});
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));

  ${theme.breakpoints.mobile} {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.md};
  }
`;

export const FilmCard = styled(Link)`
  position: relative;
  display: grid;
  grid-template-rows: auto 1fr;
  text-decoration: none;
  border-radius: ${theme.radii.md};
  overflow: clip;
  border: 1px solid ${theme.colors.text.light};
  background: ${theme.surfaces.elevatedOverlay}, ${theme.colors.surfaceDeep};
  box-shadow: none;
  transition:
    filter 220ms ease,
    background 220ms ease;

  &:hover {
    background: ${theme.surfaces.subtleOverlay}, ${theme.colors.surface};
    filter: saturate(1.02) contrast(1.01);
  }

  &:focus-visible {
    outline: var(--ring);
    outline-offset: 3px;
  }
`;

export const FilmImage = styled.img`
  width: 100%;
  aspect-ratio: 2 / 3;
  object-fit: cover;
  display: block;
  filter: saturate(1.03) contrast(1.02);
  transform: translateZ(0);
  transition: transform 450ms cubic-bezier(0.2, 0.7, 0, 1);

  ${FilmCard}:hover & {
    transform: scale(1.03);
  }

  ${theme.breakpoints.mobile} {
    aspect-ratio: auto;
    height: auto;
  }
`;

export const FilmInfo = styled.div`
  padding: clamp(${theme.spacing.md}, 2vw, ${theme.spacing.lg});
  display: grid;
  gap: calc(${theme.spacing.sm} * 0.75);
  color: ${theme.colors.text.primary};
`;

export const FilmTitle = styled.h2`
  margin: 0;
  color: ${theme.colors.text.primary};
  font-size: clamp(
    ${theme.typography.h2.mobile.fontSize},
    2.2vw,
    ${theme.typography.h2.fontSize}
  );
  line-height: 1.2;
  letter-spacing: 0.01em;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const FilmDate = styled.p`
  margin: 0;
  color: ${theme.colors.text.primary};
  font-size: 0.95rem;
  line-height: 1.4;

  &::before {
    content: '📅';
    margin-right: 0.5ch;
    opacity: 0.9;
  }
`;

export const FilmTime = styled.p`
  margin: 0;
  color: ${theme.colors.text.primary};
  font-size: 0.95rem;
  line-height: 1.4;

  &::before {
    content: '⏰';
    margin-right: 0.5ch;
    opacity: 0.9;
  }
`;
