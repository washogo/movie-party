import "../firebase/firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithRedirect,
} from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { MouseEventHandler, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = getAuth();
  const router = useRouter();
  const GoogleProvider = new GoogleAuthProvider();

  const onClickSignUp: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    if (password.length >= 8 && name !== "") {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          const id = user.uid;
          router.push({
            pathname: "/registration",
            query: { id: id, nickname: name },
          });
        })
        .catch((error) => {
          switch (error.code) {
            case "auth/missing-email":
              toast.warning("メールアドレスが間違っています");
              break;
            case "auth/invalid-email":
              toast.warning("メールアドレスが間違っています");
              break;
            case "auth/email-already-in-use":
              toast.warning("メールアドレスは登録済みです");
              break;
            default:
              toast.error("アカウントを作成できません");
              break;
          }
          console.log(error);
        });
    } else if (password.length < 8) {
      toast.warning("パスワードは８文字以上です");
    } else if (name === "") {
      toast.warning("ニックネームを入力してください");
    }
  };

  const onClickGoogleSignUp: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    signInWithRedirect(auth, GoogleProvider);
    router.push("/loading/loading3");
  };

  return (
    <div className="flex flex-col items-center justify-end h-full w-full bg-Black shadow border border-Black pb-40">
      <div className="w-full sm:w-1/2 flex flex-col space-y-6 items-center justify-start my-20 pb-8 bg-Gray">
        <p className="w-full h-full lg:text-5xl text-5xl font-bold text-center text-Black p-5">
          Sign up
        </p>
        <div className="w-3/4 xl:px-5">
          <p className="text-xl font-bold text-Black">NickName</p>
          <input
            type="text"
            className="w-full h-10 text-lg p-2 mt-3 rounded-lg"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="w-3/4 xl:px-5">
          <p className="text-xl font-bold text-Black">Email</p>
          <input
            type="email"
            className="w-full h-10 text-lg p-2 mt-3 rounded-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="w-3/4 xl-px-5">
          <p className="text-xl font-bold text-Black">Password</p>
          <input
            type="password"
            className="w-full h-10 text-lg p-2 mt-3 rounded-lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="w-3/4 lg:w-1/2 h-15">
          <button
            className="h-full w-full text-sm lg:text-lg font-bold text-center text-Black bg-Primary rounded-full p-2"
            onClick={onClickSignUp}
          >
            Sign Up
          </button>
        </div>
        <div className="w-3/4 lg:w-1/2 h-15">
          <button
            className="flex space-x-0.5 justify-center items-center h-full w-full text-sm lg:text-lg font-bold text-center text-Black bg-Secondary rounded-full p-2"
            onClick={onClickGoogleSignUp}
          >
            <FcGoogle className="w-10 h-9 rounded-lg" />
            Sign in with Google
          </button>
        </div>
        <div className="w-3/4 h-15">
          <button
            className="h-full w-full text-sm lg:text-lg font-bold text-center text-Black bg-Tertiary rounded-full p-2"
            onClick={() => router.push("/signin")}
          >
            Already have your account?
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
