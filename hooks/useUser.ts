import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { useRecoilState } from 'recoil';
import { userState } from '../src/recoil/userState';

/** ユーザー情報の状態管理を行うカスタムフック */
export const useUser = () => {
  const [user, setUser] = useRecoilState(userState);

  const setCorrectUser = async (uid: string) => {
    const docRef = doc(db, 'users', `${uid}`);
    const docSnap = await getDoc(docRef);
    const data = docSnap.data();
    if (!data) return;

    setUser({
      userId: data.userId,
      imageUrl: data.imageUrl,
      nickname: data.nickname,
    });
  };

  return { user, setCorrectUser }
};
