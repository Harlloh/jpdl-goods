"use client";
import React from "react";
import ProductDetails from "./ProductDetails";
import Container from "@/app/components/Container";
import ListRating from "./ListRating";
import { products } from "../../utils/Product";
import useGetProducts from "@/hooks/useGetProducts";
import Loading from "@/app/components/Loading";
import AddRating from "./AddRating";
interface IParams {
  productId?: string;
}

function Product({ params }: { params: IParams }) {
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
    <Container>
      <div>
        <ProductDetails products={product} />
        <div className="flex flex-col gap-4 mt-20">
          <div>RATING</div>
          <div>
            <AddRating />
            <ListRating product={product} />
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Product;
