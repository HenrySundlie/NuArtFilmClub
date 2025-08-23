import { useEffect, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { filmStore } from '../stores/FilmStore';
import {
  PageContainer,
  Content,
  PageTitle,
  Text,
  HeaderImageContainer,
} from '../styles/HomePage.styles';
import { Section, Grid, Card, CardBody, Divider } from '../styles/Page.styles';
import SafeImg from '../components/SafeImg';
import { LinkButton } from '../components/LinkButton';
import MainStreetImage from '/images/Main Street east side_0001.jpg';

function fmtDate(iso?: string) {
  if (!iso) return '';
  const s = typeof iso === 'string' ? iso : String(iso);
  const d = s.includes('T') ? new Date(s) : new Date(`${s}T00:00:00`);
  return d.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

const Home = () => {
  useEffect(() => {
    if (filmStore.films.length === 0) filmStore.fetchFilms();
  }, []);

  const nextFilm = useMemo(() => {
    const now = new Date().toISOString().slice(0, 10);
    console.log(now, filmStore.films);
    const next = [...filmStore.films]
      .filter((f) => typeof f.runDate === 'string' && f.runDate >= now)
      .sort((a, b) => a.runDate!.localeCompare(b.runDate!))[0];
    console.log('next', next);
    return next;
  }, [filmStore.films]);

  console.log('filmStore.films', filmStore.films);
  console.log('nextFilm', nextFilm);

  return (
    <>
      <HeaderImageContainer>
        <PageTitle fontWeight={400} letterSpacing="0.5rem" as="h1" overlay>
          NU ART FILM CLUB
        </PageTitle>
        <SafeImg
          src={MainStreetImage}
          alt="Historic Main Street"
          loading="lazy"
        />
      </HeaderImageContainer>

      <PageContainer>
        <Content id="main">
          <Section>
            <Text>
              Discover cinema that matters. Curated screenings. Thoughtful
              discussion. Independent spirit.
            </Text>

            <div
              style={{
                display: 'flex',
                gap: '0.75rem',
                flexWrap: 'wrap',
                marginTop: '0.5rem',
              }}
            >
              <LinkButton to="/NuArtFilmClub/films" aria-label="View schedule">
                View schedule
              </LinkButton>
            </div>
          </Section>

          <Grid min="280px">
            <Card>
              <CardBody>
                <h2 style={{ margin: 0 }}>Next screening</h2>
                <Divider />
                {nextFilm ? (
                  <>
                    <p style={{ margin: 0, lineHeight: 1.6 }}>
                      <strong>{nextFilm.title}</strong>
                    </p>
                    <p style={{ margin: 0, lineHeight: 1.6 }}>
                      {fmtDate(nextFilm.runDate)}{' '}
                      {nextFilm.runTime ? `· ${nextFilm.runTime}` : ''}
                    </p>
                    <LinkButton
                      to={`/NuArtFilmClub/films/${nextFilm.id}`}
                      aria-label="See details"
                    >
                      Details
                    </LinkButton>
                  </>
                ) : (
                  <p style={{ margin: 0, lineHeight: 1.6 }}>
                    Schedule coming soon.
                  </p>
                )}
              </CardBody>
            </Card>
          </Grid>
        </Content>
      </PageContainer>
    </>
  );
};

const ObservedHome = observer(Home);
export default ObservedHome;
