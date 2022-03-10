import { FcGoogle } from "react-icons/fc";

const Signin = () => {
  return (
    <>
    <div className="inline-flex flex-col items-center justify-start px-96 pt-52 pb-96 bg-Black shadow border border-black" style={{width: "1440px", height: "1024px"}}>
    <div className="flex items-center justify-start pl-24 pr-28 py-4 bg-Primary" style={{width: "538px", height: "70px"}}>
        <p className="flex-1 h-full text-5xl font-bold text-center text-Black">Sign in</p>
    </div>
    <div className="flex flex-col space-y-5 items-center justify-end pl-14 pr-16 pt-0.5 pb-7 bg-Primary" style={{width: "538px", height: "380px"}}>
        <div className="flex flex-col items-center justify-end" style={{width: "421px", height: "87px"}}>
            <p className="text-xl font-bold text-Black" style={{width: "412px", height: "33.37px"}}>Email</p>
            <div className="bg-White rounded-full" style={{width: "421px", height: "54px"}}/>
        </div>
        <div className="flex flex-col items-center justify-end" style={{width: "421px", height: "87px"}}>
            <p className="text-xl font-bold text-Black" style={{width: "421px", height: "30.93px"}}>Passwaord</p>
            <div className="bg-White rounded-full" style={{width: "421px", height: "56.07px"}}/>
        </div>
        <div className="w-56 h-1/6">
            <div className="flex items-center justify-center flex-1 h-full px-10 py-2 bg-Gray rounded-full">
                <p className="flex-1 h-full text-xl font-bold text-center text-Black">Sign in</p>
            </div>
        </div>
        <div className="w-5/6 h-1/6">
            <div className="flex space-x-0.5 items-center justify-end flex-1 h-full py-2 pl-12 pr-10 bg-Secondary rounded-full">
                <FcGoogle className="w-10 h-9 rounded-lg" />
                <p className="w-56 h-full text-lg font-bold text-center">Sign in with Google</p>
            </div>
        </div>
    </div>
</div>
</>
  )
}

export default Signin