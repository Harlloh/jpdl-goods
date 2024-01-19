import React from "react";
import NullData from "@/app/components/NullData";
import Container from "@/app/components/Container";
import getCurrentUser from "@/hooks/useGetCurrentUser";
import { getOrders } from "@/hooks/getOrders";
import ManageOrdersClient from "./ManageOrdersClient";

async function ManageOrders() {
  const orders = await getOrders();
  const currentUser = await getCurrentUser();
  if (!currentUser || currentUser.role !== "ADMIN") {
    return <NullData title="Oops access denied" />;
  }
  return (
    <div>
      <Container>
        <ManageOrdersClient orders={orders} />
      </Container>
    </div>
  );
}

export default ManageOrders;