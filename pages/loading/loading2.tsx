import Lottie from "react-lottie"
import animationData from "../../src/json/65556-movies-title-animation.json";

const Loading2 = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  return (
    <div className="bg-Black h-screen">
      <Lottie options={defaultOptions} />
    </div>
  );
}

export default Loading2