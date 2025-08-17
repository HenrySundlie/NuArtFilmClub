import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { theme } from '../theme';

export const MenuIcon = styled.div`
  position: fixed;
  top: ${theme.spacing.md};
  right: ${theme.spacing.md};
  width: 30px;
  height: 22px;
  cursor: pointer;
  z-index: 1002;

  div {
    width: 100%;
    height: 3px;
    background-color: ${theme.colors.text.primary};
    margin: 5px 0;
    transition: 0.4s;
  }
`;

export const MenuCard = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  width: 250px;
  height: 100%;
  background-color: ${theme.colors.surface};
  box-shadow: -2px 0 5px rgba(0,0,0,0.5);
  transform: ${({ isOpen }) => (isOpen ? 'translateX(0)' : 'translateX(100%)')};
  transition: transform 0.3s ease-in-out;
  z-index: 1001;
  padding: 60px ${theme.spacing.md} ${theme.spacing.md};
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
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
