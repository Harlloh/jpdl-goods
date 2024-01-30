import React from "react";
import NullData from "@/app/components/NullData";
import Container from "@/app/components/Container";
import ManageOrdersClient from "./ManageOrdersClient";

async function ManageOrders() {
 
  return (
    <div>
      <Container>
        <ManageOrdersClient/>
      </Container>
    </div>
  );
}

export default ManageOrders;