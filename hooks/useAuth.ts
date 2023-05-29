import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { auth, db } from '../firebase/firebase';
import { useSetRecoilState } from 'recoil';
import { userState } from '../src/recoil/userState';

export const useAuth = () => {
  const router = useRouter();
  const setUser = useSetRecoilState(userState);

  const getCorrectUser = async (uid: string) => {
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

  const getAuthState = () => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        getCorrectUser(currentUser.uid);
      } else {
        router.push('/signin');
      }
    });
  };
  return { getAuthState, getCorrectUser };
};
