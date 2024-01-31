"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import Heading from "../components/Heading";
import Status from "../components/Status";
import { MdAccessTime, MdClose, MdDeliveryDining, MdDone } from "react-icons/md";
import moment from "moment";
import OrderItem from "../order/[orderId]/OrderItem";

const YourOrder = () => {
    const [order, setOrder] = useState<any>([])
    const [paymentStatus, setPaymentStatus] = useState('')
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userToken = localStorage.getItem("user");
        const res = await axios.get(
          "https://store-api-pyo1.onrender.com/order/my/order/1",{
            headers:{
                Authorization: userToken
            }
          }
        );
        setOrder(res.data.data.order)
        setPaymentStatus(res.data.data.status)
        console.log(res.data.data); // Assuming you want to log the response data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run the effect only once

  return (
    <div className="max-w-[1150px] m-auto flex flex-col gap-2 ">
      <div className="mt-8">
        <Heading title="Order Details" />
      </div>
      <div>Order Id: {order?._id}</div>
      {/* <div>Name: {order.user.name}</div>
      <div>Email: {order.user.email}</div> */}
      {/* <div>
        Total Amount:{" "}
        <span className="font-bold">{formatPrice(order.amount)}</span>
      </div> */}
      <div className="flex gap-2 items-center">
        <div>Payment Status:</div>
        <div>
  {paymentStatus === "open" ? (
    <Status
      text="Open"
      icon={MdAccessTime}
      bg="bg-slate-200"
      color="text-slate-700"
    />
  ) : paymentStatus === "complete" ? (
    <Status
      text="Completed"
      icon={MdDone}
      bg="bg-green-200"
      color="text-green-700"
    />
  ) : paymentStatus === "close" ? (
    <Status
      text="Closed"
      icon={MdClose}
      bg="bg-red-200"  // Adjust the background color accordingly
      color="text-red-700"  // Adjust the text color accordingly
    />
  ) : (
    <></>
  )}
</div>
      </div>




      <div className="flex gap-2 items-center">
        <div>Delivery Status:</div>
        <div>
          {order.status === "Pending Delivery" ? (
            <Status
              text="pending"
              icon={MdAccessTime}
              bg="bg-slate-200"
              color="text-slate-700"
            />
          ) : order.status === "dispatched" ? (
            <Status
              text="Dispatched"
              icon={MdDeliveryDining}
              bg="bg-purple-200"
              color="text-purple-700"
            />
          ) : order.status === "delivered" ? (
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
      <div>Date: {moment(order.createdAt).fromNow()}</div>
      <div>
        <h2 className="font-semibold mt-4 mb-2">Product ordered</h2>
        <div className="grid grid-cols-5 text-xs gap-4 pb-2 items-center">
          <div className="col-span-2 justify-self-start">PRODUCTS</div>
          <div className=" justify-self-center">PRICE</div>
          <div className=" justify-self-center">QTY</div>
          <div className=" justify-self-end">TOTAL</div>
        </div>
        {order.orderCart &&
          order.orderCart.map((item: any) => {
            return <OrderItem key={item.id} item={item}></OrderItem>;
          })}
      </div>
    </div>
  );
};

export default YourOrder;
