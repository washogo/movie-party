import Image from "next/image";
import { AiFillEye, AiOutlineEye, AiOutlineStar } from "react-icons/ai";
import { BsStars } from "react-icons/bs";
import { FaHamburger } from "react-icons/fa";
import { Footer } from "../../components/molecules/Footer";
import { Header } from "../../components/molecules/Header";

const Create = () => {
  return (
    <>
      <Header />
      <FaHamburger className="w-1/12 h-8 xl:h-16 lg:h-14 md:h-12 sm:h-10 rounded-lg" />
      <div className="grid grid-cols-12">
        <div className="col-start-2 col-span-10">
          <p className="text-4xl font-bold text-center text-White bg-Gray border-b-4 border-b-Black">
            MARVEL SPIDER-MAN~No Way Home~
          </p>
          <div className="lg:grid grid-cols-3 gap-x-2 mt-3">
            <div className="col-span-1">
              <div>
                <Image
                  width="318.56px"
                  height="469px"
                  layout="responsive"
                  src="/movie_sample.jpeg"
                  alt="movie sample1"
                />
              </div>
              <div className="w-full grid grid-cols-6 content-center bg-Black">
                <AiFillEye className="w-full h-8 rounded-lg" />
                <p className="w-full text-xl font-bold text-center text-White">
                  13k
                </p>
                <BsStars className="w-full h-8 rounded-lg" />
                <p className="w-full text-xl font-bold text-center text-White">
                  13k
                </p>
                <AiOutlineEye className="w-full h-8 rounded-lg" />
                <AiOutlineStar className="w-full h-8 rounded-lg" />
              </div>
            </div>
            <div className="col-span-2 lg:grid grid-rows-10 gap-3 bg-WhiteGray">
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
                  ></input>
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
                  ></textarea>
                </div>
              </div>
              <div className="row-span-1 flex justify-end items-end">
                <button className="h-1/2 bg-Success rounded-full hover:bg-Black px-6 mr-3">
                  Create
                </button>
                <button className="h-1/2 bg-Secondary rounded-full hover:bg-Black px-6">
                  Back
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div></div>
      <Footer />
    </>
  );
};

export default Create;
