// src/pages/Calendar.tsx
import { useEffect, useState } from 'react';
import { PageContainer, Content, PageTitle } from '../styles/Page.styles';
import AddAllToCalendarButton from '../components/AddAllToCalendarButton';
import { CalendarHeader, CalendarIframe } from '../styles/Calendar.styles';
import { theme } from '../theme';
import { isMobileViewport, onViewportChange } from '../utils/responsive';

// ENTER YOUR GOOGLE CALENDAR ID BELOW (public calendar ID, e.g. "yourid@group.calendar.google.com")
// You can also add multiple calendars in the embed if desired.
const CALENDAR_ID = 'c_34821a5cf523c9ad8cecec2ea2278e3228e4b9c5da9e1851b5883c13b82bf07e@group.calendar.google.com';
const TIME_ZONE = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';

type CalendarMode = 'MONTH' | 'WEEK' | 'AGENDA';

function buildGoogleCalendarEmbedSrc(calendarId: string, timeZone: string, mode: CalendarMode) {
  const params = new URLSearchParams({
    src: calendarId,
    ctz: timeZone,
    mode,
    showPrint: '0',
    showTz: '0',
    showCalendars: '0',
    showTabs: '1',
    height: '600',
    wkst: '1',
    // Use a dark background to better blend with the site theme. Note: Google Calendar's
    // internal light/dark theme can't be forced via URL params; this just sets the page bg.
    bgcolor: theme.colors.background,
  });
  return `https://calendar.google.com/calendar/embed?${params.toString()}`;
}

export default function Calendar() {
  const getInitialMode = (): CalendarMode => (isMobileViewport() ? 'AGENDA' : 'MONTH');
  const [mode, setMode] = useState<CalendarMode>(getInitialMode);

  useEffect(() => {
    const dispose = onViewportChange((isMobile) => setMode(isMobile ? 'AGENDA' : 'MONTH'));
    // Also update on window resize as a coarse fallback
    const onResize = () => setMode(isMobileViewport() ? 'AGENDA' : 'MONTH');
    window.addEventListener('resize', onResize);
    return () => {
      dispose();
      window.removeEventListener('resize', onResize);
    };
  }, []);

  const embedSrc = buildGoogleCalendarEmbedSrc(CALENDAR_ID, TIME_ZONE, mode);

  return (
    <PageContainer>
      <Content>
        <CalendarHeader>
          <PageTitle fontWeight={500} style={{ marginBottom: 0, textAlign: 'left' }}>Calendar</PageTitle>
          <div style={{ display: 'inline-flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <AddAllToCalendarButton
              calendarId={CALENDAR_ID}
              label="Add to Google Calendar"
            />
          </div>
        </CalendarHeader>

        {/* Embedded Google Calendar. Users can click events to view and add single events. */}
        <div style={{ position: 'relative', paddingBottom: '0', height: 'auto' }}>
          <CalendarIframe
            title="NuArt Film Society Calendar"
            src={embedSrc}
            frameBorder={0}
            scrolling="no"
          />
        </div>
        <p style={{ marginTop: '0.5rem', opacity: 0.8 }}>
          Tip: Click an event to view details and add it to your personal calendar.
        </p>
      </Content>
    </PageContainer>
  );
}
