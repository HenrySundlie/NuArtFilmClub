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
  background: ${theme.colors.background};
  padding: clamp(${theme.spacing.lg}, 3vw, ${theme.spacing.xl});

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  ${theme.breakpoints.mobile} {
    padding: ${theme.spacing.md};
  }
`;

export const Title = styled.h1`
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
    max-width: 100%;
    padding-inline: 0;
    display: block;
  }
`;

export const ArticleGrid = styled.div`
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

export const ArticleCard = styled(Link)`
  position: relative;
  display: grid;
  grid-template-columns: clamp(120px, 30%, 210px) 1fr;
  align-items: stretch;
  text-decoration: none;
  border-radius: ${theme.radii.md};
  overflow: clip;
  border: 1px solid ${theme.colors.border};
  background: ${theme.colors.surface};
  box-shadow: none;
  transition:
    filter 220ms ease,
    background 220ms ease,
    box-shadow 220ms ease;
  min-height: clamp(150px, 18vw, 180px);

  &:hover {
    background: ${theme.colors.surface};
    box-shadow: ${theme.shadows.card};
    filter: saturate(1.02) contrast(1.01);
  }

  &:focus-visible {
    outline: var(--ring);
    outline-offset: 3px;
  }

  ${theme.breakpoints.mobile} {
    grid-template-columns: clamp(95px, 34%, 160px) 1fr;
    min-height: 150px;
  }
`;

export const ArticleImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  filter: saturate(1.03) contrast(1.02);
  transform: translateZ(0);
  transition: transform 450ms cubic-bezier(0.2, 0.7, 0, 1);

  ${ArticleCard}:hover & {
    transform: scale(1.03);
  }

  ${theme.breakpoints.mobile} {
    height: 100%;
  }
`;

export const ArticleInfo = styled.div`
  padding: clamp(${theme.spacing.md}, 2vw, ${theme.spacing.lg});
  display: grid;
  grid-template-areas: 'title' 'details';
  grid-template-columns: 1fr;
  align-content: start;
  align-items: start;
  gap: calc(${theme.spacing.sm} * 0.75);
  color: ${theme.colors.text.primary};
  min-width: 0;

  .article-title-row {
    grid-area: title;
    align-self: start;
  }
  .details {
    grid-area: details;
    display: flex;
    flex-direction: column;
    gap: 1px;
    align-items: flex-start;
  }

  ${theme.breakpoints.mobile} {
    gap: calc(${theme.spacing.sm} * 0.6);
    text-align: center;
    justify-items: center;
    align-items: center;
    .details {
      align-items: center;
    }
  }
`;

export const ArticleTitle = styled.h2`
  margin: 0;
  color: ${theme.colors.text.primary};
  font-size: clamp(
    ${theme.typography.h2.mobile.fontSize},
    2.2vw,
    ${theme.typography.h2.fontSize}
  );
  font-weight: 400;
  line-height: 1.2;
  letter-spacing: 0.01em;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const ArticleDate = styled.p`
  margin: 0;
  color: ${theme.colors.text.primary};
  font-size: clamp(0.95rem, 0.7rem + 0.55vw, 1.2rem);
  line-height: 1.25;

  &::before {
    margin-right: 0.5ch;
    opacity: 0.9;
  }
`;

export const ArticleAuthor = styled.p`
  margin: 0;
  color: ${theme.colors.text.secondary ?? 'rgba(255,255,255,0.78)'};
  font-size: clamp(0.85rem, 0.75rem + 0.6vw, 1rem);
  line-height: 1.35;

  ${theme.breakpoints.mobile} {
    font-size: clamp(0.82rem, 1.6vw, 0.98rem);
  }
`;
