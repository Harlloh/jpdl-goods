import React from "react";
import ManageProductClient from "./manageProductClient";
import NullData from "@/app/components/NullData";
import Container from "@/app/components/Container";
import { products } from "@/app/utils/Product";

async function ManageProducts() {
  return (
    <div>
      <Container>
        <ManageProductClient />
      </Container>
    </div>
  );
}

export default ManageProducts;
