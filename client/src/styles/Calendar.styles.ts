// src/styles/Calendar.styles.ts
import styled from '@emotion/styled';
import { theme } from '../theme';
import { Link } from 'react-router-dom';

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
  }
`;

export const NavGroup = styled.div`
  display: inline-flex;
  gap: ${theme.spacing.sm};

  ${theme.breakpoints.mobile} {
    order: 2;
    width: 100%;
    justify-content: center;
  }
`;

export const NavBtn = styled.button`
  --fg: ${theme.colors.text.primary};
  --bd: ${theme.colors.border};
  appearance: none;
  border: 1px solid var(--bd);
  border-radius: ${theme.radii.sm};
  padding: 0.6rem 0.9rem;
  background: ${theme.colors.surface};
  color: var(--fg);
  font-weight: 700;
  line-height: 1;
  cursor: pointer;
  min-width: 44px; /* touch target */
  transition: background 140ms ease, color 140ms ease, border-color 140ms ease;
  &:hover { background: ${theme.colors.highlight}; }
  &:active { background: ${theme.colors.surface}; }
  &:focus-visible {
    outline: 2px solid ${theme.colors.accent};
    outline-offset: 2px;
  }
`;

export const MonthTitle = styled.h2`
  margin: 0;
  font-size: clamp(
    ${theme.typography.h2.mobile.fontSize},
    2.4vw,
    ${theme.typography.h2.fontSize}
  );
  letter-spacing: 0.02em;
  font-weight: 500;
  text-align: center;
  color: ${theme.colors.text.primary};

  ${theme.breakpoints.mobile} {
    width: 100%;
    order: 1;
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: ${theme.spacing.sm};

  ${theme.breakpoints.mobile} {
    gap: ${theme.spacing.xs};
  }
`;

export const Weekday = styled.div`
  text-align: center;
  color: ${theme.colors.text.primary};
  font-weight: 700;
  padding: ${theme.spacing.sm} 0;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  font-size: 0.8rem;

  ${theme.breakpoints.mobile} {
    font-size: 0.7rem;
    padding: ${theme.spacing.xs} 0;
  }
`;

export const DayCell = styled.div<{ $other?: boolean; $today?: boolean }>`
  position: relative;
  min-height: 120px;
  border: 1px solid ${theme.colors.text.light};
  border-radius: ${theme.radii.sm};
  background: ${theme.surfaces.subtleOverlay}, ${theme.colors.surfaceDeep};
  padding: ${theme.spacing.sm};
  display: grid;
  grid-template-rows: auto 1fr;
  gap: ${theme.spacing.xs};
  opacity: ${({ $other }) => ($other ? 0.55 : 1)};

  ${({ $today }) =>
    $today ? `box-shadow: 0 0 0 2px ${theme.colors.accent} inset, ${theme.shadows.card};` : ''}

  ${theme.breakpoints.mobile} {
    min-height: 88px;
    padding: ${theme.spacing.xs};
    border-radius: ${theme.radii.xs};
  }
`;

export const DayNumber = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 28px;
  border-radius: ${theme.radii.xs};
  font-weight: 800;
  color: ${theme.colors.text.primary};
  background: rgba(255, 255, 255, 0.06);

  ${theme.breakpoints.mobile} {
    width: 26px;
    height: 24px;
    font-size: 0.85rem;
  }
`;

export const EventList = styled.div`
  display: grid;
  gap: 6px;
  align-content: start;

  ${theme.breakpoints.mobile} {
    /* compact dots on mobile */
    display: inline-grid;
    grid-auto-flow: column;
    grid-auto-columns: 10px;
    gap: 6px;
  }
`;

export const EventChip = styled(Link)`
  --ring: ${theme.colors.accent};
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.35rem 0.5rem;
  border-radius: ${theme.radii.sm};
  background: rgba(99, 102, 241, 0.15);
  color: ${theme.colors.text.primary};
  text-decoration: none;
  font-size: 0.88rem;
  border: 1px solid rgba(99, 102, 241, 0.35);
  transition: filter 120ms ease, background 120ms ease, border-color 120ms ease;
  &:hover { filter: saturate(1.05); }
  &:focus-visible {
    outline: 2px solid var(--ring);
    outline-offset: 2px;
  }
  & span.time { color: ${theme.colors.text.primary}; font-weight: 600; font-size: 0.8rem; }

  ${theme.breakpoints.mobile} {
    font-size: 0.78rem;
    padding: 0.25rem;
    border-radius: 8px;
    gap: 0.2rem;
    & .time {
      font-size: 0.7rem;
    }
    text-indent: -9999px;
    & .time {
      display: none;
    }
  }
`;

export const UpcomingList = styled.div`
  margin-top: clamp(${theme.spacing.lg}, 3vw, ${theme.spacing.xl});
  display: grid;
  gap: ${theme.spacing.sm};
`;

export const UpcomingItem = styled(Link)`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: ${theme.spacing.sm};
  align-items: baseline;
  padding: 0.9rem 1rem;
  border: 1px solid ${theme.colors.text.light};
  border-radius: ${theme.radii.sm};
  background: ${theme.surfaces.elevatedOverlay}, ${theme.colors.surfaceDeep};
  color: ${theme.colors.text.primary};
  text-decoration: none;
  transition:
    transform 120ms ease,
    filter 120ms ease;
  &:hover {
    transform: translateY(-1px);
  }
  &:focus-visible {
    outline: 2px solid ${theme.colors.accent};
    outline-offset: 2px;
  }
  small { color: ${theme.colors.text.primary}; }

  ${theme.breakpoints.mobile} {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.xs};
    padding: 0.8rem 0.9rem;
  }
`;
