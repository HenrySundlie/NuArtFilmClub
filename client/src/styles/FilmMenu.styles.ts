import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { theme } from '../theme';

export const Container = styled.div`
  background: ${theme.colors.background};
  color: ${theme.colors.text.primary};
  min-height: 100vh;
  padding: ${theme.spacing.xl};

  ${theme.breakpoints.mobile} {
    padding: ${theme.spacing.md};
  }
`;

export const Title = styled.h1`
  color: ${theme.colors.text.primary};
  font-size: ${theme.typography.h1.fontSize};
  margin-bottom: ${theme.spacing.xl};
  text-align: center;

  ${theme.breakpoints.mobile} {
    font-size: ${theme.typography.h1.mobile.fontSize};
    margin-bottom: ${theme.spacing.lg};
  }
`;

export const FilmGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: ${theme.spacing.lg};
  max-width: 1200px;
  margin: 0 auto;

  ${theme.breakpoints.mobile} {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.md};
  }
`;

export const FilmCard = styled(Link)`
  background: ${theme.colors.surface};
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: ${theme.transitions.default};
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
`;

export const FilmImage = styled.img`
  width: 100%;
  height: 350px;
  object-fit: cover;
`;

export const FilmInfo = styled.div`
  padding: ${theme.spacing.md};
`;

export const FilmTitle = styled.h2`
  color: ${theme.colors.text.primary};
  margin: 0 0 ${theme.spacing.xs} 0;
  font-size: ${theme.typography.h2.fontSize};

  ${theme.breakpoints.mobile} {
    font-size: ${theme.typography.h2.mobile.fontSize};
  }
`;

export const FilmDate = styled.p`
  color: ${theme.colors.text.secondary};
  margin: ${theme.spacing.xs} 0;
  font-size: 0.9rem;
`;

export const FilmTime = styled.p`
  color: ${theme.colors.text.light};
  margin: 0;
  font-size: 0.9rem;
`;
