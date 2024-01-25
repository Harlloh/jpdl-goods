"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { truncateText } from "@/app/utils/TruncateText";
import { formatPrice } from "@/app/utils/formatPrice";
import { Rating } from "@mui/material";
import { useRouter } from "next/navigation";
import { CiHeart } from "react-icons/ci";
import { useCart } from "@/hooks/useCartHook";
import { FaHeart } from "react-icons/fa";

interface ProductCardProps {
  data: any;
}

const ProductCard: React.FC<ProductCardProps> = ({ data }) => {
  const router = useRouter();
  const [isProductInWishlist, setIsProductInWishlist] = useState(false);
  const { handleAddProductToWish, handleRemoveProductFromWish, wishProducts } =
    useCart();

  const productRating =
    data.reviews.reduce((accumulator: number, item: any) => {
      return accumulator + item.rating;
    }, 0) / data.reviews.length;

  useEffect(() => {
    setIsProductInWishlist(false);
    if (wishProducts) {
      const existingProductIndex = wishProducts.findIndex(
        (item) => item.id === data.id
      );
      if (existingProductIndex > -1) {
        setIsProductInWishlist(true);
      }
    }
  }, [wishProducts]);

  const userToken = localStorage.getItem('user')

  return (
    <div className="col-span-1 shadow-sm cursor-pointer border-[1.2px] border-slate-200 bg-slate-50 rounded-md p-2 transition hover:scale-105 text-center text-sm">
      <div className=" flex flex-col items-center w-full gap-1 ">
        <div className="aspect-square overflow-hidden relative w-full">
          <p className={`absolute top-0 left-0 py-1 px-2 bg-orange-700 text-white rounded ${data.inStock && 'hidden'}`}>{!data.inStock && 'Out of Stock'}</p>
          {isProductInWishlist ? (
            <FaHeart
              onClick={() => handleRemoveProductFromWish(data,userToken)}
              size={35}
              className="cursor-pointer absolute top-0 right-0 color-red"
            />
          ) : (
            <CiHeart
              onClick={() => handleAddProductToWish(data,userToken)}
              size={35}
              className="cursor-pointer absolute top-0 right-0 color-red"
            />
          )}

          <img
            src={data.images[0].image}
            alt="kasdfsdklf"
            className="w-full h-full object-contain"
          />
          <h1 className="hidden">{data.images[0].image}</h1>
        </div>
        <div onClick={() => router.push(`/product/${data.id}`)}>
          <div className="mt-4">{truncateText(data.name)}</div>
          <div>
            <Rating value={productRating} readOnly />
          </div>
          <div>{data.reviews.length} reviews</div>
          <div className="font-semibold">{formatPrice(data.price)}</div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
