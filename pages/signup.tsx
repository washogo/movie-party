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

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = getAuth();
  const currentUser = auth.currentUser;
  const router = useRouter();
  const GoogleProvider = new GoogleAuthProvider();

  // useEffect(() => {
  //   onAuthStateChanged(auth, (user) => {
  //     if(user){
  //       if (currentUser !== null) {
  //         showMessage({
  //           title: "警告",
  //           description: "ログインしています",
  //           status: "warning",
  //         });
  //       } else {
  //         return;
  //       }
  //     }
  //     else{
  //       return;
  //     }
  //   })
  // }, [auth]);

  const onClickSignUp: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    if (password.length >= 8 && name !== "") {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          const id = user.uid;
          router.push({ pathname: "/registration", query: { id: id } });
        })
        .catch((error) => {});
    } else if (password.length < 8) {
    }
  };

  const onClickGoogleSignUp: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    signInWithRedirect(auth, GoogleProvider);
    router.push("/loading");
  };

  return (
    <div className="flex flex-col items-center justify-end py-52 bg-Black shadow border border-Black">
      <div className="lg:w-2/5 flex flex-col space-y-6 items-center justify-start px-14 pt-0.5 pb-8 bg-Gray">
        <p className="flex-1 h-full text-5xl font-bold text-center text-Black p-5">
          Sign up
        </p>
        <div className="w-full pl-6">
          <p className="text-xl font-bold text-Black">NickName</p>
          <input
            type="text"
            className="lg:w-3/4 h-10 text-lg p-2 mt-3 lg:ml-10 rounded-lg"
          />
        </div>
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
            className="h-full w-full text-sm lg:text-lg font-bold text-center text-Black bg-Primary rounded-full p-2"
            onClick={onClickSignUp}
          >
            Sign Up
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
  );
};

export default Signup;
