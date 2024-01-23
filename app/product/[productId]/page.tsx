'use client'
import React from "react";
import ProductDetails from "./ProductDetails";
import Container from "@/app/components/Container";
import ListRating from "./ListRating";
import { products } from "../../utils/Product";
import useGetProducts from "@/hooks/useGetProducts";
interface IParams {
  productId?: string;
}

function Product({ params }: { params: IParams }) {
  const { productss, loading, error } = useGetProducts();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }
  const product = productss.find((item) =>{
    return item.id === params.productId});
  return (
    <Container>
      <div>
        <ProductDetails products={product} />
        <div className="flex flex-col gap-4 mt-20">
          <div>RATING</div>
          <div>
            <ListRating product={product} />
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Product;
