import { useEffect } from 'react';
import { filmStore } from '../stores/FilmStore';
import { observer } from 'mobx-react-lite';
import {
  Container,
  Title,
  FilmGrid,
  FilmCard,
  FilmImage,
  FilmInfo,
  FilmTitle,
  FilmDate,
  FilmTime,
} from '../styles/FilmMenu.styles';

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
            <FilmImage src={film.img} alt={film.title} />
            <FilmInfo>
              <FilmTitle>{film.title}</FilmTitle>
              <FilmDate>{new Date(film.runDate).toLocaleDateString()}</FilmDate>
              <FilmTime>{film.runTime}</FilmTime>
            </FilmInfo>
          </FilmCard>
        ))}
      </FilmGrid>
    </Container>
  );
});

export default FilmMenu;
