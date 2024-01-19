import React from "react";
import OrderDetails from "./OrderDetails";
import Container from "@/app/components/Container";
import NullData from "@/app/components/NullData";
import { getOrders } from "@/hooks/getOrders";
import { getOrderById } from "@/hooks/getOrderById";
interface IParams {
  orderId?: string;
}

async function Order({ params }: { params: IParams }) {
//   const order = await getOrderById(params);
    const order = getOrderById()
  if (!order) {
    return <NullData title="No Order"></NullData>;
  }
  return (
    <Container>
      <div>
        <OrderDetails order={order} />
      </div>
    </Container>
  );
}

export default Order;