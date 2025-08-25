import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { theme } from '../theme';

const linkButtonStyles = `
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: ${theme.colors.text.primary};
  font-weight: 600;
  padding: 0.6rem 0.8rem;
  border-radius: ${theme.radii.sm};
  border: 1px solid ${theme.colors.border};
  background: ${theme.colors.surface};
  transition: background ${theme.transitions.default}, color ${theme.transitions.default}, border-color ${theme.transitions.default};

  &:focus-visible {
    outline: var(--ring);
    outline-offset: 3px;
  }
  @media (hover: hover) {
    &:hover { background: ${theme.colors.highlight}; }
  }
`;

const StyledLink = styled(Link)`
  ${linkButtonStyles}
`;
const StyledAnchor = styled.a`
  ${linkButtonStyles}
`;

interface LinkButtonProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to?: string;
}

function isExternal(href?: string) {
  return !!href && /^(?:[a-z]+:)?\/\//i.test(href);
}

export function LinkButton({ to, ...props }: LinkButtonProps) {
  if (!to) return <StyledAnchor {...props} />;
  if (isExternal(to)) return <StyledAnchor href={to} {...props} />;
  return <StyledLink to={to} {...props} />;
}
