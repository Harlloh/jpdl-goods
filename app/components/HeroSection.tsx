"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { FaArrowRight } from "react-icons/fa";

function HeroSection() {
  const router = useRouter();

  return (
    <section className="herosection flex flex-col items-end justify-center text-white p-8 text-2xl  gap-3">
      <h1 className="text-3xl">Discover the Latest</h1>
      <span className="bg-teal-700 px-4 py-2 rounded font-semibold text-5xl text-orange-400">
        Home Appliance
      </span>
      <h1 className="text-3xl">Collections</h1>
      <p className="text-sm text-base max-w-xl text-end">
        Explore our curated collection of home appliances that combine style and
        functionality. From kitchen essentials to smart living solutions, find
        everything you need for a modern home.
      </p>
      <button
        onClick={() => router.push("/")}
        className="bg-teal-700 rounded-full flex items-center gap-2 text-sm p-2"
      >
        Shop Now <FaArrowRight />
      </button>
    </section>
  );
}

export default HeroSection;
