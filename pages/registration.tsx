import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { fileURLToPath, urlToHttpOptions } from "url";
import { db } from "../firebase/firebase";
import { userState } from "../src/recoil/userState";

const Registration = () => {
  const [id, setId] = useState("");
  const [previewUrl, setPreviewUrl] = useState("/nc96424.jpeg");
  const [imageUrl, setImageUrl] = useState("");
  const router = useRouter();
  const uid = router.query.id;
  const nickname = router.query.nickname;
  const setUser = useSetRecoilState(userState);

  const getImageUrl = (e: any) => {
    const imageFile = e.target.files;
    let blob = new Blob(imageFile, { type: "image/jpeg" });
    const previewUrl = URL.createObjectURL(imageFile[0])
    setPreviewUrl(previewUrl)

    const S = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQISTUVWXYZ123456789";
    const N = 16;
    const fileName = Array.from(
      crypto.getRandomValues(new Uint32Array(N))
    ).map((n) => S[n%S.length]).join('');

    const storage = getStorage();
    const storageRef = ref(storage, `${fileName}`);
    // 'file' comes from the Blob or File API
    uploadBytes(storageRef, blob).then((snapshot) => {
      getDownloadURL(ref(storage, `${fileName}`)).then((url) => {
        setImageUrl(url)
      })
    });
  };

  const createAccount = () => {
    setDoc(doc(db, "users", `${uid}`), {
      id: id,
      imageUrl: imageUrl,
      nickname: nickname,
    });
    setUser({ id: id, imageUrl: imageUrl, nickname: nickname });
    router.push("./loading/loading2");
  };

  console.log(imageUrl)

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-Black shadow">
      <div className="h-5/6 flex flex-col space-y-2 items-center justify-start px-14 bg-Gray">
        <p className="basis-20 text-5xl font-bold text-center text-Black p-5">
          Your Info
        </p>
        <div className="w-full pl-6 basis-20">
          <p className="text-xl font-bold text-Black">ID</p>
          <input
            type="text"
            className="w-full h-10 text-lg p-2 mt-3 rounded-lg"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </div>
        <div className="w-full pl-6">
          <p className="text-xl font-bold text-Black">Your Image</p>
          <input type="file" className="text-lg mt-3" onChange={getImageUrl} />
        </div>
        <div className="flex flex-row items-center mt-1 w-full basis-60">
          <Image
            src={previewUrl}
            width="160px"
            height="160px"
            className="basis-5/12 rounded-full bg-White"
            alt="user image"
          />

          <div className="basis-7/12 ml-5 h-12 rounded-lg bg-White text-3xl font-bold text-center p-1">
            {nickname}
          </div>
        </div>
        <div className="w-2/3 h-20 p-2">
          <button
            className="h-full w-full text-xl font-bold text-center text-Black bg-Primary rounded-full p-2"
            onClick={createAccount}
          >
            Create Your Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Registration;
