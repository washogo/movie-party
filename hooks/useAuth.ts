import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/router';
import { auth } from '../firebase/firebase';
import { useEffect } from 'react';
import { useUser } from './useUser';

/** 初回読み込み時にログイン判定を行うカスタムフック */
export const useAuth = () => {
  const { setCorrectUser } = useUser();
  const router = useRouter();

  useEffect(() => {
    // ログイン状態の判定を行う処理
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setCorrectUser(currentUser.uid);
      } else {
        router.push('/signin');
      }
    });
  }, [router, setCorrectUser]);
};
