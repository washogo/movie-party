import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { User } from "../types/useUser";

const { persistAtom } = recoilPersist()

export const userState = atom<User>({
  key: "user",
  default: {
    userId: "",
    imageUrl: "",
    nickname: "",
  },
  effects_UNSTABLE: [persistAtom],
})