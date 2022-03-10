import Image from "next/image";
import { AiFillEye, AiOutlineEye, AiOutlineStar } from "react-icons/ai";
import { BsStars } from "react-icons/bs";
import { FaHamburger } from "react-icons/fa";
import { Footer } from "../../components/molecules/Footer";
import { Header } from "../../components/molecules/Header";
import { API_KEY } from "../api/apiConfig";

type Props = {
  id: number;
};

const Movie = (props: Props) => {
  const fetchUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`;
  return (
    <>
      <Header />
      <FaHamburger className="w-1/12 h-8 xl:h-16 lg:h-14 md:h-12 sm:h-10 rounded-lg" />
      <div className="grid grid-cols-12">
        <div className="col-start-2 col-span-10">
          <p className="text-4xl font-bold text-center text-White bg-Black">
            MARVEL SPIDER-MAN~No Way Home~
          </p>
          <div className="lg:grid grid-cols-3 gap-x-2">
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

            <div className="col-span-2 grid grid-rows-10 gap-3 bg-White xl:bg-Black lg:bg-Success md:bg-Danger sm:bg-Warning">
              <div className="row-span-1">
                <div className="pl-1 pr-9 pt-2 pb-1.5 bg-White">
                  <p className="text-sm font-bold">
                    ジャンル：アクション、コメディ、ヒーロー
                  </p>
                </div>
                <div className="w-full h-9 xl:grid grid-cols-10 bg-White">
                  <div className="align-middle col-span-2">
                    <p className="h-full text-sm font-bold">制作国：日本</p>
                  </div>
                  <div className="align-middle col-span-3">
                    <p className="h-full text-sm font-bold">
                      ２０２１年制作映画
                    </p>
                  </div>
                  <div className="align-middle col-span-3">
                    <p className="h-full text-sm font-bold ">
                      上映時間：１２０分
                    </p>
                  </div>
                </div>
              </div>
              <div className="row-span-4">
                <div className="pl-1 pr-9 pt-2 pb-1.5 bg-White">
                  <p className="text-sm font-bold">あらすじ</p>
                </div>
                <div className="bg-White">
                  <span>
                    複素数体であれば、任意のCM-タイプの A
                    は、実際、数体である定義体（英語版）(field of
                    definition)を持っている。自己準同型環の可能なタイプは、対合（ロサチの対合（英語版）(Rosati
                    involution）をもつ環として既に分類されていて、CM-タイプのアーベル多様体の分類を導き出す。楕円曲線と同じような方法でCM-タイプの多様体を構成するには、Cd
                    の中の格子 Λ
                    から始め、アーベル多様体のリーマンの関係式（英語版）(Riemann
                    relations)を考えに入れる必要がある。
                    CM-タイプ(CM-type)は、単位元での A の正則接空間上にある
                    EndQ(A) の（最大）可換部分環 L
                    の作用を記述したものである。単純な種類のスペクトル理論が適応され、L
                    が固有ベクトルの基底を通して作用することを示すことができる。言い換えると、L
                    は A
                    の正則ベクトル場の上の対角行列を通した作用を持っている。L
                    自体がある複数の体の積というよりも数体であるという単純な場合には、CM-タイプは
                    L の複素埋め込み（英語版）(complex embedding)のリストである
                  </span>
                </div>
              </div>
              <div className="row-span-1">
                <div className="grid grid-cols-3 bg-White">
                  <div className="grid grid-rows-2 col-span-1">
                    <p className="font-bold">監督</p>
                    <p className="bg-WhiteGray w-2/3 text-center rounded-lg">
                      マーベルの人
                    </p>
                  </div>
                  <div className="grid grid-rows-2 col-span-1">
                    <p className="font-bold">脚本</p>
                    <p className="bg-WhiteGray w-2/3 text-center rounded-lg">
                      マーベルの人
                    </p>
                  </div>
                </div>
              </div>
              <div className="row-span-2 bg-White">
                <p className="font-bold">出演者</p>
                <div className="grid grid-cols-4 gap-y-2 gap-x-3">
                  <p className="bg-WhiteGray text-center rounded-lg">
                    マーベルの人
                  </p>
                  <p className="bg-WhiteGray text-center rounded-lg">
                    マーベルの人
                  </p>
                  <p className="bg-WhiteGray text-center rounded-lg">
                    マーベルの人
                  </p>
                  <p className="bg-WhiteGray text-center rounded-lg">
                    マーベルの人
                  </p>
                  <p className="bg-WhiteGray text-center rounded-lg">
                    マーベルの人
                  </p>
                  <p className="bg-WhiteGray text-center rounded-lg">
                    マーベルの人
                  </p>
                  <p className="bg-WhiteGray text-center rounded-lg">
                    マーベルの人
                  </p>
                  <p className="bg-WhiteGray text-center rounded-lg">
                    マーベルの人
                  </p>
                </div>
              </div>
              <div className="flex justify-end bg-White">
                <button className="bg-Primary rounded-full hover:bg-Black px-6 mr-5">
                  レビュー
                </button>
                <button className="bg-Secondary rounded-full hover:bg-Black px-6">
                  一覧画面
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Movie;
