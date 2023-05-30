import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';
import { Movie } from '../../src/types/useMovie';
import { toast } from 'react-toastify';
import { moviesState } from '../../src/recoil/movieState';
import { useAuth } from '../../hooks/useAuth';

export const Header = React.memo(function Header() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const setMovies = useSetRecoilState<Movie[]>(moviesState);
  useAuth();

  /** 映画を検索する処理 */
  const onClickGetSearchMovies = async (text: string) => {
    if (text === '') return;

    await fetch(`/api/movie/search?text=${text}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMovies(data.results);
        if (data.length === 0) {
          toast.error('映画が見つかりませんでした');
        }
        if (router.pathname !== '/') {
          router.push({ pathname: '/loading/loading1', query: { url: '/' } });
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error('映画が見つかりませんでした');
      });
  };

  /** 人気の映画情報を設定する処理 */
  const setPopMovieList = async () => {
    await fetch('/api/movie/popular')
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="grid grid-cols-10 w-full bg-Black fixed">
      <div className="col-span-1"></div>
      <p
        className="col-span-5 pt-4 text-2xl xl:text-6xl lg:text-5xl md:text-4xl sm:text-3xl font-bold text-Primary hover:cursor-pointer"
        onClick={() => router.push('/')}
      >
        MOVIE PARTY
      </p>
      <div className="grid grid-rows-2 col-span-3">
        <div className="bg-WhiteGray row-start-2 grid grid-cols-10 content-center p-2 mb-2">
          <label htmlFor="search" className="col-span-1">
            <FaSearch
              className={
                search === ''
                  ? 'w-3 lg:w-8 md:w-5 h-4 xl:h-8 md:h-6 rounded-lg opacity-25 cursor-not-allowed'
                  : 'w-3 lg:w-8 md:w-5 h-4 xl:h-8 md:h-6 rounded-lg cursor-pointer opacity-70 hover:opacity-100 hover:scale-110 duration-300'
              }
              onClick={() => onClickGetSearchMovies(search)}
            />
          </label>
          <input
            className="bg-WhiteGray outline-none w-full col-span-7 text-[10px] sm:text-sm lg:text-lg xl:h-8 md:h-6 h-4 p-2"
            type="text"
            id="search"
            placeholder="Input the title of movie"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            className="col-span-2 text-[10px] sm:text-sm lg:text-lg xl:text-xl font-bold hover:scale-110 duration-200"
            onClick={() => {
              setPopMovieList();
              setSearch('');
            }}
          >
            RESET
          </button>
        </div>
      </div>
    </div>
  );
});
