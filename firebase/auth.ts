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

  const getAuthState = () => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        const getCurrentUser = async () => {
          const docRef = doc(db, "users", `${currentUser.uid}`);
          const docSnap = await getDoc(docRef);
          const data = docSnap.data();
          if (
            user?.id !== data?.id ||
            user?.nickname !== data?.nickname ||
            user?.imageUrl !== data?.imageUrl
          ) {
            setUser({
              id: data?.id,
              nickname: data?.nickname,
              imageUrl: data?.imageUrl,
            });
          }
        };
        getCurrentUser();
      } else {
        router.push("/signin");
      }
    });
  };
  return { getAuthState };
};
