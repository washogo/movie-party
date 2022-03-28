/* eslint-disable @next/next/no-img-element */
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AiFillEye, AiOutlineEye, AiOutlineStar } from "react-icons/ai";
import { BsStars } from "react-icons/bs";
import { FaHamburger } from "react-icons/fa";
import { useRecoilState } from "recoil";
import { Footer } from "../../components/molecules/Footer";
import { Header } from "../../components/molecules/Header";
import { movieState } from "../../src/recoil/movieState";
import { Cast, Genre, Movie } from "../../src/types/useMovie";
import { API_KEY } from "../api/apiConfig";

const Movie = () => {
  const router = useRouter();
  const id = router.query.id;
  const [movie, setMovie] = useRecoilState<Movie | null>(movieState);
  const [director, setDirector] = useState("");
  const [casts, setCasts] = useState<Array<Cast>>([]);

  useEffect(() => {
    const getDetail = async () => {
      await axios
        .get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=ja-JP`
        )
        .then((result) => {
          setMovie(result.data);
        })
        .catch((error) => {
          console.log(error.message);
        });
    };
    getDetail();
  }, [id, setMovie]);

  useEffect(() => {
    const getCredit = async () => {
      await axios
        .get(
          `
      https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`
        )
        .then((result) => {
          console.log(result.data);
          const crews = result.data.crew;
          const casts = result.data.cast;
          const director = crews.find((crew: any) => crew.job === "Director");
          setDirector(director.name);
          setCasts(casts);
        })
        .catch((error) => {
          console.log(error.message);
        });
    };
    getCredit();
  }, [id]);

  return (
    <div className="bg-Tertiary h-full relative">
      <Header />
      {movie && director && casts && (
        <>
          <FaHamburger className="w-1/12 h-8 xl:h-16 lg:h-14 md:h-12 sm:h-10 rounded-lg" />
          <div className="grid grid-cols-12 mb-10">
            <div className="col-start-2 col-span-10">
              <p className="text-4xl font-bold text-center text-White border-b-4 border-Black mb-3">
                {movie.title}
              </p>
              <div className="lg:grid grid-cols-3 gap-x-2">
                <div className="col-span-1">
                  <div>
                    <img
                      className="w-[394px] h-[591px]"
                      src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                      alt="movie sample"
                    />
                  </div>
                  <div className="w-full grid grid-cols-6 content-center">
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

                <div className="col-span-2 grid grid-rows-10 gap-3 bg-White">
                  <div className="row-span-1 mt-3">
                    <div className="flex pl-1 pr-9 pt-2 pb-1.5 items-center">
                      <p className="text-lg font-bold">ジャンル：</p>
                      <p className="text-md font-bold">
                        {movie.genres.map((genre: Genre) => genre.name + "/")}
                      </p>
                    </div>
                    <div className="w-full h-20 xl:h-3 xl:grid grid-cols-10 pl-1 mt-3">
                      <div className="align-middle col-span-4 flex items-center">
                        <p className="text-lg font-bold">制作国：</p>
                        <p className="text-md font-bold">
                          {movie.production_countries[0].name}
                        </p>
                      </div>
                      <div className="align-middle col-span-3 flex items-center">
                        <p className="text-lg font-bold">リリース：</p>
                        <p className="text-md font-bold">
                          {movie.release_date}
                        </p>
                      </div>
                      <div className="align-middle col-span-3 flex items-center">
                        <p className="text-lg font-bold ">上映時間：</p>
                        <p className="text-md font-bold ">{movie.runtime}分</p>
                      </div>
                    </div>
                  </div>
                  <div className="row-span-4">
                    <div className="pl-1 pr-9 pb-1.5">
                      <p className="text-xl font-bold">あらすじ</p>
                    </div>
                    {movie.overview ? (
                      <div className="text-lg">
                        <span>{movie.overview}</span>
                      </div>
                    ) : (
                      <div className="text-3xl">
                        <span>自分で確かめてみよう！！</span>
                      </div>
                    )}
                  </div>
                  <div className="row-span-1">
                    <div className="grid grid-cols-3 ">
                      <div className="grid grid-rows-2 col-span-1">
                        <p className="font-bold text-lg">監督</p>
                        <p className="bg-WhiteGray w-2/3 text-center rounded-lg">
                          {director}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="row-span-1">
                    <p className="font-bold text-lg">出演者</p>
                    <div className="grid grid-cols-4 gap-y-2 gap-x-3">
                      {casts.map((cast, index) => {
                        if (index > 7) {
                          return;
                        }
                        return (
                          <p
                            className="bg-WhiteGray text-center rounded-lg"
                            key={cast.id}
                          >
                            {cast.name}
                          </p>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end col-start-5 col-span-7 mt-5">
              <button
                className="bg-Primary rounded-full hover:bg-Black px-6 mr-5"
                onClick={() => {
                  router.push("/reviews/create");
                }}
              >
                レビュー
              </button>
              <button className="bg-Secondary rounded-full hover:bg-Black px-6">
                一覧画面
              </button>
            </div>
          </div>
        </>
      )}
      <Footer />
    </div>
  );
};

export default Movie;
