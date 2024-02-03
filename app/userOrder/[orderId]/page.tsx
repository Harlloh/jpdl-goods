"use client";
import React from "react";
import OrderDetails from "./OrderDetails";
import Container from "@/app/components/Container";
import NullData from "@/app/components/NullData";
import useGetAllOrders from "@/hooks/getOrders";
import { getOrderById } from "@/hooks/getOrderById";
import Loading from "@/app/components/Loading";
import { useCart } from "@/hooks/useCartHook";

interface IParams {
  orderId?: string;
}

function UserOrder({ params }: { params: IParams }) {
  //   const order = await getOrderById(params);
  const { userOrders } = useCart();
  const orders = userOrders;

  const order = orders?.find((item: any) => {
    console.log(item, "************");
    return item.id === params.orderId;
  });
  return (
    <Container>
      <div>
        <OrderDetails order={order} />
      </div>
    </Container>
  );
}

export default UserOrder;
