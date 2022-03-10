import { FcGoogle } from "react-icons/fc";

const Signup = () => {
  return (
    <div
      className="inline-flex flex-col items-center justify-end px-96 py-52 bg-Black shadow border border-black"
      style={{ width: "1440px", height: "1024px" }}
    >
      <div
        className="flex items-center justify-start pl-24 pr-28 pt-5 pb-6 bg-Gray"
        style={{ width: "538px", height: "91px" }}
      >
        <p className="flex-1 h-full text-5xl font-bold text-center text-Black">
          Sign up
        </p>
      </div>
      <div
        className="flex flex-col space-y-6 items-center justify-start px-14 pt-0.5 pb-8 bg-Gray"
        style={{ width: "538px", height: "507px" }}
      >
        <div
          className="flex flex-col items-center justify-end"
          style={{ width: "421px", height: "87px" }}
        >
          <p
            className="text-xl font-bold text-Black"
            style={{ width: "412px", height: "33.37px" }}
          >
            NickName
          </p>
          <div
            className="bg-White rounded-full"
            style={{ width: "421px", height: "54px" }}
          />
        </div>
        <div
          className="flex flex-col items-center justify-end"
          style={{ width: "538px", height: "507px" }}
        >
          <p
            className="text-xl font-bold text-Black"
            style={{ width: "421px", height: "30.93px" }}
          >
            Email
          </p>
          <div
            className="bg-White rounded-full"
            style={{ width: "421px", height: "56.07px" }}
          />
        </div>
        <div
          className="flex flex-col items-center justify-end"
          style={{ width: "538px", height: "507px" }}
        >
          <p
            className="text-xl font-bold text-Black"
            style={{ width: "421px", height: "30.93px" }}
          >
            Passwaord
          </p>
          <div
            className="bg-White rounded-full"
            style={{ width: "421px", height: "56.07px" }}
          />
        </div>
        <div className="w-80 h-14">
          <div className="flex items-center justify-center flex-1 h-full px-16 pt-2 pb-2.5 bg-Primary rounded-full">
            <p className="flex-1 h-full text-xl font-bold text-center text-Black">
              Sign Up
            </p>
          </div>
        </div>
        <div className="w-80 h-14">
          <div className="flex space-x-0.5 items-center justify-end flex-1 h-full py-2 pl-12 pr-10 bg-Secondary rounded-full">
            <FcGoogle className="w-10 h-9 rounded-lg" />
            <p className="w-56 h-full text-lg font-bold text-center">
              Sign in with Google
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
