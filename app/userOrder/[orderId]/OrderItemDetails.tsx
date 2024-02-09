import { cartProductType } from "@/app/product/[productId]/ProductDetails";
import { truncateText } from "@/app/utils/TruncateText";
import { formatPrice } from "@/app/utils/formatPrice";
import Image from "next/image";
import React from "react";
import OrderDetails from "./OrderDetails";
import { MdAccessTime, MdDeliveryDining, MdDone } from "react-icons/md";
import Status from "@/app/components/Status";
interface OrderItemDetailProp {
  item: any;
}

const OrderItemDetail = ({ item }: any) => {
  const orderDetails = item?.orderDetails?.map((item: any) => {
    return item;
  });

  return (
    <>
      {orderDetails &&
        orderDetails.map((items: any, index: number) => (
          <div
            key={index}
            className="grid grid-cols-6 text-xs md-text-sm gap-4 border-top-[1.5px] border-slate-200 py-4 items-center"
          >
            <div className="col-span-2 justify-self-start flex gap-2 md:gap-4">
              <div className="relative w-[70px] aspect-square">
                <img
                  src={items?.selectedImage?.image}
                  alt={items.name}
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col gap-1 ">
                <div>{truncateText(items.name)}</div>
                <div>{items.selectedImage.color}dfg</div>
              </div>
            </div>
            <div className="justify-self-center">
              {item.delivery_status === "Pending Delivery" ? (
                <Status
                  text="pending"
                  icon={MdAccessTime}
                  bg="bg-slate-200"
                  color="text-slate-700"
                />
              ) : item.delivery_status === "Package Enroute" ? (
                <Status
                  text="Dispatched"
                  icon={MdDeliveryDining}
                  bg="bg-purple-200"
                  color="text-purple-700"
                />
              ) : item.delivery_status === "Package Delivered" ? (
                <Status
                  text="delivered"
                  icon={MdDone}
                  bg="bg-green-200"
                  color="text-green-700"
                />
              ) : (
                <></>
              )}
            </div>

            <div className="justify-self-center">
              {formatPrice(items.price)}
            </div>
            <div className="justify-self-center">{items.quantity}</div>
            <div className="justify-self-end font-semibold">
              $ {(items.price * items.quantity).toFixed(2)}
            </div>
          </div>
        ))}
    </>
  );
};

export default OrderItemDetail;
