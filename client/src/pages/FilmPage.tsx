import { useParams } from 'react-router-dom';
import { filmStore } from '../stores/FilmStore';
import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import {
  Container,
  Content,
  Title,
  Image,
  InfoSection,
  InfoItem,
  Label,
  Description,
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
    return <Container>Film not found</Container>;
  }

  return (
    <Container>
      <Content>
        <Title>{film.title}</Title>
        <Image src={film.img} alt={film.title} />
        <InfoSection>
          <InfoItem>
            <Label>Year:</Label> {film.year}
          </InfoItem>
          <InfoItem>
            <Label>Director:</Label> {film.director}
          </InfoItem>
          <InfoItem>
            <Label>Notable Actors:</Label> {film.actors.join(', ')}
          </InfoItem>
          <InfoItem>
            <Label>Duration:</Label> {film.duration} minutes
          </InfoItem>
          <InfoItem>
            <Label>Showing:</Label>{' '}
            {new Date(film.runDate).toLocaleDateString()}
          </InfoItem>
        </InfoSection>
        <Description>{film.description}</Description>
      </Content>
    </Container>
  );
});

export default FilmPage;
