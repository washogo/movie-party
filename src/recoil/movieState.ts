import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { Movie } from "../types/useMovie";

const { persistAtom } = recoilPersist()

export const moviesState = atom<Movie[]>({
  key: "movies",
  default: [],
  effects_UNSTABLE: [persistAtom],
})

export const movieState = atom<Movie | null>({
  key: "movie",
  default: null,
  effects_UNSTABLE: [persistAtom],
})
