import type { NextPage } from "next";
import axios from "./api/axios";
import "../firebase/firebase"
import Image from "next/image";
import { FaHamburger } from "react-icons/fa";
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";
import { AiFillEye, AiOutlineEye, AiOutlineStar } from "react-icons/ai";
import { BsStars } from "react-icons/bs";
import { Header } from "../components/molecules/Header";
import { Footer } from "../components/molecules/Footer";
import { useEffect, useState } from "react";
import { requests } from "./api/apiConfig";
import { useRouter } from "next/router";
import Link from "next/link";
import Hamburger from "../components/atoms/Hamburger";
import { getAuth } from "firebase/auth";

type Movie = {
  id: number;
  title: string;
  poster_path: any;
  popularity: number;
  vote_count: number;
};

const Home: NextPage = () => {
  const [movies, setMovies] = useState<Array<Movie>>([]);
  const router = useRouter();
  const [openMenu, setOpenMenu] = useState(false);
  const auth = getAuth();

  useEffect(() => {
    const getMovies = async () => {
      await axios
        .get(requests.fetchPopular)
        .then((result) => {
          setMovies(result.data.results);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getMovies();
  }, []);

  console.log(movies);

  return (
    <>
      <Header />
      <div className="bg-Secondary relative">
        <Hamburger openMenu={openMenu} setOpenMenu={setOpenMenu} auth={auth} />
        {movies.length !== 0 && (
          <div
            className={
              openMenu
                ? "bg-Secondary w-full opacity-25 pointer-events-none"
                : "bg-Secondary w-full"
            }
          >
            <div className="flex items-center bg-Black mt-10 mx-auto rounded-xl w-5/6">
              <IoIosArrowDropleftCircle className="w-16 h-16 rounded-lg" />
              <div className="w-full flex space-x-11 items-center overflow-x-auto scroll-smooth">
                <div>
                  <Image
                    width="190px"
                    height="220px"
                    src={`https://image.tmdb.org/t/p/w500/${movies[0].poster_path}`}
                    alt="movie_sample"
                    layout="fixed"
                  />
                </div>
                <div>
                  <Image
                    width="190px"
                    height="220px"
                    src={`https://image.tmdb.org/t/p/w500/${movies[1].poster_path}`}
                    alt="movie_sample"
                    layout="fixed"
                  />
                </div>
                <div>
                  <Image
                    width="190px"
                    height="220px"
                    src={`https://image.tmdb.org/t/p/w500/${movies[2].poster_path}`}
                    alt="movie_sample"
                    layout="fixed"
                  />
                </div>
                <div>
                  <Image
                    width="190px"
                    height="220px"
                    src={`https://image.tmdb.org/t/p/w500/${movies[3].poster_path}`}
                    alt="movie_sample"
                    layout="fixed"
                  />
                </div>
                <div>
                  <Image
                    width="190px"
                    height="220px"
                    src={`https://image.tmdb.org/t/p/w500/${movies[4].poster_path}`}
                    alt="movie_sample"
                    layout="fixed"
                  />
                </div>
                <div>
                  <Image
                    width="190px"
                    height="220px"
                    src={`https://image.tmdb.org/t/p/w500/${movies[5].poster_path}`}
                    alt="movie_sample"
                    layout="fixed"
                  />
                </div>
                <div>
                  <Image
                    width="190px"
                    height="220px"
                    src={`https://image.tmdb.org/t/p/w500/${movies[6].poster_path}`}
                    alt="movie_sample"
                    layout="fixed"
                  />
                </div>
                <div>
                  <Image
                    width="190px"
                    height="220px"
                    src={`https://image.tmdb.org/t/p/w500/${movies[7].poster_path}`}
                    alt="movie_sample"
                    layout="fixed"
                  />
                </div>
                <div>
                  <Image
                    width="190px"
                    height="220px"
                    src={`https://image.tmdb.org/t/p/w500/${movies[8].poster_path}`}
                    alt="movie_sample"
                    layout="fixed"
                  />
                </div>
                <div>
                  <Image
                    width="190px"
                    height="220px"
                    src={`https://image.tmdb.org/t/p/w500/${movies[9].poster_path}`}
                    alt="movie_sample"
                    layout="fixed"
                  />
                </div>
                <div>
                  <Image
                    width="190px"
                    height="220px"
                    src={`https://image.tmdb.org/t/p/w500/${movies[10].poster_path}`}
                    alt="movie_sample"
                    layout="fixed"
                  />
                </div>
              </div>
              <IoIosArrowDroprightCircle className="w-16 h-16 rounded-lg" />
            </div>
            <div className="flex flex-wrap justify-center">
              {movies.map((movie, index) => (
                <div className="items-center w-1/5 mt-10 mr-2" key={movie.id}>
                  <div className="w-full h-14 xl:h-16 lg:h-14 md:h-12 sm:h-10">
                    <p
                      className="hover:overflow-y-scroll h-full p-2 text-xs xl:text-lg lg:text-sm md:text-xs sm:text-xs font-bold text-White bg-Black cursor-pointer"
                      onClick={() => {
                        router.push({
                          pathname: `/movies/${movie.id}`,
                          query: {
                            id: movie.id,
                          },
                        });
                      }}
                    >
                      {movie.title}
                    </p>
                  </div>
                  <div>
                    <Image
                      width="318.56px"
                      height="469px"
                      layout="responsive"
                      src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                      alt="movie sample1"
                    />
                  </div>
                  <div className="w-full grid grid-cols-6 gap-2 content-center">
                    <AiFillEye className="w-full xl:h-8 lg:h-7 md:h-6 sm:h-5 rounded-lg" />
                    <p className="overflow-x-auto w-full text-xs xl:text-xl lg:text-lg md:text-md sm:text-sm font-bold text-center text-White">
                      {movie.vote_count}
                    </p>
                    <BsStars className="w-full xl:h-8 lg:h-7 md:h-6 sm:h-5 rounded-lg" />
                    <p className="overflow-x-auto w-full text-xs xl:text-xl lg:text-lg md:text-md sm:text-sm font-bold text-center text-White">
                      {Math.floor(movie.popularity / 1000)}K
                    </p>
                    <AiOutlineEye className="w-full xl:h-8 lg:h-7 md:h-6 sm:h-5 rounded-lg" />
                    <AiOutlineStar className="w-full xl:h-8 lg:h-7 md:h-6 sm:h-5 rounded-lg" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Home;
