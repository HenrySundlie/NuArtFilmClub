import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { theme } from '../theme';

export const Container = styled.div`
  --radius: 18px;
  --border: 1px solid ${theme.colors.border ?? 'rgba(255,255,255,0.12)'};
  --shadow: ${theme.shadows.lg};

  min-height: 100dvh;
  color: ${theme.colors.text.primary};
  background: ${theme.colors.background};
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

export const BackLink = styled(Link)`
  justify-self: start;
  width: 42px;
  height: 42px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  border-radius: 50%;
  border: 1px solid ${theme.colors.text.light};
  background: ${theme.colors.surfaceDeep};
  color: ${theme.colors.text.light};
  position: relative;
  transition: background ${theme.transitions.default}, color ${theme.transitions.default}, border-color ${theme.transitions.default}, filter ${theme.transitions.default};

  &::before {
    content: '';
    width: 10px;
    height: 10px;
    border-top: 2px solid currentColor;
    border-left: 2px solid currentColor;
    transform: rotate(-45deg) translateX(2px);
    margin-left: 2px;
  }

  &:hover { filter: brightness(1.15); }
  &:active { filter: brightness(0.9); }
  &:focus-visible { outline: var(--ring); outline-offset: 3px; }
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

export const MetaSection = styled.div`
  position: relative;
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radii.md};
  background: ${theme.colors.surface};
  padding: clamp(${theme.spacing.lg}, 2.5vw, ${theme.spacing.xl});
  box-shadow: none;
  display: grid;
  gap: ${theme.spacing.md};
  backdrop-filter: none;
  color: ${theme.colors.text.primary};
`;

export const MetaItem = styled.p`
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

export const ArticleContent = styled.article`
  grid-column: 1 / -1;
  margin: clamp(${theme.spacing.lg}, 4vw, ${theme.spacing.xl}) 0 0;
  padding: clamp(${theme.spacing.lg}, 2.5vw, ${theme.spacing.xl});
  background: ${theme.surfaces.elevatedOverlay}, ${theme.colors.surfaceDeep};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radii.lg};
  backdrop-filter: saturate(1.1) blur(6px);
  box-shadow: ${theme.shadows.card};
  line-height: 1.75;
  font-size: clamp(1rem, 1.05vw, 1.1rem);
  color: ${theme.colors.text.primary};

  h2, h3, h4 {
    font-weight: 500;
    letter-spacing: 0.04em;
    line-height: 1.25;
    margin: 2.2em 0 0.9em;
    color: ${theme.colors.text.primary};
  }

  p + p {
    margin-top: 1em;
  }

  a {
    color: ${theme.colors.link};
    text-decoration: underline;
    text-underline-offset: 2px;
    &:focus-visible {
      outline: ${theme.shadows.focus};
      outline-offset: 3px;
      border-radius: 4px;
    }
  }

  ul, ol {
    margin: 1em 0 1.25em;
    padding-left: 1.25em;
  }

  blockquote {
    margin: 1.5em 0;
    padding: 0.75em 1em;
    border-left: 4px solid ${theme.colors.text.light};
    background: rgba(255,255,255,0.04);
    font-style: italic;
  }
`;
