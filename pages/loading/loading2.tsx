import { useRouter } from "next/router";
import { useEffect } from "react";
import Lottie from "react-lottie"
import animationData from "../../src/json/65556-movies-title-animation.json";

const Loading2 = () => {
  const router = useRouter();
  useEffect(() => {
    setTimeout(function(){
      router.push("/")
    }, 5*1000);
  }, [])

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  return (
    <div className="bg-Black h-screen w-full">
      <Lottie options={defaultOptions} />
    </div>
  );
}

export default Loading2