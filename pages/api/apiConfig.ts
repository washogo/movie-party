export const requests = {
  fetchPopular: `/movie/popular?api_key=${process.env.NEXT_PUBLIC_MOVIE_API_KEY}&language=ja-JA&page=1`,
  fetchGenres: `/genre/movie/list?api_key=${process.env.NEXT_PUBLIC_MOVIE_API_KEY}&language=ja-JA`,
  fetchSearchMovies: `/search/movie?api_key=${process.env.NEXT_PUBLIC_MOVIE_API_KEY}&language=ja-JP`,
};
