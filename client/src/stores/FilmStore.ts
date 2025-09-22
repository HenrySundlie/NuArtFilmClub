import { makeAutoObservable } from 'mobx';
import filmsData from '../films/films.json';

export interface Film {
  id: number;
  title: string;
  year: number;
  description: string;
  director: string;
  actors: string[];
  duration: number;
  img: string;
  runDates: string[]; // ISO dates (YYYY-MM-DD)
  runTime: string;
  ticketLink?: string;
  /**
   * Optional slug (without extension) of a markdown article located under `src/content/films/`.
   * If provided and the corresponding file `<slug>.md` exists, it will be rendered
   * beneath the film info box on the film detail page. Kept optional for backward compatibility.
   */
  article?: string;
}

class FilmStore {
  films: Film[] = filmsData as Film[];

  constructor() {
    makeAutoObservable(this);
  }

  fetchFilms() {
    // Migrate legacy `runDate` to `runDates` on load
    const raw = filmsData as unknown as Array<Record<string, any>>;
    this.films = raw.map((f) => {
      const runDates: string[] = Array.isArray(f.runDates)
        ? f.runDates
        : f.runDate
          ? [String(f.runDate)]
          : [];
      const { runDate: _legacy, ...rest } = f;
      return { ...rest, runDates } as Film;
    });
  }
}

export const filmStore = new FilmStore();
