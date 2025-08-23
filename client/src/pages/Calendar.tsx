// src/pages/Calendar.tsx
import { useEffect, useMemo, useState } from 'react';
import { filmStore } from '../stores/FilmStore';
import { PageContainer, Content, PageTitle } from '../styles/Page.styles';
import {
  CalendarHeader,
  NavGroup,
  NavBtn,
  MonthTitle,
  Grid,
  Weekday,
  DayCell,
  DayNumber,
  EventList,
  EventChip,
} from '../styles/Calendar.styles';

type Film = {
  id: number;
  title: string;
  runDate?: string; // YYYY-MM-DD
  runTime?: string; // HH:MM
};

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// ---- date utils
const strip = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
const ymd = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
const startOfMonth = (d: Date) => new Date(d.getFullYear(), d.getMonth(), 1);
const addMonths = (d: Date, m: number) =>
  new Date(d.getFullYear(), d.getMonth() + m, 1);
const addDays = (d: Date, n: number) =>
  new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
const startOfGrid = (d: Date) => {
  const s = startOfMonth(d);
  const day = s.getDay(); // 0 = Sun
  return addDays(s, -day); // grid starts on Sunday
};

function fmtLong(iso?: string) {
  if (!iso) return '';
  const d = new Date(`${iso}T00:00:00`);
  return d.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function Calendar() {
  const [month, setMonth] = useState(() => strip(new Date()));
  const todayStr = ymd(new Date());

  useEffect(() => {
    if (filmStore.films.length === 0) filmStore.fetchFilms();
  }, []);

  // Map events by date string
  const eventsByDate = useMemo(() => {
    const map = new Map<string, Film[]>();
    for (const f of filmStore.films as Film[]) {
      if (!f.runDate) continue;
      const key = f.runDate.includes('T') ? f.runDate.slice(0, 10) : f.runDate;
      map.set(key, [...(map.get(key) ?? []), f]);
    }
    // sort events by time if present
    for (const [k, arr] of map) {
      arr.sort((a, b) => ((a.runTime ?? '') < (b.runTime ?? '') ? -1 : 1));
      map.set(k, arr);
    }
    return map;
  }, []);

  // Build 6-week grid
  const gridDays = useMemo(() => {
    const start = startOfGrid(month);
    return Array.from({ length: 42 }, (_, i) => addDays(start, i));
  }, [month]);

  return (
    <PageContainer>
      <Content>
        <PageTitle>Calendar</PageTitle>

        <CalendarHeader>
          <NavGroup>
            <NavBtn
              onClick={() => setMonth((m) => addMonths(m, -1))}
              aria-label="Previous month"
            >
              ←
            </NavBtn>
            <NavBtn
              onClick={() => setMonth(() => strip(new Date()))}
              aria-label="Jump to today"
            >
              Today
            </NavBtn>
            <NavBtn
              onClick={() => setMonth((m) => addMonths(m, 1))}
              aria-label="Next month"
            >
              →
            </NavBtn>
          </NavGroup>
          <MonthTitle>
            {month.toLocaleDateString(undefined, {
              month: 'long',
              year: 'numeric',
            })}
          </MonthTitle>
          <div />
        </CalendarHeader>

        <Grid role="table" aria-label="Monthly calendar">
          {WEEKDAYS.map((d) => (
            <Weekday role="columnheader" key={d}>
              {d}
            </Weekday>
          ))}

          {gridDays.map((d) => {
            const key = ymd(d);
            const inMonth = d.getMonth() === month.getMonth();
            const isToday = key === todayStr;
            const items = eventsByDate.get(key) ?? [];
            return (
              <DayCell
                key={key}
                $other={!inMonth}
                $today={isToday}
                role="cell"
                aria-selected={isToday}
              >
                <DayNumber aria-label={fmtLong(key)}>{d.getDate()}</DayNumber>
                <EventList>
                  {items.map((ev) => (
                    <EventChip to={`/NuArtFilmClub/film/${ev.id}`} key={ev.id}>
                      <span className="time">{ev.runTime ?? ''}</span>
                      <span>{ev.title}</span>
                    </EventChip>
                  ))}
                </EventList>
              </DayCell>
            );
          })}
        </Grid>
      </Content>
    </PageContainer>
  );
}
