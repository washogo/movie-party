import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist()

export const loadingState = atom<boolean>({
  key: "loading",
  default: false,
  effects_UNSTABLE: [persistAtom],
})