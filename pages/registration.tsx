const Registration = () => {
  return (
    <>
      <div
        className="inline-flex flex-col items-center justify-end px-96 py-52 bg-Black shadow border border-black"
        style={{ width: "1440px", height: "1024px" }}
      >
        <div
          className="flex items-center justify-start pl-24 pr-28 pt-5 pb-6 bg-Gray"
          style={{ width: "538px", height: "91px" }}
        >
          <p className="flex-1 h-full text-5xl font-bold text-center text-Black">
            Your Info
          </p>
        </div>
        <div
          className="flex flex-col space-y-16 items-start justify-start pl-14 pr-16 pt-0.5 pb-16 bg-Gray"
          style={{ width: "538px", height: "507px" }}
        >
          <div
            className="flex flex-col items-center justify-end"
            style={{ width: "421px", height: "87px" }}
          >
            <p
              className="text-xl font-bold text-Black"
              style={{ width: "412px", height: "33.37px" }}
            >
              ID
            </p>
            <div
              className="bg-White rounded-full"
              style={{ width: "421px", height: "54px" }}
            />
          </div>
          <div className="relative" style={{ width: "417px", height: "174px" }}>
            <p
              className="text-xl font-bold text-Black"
              style={{ width: "412px", height: "33.37px" }}
            >
              Your Image
            </p>
            <div className="w-56 h-16 absolute right-0 bottom-0 bg-White rounded-lg mb-10">
              <p className="flex-1 h-full text-xl font-bold text-center text-Black p-4">
                Shogo
              </p>
            </div>
            <div className="w-32 h-32 bg-White rounded-full" />
          </div>
          <div className="w-full h-14">
            <div className="flex items-center flex-1 h-full w-2/3 px-10 pt-3 pb-2 m-auto bg-Primary rounded-full">
              <p className="flex-1 h-full text-xl font-bold text-center text-Black">
                Create your acount
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Registration;
