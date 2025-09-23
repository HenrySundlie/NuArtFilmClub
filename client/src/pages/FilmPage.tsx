import { useParams } from 'react-router-dom';
import { filmStore } from '../stores/FilmStore';
import { useEffect, Suspense, useState } from 'react';
import { observer } from 'mobx-react-lite';
import {
  Container,
  Content,
  Title,
  InfoSection,
  InfoItem,
  Label,
  Description,
  FilmArticle,
  BackLink,
} from '../styles/FilmPage.styles';
import { lazy } from 'react';
const ReactMarkdown = lazy(() => import('react-markdown'));
// Removed Button import; using LinkButton for consistent sizing
import { LinkButton } from '../components/LinkButton';
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
  const [articleMd, setArticleMd] = useState<string | null>(null);

  useEffect(() => {
    if (filmStore.films.length === 0) filmStore.fetchFilms();
  }, []);

  // Lookup directly so it updates when the store populates after initial fetch
  const film = filmStore.films.find((f) => f.id === Number(id));

  if (!film) return <Container>Film not found</Container>;

  // Determine potential article slug: explicit film.article or fallback film-<id>
  useEffect(() => {
    let isMounted = true;
    const slug = film.article || `film-${film.id}`;
    // Dynamic import – rely on Vite's handling; if not found, silently ignore
    import(`../content/films/${slug}.md?raw`)
      .then((mod) => {
        if (isMounted) setArticleMd(mod.default || String(mod));
      })
      .catch(() => {
        if (isMounted) {
          setArticleMd(null); // Not found is fine – keep empty
        }
      });
    return () => {
      isMounted = false;
    };
  }, [film.id, film.article]);

  return (
    <Container>
      <Content>
  <BackLink to="/films" aria-label="Back to film list" />
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
          <LinkButton
            to={film.ticketLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
          >
            Buy Tickets
          </LinkButton>
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
        {articleMd && (
          <FilmArticle>
            <Suspense fallback={null}>
              <ReactMarkdown>{articleMd}</ReactMarkdown>
            </Suspense>
          </FilmArticle>
        )}
      </Content>
    </Container>
  );
});

export default FilmPage;
