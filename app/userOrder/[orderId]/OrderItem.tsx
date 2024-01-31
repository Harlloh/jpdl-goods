import { cartProductType } from "@/app/product/[productId]/ProductDetails";
import { truncateText } from "@/app/utils/TruncateText";
import { formatPrice } from "@/app/utils/formatPrice";
import Image from "next/image";
import React from "react";
interface OrderItemProp {
  item: cartProductType;
}

const OrderItem: React.FC<OrderItemProp> = ({ item }) => {
  return (
    <div className="grid grid-cols-5 text-xs md-text-sm gap-4 border-top-[1.5px] border-slate-200 py-4 items-center">
      <div className="col-span-2 justify-self-start flex gap-2 md:gap-4">
        <div className="relative w-[70px] aspect-square">
          <img
            src={item?.selectedImage?.image}
            alt={item.name}
            className="object-contain"
          />
        </div>
        <div className="flex flex-col gap-1 ">
          <div>{truncateText(item.name)}</div>
          <div>{item.selectedImage.color}dfg</div>
        </div>
      </div>
      <div className="justify-self-center">{formatPrice(item.price)}</div>
      <div className="justify-self-center">{item.quantity}</div>
      <div className="justify-self-end font-semibold">
        $ {(item.price * item.quantity).toFixed(2)}
      </div>
    </div>
  );
};

export default OrderItem;
