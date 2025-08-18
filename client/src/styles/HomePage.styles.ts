import styled from '@emotion/styled';
import { theme } from '../theme';

export const PageContainer = styled.div`
  background: ${theme.colors.background};
  color: ${theme.colors.text.primary};
  min-height: 100vh;

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
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.88), transparent); /* Darker fade */
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
  margin: 0 auto;
  padding: ${theme.spacing.xl};

  ${theme.breakpoints.mobile} {
    padding: ${theme.spacing.md};
  }
`;

export const PageTitle = styled.h1<{ fontWeight?: number; letterSpacing?: string; overlay?: boolean }>`
  color: ${theme.colors.text.primary};
  font-size: ${theme.typography.h1.fontSize};
  font-weight: ${({ fontWeight }) => fontWeight || theme.typography.h1.fontWeight};
  letter-spacing: ${({ letterSpacing }) => letterSpacing || 'normal'};
  margin-bottom: ${theme.spacing.xl};
  text-align: center;
  z-index: 2;
  ${({ overlay }) =>
    overlay && `
      position: absolute;
      top: ${theme.spacing.md};
      left: 50%;
      transform: translateX(-50%) translateY(-.6em);
      width: 100%;
      margin-bottom: 0;
      color: #fff;
      text-shadow: 0 2px 16px rgba(0,0,0,0.7), 0 1px 2px rgba(0,0,0,0.8);
      pointer-events: none;
      @media (max-width: 768px) {
        top: ${theme.spacing.md};
      }
    `}
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