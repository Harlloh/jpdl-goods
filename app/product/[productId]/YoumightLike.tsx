// "use client";

import ProductCard from "@/app/components/Products/ProductCard";
import useGetProducts from "@/hooks/useGetProducts";
import { useEffect, useState } from "react";

const YouMightLike = () => {
  const { productss } = useGetProducts();
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

  console.log(shuffledProduct, ">>>>>>>>>>>>");
  console.log(productss, "))))))))");

  return (
    <div>
      <h1>You might also like</h1>
      <div className="flex gap-2 items-center">
        {shuffledProduct.map((product: any) => (
          <ProductCard key={product.id} data={product} />
        ))}
      </div>
    </div>
  );
};

export default YouMightLike;
