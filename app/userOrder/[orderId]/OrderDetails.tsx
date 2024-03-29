"use client";
import Heading from "@/app/components/Heading";
import Status from "@/app/components/Status";
import { formatPrice } from "@/app/utils/formatPrice";
// import { Order } from "@prisma/client";
import moment from "moment";
import { useRouter } from "next/navigation";
import React from "react";
import {
  MdAccessTime,
  MdDeliveryDining,
  MdDone,
  MdTimer,
} from "react-icons/md";
import OrderItem from "./OrderItem";
import OrderItemDetail from "./OrderItemDetails";
import { getIsAdmin } from "@/api/auth/apis";
interface OrderDetailsProps {
  order: any;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ order }) => {
  console.log(order, ">>>>>>>>>>>");
  const storedisAdmin = getIsAdmin();
  const isAdmin = storedisAdmin ? atob(storedisAdmin) : null;

  return (
    <div className="max-w-[1150px] m-auto flex flex-col gap-2 ">
      <div className="mt-8">
        <Heading title="Order Details" />
      </div>
      <div>Order Id: {order?.id}</div>

      {/* <div>
        Total Amount:{" "}
        <span className="font-bold">{formatPrice(order.amount)}</span>
      </div> */}
      <div className="flex gap-2 items-center">
        <div>Payment Status:</div>
        <div>
          {order?.payment_status === "pending" ? (
            <Status
              text="pending"
              icon={MdAccessTime}
              bg="bg-slate-200"
              color="text-slate-700"
            />
          ) : order?.payment_status === "complete" ? (
            <Status
              text="Completed"
              icon={MdDone}
              bg="bg-green-200"
              color="text-green-700"
            />
          ) : order?.payment_status === "expired" ? (
            <Status
              text="Expired"
              icon={MdTimer}
              bg="bg-green-200"
              color="text-red-200"
            />
          ) : (
            <></>
          )}
        </div>
      </div>

      <div className="flex gap-2 items-center">
        <div>Delivery Status:</div>
        <div>
          {order?.delivery_status === "Pending Delivery" ? (
            <Status
              text="pending"
              icon={MdAccessTime}
              bg="bg-slate-200"
              color="text-slate-700"
            />
          ) : order?.delivery_status === "Package Enroute" ? (
            <Status
              text="Dispatched"
              icon={MdDeliveryDining}
              bg="bg-purple-200"
              color="text-purple-700"
            />
          ) : order?.delivery_status === "Package Delivered" ? (
            <Status
              text="Delivered"
              icon={MdDone}
              bg="bg-green-200"
              color="text-green-700"
            />
          ) : (
            <></>
          )}
        </div>
      </div>
      <div>Date: {moment(order?.createdDate).fromNow()}</div>
      <div>
        <h2 className="font-semibold mt-4 mb-2">Product ordered</h2>
        <div className="grid grid-cols-6 text-xs gap-4 pb-2 items-center">
          <div className="col-span-2 justify-self-start">PRODUCTS</div>
          <div className=" justify-self-center">Delivery Status</div>
          <div className=" justify-self-center">PRICE</div>
          <div className=" justify-self-center">QTY</div>
          <div className=" justify-self-end">TOTAL</div>
        </div>
        {order?.orderDetails &&
          order?.orderDetails.map((item: any) => {
            return <OrderItem key={item.id} item={item}></OrderItem>;
          })}
      </div>
    </div>
  );
};

export default OrderDetails;
