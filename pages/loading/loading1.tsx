import Lottie from "react-lottie"
import animationData from "../../src/json/81986-movie.json";

const Loading1 = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  return (
    <div className="bg-Black">
      <Lottie options={defaultOptions} height="100vh" width="100vh" />
    </div>
  );
}

export default Loading1