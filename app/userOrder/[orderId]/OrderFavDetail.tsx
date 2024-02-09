import { cartProductType } from "@/app/product/[productId]/ProductDetails";
import { truncateText } from "@/app/utils/TruncateText";
import { formatPrice } from "@/app/utils/formatPrice";
import Image from "next/image";
import React from "react";
interface OrderFavDetailProp {
  item: cartProductType;
}

const OrderFavDetail: React.FC<OrderFavDetailProp> = ({ item }) => {
  console.log(item);
  return (
    <div className="grid grid-cols-6 text-xs md-text-sm gap-4 border-top-[1.5px] border-slate-200 py-4 items-center">
      <div className="col-span-2 justify-self-start flex gap-2 md:gap-4">
        <div className="relative w-[70px] aspect-square">
          <img
            src={item?.images[0].image}
            alt={item.name}
            className="object-contain"
          />
        </div>
        <div className="flex flex-col gap-1 ">
          <div>{truncateText(item.name)}</div>
          <div>{item.description}</div>
        </div>
      </div>
      <div className="justify-self-center">{item.name}</div>
      <div className="justify-self-center">{item.category}</div>
      <div className="justify-self-center">{item.brand}</div>
      <div className="justify-self-end font-semibold">
        {formatPrice(item.price)}
      </div>
    </div>
  );
};

export default OrderFavDetail;
