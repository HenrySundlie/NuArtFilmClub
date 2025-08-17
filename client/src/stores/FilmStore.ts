// Basic placeholder store
// Later you could replace with Zustand, Redux, or Context API.

export interface Film {
  id: number;
  title: string;
  year: number;
}

export const films: Film[] = [{ id: 1, title: 'Example Film', year: 2025 }];
