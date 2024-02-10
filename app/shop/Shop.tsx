"use client";
import { FaTimes } from "react-icons/fa";
import NullData from "../components/NullData";
import ProductCard from "../components/Products/ProductCard";
import Loading from "../components/Loading";
import React, { useState } from "react";
import useGetProducts from "@/hooks/useGetProducts";
import useGetShopCategories from "@/hooks/usegetShopCategories";
import Container from "../components/Container";
import { handleScrollToCategory, sanitizeForId } from "../utils/sanitizeText";

interface Product {
  id: number;
  name: string;
  category: string;
}

const Shop = () => {
  const { loading, productss, fetchProducts } = useGetProducts();
  const [searchTerm, setSearchTerm] = useState("");
  const { categories } = useGetShopCategories();

  // Group products by category
  const groupedProducts: { [key: string]: Product[] } = productss.reduce(
    (acc: any, product: any) => {
      if (!acc[product.category]) {
        acc[product.category] = [];
      }
      acc[product.category].push(product);
      return acc;
    },
    {}
  );

  // State to track the number of initially displayed items for each category
  const [initialDisplayCount, setInitialDisplayCount] = useState<number>(7);
  const [seeMoreClicked, setSeeMoreClicked] = useState<boolean>(false);

  // Function to handle "See More" button click
  const handleSeeMore = (category: string) => {
    // Set the initial display count to a larger number to show all items
    setInitialDisplayCount(groupedProducts[category].length);
    setSeeMoreClicked(true);
  };

  const handleSeeLess = () => {
    // Set the initial display count back to the default value
    setInitialDisplayCount(7);
    // Set seeMoreClicked to false
    setSeeMoreClicked(false);
  };

  React.useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return <Loading />;
  }

  const handleSearch = (e: any) => {
    setSearchTerm(e.target.value);
  };

  // Filter products based on the search term
  const searchedProducts = Object.keys(groupedProducts).reduce(
    (acc: any, category: any) => {
      const filteredProducts = groupedProducts[category].filter(
        (product: any) => {
          const productName = product.name.toLowerCase();
          return productName.includes(searchTerm.toLowerCase());
        }
      );

      if (filteredProducts.length > 0) {
        acc[category] = filteredProducts;
      }

      return acc;
    },
    {}
  );

  const handleClearSearchTerm = () => {
    setSearchTerm("");
  };

  return (
    <div className="relative">
      <div className="sticky top-0 left-0 right-0 items-center flex justify-between p-2 z-10 bg-teal-600 w-max-100 overflow-x-auto">
        {categories.map((category: any) => (
          <span
            key={category.name}
            className="mr-4 text-white cursor-pointer"
            onClick={() => handleScrollToCategory(category.name)}
          >
            {category.name}
          </span>
        ))}
      </div>
      <Container>
        <div className="w-100 items-center flex flex-col relative mt-4">
          <h1 className="text-2xl text-black font-semibold my-5">
            Welcome to our store
          </h1>
          <span className="sticky w-75 p-2 border border-gray-300 rounded focus:outline-none focus:border-[0.5px] focus:border-teal-500 w-80 flex items-center justify-between">
            <input
              type="text"
              name="searchTerm"
              placeholder="Search for a product or category...."
              value={searchTerm}
              onChange={handleSearch}
              className="grow outline-none border-none"
            />
            {searchTerm && (
              <FaTimes
                onClick={handleClearSearchTerm}
                className="cursor-pointer"
              />
            )}
          </span>
          {Object.keys(searchedProducts).map((category) => (
            <div
              key={category}
              className="my-9 mx-auto w-100"
              id={`${sanitizeForId(category)}`}
            >
              <h2 className="text-2xl font-semibold text-black mb-6">
                {category}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
                {/* Display only the initial number of items */}
                {searchedProducts[category]
                  .slice(0, initialDisplayCount)
                  .map((product: any) => (
                    <ProductCard key={product.id} data={product} />
                  ))}
              </div>
              {/* Render "See More" button if there are more items to display */}
              {initialDisplayCount < searchedProducts[category].length && (
                <button
                  className="mt-4 p-2 bg-teal-600 text-white rounded"
                  onClick={() => handleSeeMore(category)}
                >
                  See More
                </button>
              )}
              {seeMoreClicked && (
                <button
                  className="mt-4 p-2 bg-teal-600 text-white rounded"
                  onClick={handleSeeLess}
                >
                  See Less
                </button>
              )}
            </div>
          ))}
          {Object.keys(searchedProducts).length === 0 && (
            <NullData title={`No Product found for '${searchTerm}'`} />
          )}
        </div>
      </Container>
    </div>
  );
};

export default Shop;
