import React from "react";
import Image from "next/image";
interface HomeBannerProps{
  head1:string,
  p1:string,
  p2:string,
  left?:boolean
}
const Homebanner:React.FC<HomeBannerProps> = ({head1,p1,p2,left}) => {
  return (
    <div className="relative bg-gradient-to-r from-teal-500 to-teal-700 mb-8">
      <div className={`mx-auto px-8 py-12 flex sm:flex flex-col gap-2 md:flex-row items-center justify-evenly ${left ? 'md:flex-row-reverse my-9' : ''}`}>
        <div className="mb-8 md:mb-0 text-center  text-white">
          <h1 className="text-base text-4xl md:text-6xl font-bold mb-4">
            {head1}
          </h1>
          <p className="text-lg  md:text-xl mb-2">
            {p1}
          </p>
          <p className="text-2xl md:text-5xl text-yellow-400 font-bold">
           {p2}
          </p>
        </div>
        <div className="w-1/3 relative aspect-video">
          <Image
            src="/banner-image.png"
            fill
            alt="banner image"
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
}

export default Homebanner;
