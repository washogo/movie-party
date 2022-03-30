/* eslint-disable @next/next/no-img-element */
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BsFillStarFill } from "react-icons/bs";
import { useRecoilState, useSetRecoilState } from "recoil";
import Hamburger from "../../components/atoms/Hamburger";
import { Footer } from "../../components/molecules/Footer";
import { Header } from "../../components/molecules/Header";
import { Auth } from "../../firebase/auth";
import { db } from "../../firebase/firebase";
import { moviesState, movieState, searchMoviesState } from "../../src/recoil/movieState";
import { userState } from "../../src/recoil/userState";
import { Movie } from "../../src/types/useMovie";
import { Review } from "../../src/types/useReview";

const Mypage = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const auth = getAuth();
  const router = useRouter();
  const [user, setUser] = useRecoilState(userState);
  const [reviews, setReviews] = useState<Array<Review>>([]);
  const [authChecked, setAuthChecked] = useState(false);
  const { getAuthState } = Auth({ auth, user, setUser });
  const setSearchMovies = useSetRecoilState<Movie[]>(searchMoviesState);

  useEffect(() => {
    getAuthState();
    setAuthChecked(true);
  }, [auth]);

  useEffect(() => {
    const getReviews = async () => {
      const q = query(
        collection(db, "reviews"),
        where("userId", "==", user?.id)
      );

      await getDocs(q).then((snapshot) => {
        const arr = snapshot.docs.map((doc) => ({
          id: doc.id,
          userId: doc.data().userId,
          movieTitle: doc.data().movieTitle,
          imagePath: doc.data().imagePath,
          evaluation: doc.data().evaluation,
          review: doc.data().review,
        }));
        setReviews(arr);
      });
    };
    getReviews();
  }, [user]);

  return (
    <div className="bg-Black h-full relative pb-32">
      <Header setSearchMovies={setSearchMovies} />
      {user !== null && authChecked && (
        <div
          className={
            openMenu
              ? "grid grid-cols-12 grid-rows-3 w-full h-32 bg-WhiteGray opacity-25 pointer-events-none mb-10"
              : "grid grid-cols-12 grid-rows-3 w-full h-32 bg-WhiteGray mb-10"
          }
        >
          <div className="col-start-2 col-span-1">
            <img
              src={user.imageUrl}
              className="rounded-full bg-Primary h-[120px] w-[120px]"
              alt="user image"
            />
          </div>
          <p className="text-Black text-3xl font-bold col-start-3 col-span-2 row-start-3 row-span-1">
            {user.nickname} Movies
          </p>
          <p className="text-Black text-xl col-start-10 col-span-1 row-start-3 row-span-1">
            ID：{user.id}
          </p>
        </div>
      )}
      <Hamburger openMenu={openMenu} setOpenMenu={setOpenMenu} auth={auth} />
      <div
        className={
          openMenu
            ? reviews.length === 0
              ? "container mx-20 grid grid-cols-10 opacity-25 pointer-events-none h-screen"
              : "container mx-20 grid grid-cols-10 opacity-25 pointer-events-none h-full"
            : reviews.length === 0
            ? "container mx-20 grid grid-cols-10 h-screen"
            : "container mx-20 grid grid-cols-10 h-full"
        }
      >
        {reviews.length > 0 && reviews.map((review) => (
          <>
            <div key={review.id} className="col-span-5 mx-10 mt-5 bg-WhiteGray">
              <p className="xl:text-xl font-bold text-center text-Black p-2 w-full border-b-8 border-Black">
                {review.movieTitle}
              </p>
              <div className="xl:grid grid-cols-6 w-full">
                <div className="col-start-1 col-span-3">
                  <img
                    className=" h-[420px] w-[280px]"
                    src={`https://image.tmdb.org/t/p/w500/${review.imagePath}`}
                    alt="movie sample1"
                  />
                </div>
                <div className="col-start-4 col-span-3 h-80 overflow-scroll">
                  <div className="flex h-16 border-b-8 border-Black">
                    {[...Array(review.evaluation)]
                      .map((_, i) => i)
                      .map((num) => (
                        <BsFillStarFill
                          key={num}
                          size="50"
                          className="text-Warning"
                          cursor="pointer"
                        />
                      ))}
                  </div>
                  <p className="text-xs xl:text-lg">{review.review}</p>
                </div>
                <button
                  className="col-start-5 col-span-2 bg-Secondary rounded-full w-5/6 h-full hover:bg-Black xl:text-lg font-bold mx-auto"
                  onClick={() =>
                    router.push({
                      pathname: `/reviews/${review.id}/edit`,
                      query: { id: review.id },
                    })
                  }
                >
                  Edit
                </button>
              </div>
            </div>
          </>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Mypage;
