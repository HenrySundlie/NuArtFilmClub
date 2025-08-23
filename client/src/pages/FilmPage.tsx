import { useParams } from 'react-router-dom';
import { filmStore } from '../stores/FilmStore';
import { useEffect, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import {
  Container,
  Content,
  Title,
  Image as Poster,
  InfoSection,
  InfoItem,
  Label,
  Description,
} from '../styles/FilmPage.styles';
import { Button } from '../styles/Page.styles';
import SafeImg from '../components/SafeImg';
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

        {/* styled.img with SafeImg internals */}
        <Poster as={SafeImg} src={film.img} alt={film.title} loading="lazy" />

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
            <Label>Showing:</Label> {fmtDate(film.runDate)}
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
            startDate={film.runDate}
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
