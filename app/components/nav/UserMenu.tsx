"use client";
import React, { useCallback, useState } from "react";
import Avatar from "../Avatar";
import { AiFillCaretDown } from "react-icons/ai";
import Link from "next/link";
import MenuItem from "./MenuItem";
import Backdrop from "./Backdrop";
import { useCart } from "@/hooks/useCartHook";
import { type } from "os";
// import { signOut } from "next-auth/react";

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const userToken = localStorage.getItem("user");
  const storedAdmin = localStorage.getItem("isAdmin");
  const isAdmin = storedAdmin ? atob(storedAdmin) === "true" : false;

  const currentUser = userToken;

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);
  const { handleLogOut } = useCart();

  const signOut = () => {
    handleLogOut();
  };
  return (
    <>
      <div className="relative z-30">
        <div
          onClick={toggleOpen}
          className="p-2 border-[1px] flex items-center gap-1 rounded-full cursor-pointer hover:shadow-md transition text-teal-700"
        >
          <Avatar />
          <AiFillCaretDown />
        </div>
        {isOpen && (
          <div className="absolute rounded-md shadow-md w-[170px] bg-white overflow-hidden right-0 top-12 text-sm flex flex-col cursor-pointer">
            {currentUser ? (
              <div>
                <Link
                  href="/orders"
                  className={`${!isAdmin ? "flex" : "hidden"}`}
                >
                  <MenuItem onClick={toggleOpen}>Your Orders</MenuItem>
                </Link>
                <Link
                  href="/subscriptions"
                  className={`${!isAdmin ? "flex" : "hidden"}`}
                >
                  <MenuItem onClick={toggleOpen}>Subscriptions</MenuItem>
                </Link>
                <Link
                  href="/admin"
                  className={`${isAdmin ? "flex" : "hidden"}`}
                >
                  <MenuItem onClick={toggleOpen}>Admin Dashboard</MenuItem>
                </Link>
                <hr />
                <MenuItem
                  onClick={() => {
                    toggleOpen();
                    signOut();
                  }}
                >
                  Log out
                </MenuItem>
              </div>
            ) : (
              <div>
                <Link href="/login">
                  <MenuItem onClick={toggleOpen}>Login</MenuItem>
                </Link>
                <Link href="/register">
                  <MenuItem onClick={toggleOpen}>Register</MenuItem>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
      {isOpen ? <Backdrop onClick={toggleOpen} /> : null}
    </>
  );
};

export default UserMenu;
