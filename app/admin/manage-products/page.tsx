import React from "react";
import ManageProductClient from "./manageProductClient";
import NullData from "@/app/components/NullData";
import Container from "@/app/components/Container";
import getCurrentUser from "@/hooks/useGetCurrentUser";
import { products } from "@/app/utils/Product";

async function ManageProducts() {
  const currentUser = await getCurrentUser();
  if (!currentUser || currentUser.role !== "ADMIN") {
    return <NullData title="Oops access denied" />;
  }
  console.log(products, ">>>>>>>>>>>>>>>");
  debugger;
  return (
    <div>
      <Container>
        <ManageProductClient products={products} />
      </Container>
    </div>
  );
}

export default ManageProducts;