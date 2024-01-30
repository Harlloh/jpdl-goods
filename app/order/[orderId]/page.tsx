"use client"
import React from "react";
import OrderDetails from "./OrderDetails";
import Container from "@/app/components/Container";
import NullData from "@/app/components/NullData";
import useGetAllOrders from "@/hooks/getOrders";
import { getOrderById } from "@/hooks/getOrderById";
import Loading from "@/app/components/Loading";

interface IParams {
  orderId?: string;
}

function Order({ params }: { params: IParams }) {
//   const order = await getOrderById(params);
    const {orders,errors,loadings} = useGetAllOrders()
  if (errors) {
    return <NullData title="No Order"></NullData>;
  }
  if(loadings){
    return <Loading/>
  }
  
  const order = orders.find((item:any) =>{
    return item.id === params.orderId});
  return (
    <Container>
      <div>
        <OrderDetails order={order} />
      </div>
    </Container>
  );
}

export default Order;