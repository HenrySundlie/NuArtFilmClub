import { useEffect, useMemo } from 'react';
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
  SectionHeading,
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

  const { upcomingFilms, previousFilms } = useMemo(() => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);

    const norm = (dates?: string[]) =>
      (dates || [])
        .filter(Boolean)
        .map((d) => new Date(d + (d.includes('T') ? '' : 'T00:00:00')).getTime())
        .sort((x, y) => x - y);

    const groups = filmStore.films.reduce(
      (acc, film) => {
        const dates = norm(film.runDates);
        const hasUpcoming = dates.some((t) => t >= now.getTime());
        if (hasUpcoming) acc.upcoming.push({ film, dates });
        else acc.previous.push({ film, dates });
        return acc;
      },
      { upcoming: [] as Array<{ film: typeof filmStore.films[number]; dates: number[] }>, previous: [] as Array<{ film: typeof filmStore.films[number]; dates: number[] }> }
    );

    // Sort upcoming by next upcoming date ascending
    groups.upcoming.sort((a, b) => {
      const next = (ds: number[]) => ds.find((t) => t >= now.getTime()) ?? Number.POSITIVE_INFINITY;
      return next(a.dates) - next(b.dates);
    });

    // Sort previous by most recent past date descending
    groups.previous.sort((a, b) => {
      const last = (ds: number[]) => ds[ds.length - 1] ?? Number.NEGATIVE_INFINITY;
      return last(b.dates) - last(a.dates);
    });

    return {
      upcomingFilms: groups.upcoming.map((x) => x.film),
      previousFilms: groups.previous.map((x) => x.film),
    };
  }, [filmStore.films]);

  const renderUpcomingFilmCard = (film: (typeof filmStore.films)[number]) => (
    <FilmCard to={`/film/${film.id}`} key={film.id}>
      <FilmImage src={film.img} alt={film.title} loading="lazy" />
      <FilmInfo>
        <AutoFitTitle text={film.title} />
        <FilmDate>
          {film.runDates && film.runDates.length > 0
            ? film.runDates
                .slice()
                .sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
                .map(fmtDate)
                .join(' · ')
            : 'TBA'}
        </FilmDate>
        <FilmTime>{film.runTime}</FilmTime>
        {film.ticketLink && (
          <Button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              window.open(film.ticketLink, '_blank', 'noopener,noreferrer');
            }}
          >
            Buy Tickets
          </Button>
        )}
      </FilmInfo>
    </FilmCard>
  );

  // Previous films: only show title (no dates, runtime, tickets)
  const renderPreviousFilmCard = (film: (typeof filmStore.films)[number]) => (
    <FilmCard to={`/film/${film.id}`} key={film.id} className="compact">
      <FilmImage src={film.img} alt={film.title} loading="lazy" />
      <FilmInfo style={{ gap: '0' }}>
        <AutoFitTitle text={film.title} />
      </FilmInfo>
    </FilmCard>
  );

  const hasUpcoming = upcomingFilms.length > 0;
  const hasPrevious = previousFilms.length > 0;

  return (
    <Container>
      <Title ref={pageTitleRef}>Films</Title>
      {hasUpcoming && (
        <section aria-labelledby="upcoming-heading" style={{ marginBottom: hasPrevious ? '3rem' : 0 }}>
          <SectionHeading id="upcoming-heading">Upcoming</SectionHeading>
          <FilmGrid>{upcomingFilms.map(renderUpcomingFilmCard)}</FilmGrid>
          {!upcomingFilms.length && <p style={{ opacity: 0.8 }}>No upcoming films scheduled.</p>}
        </section>
      )}
      {hasPrevious && (
        <section aria-labelledby="previous-heading" style={{ marginTop: '3.5rem' }}>
          <SectionHeading id="previous-heading">Previous</SectionHeading>
          <FilmGrid>{previousFilms.map(renderPreviousFilmCard)}</FilmGrid>
          {!previousFilms.length && <p style={{ opacity: 0.8 }}>No past films yet.</p>}
        </section>
      )}
      {!hasUpcoming && !hasPrevious && <p style={{ opacity: 0.8 }}>No films available.</p>}
    </Container>
  );
});

export default FilmMenu;
