"use client";
import { useCart } from "@/hooks/useCartHook";
import React from "react";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import Heading from "../components/Heading";
import { cartProductType } from "../product/[productId]/ProductDetails";
import Button from "../components/Button";
import ItemContent, { wishProductType } from "./ItemContent";
import { formatPrice } from "../utils/formatPrice";

function WishClient() {
  const { wishProducts, handleClearWish, cartTotalQty, cartTotalAmount } =
    useCart();

  if (!wishProducts || wishProducts.length === 0) {
    return (
      <div className="flex flex-col items-center ">
        <div className="text-2xl">Your wishlist is empty</div>
        <div>
          <Link
            href={"/"}
            className="text-slate-500 flex items-center gap-1 mt-2"
          >
            <FaArrowLeft />
            <span>Start shopping</span>
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div>
      <Heading title="Your Wishlist" center />
      <div className="grid grid-cols-4 text-xs gap-4 pb-2 items-center mt-8">
        <div className="col-span-2 justify-self-start">Product</div>
        <div className=" justify-self-center">Action</div>
        <div className="justify-self-end"> Price</div>
      </div>
      <div>
        {wishProducts &&
          wishProducts.map((product: any) => {
            return <ItemContent key={product.id} item={product} />;
          })}
      </div>
      <div className="border-t-[1.5px] border-slate-200 py-4 flex justify-end gap-4">
        <div className="w-[90px]">
          <Button
            lable="Clear wishList"
            outline
            small
            handleClick={() => handleClearWish()}
          />
        </div>
      </div>
    </div>
  );
}

export default WishClient;
