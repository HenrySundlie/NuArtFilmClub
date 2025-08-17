import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { theme } from '../theme';

export const Nav = styled.nav<{ isHome?: boolean }>`
  background: ${({ isHome }) =>
    isHome ? 'transparent' : theme.colors.surface};
  padding: ${theme.spacing.md};
  box-shadow: ${({ isHome }) =>
    isHome ? 'none' : '0 1px 3px rgba(255, 255, 255, 0.1)'};
  position: ${({ isHome }) => (isHome ? 'absolute' : 'fixed')};
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 1000;
  transition: ${theme.transitions.default};

  ${theme.breakpoints.mobile} {
    padding: ${theme.spacing.sm};
  }
`;

export const NavContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};

  ${theme.breakpoints.mobile} {
    gap: ${theme.spacing.sm};
  }
`;

export const NavLink = styled(Link)`
  color: ${theme.colors.text.primary};
  text-decoration: none;
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: 4px;
  transition: ${theme.transitions.default};

  &:hover {
    background: ${theme.colors.highlight};
    color: ${theme.colors.secondary};
  }

  ${theme.breakpoints.mobile} {
    padding: ${theme.spacing.xs};
    font-size: 0.9rem;
  }
`;
