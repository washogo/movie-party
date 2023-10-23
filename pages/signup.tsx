import '../firebase/firebase';
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { FcGoogle } from 'react-icons/fc';
import { MouseEventHandler, useState } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { useUser } from '../hooks/useUser';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = getAuth();
  const router = useRouter();
  const GoogleProvider = new GoogleAuthProvider();
  const { setCorrectUser } = useUser();

  const onClickSignUp: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    if (password.length >= 8 && name !== '') {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const { uid } = userCredential.user;
          router.push({
            pathname: '/registration',
            query: { uid: uid, nickname: name, email: email },
          });
        })
        .catch((error) => {
          switch (error.code) {
            case 'auth/missing-email':
              toast.warning('メールアドレスが間違っています');
              break;
            case 'auth/invalid-email':
              toast.warning('メールアドレスが間違っています');
              break;
            case 'auth/email-already-in-use':
              toast.warning('メールアドレスは登録済みです');
              break;
            default:
              toast.error('アカウントを作成できません');
              break;
          }
          console.log(error);
        });
    } else if (password.length < 8) {
      toast.warning('パスワードは８文字以上です');
    } else if (name === '') {
      toast.warning('ニックネームを入力してください');
    }
  };

  const onClickGoogleSignUp: MouseEventHandler<HTMLButtonElement> = (e) => {
    signInWithPopup(auth, GoogleProvider)
      .then((result) => {
        const userId = result.user.uid;
        setCorrectUser(userId);
        router.push('/');
      })
      .catch((error) => {
        toast.error('ログインできません');
        console.log(error);
      });
  };

  return (
    <div className="h-full bg-Black shadow border border-Black">
      <div className="xs:w-full md:w-4/5 mx-auto flex flex-col space-y-6 items-center bg-Primary h-screen">
        <p className="text-5xl font-bold text-center text-Black pt-10">Sign up</p>
        <div className="w-4/5 flex flex-col">
          <label className="text-xl font-bold text-Black">NickName</label>
          <input
            type="text"
            className="w-full h-10 text-lg mt-3 mx-auto rounded-lg"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="w-4/5 flex flex-col">
          <label className="text-xl font-bold text-Black">Email</label>
          <input
            type="email"
            className="w-full h-10 text-lg mt-3 mx-auto rounded-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="w-4/5 flex flex-col">
          <label className="text-xl font-bold text-Black">
            Password <span className="text-sm font-bold text-Black">(at least 8 characters)</span>
          </label>
          <input
            type="password"
            className="w-full h-10 text-lg mt-3 mx-auto rounded-lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="xl:w-2/5 h-15">
          <button
            className="h-full w-full text-sm lg:text-lg font-bold text-center text-Black bg-Gray rounded-full py-2 px-5"
            onClick={onClickSignUp}
          >
            Sign Up
          </button>
        </div>
        <div className="2xl:w-1/2 h-15">
          <button
            className="flex justify-center items-center h-full w-full text-sm lg:text-lg font-bold text-center text-Black bg-Secondary rounded-full p-2"
            onClick={onClickGoogleSignUp}
          >
            <FcGoogle className="w-6 h-6 lg:w-10 lg:h-9rounded-lg" />
            Sign in with Google
          </button>
        </div>
        <div className="h-15">
          <button
            className="h-full w-full text-sm lg:text-lg font-bold text-center text-Black bg-Tertiary rounded-full p-2"
            onClick={() => router.push('/signin')}
          >
            Already have your account?
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
