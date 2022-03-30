export type Movie = {
  id: number;
  title: string;
  popularity: number;
  vote_count: number;
  poster_path: string;
  production_countries: [
    {name: string}
  ];
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