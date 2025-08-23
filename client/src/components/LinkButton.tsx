import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { theme } from '../theme';

const linkButtonStyles = `
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: ${theme.colors.link ?? theme.colors.text.primary};
  font-weight: 600;
  padding: 0.5rem 0.25rem;
  border-radius: 10px;

  &:focus-visible {
    outline: var(--ring);
    outline-offset: 3px;
  }
  @media (hover: hover) {
    &:hover {
      text-decoration: underline;
    }
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

export function LinkButton({ to, ...props }: LinkButtonProps) {
  if (to) {
    return <StyledLink to={to} {...props} />;
  }
  return <StyledAnchor {...props} />;
}
