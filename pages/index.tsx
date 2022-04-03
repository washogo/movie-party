/* eslint-disable @next/next/no-img-element */
import type { NextPage } from "next";
import axios from "./api/axios";
import "../firebase/firebase";
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
import Hamburger from "../components/atoms/Hamburger";
import { getAuth } from "firebase/auth";
import { useRecoilState } from "recoil";
import { moviesState, searchMoviesState } from "../src/recoil/movieState";
import { Movie } from "../src/types/useMovie";
import { Auth } from "../firebase/auth";
import { userState } from "../src/recoil/userState";

const Home: NextPage = () => {
  const auth = getAuth();
  const [user, setUser] = useRecoilState(userState);
  const { getAuthState } = Auth({ auth, user, setUser });
  const [movies, setMovies] = useRecoilState<Movie[]>(moviesState);
  const [searchMovies, setSearchMovies] =
    useRecoilState<Movie[]>(searchMoviesState);
  const [popMovies, setPopMovies] = useState<Movie[]>([]);
  const router = useRouter();
  const [openMenu, setOpenMenu] = useState(false);

  useEffect(() => {
    getAuthState();
  }, [auth]);

  useEffect(() => {
    const getPopMovies = () => {
      axios
        .get(requests.fetchPopular)
        .then((result) => {
          const data = result.data.results;
          setPopMovies(data);
          setMovies(data);
          setSearchMovies([]);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getPopMovies();
    console.log(1);
  }, []);

  useEffect(() => {
    if (searchMovies && searchMovies.length > 0) {
      setMovies(searchMovies);
    }
    console.log(3);
  }, [movies]);

  return (
    <div className="h-full w-full relative">
      <Header setSearchMovies={setSearchMovies} />
      <div className="w-full w-full bg-Secondary pb-36">
        <Hamburger openMenu={openMenu} setOpenMenu={setOpenMenu} auth={auth} />
        {movies !== null && movies.length > 0 && (
          <div
            className={
              openMenu
                ? "bg-Secondary w-full opacity-25 pointer-events-none"
                : "bg-Secondary w-full"
            }
          >
            <div className="flex items-center bg-Black mt-10 mx-auto rounded-xl xl:w-[1000px] lg:w-[700px] sm:w-[500px] w-[300px] h-[200px]">
              <IoIosArrowDropleftCircle className="w-10 h-10 sm:w-16 sm:h-16 rounded-lg" />
              <div className="flex items-center space-x-2 overflow-x-auto scroll-smooth xl:w-[900px] lg:w-[600px] sm:w-[400px] w-[200px]">
                {popMovies.map((movie) => (
                  <div key={movie.id}>
                    <img
                      className="w-[133px] h-[200px] mr-[20vh]"
                      src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                      alt="no_image"
                    />
                  </div>
                ))}
              </div>
              <IoIosArrowDroprightCircle className="w-10 h-10 sm:w-16 sm:h-16 rounded-lg" />
            </div>
            <div className="flex flex-wrap justify-center">
              {movies.map((movie) => (
                <div className="lg:basis-1/4 xl:basis-1/5 md:basis-1/3 basis-1/2 items-center w-1/5 mt-10 mr-2" key={movie.id}>
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
                    <img
                      className="lg:h-full lg:w-full"
                      src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                      alt="no_image"
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
    </div>
  );
};

export default Home;
