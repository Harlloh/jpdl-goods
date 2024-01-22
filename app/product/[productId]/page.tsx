"use client"
import React, { useState } from "react";
import ProductDetails from "./ProductDetails";
import Container from "@/app/components/Container";
import ListRating from "./ListRating";
import getAllProducts from "@/hooks/useGetProducts";
interface IParams {
  productId?: string;
}

function Product({ params }: { params: IParams }) {
  const [products, setProducts] = useState([])
  const fetchProduct = async()=>{
    const product =await getAllProducts()
    setProducts(product)
}
fetchProduct()
console.log(products, 'productssssssssssssss')
  const product = products.find((item:any) => item.id === params.productId);
  debugger
  return (
    <Container>
      <div>
        {/* <ProductDetails products={product} /> */}
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
