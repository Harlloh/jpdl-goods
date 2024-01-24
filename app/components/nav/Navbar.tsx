import React from "react";
import Container from "../Container";
import Link from "next/link";
import { Redressed } from "next/font/google";
import Image from "next/image";
import CartCount from "./CartCount";
import UserMenu from "./UserMenu";
import WishCount from "./WishCount";
import SearchBar from "./SearcBar";

const redressFont = Redressed({ subsets: ["latin"], weight: ["400"] });

export default function Navbar() {
  return (
    <div className="sticky top-0 w-full bg-slate-200 z-30 shadow-sm">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex items-center justify-between gap-3 md-gap-0">
            <span className="flex items-center gap-2">
              <Link
                href="/"
                className={`${redressFont.className} font-bold text-6xl `}
              >
                <Image
                  width={50}
                  height={50}
                  src="/jpdllogo.png"
                  alt="logo"
                  className="w-[100px]"
                />
              </Link>
            </span>
            {/* <div className="hidden md:block">
              <SearchBar />
            </div> */}
            <div className="flex items-center gap-8 md:gap-12">
              <div className="cartcoutn">
                <WishCount />
              </div>
              <div className="cartcoutn">
                <CartCount />
              </div>
              <div className="usermenu">
                <UserMenu  />
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
