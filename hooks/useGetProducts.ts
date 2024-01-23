// useGetProducts.js
import axios from "axios";
import { useEffect, useState } from "react";

const useGetProducts = () => {
  const [productss, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await axios.get('https://store-api-pyo1.onrender.com/product/get/all');
        const productsData = res.data.data.map((product:any) => {
          // Rename _id to id
          const { _id, ...rest } = product;
          return { id: _id, ...rest };
        });
        setProducts(productsData);
      } catch (error:any) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);
  

  return { productss, loading, error };
};

export default useGetProducts;
