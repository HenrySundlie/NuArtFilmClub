import { useParams } from 'react-router-dom';
import { filmStore } from '../stores/FilmStore';
import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import styled from '@emotion/styled';

const Container = styled.div`
  background: #ddd;
  color: #111;
  min-height: 100vh;
  padding: 1rem;
`;

const Title = styled.h1`
  color: #000;
`;

const Image = styled.img`
  width: 300px;
  height: 450px;
  object-fit: cover;
  margin-bottom: 1rem;
`;

const FilmPage = observer(() => {
  const { id } = useParams<{ id: string }>();
  const film = filmStore.films.find((f) => f.id === Number(id));

  useEffect(() => {
    if (filmStore.films.length === 0) {
      filmStore.fetchFilms();
    }
  }, []);

  if (!film) {
    return <div>Film not found</div>;
  }

  return (
    <Container>
      <Title>{film.title}</Title>
      <Image src={film.img} alt={film.title} />
      <p>
        <strong>Year:</strong> {film.year}
      </p>
      <p>
        <strong>Director:</strong> {film.director}
      </p>
      <p>
        <strong>Actors:</strong> {film.actors.join(', ')}
      </p>
      <p>
        <strong>Duration:</strong> {film.duration} minutes
      </p>
      <p>
        <strong>Date:</strong> {new Date(film.runDate).toLocaleDateString()}
      </p>
      <p>
        <strong>Time:</strong> {film.runTime}
      </p>
      <p>{film.description}</p>
    </Container>
  );
});

export default FilmPage;
