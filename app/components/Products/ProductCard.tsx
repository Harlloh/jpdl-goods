"use client";
import React from "react";
import Image from "next/image";
import { truncateText } from "@/app/utils/TruncateText";
import { formatPrice } from "@/app/utils/formatPrice";
import { Rating } from "@mui/material";
import { useRouter } from "next/navigation";

interface ProductCardProps {
  data: any;
}

const ProductCard: React.FC<ProductCardProps> = ({ data }) => {
  const router = useRouter();

  const productRating =
    data.reviews.reduce((accumulator: number, item: any) => {
      return accumulator + item.rating;
    }, 0) / data.reviews.length;

  return (
    <div
      onClick={() => router.push(`/product/${data.id}`)}
      className="col-span-1 cursor-pointer border-[1.2px] border-slate-200 bg-slate-50 rounded-sm p-2 transition hover:scale-105 text-center text-sm"
    >
      <div className=" flex flex-col items-center w-full gap-1 ">
        <div className="aspect-square overflow-hidden relative w-ful">
          <Image
            src={`${data.images[0].image}`}
            alt={data.name}
            fill
            className="w-full h-full h-[100px] object-contain"
          />
          <h1 className="hidden">{data.images[0].image}</h1>
        </div>
        <div className="mt-4">{truncateText(data.name)}</div>
        <div>
          <Rating value={productRating} readOnly />
        </div>
        <div>{data.reviews.length} reviews</div>
        <div className="font-semibold">{formatPrice(data.price)}</div>
      </div>
    </div>
  );
};

export default ProductCard;
