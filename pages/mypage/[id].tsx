import Image from "next/image";

const Mypage = () => {
  return (
    <>
      <div className="bg-WhiteGray grid grid-cols-12 grid-rows-3">
        <div className="col-start-2 col-span-2 row-span-3">
          <div className="rounded-full bg-Primary w-1/2 h-full mx-auto"></div>
        </div>
        <div className="col-start-4 col-span-3 row-start-3 row-span-2">
          <p className="text-Black text-3xl font-bold">shogo wada</p>
        </div>
        <div className="col-start-9 col-span-2 row-start-3 row-span-2">
          <p className="text-Black text-xl">ID：１２３４５６</p>
        </div>
      </div>
      <p className="xl:text-2xl font-bold text-center text-Black bg-Gray p-2 w-1/3">
        MARVEL SPIDER-MAN~No Way Home~
      </p>
      <div className="xl:grid grid-cols-6 gap-2 mt-2 bg-Gray w-1/3 ">
        <div className="col-start-1 col-span-3">
          <Image
            width="318.56px"
            height="469px"
            layout="responsive"
            src="/movie_sample.jpeg"
            alt="movie sample1"
          />
        </div>
        <div className="col-start-4 col-span-3 h-80 overflow-scroll">
          <span>⭐️⭐️⭐️⭐️⭐️</span>
          <p className="text-xs xl:text-lg">
            複素数体であれば、任意のCM-タイプのAは、実際、数体である定義体（英語版）(field
            ofdefinition)を持っている。自己準同型環の可能なタイプは、
            対合（ロサチの対合（英語版）(Rosatiinvolution）をもつ環
            として既に分類されていて、CM-タイプのアーベル多様体の分類を
            導き出す。楕円曲線と同じような方法でCM-タイプの多様体を構成す
            るには、Cdの中の格子 Λから始め、アーベル多様体のリーマンの関
            係式（英語版）(Riemannrelations)を考えに入れる必要がある。
          </p>
        </div>
        <button className="col-start-5 col-span-2 bg-Secondary rounded-full w-1/2 h-full hover:bg-Black xl:text-lg font-bold mx-auto">
          Edit
        </button>
      </div>
    </>
  );
};

export default Mypage;
