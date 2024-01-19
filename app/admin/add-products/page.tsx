import Container from "@/app/components/Container";
import FormWrap from "@/app/components/FormWrap";
import React from "react";
import AddProductForm from "./addProductForm";
import NullData from "@/app/components/NullData";
import getCurrentUser from "@/hooks/useGetCurrentUser";

async function AddProducts() {
  const currentUser = await getCurrentUser();
  // if (!currentUser || currentUser.role !== "ADMIN") {
  //   return <NullData title="Oops access denied" />;
  // }
  return (
    <div className="px-8 py-0">
      <Container>
        <FormWrap>
          <AddProductForm />
        </FormWrap>
      </Container>
    </div>
  );
}

export default AddProducts;
