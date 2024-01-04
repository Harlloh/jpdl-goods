"use client";
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./style.css";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Image from "next/image";

export default function App() {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide className="swiper-slide slider11 relative">
          <h1></h1>
          <Image
            fill
            alt="slide image"
            src="/slide-11.jpg"
            className="z-1 absolute top-0 bottom-0 left-0 right-0"
          />
        </SwiperSlide>
        <SwiperSlide className="swiper-slide slider22 relative">
          <h1>hello</h1>
          <Image
            fill
            alt="slide image"
            src="/slide-2.jpg"
            className="z-1 absolute top-0 bottom-0 left-0 right-0"
          />
        </SwiperSlide>
      </Swiper>
    </>
  );
}
