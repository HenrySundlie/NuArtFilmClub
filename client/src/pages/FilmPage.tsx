import { useParams } from 'react-router-dom';
import { filmStore } from '../stores/FilmStore';
import { useEffect, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import {
  Container,
  Content,
  Title,
  InfoSection,
  InfoItem,
  Label,
  Description,
} from '../styles/FilmPage.styles';
import { Button } from '../styles/Page.styles';
import AddToGoogleCalendar from '../components/AddToGoogleCalendar';

const fmtDate = (iso?: string) => {
  if (!iso) return '';
  const s = typeof iso === 'string' ? iso : String(iso);
  const d = s.includes('T') ? new Date(s) : new Date(`${s}T00:00:00`);
  return d.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

function nextUpcomingDate(dates?: string[]): string | undefined {
  if (!dates || dates.length === 0) return undefined;
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const sorted = dates
    .filter(Boolean)
    .map((d) => new Date(d).getTime())
    .sort((a, b) => a - b);
  const next = sorted.find((t) => t >= now.getTime()) ?? sorted[sorted.length - 1];
  return next ? new Date(next).toISOString().slice(0, 10) : undefined;
}

const FilmPage = observer(() => {
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (filmStore.films.length === 0) filmStore.fetchFilms();
  }, []);

  const film = useMemo(
    () => filmStore.films.find((f) => f.id === Number(id)),
    [id]
  );

  if (!film) return <Container>Film not found</Container>;

  return (
    <Container>
      <Content>
        <Title>{film.title}</Title>

  <InfoSection>
          <InfoItem>
            <Label>Year:</Label> {film.year}
          </InfoItem>
          <InfoItem>
            <Label>Director:</Label> {film.director}
          </InfoItem>
          <InfoItem>
            <Label>Notable Actors:</Label> {film.actors?.join(', ')}
          </InfoItem>
          <InfoItem>
            <Label>Duration:</Label> {film.duration} minutes
          </InfoItem>
          <InfoItem>
            <Label>Showings:</Label>{' '}
            {film.runDates && film.runDates.length > 1
              ? film.runDates
                  .slice()
                  .sort(
                    (a, b) => new Date(a).getTime() - new Date(b).getTime()
                  )
                  .map(fmtDate)
                  .join(' · ')
              : fmtDate(film.runDates?.[0])}
          </InfoItem>
          {film.runTime && (
            <InfoItem>
              <Label>Time:</Label> {film.runTime}
            </InfoItem>
          )}
          <Button
            onClick={(e) => {
              e.stopPropagation();
              window.open(film.ticketLink, '_blank', 'noopener,noreferrer');
            }}
          >
            Buy Tickets
          </Button>
          <AddToGoogleCalendar
            title={film.title}
            startDate={nextUpcomingDate(film.runDates) ?? film.runDates?.[0]}
            startTime={film.runTime}
            durationMinutes={film.duration}
            location="Moscow, ID"
            details={film.description}
          />
        </InfoSection>

        <Description>{film.description}</Description>
      </Content>
    </Container>
  );
});

export default FilmPage;
