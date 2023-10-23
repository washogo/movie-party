import { useRecoilState } from 'recoil';
import { userState } from '../src/recoil/userState';

/** ユーザー情報の状態管理を行うカスタムフック */
export const useUser = () => {
  const [user, setUser] = useRecoilState(userState);

  const setCorrectUser = async (uid: string) => {
    const data = await fetch(`/api/user/correct?uid=${uid}`);
    const json = await data.json();

    setUser({
      userId: json.userId,
      imageUrl: json.imageUrl,
      nickname: json.nickname,
    });
  };

  return { user, setCorrectUser };
};
