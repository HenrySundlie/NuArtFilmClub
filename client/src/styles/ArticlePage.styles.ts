import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { theme } from '../theme';

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
  margin-bottom: ${theme.spacing.lg};

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
  margin: clamp(${theme.spacing.md}, 2vw, ${theme.spacing.lg}) 0 clamp(${theme.spacing.md}, 2vw, ${theme.spacing.lg});
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
  margin: clamp(${theme.spacing.lg}, 3vw, ${theme.spacing.xl}) 0;
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
  margin: clamp(${theme.spacing.md}, 3vw, ${theme.spacing.lg}) 0;
  color: ${theme.colors.text.primary};
  font-size: clamp(1rem, 1.1vw, 1.125rem);
  line-height: 1.85;
  text-wrap: pretty;
  hanging-punctuation: first allow-end;
  hyphens: auto;
`;
