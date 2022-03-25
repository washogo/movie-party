import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { onAuth } from "../../firebase/auth";
import { db } from "../../firebase/firebase";
import { userState } from "../../src/recoil/userState";
import { User } from "../../src/types/useUser";

const Mypage = () => {
  const auth = getAuth();
  const router = useRouter();
  const currentUser = auth.currentUser;
  const [user, setUser] = useRecoilState(userState);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const getCurrentUser = async () => {
          const docRef = doc(db, "users", `${user.uid}`);
          const docSnap = await getDoc(docRef);
          const data = docSnap.data();
          setUser({
            id: data?.id,
            nickname: data?.nickname,
            imageUrl: data?.imageUrl,
          });
        };
        getCurrentUser();
      } else {
        router.push("/signup");
      }
    });
  }, []);

  // useEffect(() => {
  //   const getCurrentUser = async () => {
  //     const docRef = doc(db, "users", `${auth.currentUser?.uid}`);
  //     const docSnap = await getDoc(docRef);
  //     const data = docSnap.data();
  //     console.log(data);
  //   };
  //   getCurrentUser();
  // }, [currentUser]);

  console.log(user);

  return (
    <>
      {user !== null && (
        <Image
          src={user.imageUrl}
          width="200px"
          height="200px"
          className="rounded-full bg-Primary"
          alt="user image"
          priority={true}
          loading="eager"
        />
      )}
      <div className="rounded-full bg-Primary w-1/2 h-full mx-auto"></div>
      <p className="text-Black text-3xl font-bold">{user?.nickname}</p>
          <p className="text-Black text-xl">ID：{user?.id}</p>
      <p className="xl:text-2xl font-bold text-center text-Black p-2 w-1/3">
        MARVEL SPIDER-MAN~No Way Home~
      </p>
      <div className="xl:grid grid-cols-6 gap-2 mt-2 bg-Gray w-1/3 ">
        <div className="col-start-1 col-span-3">
          <Image
            width="318.56px"
            height="469px"
            layout="responsive"
            src="/movie_sample.jpeg"
            alt="movie sample1"
          />
        </div>
        <div className="col-start-4 col-span-3 h-80 overflow-scroll">
          <span>⭐️⭐️⭐️⭐️⭐️</span>
          <p className="text-xs xl:text-lg">
            複素数体であれば、任意のCM-タイプのAは、実際、数体である定義体（英語版）(field
            ofdefinition)を持っている。自己準同型環の可能なタイプは、
            対合（ロサチの対合（英語版）(Rosatiinvolution）をもつ環
            として既に分類されていて、CM-タイプのアーベル多様体の分類を
            導き出す。楕円曲線と同じような方法でCM-タイプの多様体を構成す
            るには、Cdの中の格子 Λから始め、アーベル多様体のリーマンの関
            係式（英語版）(Riemannrelations)を考えに入れる必要がある。
          </p>
        </div>
        <button className="col-start-5 col-span-2 bg-Secondary rounded-full w-1/2 h-full hover:bg-Black xl:text-lg font-bold mx-auto">
          Edit
        </button>
      </div>
    </>
  );
};

export default Mypage;
