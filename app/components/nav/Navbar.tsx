import React from "react";
import Container from "../Container";
import Link from "next/link";
import { Redressed } from "next/font/google";
import Image from "next/image";
import CartCount from "./CartCount";
import UserMenu from "./UserMenu";
import getCurrentUser from "@/hooks/useGetCurrentUser";

const redressFont = Redressed({ subsets: ["latin"], weight: ["400"] });

export default function Navbar() {
  const currentUser = getCurrentUser();
  return (
    <div className="sticky top-0 w-full bg-slate-200 z-30 shadow-sm">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex items-center justify-between gap-3 md-gap-0">
            <span className="flex items-center gap-2">
              <Image width={50} height={50} src="/logo.png" alt="logo" />
              <Link
                href="/"
                className={`${redressFont.className} font-bold text-2xl`}
              >
                JPL GOODS
              </Link>
            </span>
            <div className="hidden md:block">Search</div>
            <div className="flex items-center gap-8 md:gap-12">
              <div className="cartcoutn">
                <CartCount />
              </div>
              <div className="usermenu">
                <UserMenu currentUser={currentUser} />
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
