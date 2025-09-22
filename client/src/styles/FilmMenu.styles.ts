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
  /* Center within the same max-width as the film grid so left edges align */
  margin: 0 auto clamp(${theme.spacing.lg}, 3vw, ${theme.spacing.xl});
  max-width: 1100px;
  padding-inline: 0;
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
    /* On mobile we keep it full width inside container padding */
    max-width: 100%;
    padding-inline: 0;
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
  /* Increase poster/image share of horizontal space */
  grid-template-columns: clamp(120px, 30%, 210px) 1fr;
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

  /* Compact variant for Previous films (title only) */
  &.compact {
    /* Even smaller minimum height for previous films */
    min-height: clamp(85px, 11vw, 118px);
    /* Slightly narrower image column so text area doesn't force extra height */
    grid-template-columns: clamp(100px, 25%, 170px) 1fr;
  }

  ${theme.breakpoints.mobile} {
    /* Slightly more image width on small screens as well */
    grid-template-columns: clamp(110px, 48%, 200px) 1fr;
    min-height: 160px;

    &.compact {
      min-height: 100px;
      grid-template-columns: clamp(95px, 44%, 150px) 1fr;
    }
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

  /* Compact variant: limit the intrinsic height pressure by constraining aspect ratio */
  ${FilmCard}.compact & {
    aspect-ratio: 2 / 3;
    /* Allow the container's min-height to dominate instead of natural image expansion */
    height: 100%;
  }
`;

export const FilmInfo = styled.div`
  padding: clamp(${theme.spacing.md}, 2vw, ${theme.spacing.lg});
  display: grid;
  /* Layout: title on its own row; below it two columns (details left, button right) without changing overall card size */
  grid-template-areas:
    'title title'
    'details ticket';
  /* Two flexible columns so ticket button can stretch */
  grid-template-columns: 1fr 1fr;
  /* Make second row fill available height so button can stretch */
  grid-auto-rows: auto 1fr;
  align-content: start;
  align-items: start;
  gap: calc(${theme.spacing.sm} * 0.75) ${theme.spacing.md};
  color: ${theme.colors.text.primary};
  min-width: 0; /* allow text truncation/clamping */

  .film-title-row { grid-area: title; align-self: start; }
  .details { 
    grid-area: details; 
    display: flex; 
    flex-direction: column; 
    gap: 2px; 
    align-items: flex-start; 
  }
  .ticket-btn {
    grid-area: ticket;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.65rem 1rem;
    width: 100%;
    /* Increased font size for better prominence */
    font-size: clamp(0.95rem, 0.8rem + 0.5vw, 1.15rem);
    line-height: 1.15;
    font-weight: 600;
    font-family: 'EB Garamond', serif;
    white-space: normal;
    margin-right: 0;
    align-self: stretch; /* occupy full height of its grid cell */
  }

  /* Ensure long titles don't push layout oddly */
  .film-title-row > * { margin-bottom: 2px; }

  /* Mobile: revert to previous vertical flow with full-width ticket button at bottom */
  ${theme.breakpoints.mobile} {
    grid-template-areas: 'title' 'details' 'ticket';
    grid-template-columns: 1fr;
    align-content: center;
    align-items: center;
    text-align: center;
    gap: calc(${theme.spacing.sm} * 0.6);

    .film-title-row { align-self: center; }
    .details { align-items: center; }
    .ticket-btn {
      width: 100%;
      aspect-ratio: auto; /* allow natural height */
      padding: 0.7rem 1rem; /* revert to normal button padding */
      /* Keep it slightly larger on mobile too */
      font-size: clamp(0.98rem, 0.92rem + 0.6vw, 1.2rem);
      margin-right: 0; /* reset desktop margin */
    }
  }

  ${FilmCard}.compact & {
    /* Balanced horizontal padding; center content */
    padding: calc(${theme.spacing.xs} + 4px) clamp(${theme.spacing.md}, 4vw, ${theme.spacing.lg});
    gap: ${theme.spacing.xs};
    justify-items: center;
    text-align: center;
    align-content: center;
    /* Compact variant keeps original simple stack */
    grid-template-areas: 'title';
    grid-template-columns: 1fr;
  }
`;

export const FilmTitle = styled.h2`
  margin: 0;
  color: ${theme.colors.text.primary};
  font-size: clamp(
    ${theme.typography.h2.mobile.fontSize},
    2.2vw,
    ${theme.typography.h2.fontSize}
  );
  /* Drop the heavier default h2 weight; make card titles lighter */
  font-weight: 400;
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
