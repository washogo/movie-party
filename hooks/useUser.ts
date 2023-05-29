import { useRecoilState } from 'recoil';
import { userState } from '../src/recoil/userState';

/** ユーザー情報の状態管理を行うカスタムフック */
export const useUser = () => {
  const [user, setUser] = useRecoilState(userState);

  const setCorrectUser = async (uid: string) => {
    const data = await (await fetch(`/api/user/correct?uid=${uid}`)).json();

    setUser({
      userId: data.userId,
      imageUrl: data.imageUrl,
      nickname: data.nickname,
    });
  };

  return { user, setCorrectUser }
};
