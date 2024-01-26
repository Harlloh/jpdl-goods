"use client";
import React, { useEffect, useState } from "react";
import ProductCard from "./Products/ProductCard";
import { cartProductType } from "../product/[productId]/ProductDetails";
import { wishProductType } from "../wishlist/ItemContent";
import Link from "next/link";
import useGetProducts from "@/hooks/useGetProducts";

const FeaturedProduct: React.FC<any> = ({ type }) => {
  const { productss } = useGetProducts();
  const [displayedProducts, setDisplayedProducts] = useState(productss);

  useEffect(() => {
    // Shuffle the products when the component mounts or when productss changes
    const shuffledProducts = [...productss].sort(() => 0.5 - Math.random());
    setDisplayedProducts(shuffledProducts);
  }, [productss]);

  // Define functions to filter products based on type
  const filterNewArrival = (products: any) => {
    return products.slice(0, 6);
  };

  const filterMostPopular = (products: any) => {
    const sortedProducts = products.sort((a: any, b: any) => b.price - a.price);
    return sortedProducts.slice(0, 6);
  };

  const filterFeatured = (products: any) => {
    return products.slice(0, 6);
  };

  // Select the appropriate filter function based on the type
  const filterFunction =
    type === "newArrival"
      ? filterNewArrival
      : type === "mostPopular"
      ? filterMostPopular
      : filterFeatured;

  const filteredProducts = filterFunction(displayedProducts);

  return (
    <section className="mt-9 py-5 ">
      <span className="flex justify-between items-center gap-4">
        <h1 className="text-start text-black font-semibold text-4xl mb-6 text-nowrap">
          {type === "newArrival"
            ? "New Arrivals"
            : type === "mostPopular"
            ? "Most Popular"
            : "Featured Products"}
        </h1>
        <Link className="underline" href={"/shop"}>
          See more
        </Link>
      </span>
      <div className=" grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {filteredProducts.map((product: any) => {
          return <ProductCard key={product.id} data={product} />;
        })}
      </div>
    </section>
  );
};

export default FeaturedProduct;
