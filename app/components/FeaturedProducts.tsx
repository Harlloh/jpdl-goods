import React from "react";
import ProductCard from "./Products/ProductCard";
import { cartProductType } from "../product/[productId]/ProductDetails";
import { wishProductType } from "../wishlist/ItemContent";
import Link from "next/link";

const FeaturedProduct: React.FC<any> = ({ displayedProducts, type }) => {
  // Define functions to filter products based on type
  const filterNewArrival = (products: any) => {
    // You can implement your logic for new arrival here
    // For example, sort by the product's creation date
    return products.slice(0, 6);
  };

  const filterMostPopular = (products: any) => {
    // You can implement your logic for most popular here
    // For example, sort by the product's review, orders, or price
    return products.slice(0, 6);
  };

  const filterFeatured = (products: any) => {
    // You can implement your logic for featured here
    // For example, pick random products
    const shuffledProducts = products.sort(() => 0.5 - Math.random());
    return shuffledProducts.slice(0, 6);
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
    <section className="mt-9 py-5  ">
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
