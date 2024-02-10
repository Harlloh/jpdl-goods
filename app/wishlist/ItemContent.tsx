"use client";
import React from "react";
import { cartProductType } from "../product/[productId]/ProductDetails";
import { formatPrice } from "../utils/formatPrice";
import Link from "next/link";
import { truncateText } from "../utils/TruncateText";
import SetQuantity from "../components/Products/SetQuantity";
import Image from "next/image";
import { useCart } from "@/hooks/useCartHook";
import { ImageType } from "../admin/add-products/addProductForm";
import { useRouter } from "next/navigation";
import Button from "../components/Button";
import { getToken } from "@/api/auth/apis";

export type wishProductType = {
  id: string;
  name: string;
  description: string;
  category: string;
  brand: string;
  images: {
    color: string;
    colorCode: string;
    image: string;
  }[];
  quantity: number;
  price: number;
};

interface ProductContentProp {
  item: wishProductType;
}

const ItemContent: React.FC<ProductContentProp> = ({ item }) => {
  const { handleRemoveProductFromWish } = useCart();
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
  const router = useRouter();
  // console.log(item.images[0].image, "ZZZZZZZZZ");
  const token = getToken();
  return (
    <div className="grid grid-cols-4 text-xs md:text-sm gap-4 border-t-[1.5px] border-slate-20 py-4 items-center">
      {/* <div className="col-span-2 justify-self-start flex gap-2 md:gap-4 items-center"> */}
      <div className="col-span-2 justify-self-start flex gap-2 md:gap-4 flex-col md:flex-row items-center">
        <Link href={`/product/${item.id}`}>
          {/* <p>{item.selectedImage.image}</p> */}
          <div className="relative mx-[70px] aspect-square w-[100px]">
            <img
              src={item.images[0].image}
              alt={truncateText(item.name)}
              className="object-contain"
            />
          </div>
        </Link>

        <div className="flex flex-col justify-between">
          <Link href={`/product/${item.id}`}> {truncateText(item.name)}</Link>
          {/* <div>{item.selectedImage.color}</div> */}
        </div>
      </div>
      <div className="flex gap-4 items-center text-sm flex-col md:flex-col">
        <Button
          lable="view product"
          small
          outline
          handleClick={() => router.push(`/product/${item.id}`)}
        />
        <Button
          lable="remove from wishlist"
          small
          outline
          handleClick={() => handleRemoveProductFromWish(item, token)}
        />
      </div>
      <div className="justify-self-end font-semibold">
        {formatPrice(item.price)}
      </div>
      {/* <div className="justify-self-center">
        <SetQuantity
          cartProduct={item}
          cartCounter
          handleQuantityIncrease={() => handleCartQtyIncrease(item)}
          handleQuantityDecrease={() => handleCartQtyDecrease(item)}
        />
      </div>
      <div className="justify-self-end font-semibold">
        {formatPrice(item.price * item.quantity)}
      </div> */}
    </div>
  );
};

export default ItemContent;
