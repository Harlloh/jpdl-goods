'use client'
import useGetProducts from "@/hooks/useGetProducts";
import React, { useState } from "react";
import ProductCard from "../components/Products/ProductCard";
import Container from "../components/Container";
import SearchBar from "../components/nav/SearcBar";
import Loading from "../components/Loading";

interface Product {
  id: number;
  name: string;
  category: string;
}

const Page: React.FC = () => {
  const {loading, productss,fetchProducts } = useGetProducts();

 

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
    setSeeMoreClicked(true)
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

  return (
    <Container>
      <div className="w-100 items-center">
        <h1>Welcome to our store</h1>
        <SearchBar />
        {Object.keys(groupedProducts).map((category) => (
          <div key={category} className="my-9 mx-auto w-100" id={`${category}`}>
            <h2 className="text-2xl font-semibold text-black">{category}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
              {/* Display only the initial number of items */}
              {groupedProducts[category].slice(0, initialDisplayCount).map((product) => (
                <ProductCard key={product.id} data={product} />
              ))}
            </div>
            {/* Render "See More" button if there are more items to display */}
            {initialDisplayCount < groupedProducts[category].length && (
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
      </div>
    </Container>
  );
};

export default Page;
