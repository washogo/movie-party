import axios from "../../pages/api/axios";
import React, { MouseEvent, useEffect, useState, VFC } from "react";
import { FaSearch } from "react-icons/fa";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { requests } from "../../pages/api/apiConfig";
import { Movie } from "../../src/types/useMovie";
import { loadingState } from "../../src/recoil/loadingState";

type Props = {
  setSearchMovies?: (movies: Movie[]) => void;
};

export const Header = React.memo(function Header(props: Props) {
  const { setSearchMovies } = props;
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useRecoilState(loadingState);

  useEffect(() => {
    isLoading &&
      router.push({ pathname: "/loading/loading1", query: { url: "/" } });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  const searchMovies = async (e: MouseEvent<SVGElement>) => {
    if (search !== "") {
      const url = requests.fetchSearchMovies;
      setIsLoading(true);
      router.push({ pathname: "/loading/loading1", query: { url: "/" } });
      await axios
        .get(`${url}&query=${search}&page=1&include_adult=false`)
        .then((response) => {
          const data = response.data.results;
          setSearchMovies!(data);
          if (data.length === 0) {
            toast.error("映画が見つかりませんでした");
          }
          setIsLoading(false);
        })
        .catch((error) => {
          console.error(error);
          toast.error("映画が見つかりませんでした");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  return (
    <div className="grid grid-cols-10 w-full bg-Black fixed">
      <div className="col-span-1"></div>
      <p className="col-span-5 pt-4 text-2xl xl:text-6xl lg:text-5xl md:text-4xl sm:text-3xl font-bold text-Primary hover:cursor-pointer" onClick={() => router.push("/")}>
        MOVIE PARTY
      </p>
      <div className="grid grid-rows-2 col-span-3">
        <div className="bg-WhiteGray row-start-2 grid grid-cols-10 content-center p-2 mb-2">
          <label htmlFor="search" className="col-span-1">
            <FaSearch
              className={
                search === ""
                  ? "w-3 lg:w-8 md:w-5 h-4 xl:h-8 md:h-6 rounded-lg opacity-25 cursor-not-allowed"
                  : "w-3 lg:w-8 md:w-5 h-4 xl:h-8 md:h-6 rounded-lg cursor-pointer opacity-70 hover:opacity-100 hover:scale-110 duration-300"
              }
              onClick={searchMovies}
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
              setSearchMovies!([]);
              setSearch("");
            }}
          >
            RESET
          </button>
        </div>
      </div>
    </div>
  );
});
