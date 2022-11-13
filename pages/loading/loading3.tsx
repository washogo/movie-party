import "../../firebase/firebase";
import { getAuth, getRedirectResult } from "firebase/auth";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Lottie from "react-lottie";
import animationData from "../../src/json/1961-movie-loading.json";
import { useRecoilState } from "recoil";
import { userState } from "../../src/recoil/userState";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/firebase";

const Loading3 = () => {
  const auth = getAuth();
  const [user, setUser] = useRecoilState(userState);
  const router = useRouter();

  useEffect(() => {
    getRedirectResult(auth)
      .then((result) => {
        if (!result) return;
        const docsRef = query(
          collection(db, "users"),
          where("email", "==", result.user.email)
        );
        getDocs(docsRef)
          .then((snapshot) => {
            if (snapshot.docs.length === 0) {
              router.push({
                pathname: "/registration",
                query: {
                  nickname: result.user.displayName,
                  email: result.user.email,
                },
              });
            } else {
              router.push("/");
            }
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
        router.push("/signup");
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="bg-Black h-screen w-full">
      <Lottie options={defaultOptions} />
    </div>
  );
};

export default Loading3;
