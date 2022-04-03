import "../../firebase/firebase";
import { getAuth, getRedirectResult } from "firebase/auth";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Lottie from "react-lottie";
import animationData from "../../src/json/1961-movie-loading.json";

const Loading3 = () => {
  const auth = getAuth();
  const router = useRouter();

  useEffect(() => {
    getRedirectResult(auth)
      .then((result) => {
        router.push({
          pathname: "/registration",
          query: { nickname: result?.user.displayName },
        });
      })
      .catch((error) => {
        router.push("/signup");
      });
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
