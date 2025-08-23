// src/components/AddToGoogleCalendar.tsx
import { LinkButton } from './LinkButton';

type Props = {
  title: string;
  startDate: string; // "YYYY-MM-DD"
  startTime?: string; // "HH:MM" 24h (optional)
  endTime?: string; // "HH:MM" 24h (optional)
  durationMinutes?: number; // fallback if endTime missing
  location?: string;
  details?: string;
};

function toUtcStamp(d: Date) {
  // → "YYYYMMDDTHHmmssZ"
  return d
    .toISOString()
    .replace(/[-:]/g, '')
    .replace(/\.\d{3}Z$/, 'Z');
}

function parseLocal(date: string, time?: string) {
  // Default 19:00 if no time given
  const t = time && /^\d{1,2}:\d{2}$/.test(time) ? time : '19:00';
  return new Date(`${date}T${t}:00`);
}

export default function AddToGoogleCalendar({
  title,
  startDate,
  startTime,
  endTime,
  durationMinutes = 120,
  location,
  details,
}: Props) {
  if (!startDate || !title) return null;

  const start = parseLocal(startDate, startTime);
  const end = endTime
    ? parseLocal(startDate, endTime)
    : new Date(start.getTime() + durationMinutes * 60000);

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    dates: `${toUtcStamp(start)}/${toUtcStamp(end)}`,
    details: details ?? '',
    location: location ?? '',
    ctz: Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC',
  });

  const href = `https://calendar.google.com/calendar/render?${params.toString()}`;

  return (
    <LinkButton
      to={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Add to Google Calendar"
    >
      Add to Google Calendar
    </LinkButton>
  );
}
