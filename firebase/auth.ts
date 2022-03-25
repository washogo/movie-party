import { onAuthStateChanged } from "firebase/auth";

export const onAuth = (auth: any, router: any) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      return;
    } else {
      router.push("/signup");
    }
  });
};
