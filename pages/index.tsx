import type { NextPage } from "next";
import Image from "next/image";
import { FaSearch, FaHamburger } from "react-icons/fa";
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";
import { AiFillEye, AiOutlineEye, AiOutlineStar } from "react-icons/ai";
import { BsStars } from "react-icons/bs";
import { Header } from "../components/molecules/Header";
import { Footer } from "../components/molecules/Footer";

const Home: NextPage = () => {
  return (
    <>
      <Header/>
      <div className="bg-Secondary shadow border border-Black w-full">
        <FaHamburger className="w-1/12 h-8 xl:h-16 lg:h-14 md:h-12 sm:h-10  rounded-lg" />
        <div className="flex space-x-11 items-center bg-Black mt-10 mx-auto rounded-xl w-5/6">
          <IoIosArrowDropleftCircle className="w-16 h-16 rounded-lg" />
          <div>
            <Image
              width="190px"
              height="220px"
              src="/movie_sample2.jpeg"
              alt="movie_sample2"
            />
          </div>
          <div>
            <Image
              width="190px"
              height="220px"
              src="/movie_sample3.jpeg"
              alt="movie_sample3"
            />
          </div>
          <div>
            <Image
              width="190px"
              height="220px"
              src="/movie_sample4.jpeg"
              alt="movie_sample4"
            />
          </div>
          <div>
            <Image
              width="190px"
              height="220px"
              src="/movie_sample2.jpeg"
              alt="movie_sample2"
            />
          </div>
          <IoIosArrowDroprightCircle className="w-16 h-16 rounded-lg" />
        </div>
        <div className="items-center w-1/5 mt-10 mx-auto">
          <div className="w-full h-14 xl:h-16 lg:h-14 md:h-12 sm:h-10">
            <p className="h-full text-xs xl:text-lg lg:text-sm md:text-xs sm:text-xs font-bold text-White bg-Black">
              MARVEL SPIDER-MAN~No Way Home~
            </p>
          </div>
          <div>
            <Image
              width="318.56px"
              height="469px"
              layout="responsive"
              src="/movie_sample.jpeg"
              alt="movie sample1"
            />
          </div>
          <div className="w-full grid grid-cols-6 gap-2 content-center">
            <AiFillEye className="w-full xl:h-8 lg:h-7 md:h-6 sm:h-5 rounded-lg" />
            <p className="w-full text-xs xl:text-xl lg:text-lg md:text-md sm:text-sm font-bold text-center text-White">
              13k
            </p>
            <BsStars className="w-full xl:h-8 lg:h-7 md:h-6 sm:h-5 rounded-lg" />
            <p className="w-full text-xs xl:text-xl lg:text-lg md:text-md sm:text-sm font-bold text-center text-White">
              13k
            </p>
            <AiOutlineEye className="w-full xl:h-8 lg:h-7 md:h-6 sm:h-5 rounded-lg" />
            <AiOutlineStar className="w-full xl:h-8 lg:h-7 md:h-6 sm:h-5 rounded-lg" />
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default Home;
