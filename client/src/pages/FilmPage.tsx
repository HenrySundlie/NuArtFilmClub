import { useParams } from 'react-router-dom';
import { filmStore } from '../stores/FilmStore';
import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import {
  Background,
  Overlay,
  InfoCard,
  Thumbnail,
  Title,
  InfoSection,
  InfoItem,
  Label,
  Description,
  PageInner,
  PageWrapper,
} from '../styles/FilmPage.styles';

const FilmPage = observer(() => {
  const { id } = useParams<{ id: string }>();
  const film = filmStore.films.find((f) => f.id === Number(id));

  useEffect(() => {
    if (filmStore.films.length === 0) {
      filmStore.fetchFilms();
    }
  }, []);

  if (!film) {
    return <PageWrapper>Film not found</PageWrapper>;
  }

  return (
    <PageWrapper>
      <Background style={{ backgroundImage: `url(${film.background})` }} />
      <Overlay />
      <PageInner>
        <InfoCard>
          <Thumbnail src={film.img} alt={film.title} />
          <Title>{film.title}</Title>
          <InfoSection>
            <InfoItem>
              <Label>Year:</Label> {film.year}
            </InfoItem>
            <InfoItem>
              <Label>Director:</Label> {film.director}
            </InfoItem>
            <InfoItem>
              <Label>Actors:</Label> {film.actors.join(', ')}
            </InfoItem>
            <InfoItem>
              <Label>Duration:</Label> {film.duration} minutes
            </InfoItem>
            <InfoItem>
              <Label>Showing:</Label>{' '}
              {new Date(film.runDate).toLocaleDateString()}
            </InfoItem>
          </InfoSection>
        </InfoCard>
      </PageInner>
      <Description>{film.description}</Description>
    </PageWrapper>
  );
});

export default FilmPage;
