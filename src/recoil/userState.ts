import { atom } from "recoil";
import { User } from "../types/useUser";

export const userState = atom<User>({
  key: "user",
  default: {
    userId: "",
    imageUrl: "",
    nickname: "",
  },
})