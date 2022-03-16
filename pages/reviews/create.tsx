import { addDoc, collection } from "firebase/firestore";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AiFillEye, AiOutlineEye, AiOutlineStar } from "react-icons/ai";
import { BsStars } from "react-icons/bs";
import { FaHamburger } from "react-icons/fa";
import { useRecoilValue } from "recoil";
import { Footer } from "../../components/molecules/Footer";
import { Header } from "../../components/molecules/Header";
import { db } from "../../firebase/firebase";
import { movieState } from "../../src/recoil/movieState";

const Create = () => {
  const [evaluation, setEvaluation] = useState("");
  const [review, setReview] = useState("");
  const movie = useRecoilValue(movieState);
  const router = useRouter();

  const onClickCreate = async () => {
    await addDoc(collection(db, "reviews"), {
      evaluation,
      review,
    });
    setEvaluation("");
    setReview("");
  };

  return (
    movie !== null && (
      <div className="bg-Primary">
        <Header />
        <FaHamburger className="w-1/12 h-8 xl:h-16 lg:h-14 md:h-12 sm:h-10 rounded-lg" />
        <div className="grid grid-cols-12 mb-10">
          <div className="col-start-2 col-span-10">
            <p className="text-4xl font-bold text-center text-White bg-Gray border-b-4 border-b-Black">
              {movie.title}
            </p>
            <div className="lg:grid grid-cols-3 gap-x-2 mt-3">
              <div className="col-span-1">
                <div>
                  <Image
                    width="318.56px"
                    height="469px"
                    layout="responsive"
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    alt="movie sample"
                    priority={true}
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
                  <label
                    htmlFor="evaluation"
                    className="text-lg lg:text-2xl font-bold"
                  >
                    Evaluation
                  </label>
                  <br />
                  <div className="w-full h-full">
                    <input
                      id="evaluation"
                      type="text"
                      className="w-1/3 lg:h-1/3 my-3 ml-5 lg:ml-20 rounded-lg"
                      onChange={(e) => setEvaluation(e.target.value)}
                      value={evaluation}
                    />
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
                      className="w-5/6 h-5/6 my-3 ml-5 lg:ml-20 rounded-lg"
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