export const API_KEY = "1afd2dae3590d4f1e12a9c4335a594cc";

export const requests = {
  fetchPopular: `/movie/popular?api_key=${API_KEY}&language=ja-JA&page=1`,
  fetchGenres: `/genre/movie/list?api_key=${API_KEY}&language=ja-JA`
};
