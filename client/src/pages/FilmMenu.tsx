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
  const isNarrow = typeof window !== 'undefined' ? window.matchMedia('(max-width: 420px)').matches : false;
  const minPx = isNarrow ? 14 : 12;
  const setRef = useAutoFitText<HTMLHeadingElement>({ maxLines: 2, minFontSizePx: minPx, deps: [text, isNarrow] });
  return <FilmTitle ref={setRef}>{text}</FilmTitle>;
};

const FilmMenu = observer(() => {
  useEffect(() => {
    filmStore.fetchFilms();
  }, []);

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
            const now = new Date();
            now.setHours(0, 0, 0, 0);

            const norm = (dates?: string[]) =>
              (dates || [])
                .filter(Boolean)
                .map((d) => new Date(d + (d.includes('T') ? '' : 'T00:00:00')).getTime())
                .sort((x, y) => x - y);

            const aDates = norm(a.runDates);
            const bDates = norm(b.runDates);

            const firstUpcoming = (ts: number[]) => ts.find((t) => t >= now.getTime());

            const aUpcoming = firstUpcoming(aDates);
            const bUpcoming = firstUpcoming(bDates);

            const aAllPast = !aUpcoming && aDates.length > 0;
            const bAllPast = !bUpcoming && bDates.length > 0;

            // Films with at least one upcoming date come before films whose showings are all past.
            if (aAllPast && !bAllPast) return 1;
            if (bAllPast && !aAllPast) return -1;

            // If both have upcoming showings compare the next upcoming date
            if (!aAllPast && !bAllPast) {
              const aNext = aUpcoming ?? aDates[0] ?? Number.POSITIVE_INFINITY;
              const bNext = bUpcoming ?? bDates[0] ?? Number.POSITIVE_INFINITY;
              return aNext - bNext;
            }

            // Both are past-only: order by most recent (latest) showing first or keep original? We'll use most recent past first.
            const aLast = aDates[aDates.length - 1] ?? Number.NEGATIVE_INFINITY;
            const bLast = bDates[bDates.length - 1] ?? Number.NEGATIVE_INFINITY;
            return bLast - aLast; // more recent (larger timestamp) first
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
