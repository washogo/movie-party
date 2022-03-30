/* eslint-disable @next/next/no-img-element */
import { addDoc, collection } from "firebase/firestore";
import { useRouter } from "next/router";
import { useState } from "react";
import { AiFillEye, AiOutlineEye, AiOutlineStar } from "react-icons/ai";
import { BsFillStarFill, BsStars } from "react-icons/bs";
import { FaHamburger } from "react-icons/fa";
import { toast } from "react-toastify";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { db } from "../../firebase/firebase";
import { Footer } from "../../components/molecules/Footer";
import { Header } from "../../components/molecules/Header";
import { moviesState, movieState, searchMoviesState } from "../../src/recoil/movieState";
import { userState } from "../../src/recoil/userState";
import { Movie } from "../../src/types/useMovie";

const Create = () => {
  const [evaluation, setEvaluation] = useState(0);
  const [review, setReview] = useState("");
  const movie = useRecoilValue(movieState);
  const router = useRouter();
  const [starIds, setStarIds] = useState<Array<number>>([]);
  const [isSelected, setIsSelected] = useState(0);
  const user = useRecoilValue(userState);
  const setSearchMovies = useSetRecoilState<Movie[]>(searchMoviesState);

  const onClickCreate = async () => {
    await addDoc(collection(db, "reviews"), {
      userId: user?.id,
      movieTitle: movie?.title,
      imagePath: movie?.poster_path,
      evaluation,
      review,
    });
    setStarIds([]);
    setIsSelected(0);
    setEvaluation(0);
    setReview("");
    toast.success("レビューを保存しました", {
      onClose: () => router.push("/"),
    });
  };

  const onHoverStar = (e: any) => {
    const id = Number(e.target.id);
    const arr = [...Array(id)].map((_, i) => i);
    setStarIds(arr);
  };

  const onHoverOut = (e: any) => {
    setStarIds([]);
  };

  const onClickStar = (num: number) => {
    if (isSelected === 0) {
      setIsSelected(num);
      setEvaluation(num);
    } else {
      setIsSelected(0);
      setEvaluation(0);
    }
  };

  return (
    movie !== null && (
      <div className="bg-Primary h-full relative pb-32">
        <Header setSearchMovies={setSearchMovies} />
        <FaHamburger className="w-1/12 h-8 xl:h-16 lg:h-14 md:h-12 sm:h-10 rounded-lg" />
        <div className="grid grid-cols-12">
          <div className="col-start-2 col-span-10">
            <p className="text-4xl font-bold text-center text-White bg-Gray border-b-4 border-b-Black">
              {movie.title}
            </p>
            <div className="lg:grid grid-cols-3 gap-x-2 mt-3">
              <div className="col-span-1">
                <div>
                  <img
                    className="w-[394px] h-[591px]"
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    alt="movie sample"
                  />
                </div>
                <div className="w-full grid grid-cols-6 content-center bg-Black">
                  <AiFillEye className="w-full h-8 rounded-lg" />
                  <p className="w-full text-xl font-bold text-center text-White">
                    {movie.vote_count}
                  </p>
                  <BsStars className="w-full h-8 rounded-lg" />
                  <p className="w-full text-xl font-bold text-center text-White">
                    {Math.floor(movie.popularity / 1000)}K
                  </p>
                  <AiOutlineEye className="w-full h-8 rounded-lg" />
                  <AiOutlineStar className="w-full h-8 rounded-lg" />
                </div>
              </div>
              <div className="col-span-2 lg:grid grid-rows-10 gap-3">
                <div className="row-span-1">
                  <label className="text-lg lg:text-2xl font-bold">
                    Evaluation
                  </label>
                  <br />
                  <div className="w-1/2 h-1/2 flex mx-auto">
                    {[...Array(5)]
                      .map((_, i) => i + 1)
                      .map((num) =>
                        starIds.length >= num || isSelected >= num ? (
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
                            id={String(num)}
                            size="50"
                            className="text-White hover:text-Warning mr-5"
                            onMouseEnter={onHoverStar}
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
                      onChange={(e) => setReview(e.target.value)}
                      value={review}
                    />
                  </div>
                </div>
                <div className="row-span-1 flex justify-end items-end">
                  <button
                    className="h-1/2 bg-Success rounded-full hover:bg-Black px-6 mr-3"
                    onClick={onClickCreate}
                  >
                    Create
                  </button>
                  <button
                    className="h-1/2 bg-Secondary rounded-full hover:bg-Black px-6"
                    onClick={() =>
                      router.push({
                        pathname: `/movies/${movie.id}`,
                        query: { id: movie.id },
                      })
                    }
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
    )
  );
};

export default Create;
