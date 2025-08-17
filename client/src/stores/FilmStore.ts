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
  background: string;
  runDate: string;
  runTime: string;
}

class FilmStore {
  films: Film[] = filmsData as Film[];

  constructor() {
    makeAutoObservable(this);
  }

  fetchFilms() {
    this.films = filmsData as Film[];
  }
}

export const filmStore = new FilmStore();
