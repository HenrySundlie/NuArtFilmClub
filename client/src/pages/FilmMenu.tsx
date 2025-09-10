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
import { useAutoFitText } from '../hooks/useAutoFitText';

const AutoFitTitle = ({ text }: { text: string }) => {
  // Slightly larger min on small screens to keep readability
  const isNarrow = typeof window !== 'undefined' ? window.matchMedia('(max-width: 420px)').matches : false;
  const minPx = isNarrow ? 14 : 12;
  const setRef = useAutoFitText<HTMLHeadingElement>({ maxLines: 2, minFontSizePx: minPx, deps: [text, isNarrow] });
  return <FilmTitle ref={setRef}>{text}</FilmTitle>;
};

const FilmMenu = observer(() => {
  useEffect(() => {
    filmStore.fetchFilms();
  }, []);

  const nextUpcomingDate = (dates?: string[]): string | undefined => {
    if (!dates || dates.length === 0) return undefined;
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const stamps = dates
      .filter(Boolean)
      .map((d) => new Date(d).getTime())
      .sort((a, b) => a - b);
    const next = stamps.find((t) => t >= now.getTime()) ?? stamps[0];
    return next ? new Date(next).toISOString().slice(0, 10) : undefined;
  };

  const fmtDate = (iso?: string) => {
    if (!iso) return '';
    const s = typeof iso === 'string' ? iso : String(iso);
    const d = s.includes('T') ? new Date(s) : new Date(`${s}T00:00:00`);
    return d.toLocaleDateString();
  };

  const pageTitleRef = useAutoFitText<HTMLHeadingElement>({ maxLines: 1, minFontSizePx: 18 });

  return (
    <Container>
      <Title ref={pageTitleRef}>Upcoming Films</Title>
      <FilmGrid>
        {[...filmStore.films]
          .sort((a, b) => {
            const aDate = nextUpcomingDate(a.runDates);
            const bDate = nextUpcomingDate(b.runDates);
            const aTs = aDate ? new Date(aDate).getTime() : Number.POSITIVE_INFINITY;
            const bTs = bDate ? new Date(bDate).getTime() : Number.POSITIVE_INFINITY;
            return aTs - bTs;
          })
          .map((film) => (
            <FilmCard to={`/film/${film.id}`} key={film.id}>
              <FilmImage src={film.img} alt={film.title} loading="lazy" />
              <FilmInfo>
                <AutoFitTitle text={film.title} />
                <FilmDate>
                  {film.runDates && film.runDates.length > 0
                    ? film.runDates
                        .slice()
                        .sort(
                          (a, b) =>
                            new Date(a).getTime() - new Date(b).getTime()
                        )
                        .map(fmtDate)
                        .join(' · ')
                    : 'TBA'}
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
