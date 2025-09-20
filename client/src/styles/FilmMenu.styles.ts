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
  text-align: left;
  letter-spacing: 0.04em;
  line-height: 1.08;
  font-weight: 400;
  font-size: clamp(
    ${theme.typography.h1.mobile.fontSize},
    4vw,
    ${theme.typography.h1.fontSize}
  );

  color: #ffffff;
  background: none;
  -webkit-background-clip: initial;
  background-clip: initial;
  position: relative;
  z-index: 0;
  text-wrap: balance;

  ${theme.breakpoints.mobile} {
    max-width: calc(100% - 64px);
    display: block;
  }
`;

export const FilmGrid = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  display: grid;
  gap: clamp(${theme.spacing.md}, 2.5vw, ${theme.spacing.lg});
  grid-template-columns: 1fr;

  ${theme.breakpoints.desktop} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  ${theme.breakpoints.mobile} {
    gap: ${theme.spacing.md};
  }
`;

export const FilmCard = styled(Link)`
  position: relative;
  display: grid;
  /* Make desktop cards closer to mobile sizing */
  grid-template-columns: clamp(110px, 22%, 180px) 1fr;
  align-items: stretch;
  text-decoration: none;
  border-radius: ${theme.radii.md};
  overflow: clip;
  border: 1px solid ${theme.colors.text.light};
  background: ${theme.surfaces.elevatedOverlay}, ${theme.colors.surfaceDeep};
  box-shadow: none;
  transition:
    filter 220ms ease,
    background 220ms ease;
  min-height: clamp(150px, 18vw, 180px);

  &:hover {
    background: ${theme.surfaces.subtleOverlay}, ${theme.colors.surface};
    filter: saturate(1.02) contrast(1.01);
  }

  &:focus-visible {
    outline: var(--ring);
    outline-offset: 3px;
  }

  ${theme.breakpoints.mobile} {
    grid-template-columns: clamp(110px, 40%, 180px) 1fr;
    min-height: 160px;
  }
`;

export const FilmImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  filter: saturate(1.03) contrast(1.02);
  transform: translateZ(0);
  transition: transform 450ms cubic-bezier(0.2, 0.7, 0, 1);

  ${FilmCard}:hover & {
    transform: scale(1.03);
  }

  ${theme.breakpoints.mobile} {
    height: 100%;
  }
`;

export const FilmInfo = styled.div`
  padding: clamp(${theme.spacing.md}, 2vw, ${theme.spacing.lg});
  display: grid;
  align-content: center;
  gap: calc(${theme.spacing.sm} * 0.75);
  color: ${theme.colors.text.primary};
  min-width: 0; /* allow text truncation/clamping */
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
    margin-right: 0.5ch;
    opacity: 0.9;
  }
`;

export const SectionHeading = styled.h2`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.25rem;
  margin: 0 0 1.25rem;
  font-weight: 500;
  letter-spacing: 0.02em;
  text-align: center;
  font-size: clamp(1.5rem, 2.5vw, 2rem);
  color: ${theme.colors.text.primary};
  text-wrap: balance;

  &::before,
  &::after {
    content: '';
    flex: 1 1 auto;
    height: 1px;
    background: ${theme.colors.text.primary};
    max-width: 420px; /* prevents overly long lines on ultra-wide */
    opacity: 0.8;
  }

  &::before { margin-left: clamp(0.5rem, 2vw, 2rem); }
  &::after { margin-right: clamp(0.5rem, 2vw, 2rem); }

  ${theme.breakpoints.mobile} {
    gap: 0.85rem;
    font-size: clamp(1.4rem, 5.5vw, 1.75rem);
  }
`;

export const FilmTime = styled.p`
  margin: 0;
  color: ${theme.colors.text.primary};
  font-size: 0.95rem;
  line-height: 1.4;

  &::before {
    margin-right: 0.5ch;
    opacity: 0.9;
  }
`;
