/* eslint-disable @next/next/no-img-element */
import { getAuth } from "firebase/auth";
import { deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BsFillStarFill } from "react-icons/bs";
import { toast } from "react-toastify";
import { useRecoilState, useSetRecoilState } from "recoil";
import { Hamburger } from "../../../components/atoms/Hamburger";
import { Footer } from "../../../components/molecules/Footer";
import { Header } from "../../../components/molecules/Header";
import { Auth } from "../../../firebase/auth";
import { db } from "../../../firebase/firebase";
import { searchMoviesState } from "../../../src/recoil/movieState";
import { userState } from "../../../src/recoil/userState";
import { Movie } from "../../../src/types/useMovie";
import { Review } from "../../../src/types/useReview";

const Edit = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const auth = getAuth();
  const [user, setUser] = useRecoilState(userState);
  const { getAuthState } = Auth({ auth, user, setUser });
  const setSearchMovies = useSetRecoilState<Movie[]>(searchMoviesState);
  const [review, setReview] = useState<Review | null>(null);
  const router = useRouter();
  const id = router.query.id;

  const [isSelected, setIsSelected] = useState(0);
  const [evaluation, setEvaluation] = useState(0);
  const [content, setContent] = useState("");
  const [isClicked, setIsClicked] = useState(true);
  const mypagePath = `/mypage/${user?.userId}`;
  console.log(user)
  useEffect(() => {
    getAuthState();
  }, [auth]);

  useEffect(() => {
    const docRef = doc(db, "reviews", `${id}`);
    const getReview = async () => {
      await getDoc(docRef)
        .then((snapshot) => {
          const data = snapshot.data();
          if (data) {
            setReview({
              id: `${id}`,
              userId: data.userId,
              movieTitle: data.movieTitle,
              imagePath: data.imagePath,
              evaluation: data.evaluation,
              review: data.review,
            });
            setIsSelected(data.evaluation);
            setContent(data.review);
          }
        })
        .catch((error) => {
          toast.error("レビューが見つかりませんでした", {
            onClose: () => router.push(mypagePath),
          });
          console.log(error);
        });
    };
    getReview();
  }, [id]);

  const onHoverStar = (num: number) => {
    setIsClicked(false);
    setIsSelected(num);
  };

  const onHoverOut = () => {
    setIsSelected(0);
  };

  const onClickStar = (num: number) => {
    if (num === isSelected && isClicked === true) {
      setIsClicked(false);
    } else if (
      (num === isSelected && isClicked === false) ||
      num !== isSelected
    ) {
      setIsClicked(true);
    }
    setIsSelected(num);
    setEvaluation(num);
  };

  const onChangeReview = async () => {
    await setDoc(doc(db, "reviews", `${id}`), {
      userId: review?.userId,
      movieTitle: review?.movieTitle,
      imagePath: review?.imagePath,
      evaluation: evaluation,
      review: content,
    })
      .then(() => {
        toast.success("レビューを変更しました", {
          onClose: () => router.push(mypagePath),
        });
      })
      .catch((error) => {
        toast.error("レビューを更新できませんでした", {
          onClose: () => router.push(mypagePath),
        });
        console.log(error);
      });
  };

  const onClickDelete = async () => {
    await deleteDoc(doc(db, "reviews", `${id}`))
      .then(() => {
        toast.success("レビューを削除しました", {
          onClose: () => router.push(mypagePath),
        });
      })
      .catch((error) => {
        toast.success("レビューを削除できませんでした", {
          onClose: () => router.push(mypagePath),
        });
        console.log(error);
      });
  };

  return (
    <div className="h-full relative bg-Primary pb-32">
      <Header setSearchMovies={setSearchMovies} />
      <Hamburger openMenu={openMenu} setOpenMenu={setOpenMenu} auth={auth} />
      <div className="grid grid-cols-12">
        <div className="col-start-2 col-span-10">
          <p className="text-4xl font-bold text-center text-White bg-Gray border-b-4 border-b-Black">
            {review?.movieTitle}
          </p>
          <div className="lg:grid grid-cols-3 gap-x-2 mt-3">
            <div className="col-span-1">
              <div>
                <img
                  className="w-full h-full"
                  src={`https://image.tmdb.org/t/p/w500/${review?.imagePath}`}
                  alt="movie sample1"
                />
              </div>
            </div>
            <div className="col-span-2 lg:grid grid-rows-10 gap-3">
              <div className="row-span-1">
                <label
                  htmlFor="evaluation"
                  className="text-lg lg:text-2xl font-bold"
                >
                  Evaluation
                </label>
                <br />
                <div className="flex justify-center">
                  {[...Array(5)]
                    .map((_, i) => i + 1)
                    .map((num) =>
                      isClicked && isSelected >= num ? (
                        <BsFillStarFill
                          key={num}
                          size="50"
                          className="text-Warning mr-5"
                          onClick={() => onClickStar(num)}
                          cursor="pointer"
                        />
                      ) : isSelected >= num ? (
                        <BsFillStarFill
                          key={num}
                          size="50"
                          className="text-Warning mr-5"
                          onMouseLeave={onHoverOut}
                          onClick={() => onClickStar(num)}
                          cursor="pointer"
                        />
                      ) : (
                        <BsFillStarFill
                          key={num}
                          size="50"
                          className="text-White hover:text-Warning mr-5"
                          onMouseEnter={() => onHoverStar(num)}
                          onClick={() => onClickStar(num)}
                        />
                      )
                    )}
                </div>
              </div>
              <div className="row-span-6">
                <label
                  htmlFor="review"
                  className="text-lg lg:text-2xl font-bold"
                >
                  Review
                </label>
                <br />
                <div className="w-full h-full">
                  <textarea
                    id="review"
                    className="w-full h-80 lg:w-5/6 lg:h-5/6 my-3 ml-5 lg:ml-20 rounded-lg text-xl xl:text-3xl"
                    onChange={(e) => setContent(e.target.value)}
                    value={content}
                  />
                </div>
              </div>
              <div className="row-span-1 flex justify-end items-end">
                <button
                  className="h-1/2 bg-Success rounded-full hover:bg-Black px-6 mr-3"
                  onClick={onChangeReview}
                >
                  Change
                </button>
                <button
                  className="h-1/2 bg-Danger rounded-full hover:bg-Black px-6 mr-3"
                  onClick={onClickDelete}
                >
                  Delete
                </button>
                <button
                  className="h-1/2 bg-Secondary rounded-full hover:bg-Black px-6"
                  onClick={() => router.push(mypagePath)}
                >
                  Back
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Edit;
