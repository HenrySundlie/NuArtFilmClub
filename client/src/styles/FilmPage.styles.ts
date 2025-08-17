import styled from '@emotion/styled';
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

export const Content = styled.div`
  max-width: 900px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: ${theme.spacing.xl};

  ${theme.breakpoints.mobile} {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.lg};
  }
`;

export const Title = styled.h1`
  color: ${theme.colors.text.primary};
  font-size: ${theme.typography.h1.fontSize};
  margin-bottom: ${theme.spacing.lg};
  grid-column: 1 / -1;

  ${theme.breakpoints.mobile} {
    font-size: ${theme.typography.h1.mobile.fontSize};
    margin-bottom: ${theme.spacing.md};
  }
`;

export const Image = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(255, 255, 255, 0.1);
`;

export const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
`;

export const InfoItem = styled.p`
  margin: 0;
  line-height: 1.6;
`;

export const Label = styled.strong`
  color: ${theme.colors.text.secondary};
  display: inline-block;
  min-width: 100px;
`;

export const Description = styled.p`
  grid-column: 1 / -1;
  line-height: 1.8;
  margin: ${theme.spacing.lg} 0;
  color: ${theme.colors.text.secondary};
  font-size: 1.1rem;

  ${theme.breakpoints.mobile} {
    font-size: 1rem;
  }
`;
