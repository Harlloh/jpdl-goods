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
    return <div className="flex items-center justify-center h-screen">
    <div className="relative">
        <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-200"></div>
        <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-teal-500 animate-spin">
        </div>
    </div>
</div>; // You can replace this with a loading spinner or any loading UI
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
