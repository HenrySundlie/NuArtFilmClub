// src/styles/Calendar.styles.ts
import styled from '@emotion/styled';
import { theme } from '../theme';

export const CalendarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${theme.spacing.md};
  margin-bottom: clamp(${theme.spacing.md}, 2.5vw, ${theme.spacing.lg});
  padding: 0 ${theme.spacing.sm};

  ${theme.breakpoints.mobile} {
    flex-wrap: wrap;
    gap: ${theme.spacing.sm};
  /* Leave space on the right for the fixed menu icon (approx 64px) */
  padding-right: 64px;
  }
`;

// Responsive iframe that fits within the screen on mobile
export const CalendarIframe = styled.iframe`
  border: 0;
  width: 100%;
  height: min(800px, 80dvh);
  ${theme.breakpoints.mobile} {
  /* Make the window more square on mobile by reducing height */
  height: min(560px, 60dvh);
  }
`;
