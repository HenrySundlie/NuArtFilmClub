import styled from '@emotion/styled';
import { theme } from '../theme';

export const PageContainer = styled.div`
  background: ${theme.colors.background};
  color: ${theme.colors.text.primary};
  min-height: 100vh;
  width: 100%;
  margin: 0;
  padding: 0;
  position: relative;
  overflow-x: hidden;

  ${theme.breakpoints.mobile} {
    padding: ${theme.spacing.md};
  }
`;

export const HeaderImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 400px;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 200px; /* Adjust the height of the fade as needed */
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.7), transparent);
    z-index: 1;
  }

  ${theme.breakpoints.mobile} {
    height: 300px;
  }
`;

export const HeaderImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 20%;
`;

export const Content = styled.div`
  max-width: 800px;
  margin: 60px auto 0; /* Added top margin to account for fixed navbar */
  padding: ${theme.spacing.xl};
  position: relative;
  z-index: 2;

  ${theme.breakpoints.mobile} {
    margin-top: 50px;
    padding: ${theme.spacing.md};
  }
`;

export const PageTitle = styled.h1`
  color: ${theme.colors.text.primary};
  font-size: ${theme.typography.h1.fontSize};
  margin-bottom: ${theme.spacing.xl};
  text-align: center;

  ${theme.breakpoints.mobile} {
    font-size: ${theme.typography.h1.mobile.fontSize};
    margin-bottom: ${theme.spacing.lg};
  }
`;

export const Text = styled.p`
  color: ${theme.colors.text.secondary};
  line-height: 1.8;
  font-size: 1.1rem;
  margin: ${theme.spacing.md} 0;

  ${theme.breakpoints.mobile} {
    font-size: 1rem;
  }
`;
