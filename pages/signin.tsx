import "../firebase/firebase"
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithRedirect,
} from "firebase/auth";
import { useRouter } from "next/router";
import { MouseEventHandler, useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { userState } from "../src/recoil/userState";
import { useRecoilState } from "recoil";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useRecoilState(userState);
  const router = useRouter();
  const auth = getAuth();
  const GoogleProvider = new GoogleAuthProvider();

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        router.push(`/mypage/${user?.id}`)
      } else {
        return;
      }
    })
  }, [])

  const onClickSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        router.push(`/mypage/${user?.id}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onClickGoogleSignUp: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    signInWithRedirect(auth, GoogleProvider);
    router.push("/loading/loading3");
  };

  return (
    <>
      <div className="flex flex-col items-center justify-end h-screen bg-Black shadow border border-Black pb-40">
        <div className="lg:w-2/5 flex flex-col space-y-6 items-center justify-start px-14 pb-8 bg-Primary">
          <p className="flex-1 h-full text-5xl font-bold text-center text-Black p-5">
            Sign in
          </p>
          <div className="w-full pl-6">
            <p className="text-xl font-bold text-Black">Email</p>
            <input
              type="email"
              className="lg:w-3/4 h-10 text-lg p-2 mt-3 lg:ml-10 rounded-lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="w-full pl-6">
            <p className="text-xl font-bold text-Black">Password</p>
            <input
              type="password"
              className="lg:w-3/4 h-10 text-lg p-2 mt-3 lg:ml-10 rounded-lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="w-3/4 lg:w-1/2 h-15">
            <button
              className="h-full w-full text-sm lg:text-lg font-bold text-center text-Black bg-Gray rounded-full p-2"
              onClick={onClickSignIn}
            >
              Sign in
            </button>
          </div>
          <div className="w-3/4 lg:w-1/2 h-15">
            <button
              className="flex space-x-0.5 items-center h-full w-full text-sm lg:text-lg font-bold text-center text-Black bg-Secondary rounded-full p-2"
              onClick={onClickGoogleSignUp}
            >
              <FcGoogle className="w-10 h-9 rounded-lg" />
              Sign in with Google
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signin;
