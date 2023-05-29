import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { auth, db } from '../firebase/firebase';
import { useSetRecoilState } from 'recoil';
import { userState } from '../src/recoil/userState';
import { useCallback, useEffect } from 'react';

export const useAuth = () => {
  const router = useRouter();
  const setUser = useSetRecoilState(userState);

  /** ユーザーの情報を取得する処理 */
  const getCorrectUser = useCallback(async (uid: string) => {
    const docRef = doc(db, 'users', `${uid}`);
    const docSnap = await getDoc(docRef);
    const data = docSnap.data();
    if (!data) return;

    setUser({
      userId: data.userId,
      imageUrl: data.imageUrl,
      nickname: data.nickname,
    });
  }, [setUser]);

  /** ログイン状態の判定を行う処理 */
  const getAuthState = useCallback(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        getCorrectUser(currentUser.uid);
      } else {
        router.push('/signin');
      }
    });
  }, [getCorrectUser, router]);

  /** 初回読み込み時にログイン状態の判定を行う */
  useEffect(() => {
    getAuthState();
  }, [getAuthState])

  return { getAuthState, getCorrectUser };
};
