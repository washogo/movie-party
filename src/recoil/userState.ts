import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { User } from "../types/useUser";

const { persistAtom } = recoilPersist()

export const userState = atom<User | null>({
  key: "user",
  default: null,
  effects_UNSTABLE: [persistAtom],
})