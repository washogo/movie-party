/* eslint-disable @next/next/no-img-element */
import { getAuth } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { useRouter } from "next/router";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { db } from "../firebase/firebase";
import { userState } from "../src/recoil/userState";

const Registration = () => {
  const [previewUrl, setPreviewUrl] = useState("/nc96424.jpeg");
  const [imageUrl, setImageUrl] = useState("");
  const router = useRouter();
  const { nickname, email } = router.query;
  const [name, setName] = useState(nickname);
  const setUser = useSetRecoilState(userState);

  const getImageUrl = (e: any) => {
    const imageFile = e.target.files;
    let blob = new Blob(imageFile, { type: "image/jpeg" });
    const previewUrl = URL.createObjectURL(imageFile[0]);
    setPreviewUrl(previewUrl);

    const S = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQISTUVWXYZ123456789";
    const N = 16;
    const fileName = Array.from(crypto.getRandomValues(new Uint32Array(N)))
      .map((n) => S[n % S.length])
      .join("");

    const storage = getStorage();
    const storageRef = ref(storage, `${fileName}`);
    // 'file' comes from the Blob or File API
    uploadBytes(storageRef, blob).then((snapshot) => {
      getDownloadURL(ref(storage, `${fileName}`)).then((url) => {
        setImageUrl(url);
      });
    });
  };

  const createAccount = () => {
    const { uid } = getAuth().currentUser!;
    if (nickname !== "") {
      setDoc(doc(db, "users", `${uid}`), {
        userId: uid.toString(),
        imageUrl: imageUrl,
        nickname: nickname,
        email: email,
      });
      setUser({
        userId: uid.toString(),
        imageUrl: imageUrl,
        nickname: nickname!.toString(),
      });
      router.push("./loading/loading2");
    }
  };

  return (
    <div className="sm:flex flex items-center justify-center h-screen bg-Black">
      <div className="h-2/3 bg-Gray p-14">
        <p className="basis-5/6 text-5xl font-bold text-center text-Black p-5">
          Your Info
        </p>
        <div className="flex flex-col gap-6">
          <div className="w-full pl-6 basis-5/6">
            <p className="text-2xl font-bold text-Black">Your Email</p>
            <input type="email" readOnly value={email} className="p-2 text-center bg-Tertiary rounded-md outline-none" />
          </div>
          <div className="w-full pl-6 basis-5/6">
            <p className="text-2xl font-bold text-Black">Your Image</p>
            <input
              type="file"
              className="w-full text-lg mt-3"
              onChange={(e) => getImageUrl(e)}
            />
          </div>
          <div className="sm:flex flex-row items-center mt-1 w-full basis-5/6">
            <img
              src={previewUrl}
              className="basis-5/12 rounded-full bg-White sm:h-[160px] sm:w-[160px]"
              alt="user image"
            />

            <div className="basis-7/12 ml-5 h-12 rounded-lg text-3xl font-bold text-center p-1">
              <input
                type="text"
                value={name}
                className="text-center bg-Tertiary rounded-md outline-none"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
          <div className="w-2/3 h-20 p-2 mx-auto">
            <button
              className="h-full w-full text-xl font-bold text-center text-Black bg-Primary rounded-full p-2"
              onClick={createAccount}
            >
              Create Your Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
