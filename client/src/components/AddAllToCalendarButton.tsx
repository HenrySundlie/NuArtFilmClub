// src/components/AddAllToCalendarButton.tsx
import { LinkButton } from './LinkButton';

export function AddAllToCalendarButton({
  feedUrl, // e.g. 'https://your.site/nuart_schedule.ics'
  calendarId, // e.g. 'yourid@group.calendar.google.com'
  label = 'Add all in Google Calendar',
}: {
  feedUrl?: string;
  calendarId?: string;
  label?: string;
}) {
  const cid = feedUrl ?? calendarId;
  if (!cid) return null;
  const href = `https://calendar.google.com/calendar/r?cid=${encodeURIComponent(cid)}`;
  return (
    <LinkButton to={href} target="_blank" rel="noopener noreferrer">
      {label}
    </LinkButton>
  );
}

// Backward compatibility default export
export default AddAllToCalendarButton;
