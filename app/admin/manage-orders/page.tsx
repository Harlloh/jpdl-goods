import React from "react";
import NullData from "@/app/components/NullData";
import Container from "@/app/components/Container";
import { getOrders } from "@/hooks/getOrders";
import ManageOrdersClient from "./ManageOrdersClient";

async function ManageOrders() {
  const orders = await getOrders();
 
  return (
    <div>
      <Container>
        <ManageOrdersClient orders={orders} />
      </Container>
    </div>
  );
}

export default ManageOrders;