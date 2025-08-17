import styled from '@emotion/styled';
import { theme } from '../theme';

export const PageContainer = styled.div`
  position: relative;
  background: ${theme.colors.background};
  color: ${theme.colors.text.primary};
  min-height: 100vh;

  ${theme.breakpoints.mobile} {
    padding: ${theme.spacing.md};
  }
`;

export const HeaderImage = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
  object-position: center 20%;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 150px;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.5) 0%,
      rgba(0, 0, 0, 0) 100%
    );
  }

  ${theme.breakpoints.mobile} {
    height: 300px;
  }
`;

export const Content = styled.div`
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
  padding: ${theme.spacing.xl};

  ${theme.breakpoints.mobile} {
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
