import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { filmStore } from '../stores/FilmStore';
import { observer } from 'mobx-react-lite';
import styled from '@emotion/styled';

const Container = styled.div`
  background: #e0e0e0;
  color: #222;
  min-height: 100vh;
  padding: 1rem;
`;

const Title = styled.h1`
  color: #000;
`;

const FilmGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

const FilmCard = styled(Link)`
  text-decoration: none;
  color: inherit;
  border: 1px solid #ccc;
  padding: 1rem;
  border-radius: 8px;
`;

const FilmImage = styled.img`
  width: 200px;
  height: 300px;
  object-fit: cover;
`;

const FilmMenu = observer(() => {
  useEffect(() => {
    filmStore.fetchFilms();
  }, []);

  return (
    <Container>
      <Title>Film Menu</Title>
      <FilmGrid>
        {filmStore.films.map((film) => (
          <FilmCard to={`/film/${film.id}`} key={film.id}>
            <div>
              <FilmImage src={film.img} alt={film.title} />
              <h2>{film.title}</h2>
              <p>{new Date(film.runDate).toLocaleDateString()}</p>
              <p>{film.runTime}</p>
            </div>
          </FilmCard>
        ))}
      </FilmGrid>
    </Container>
  );
});

export default FilmMenu;
