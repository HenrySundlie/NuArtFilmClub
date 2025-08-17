import styled from '@emotion/styled';
import { theme } from '../theme';

export const PageWrapper = styled.div`
  background: ${theme.colors.background};
  color: ${theme.colors.text.primary};
  min-height: 100vh;
  width: 100%;
  overflow-x: hidden;
  position: relative;
  margin: 0;
  padding: 0;
  display: flex;
  flex: 1; /* <— allow flex container to fill available space */
`;

export const PageInner = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Background = styled.div`
  position: absolute;
  inset: 0; /* same as top/left/right/bottom:0 */
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  z-index: 1;
`;

export const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6));
  z-index: 2;
`;

export const InfoCard = styled.div`
  position: relative;
  z-index: 3;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(12px);
  padding: ${theme.spacing.lg};
  border-radius: 16px;
  max-width: 600px;
  text-align: center;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
`;

export const Thumbnail = styled.img`
  width: 160px;
  height: auto;
  border-radius: 8px;
  margin-bottom: ${theme.spacing.md};
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.4);
`;

export const Title = styled.h1`
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
  gap: ${theme.spacing.sm};
  text-align: left;
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
  max-width: 800px;
  margin: 4rem auto;
  padding: 0 ${theme.spacing.lg};
  line-height: 1.8;
  color: ${theme.colors.text.secondary};
  font-size: 1.1rem;
`;
