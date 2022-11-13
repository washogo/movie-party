import { getAuth } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BsFillStarFill } from "react-icons/bs";
import { useRecoilState, useSetRecoilState } from "recoil";
import { Hamburger } from "../../components/atoms/Hamburger";
import { Footer } from "../../components/molecules/Footer";
import { Header } from "../../components/molecules/Header";
import { Auth } from "../../firebase/auth";
import { db } from "../../firebase/firebase";
import { searchMoviesState } from "../../src/recoil/movieState";
import { userState } from "../../src/recoil/userState";
import { Movie } from "../../src/types/useMovie";
import { Review } from "../../src/types/useReview";

const MyPage = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const auth = getAuth();
  const router = useRouter();
  const [user, setUser] = useRecoilState(userState);
  const [reviews, setReviews] = useState<Array<Review>>([]);
  const { getAuthState } = Auth({ auth, user, setUser });
  const setSearchMovies = useSetRecoilState<Movie[]>(searchMoviesState);

  useEffect(() => {
    getAuthState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  useEffect(() => {
    const getReviews = async () => {
      const q = query(
        collection(db, "reviews"),
        where("userId", "==", user?.userId)
      );

      await getDocs(q)
        .then((snapshot) => {
          const arr = snapshot.docs.map((doc) => ({
            id: doc.id,
            userId: doc.data().userId,
            movieTitle: doc.data().movieTitle,
            imagePath: doc.data().imagePath,
            evaluation: doc.data().evaluation,
            review: doc.data().review,
          }));
          setReviews(arr);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getReviews();
  }, [user]);

  return (
    user !== null && (
      <>
        <Header setSearchMovies={setSearchMovies} />
        <div className="bg-Black flex flex-col min-h-screen pt-32">
          <div
            className={
              openMenu
                ? "lg:grid grid-cols-12 grid-rows-1 w-full lg:h-32 bg-WhiteGray opacity-25 pointer-events-none mb-10 px-10"
                : "lg:grid grid-cols-12 grid-rows-1 w-full bg-WhiteGray mb-10 px-10"
            }
          >
            <div className="col-start-1 col-span-2 px-1">
              {user.imageUrl === "" ? (
                <div className="rounded-full bg-Primary h-[120px] w-[120px]"></div>
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={user.imageUrl}
                  className="rounded-full bg-Primary h-[120px] w-[120px]"
                  alt="user image"
                />
              )}
            </div>
            <p className="text-Black text-3xl font-bold col-start-3 col-span-4 row-start-1 row-span-1 w-full py-10">
              {user.nickname} Movies
            </p>
            <p className="text-Black text-xl col-start-8 col-span-4 row-start-1 row-span-1 w-full py-11">
              ID：{user.userId}
            </p>
          </div>
          <Hamburger
            openMenu={openMenu}
            setOpenMenu={setOpenMenu}
            auth={auth}
          />
          <div
            className={
              openMenu ? "hidden" : "flex-grow container lg:grid grid-cols-10"
            }
          >
            {reviews.length > 0 &&
              reviews.map((review) => (
                <div
                  className="bg-WhiteGray xl:ml-32 lg:ml-20 col-span-5 my-5"
                  key={review.id}
                >
                  <p className="xl:text-xl font-bold text-center text-Black p-2 w-full border-b-8 border-Black">
                    {review.movieTitle}
                  </p>
                  <div className="grid grid-rows-6 grid-cols-6">
                    <div className="w-full col-span-3 row-span-full">
                       {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        className="object-contain"
                        src={`https://image.tmdb.org/t/p/w500/${review.imagePath}`}
                        alt="movie sample1"
                      />
                    </div>
                    <div className="flex h-16 border-b-8 border-Black w-full col-start-4 col-span-3 row-span-1">
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
                    <p className="text-lg lg:text-xl col-start-4 col-span-3 row-start-2 row-span-3">
                      {review.review}
                    </p>
                    <div className="col-start-6 col-span-1 row-start-6 row-span-1 mt-5 w-full">
                      <button
                        className="bg-Secondary rounded-full hover:bg-Black xl:text-lg font-bold w-full"
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
                </div>
              ))}
          </div>
          <Footer />
        </div>
      </>
    )
  );
};

export default MyPage;
