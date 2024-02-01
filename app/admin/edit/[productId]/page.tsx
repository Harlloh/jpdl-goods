"use client";
import Container from "@/app/components/Container";
import FormWrap from "@/app/components/FormWrap";
import React from "react";
import EditProductForm from "./EditProductForm";
import useGetProducts from "@/hooks/useGetProducts";
import Loading from "@/app/components/Loading";

interface IParams {
  productId?: string;
}

function Edit({ params }: { params: IParams }) {
  const { productss, loading, error } = useGetProducts();

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }
  const product = productss.find((item: any) => {
    return item.id === params.productId;
  });
  return (
    <div className="px-8 py-0">
      <Container>
        <FormWrap>
          <EditProductForm product={product} />
        </FormWrap>
      </Container>
    </div>
  );
}

export default Edit;
