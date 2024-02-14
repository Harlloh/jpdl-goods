// "use client";

import ProductCard from "@/app/components/Products/ProductCard";
import SmLoading from "@/app/components/SmLoading";
import useGetProducts from "@/hooks/useGetProducts";
import { useEffect, useState } from "react";

const YouMightLike = () => {
  const { productss, loading } = useGetProducts();
  const [shuffledProduct, setShuffledProduct] = useState([]);

  useEffect(() => {
    if (productss && productss.length > 0) {
      // Create a copy of the products array
      const productsCopy = [...productss];

      // Shuffle the copied array
      const shuffledArray = productsCopy.sort(() => Math.random() - 0.5);

      // Take the first 5 items
      const slicedArray = shuffledArray.slice(0, 5);

      setShuffledProduct(slicedArray);
    }
  }, [productss]);

  return (
    <div className="my-5 ">
      <h1 className="font-semibold md:text-2xl text-xl xl:text-3xl">
        You might also like
      </h1>
      <div className="flex gap-4 items-center w-screen overflow-x-scroll">
        {loading ? (
          <SmLoading />
        ) : (
          shuffledProduct.map((product: any) => (
            <ProductCard key={product.id} data={product} />
          ))
        )}
      </div>
    </div>
  );
};

export default YouMightLike;
