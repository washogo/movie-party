import Router, { useRouter } from "next/router";
import { useEffect } from "react";
import Lottie from "react-lottie";
import { useRecoilState, useRecoilValue } from "recoil";
import animationData from "../../src/json/81986-movie.json";
import { loadingState } from "../../src/recoil/loadingState";

const Loading1 = () => {
  const router = useRouter();
  const url = router.query.url
  const [isLoading, setIsLoading] = useRecoilState(loadingState);

  useEffect(() => {
    isLoading === false && router.push(`${url}`);
  }, [isLoading])

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="bg-Black">
      <Lottie options={defaultOptions} height="100vh" width="100vh" />
    </div>
  );
};

export default Loading1;
