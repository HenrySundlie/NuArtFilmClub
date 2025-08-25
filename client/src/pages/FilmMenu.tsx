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
import { Button } from '../styles/Page.styles';

const FilmMenu = observer(() => {
  useEffect(() => {
    filmStore.fetchFilms();
  }, []);

  return (
    <Container>
      <Title>Upcoming Films</Title>
      <FilmGrid>
        {[...filmStore.films]
          .sort(
            (a, b) =>
              new Date(a.runDate).getTime() - new Date(b.runDate).getTime()
          )
          .map((film) => (
            <FilmCard to={`/NuArtFilmClub/film/${film.id}`} key={film.id}>
              <FilmImage src={film.img} alt={film.title} loading="lazy" />
              <FilmInfo>
                <FilmTitle>{film.title}</FilmTitle>
                <FilmDate>
                  {new Date(film.runDate).toLocaleDateString()}
                </FilmDate>
                <FilmTime>{film.runTime}</FilmTime>
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (film.ticketLink) {
                      window.open(
                        film.ticketLink,
                        '_blank',
                        'noopener,noreferrer'
                      );
                    }
                  }}
                >
                  Buy Tickets
                </Button>
              </FilmInfo>
            </FilmCard>
          ))}
      </FilmGrid>
    </Container>
  );
});

export default FilmMenu;
