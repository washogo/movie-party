import { signOut } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { FaHamburger } from "react-icons/fa";

type Props = {
  openMenu: boolean;
  setOpenMenu: (openMenu: boolean) => void;
  auth: any;
};

const Hamburger = (props: Props) => {
  const { openMenu, setOpenMenu, auth } = props;
  const router = useRouter();
  const menuFunction = () => {
    setOpenMenu(!openMenu);
  };

  const logOut = () => {
    signOut(auth)
      .then(() => {
        router.push("/signin");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <FaHamburger
        className={
          openMenu
            ? "w-0 h-0 opacity-0"
            : "w-1/12 h-8 xl:h-16 lg:h-14 md:h-12 sm:h-10  rounded-lg"
        }
        onClick={() => menuFunction()}
      />
      <div
        className={
          openMenu
            ? "w-1/3 h-screen opacity-100 absolute top-1 left-0 bg-black text-White rounded-lg"
            : "w-0 h-0 opacity-0 bg-Black text-White transition-transform"
        }
      >
        <ul>
          <div onClick={() => menuFunction()}>
            <p className="text-5xl font-bold"> Close</p>
          </div>
          <li className="mt-14 ml-16">
            <Link href="/">
              <a>
                <p className="text-6xl font-bold">TOP</p>
              </a>
            </Link>
          </li>
          <li className="mt-14 ml-16">
            <Link href="/">
              <a>
                <p className="text-6xl font-bold">MyPage</p>
              </a>
            </Link>
          </li>
          <li className="mt-14 ml-16 cursor-pointer" onClick={logOut}>
            <a>
              <p className="text-6xl font-bold">LogOut</p>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Hamburger;
