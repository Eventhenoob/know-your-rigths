"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ProfileBox from "@/components/ProfileBox";
import { useSession } from "next-auth/react";
import { CiMenuFries } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { signIn, signOut } from "next-auth/react";
import { IoLogInSharp, IoLogOutSharp } from "react-icons/io5";

const Navigation = () => {
  const [isMobNavActive, setIsMobileNavActive] = useState(false);
  useEffect(() => {
    const deactivateMobileNav = () => {
      setIsMobileNavActive(false);
    };
    window.addEventListener("click", deactivateMobileNav);

    return () => window.removeEventListener("click", deactivateMobileNav);
  }, []);

  const { data, status } = useSession();
  const toggleIsMobileNavActive = () => {
    setIsMobileNavActive((prev) => !prev);
  };

  return (
    <>
      <nav className="lg:flex hidden h-20 gap-2 fixed top-0 left-0 text-white bg-[#000435]  items-center justify-between z-50 p-8 py-2 w-full">
        <Link href="/" className="">
          <img src="/logo.png" alt="logo" className="w-40 object-contain" />
        </Link>
        <div className=" relative capitalize flex justify-between">
          <ul className="">
            <li className="">
              <Link
                href="/connect"
                className="text-white text-4xl decoration-0"
              >
                Connect
              </Link>
            </li>
          </ul>
        </div>
        <div className="">
          <ProfileBox />
        </div>
      </nav>

      <nav className=" flex lg:hidden fixed  z-[999] w-full top-0 left-0 h-28">
        <button
          className="text-white text-4xl z-50 absolute top-4 left-4"
          onClick={(e) => {
            e.stopPropagation();
            toggleIsMobileNavActive();
          }}
        >
          {!isMobNavActive ? <CiMenuFries /> : <IoMdClose />}
        </button>
        <Link
          href="/"
          className="logo fixed left-20 z-[999]  top-3 flex gap-1 w-32 sh text-white items-center text-2xl"
        >
          <img src="/logo.png" className="w-full" alt="Logo" />
        </Link>

        <ul
          onClick={(e) => e.stopPropagation()}
          className={
            "h-screen w-60 font-heading flex flex-col gap-5 text-lg bg-black fixed top-0 text-white  transition-all duration-300 pt-24 left-0 z-40 " +
            (isMobNavActive ? " -translate-x-0" : " -translate-x-full")
          }
        >
          <li className="w-full">
            <Link
              onClick={() => setIsMobileNavActive(false)}
              href={"/"}
              className="w-full"
            >
              Home
            </Link>
          </li>
          <li className="w-full">
            <Link href="/" className="">
              Connect
            </Link>
          </li>
          <li className="w-full ">
            {status === "authenticated" && (
              <button
                onClick={() => {
                  signOut({ callbackUrl: "/", redirect: true });
                  setIsMobileNavActive(false);
                }}
                className="text-center inline-flex gap-2 items-center border-b-[1px] hover:active:text-main-color border-slate-300 border-opacity-20"
              >
                <IoLogOutSharp />
                sign out
              </button>
            )}

            {status === "unauthenticated" && (
              <button
                onClick={() => {
                  signIn();
                  setIsMobileNavActive(false);
                }}
                className="text-center inline-flex gap-2 items-center border-b-[1px] hover:active:text-main-color border-slate-300 border-opacity-20"
              >
                <IoLogInSharp />
                Log in
              </button>
            )}
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navigation;
