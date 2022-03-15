export type Movie = {
  id: any;
  title: any;
  popularity: any;
  vote_count: any;
  poster_path: any;
  production_countries: any;
  release_date: string;
  runtime: number | null;
  overview: string | null;
  genres: Array<Genre>;
};

export type Genre = {
  id: number;
  name: string;
};

export type Cast = {
  id: number;
  name: string;
};