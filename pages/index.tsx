/* eslint-disable @next/next/no-img-element */
import type { NextPage } from 'next';
import axios from './api/axios';
import '../firebase/firebase';
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle } from 'react-icons/io';
import { AiFillEye, AiOutlineEye, AiOutlineStar } from 'react-icons/ai';
import { BsStars } from 'react-icons/bs';
import { Header } from '../components/molecules/Header';
import { Footer } from '../components/molecules/Footer';
import { useCallback, useEffect, useState } from 'react';
import { requests } from './api/apiConfig';
import { useRouter } from 'next/router';
import { Hamburger } from '../components/atoms/Hamburger';
import { useRecoilState } from 'recoil';
import { moviesState, searchMoviesState } from '../src/recoil/movieState';
import { Movie } from '../src/types/useMovie';

const Home: NextPage = () => {
  const [movies, setMovies] = useRecoilState<Movie[]>(moviesState);
  const [searchMovies, setSearchMovies] = useRecoilState<Movie[]>(searchMoviesState);
  const [popMovies, setPopMovies] = useState<Movie[]>([]);
  const router = useRouter();
  const [openMenu, setOpenMenu] = useState(false);

  const getPopMovies = useCallback(() => {
    axios
      .get(requests.fetchPopular)
      .then((result) => {
        const data = result.data.results;
        setPopMovies(data);
        if (searchMovies.length === 0 || movies.length === 0) {
          setMovies(data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [movies.length, searchMovies.length, setMovies]);

  useEffect(() => {
    getPopMovies();
  }, [getPopMovies]);

  useEffect(() => {
    if (searchMovies.length > 0) {
      setMovies(searchMovies);
    } else {
      getPopMovies();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchMovies]);

  const onClickLeftSlide = () => {
    const movie = document.getElementById('movie-1');
    const movieWidth = movie!.clientWidth;
    const scrollRange = Number(movieWidth * -5);
    const movies = document.getElementById('movies');
    movies!.scrollBy(scrollRange, 0);
  };

  const onClickRightSlide = () => {
    const movie = document.getElementById('movie-1');
    const movieWidth = movie!.clientWidth;
    const scrollRange = Number(movieWidth * 5);
    const movies = document.getElementById('movies');
    movies!.scrollBy(scrollRange, 0);
  };

  return (
    <>
      <Header setSearchMovies={setSearchMovies} />
      <div className="bg-Black w-full flex flex-col min-h-screen pt-32">
        <div className="h-full w-full bg-Secondary pb-36 flex-grow">
          <Hamburger openMenu={openMenu} setOpenMenu={setOpenMenu} />
          {movies !== null && movies.length > 0 && (
            <div className={openMenu ? 'hidden' : ''}>
              <div className="flex items-center bg-Black mt-10 mx-auto rounded-xl xl:w-[1000px] lg:w-[700px] sm:w-[500px] w-[300px] h-[200px]">
                <IoIosArrowDropleftCircle
                  className="w-10 h-10 sm:w-16 sm:h-16 rounded-lg hover:cursor-pointer hover:scale-110 transition delay-150 duration-300"
                  onClick={onClickLeftSlide}
                />
                <div
                  id="movies"
                  className="flex items-center space-x-2 overflow-x-auto scroll-smooth xl:w-[900px] lg:w-[600px] sm:w-[400px] w-[200px] transition duration-[20000ms] h-full"
                >
                  {popMovies.map((movie, index) => (
                    <img
                      id={`movie-${index.toString()}`}
                      key={movie.id}
                      className="w-full h-full object-contain"
                      src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                      alt="no_image"
                    />
                  ))}
                </div>
                <IoIosArrowDroprightCircle
                  className="w-10 h-10 sm:w-16 sm:h-16 rounded-lg hover:cursor-pointer hover:scale-110 transition delay-150 duration-300"
                  onClick={onClickRightSlide}
                />
              </div>
              <div className="flex flex-wrap justify-center">
                {movies.map((movie) => (
                  <div
                    className="lg:basis-1/4 xl:basis-1/5 md:basis-1/3 basis-1/2 items-center w-1/5 mt-10 mr-2"
                    key={movie.id}
                  >
                    <div className="w-full h-14 xl:h-16 lg:h-14 md:h-12 sm:h-10">
                      <p
                        className="h-full p-2 text-xs xl:text-lg lg:text-sm md:text-xs sm:text-xs font-bold text-White bg-Black cursor-pointer"
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
                    <div className="w-full grid grid-cols-6 gap-1 content-center">
                      <AiFillEye className="w-full xl:h-8 lg:h-7 md:h-6 sm:h-5 rounded-lg" />
                      <p className="w-full text-xs xl:text-xl lg:text-lg md:text-md font-bold text-center text-White">
                        {movie.vote_count}
                      </p>
                      <BsStars className="w-full xl:h-8 lg:h-7 md:h-6 sm:h-5 rounded-lg" />
                      <p className="w-full text-xs xl:text-xl lg:text-lg md:text-md font-bold text-center text-White">
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
    </>
  );
};

export default Home;
