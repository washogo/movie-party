import { FaSearch } from "react-icons/fa";

export const Header = () => {
  return (
    <div className="grid grid-cols-10 pb-3 w-full bg-Black">
      <div className="col-span-1"></div>
      <p className="col-span-5 pt-4 text-2xl xl:text-6xl lg:text-5xl md:text-4xl sm:text-3xl font-bold text-Primary">
        MOVIE PARTY
      </p>
      <div className="grid grid-rows-2 col-span-3">
        <div className="bg-WhiteGray row-start-2 grid grid-cols-10 content-center">
          <label htmlFor="search" className="col-span-1">
            <FaSearch className="w-3 lg:w-8 md:w-5 h-4 xl:h-8 md:h-6 rounded-lg" />
          </label>
          <input
            className="bg-WhiteGray outline-none w-full col-span-9 text-md h-4 xl:h-8 md:h-6"
            type="text"
            id="search"
          ></input>
        </div>
      </div>
    </div>
  );
};
