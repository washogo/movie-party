import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { User } from "../src/types/useUser";
import { db } from "./firebase";

type Props = {
  auth: any;
  user: User | null;
  setUser: (user: User) => void;
};

export const Auth = (props: Props) => {
  const { auth, user, setUser } = props;
  const router = useRouter();

  const getCorrectUser = async (uid: string) => {
    const docRef = doc(db, "users", `${uid}`);
    const docSnap = await getDoc(docRef);
    const data = docSnap.data();
    if (!data) return
    setUser({
      userId: data.userId,
      imageUrl: data.imageUrl,
      nickname: data.nickname,
    });
  };

  const getAuthState = () => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        getCorrectUser(currentUser.uid);
      } else {
        router.push("/signin");
      }
    });
  };
  return { getAuthState, getCorrectUser };
};
