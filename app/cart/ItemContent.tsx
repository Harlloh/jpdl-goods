"use client";
import React from "react";
import { cartProductType } from "../product/[productId]/ProductDetails";
import { formatPrice } from "../utils/formatPrice";
import Link from "next/link";
import { truncateText } from "../utils/TruncateText";
import SetQuantity from "../components/Products/SetQuantity";
import Image from "next/image";
import { useCart } from "@/hooks/useCartHook";

interface ProductContentProp {
  item: cartProductType;
}

const ItemContent: React.FC<ProductContentProp> = ({ item }) => {
  const {
    handleRemoveProductFromCart,
    handleCartQtyIncrease,
    handleCartQtyDecrease,
  } = useCart();
  // const handleQuantityDecrease = useCallback(() => {
  //   if (cartProduct.quantity === 1) {
  //     return;
  //   }
  //   setCartProduct((prev) => {
  //     return {
  //       ...prev,
  //       quantity: prev.quantity - 1,
  //     };
  //   });
  // }, [cartProduct]);

  // const handleQuantityIncrease = useCallback(() => {
  //   if (cartProduct.quantity === 99) {
  //     return;
  //   }
  //   setCartProduct((prev) => {
  //     return {
  //       ...prev,
  //       quantity: prev.quantity + 1,
  //     };
  //   });
  // }, [cartProduct]);

  return (
    <div className="grid grid-cols-5 text-xs md:text-sm gap-4 border-t-[1.5px] border-slate-20 py-4 items-center">
      <div className="col-span-2 justify-self-start flex gap-2 md:gap-4">
        <Link href={`/product/${item.id}`}>
          {/* <p>{item.selectedImage.image}</p> */}
          <div className="relative mx-[70px] aspect-square">
            <Image
              src={item.selectedImage.image}
              alt={item.name}
              fill
              className="object-contain"
            />
          </div>
        </Link>

        <div className="flex flex-col justify-between">
          <Link href={`/product/${item.id}`}> {truncateText(item.name)}</Link>
          <div>{item.selectedImage.color}</div>
          <div className="w-[70px] ">
            {" "}
            <button
              className="text-slate-500 underline"
              onClick={() => handleRemoveProductFromCart(item)}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
      <div className="justify-self-center">{formatPrice(item.price)}</div>
      <div className="justify-self-center">
        <SetQuantity
          cartProduct={item}
          cartCounter
          handleQuantityIncrease={() => handleCartQtyIncrease(item)}
          handleQuantityDecrease={() => handleCartQtyDecrease(item)}
        />
      </div>
      <div className="justify-self-end font-semibold">
        {formatPrice(item.price * item.quantity)}
      </div>
    </div>
  );
};

export default ItemContent;
