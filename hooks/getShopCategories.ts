// import axios from "axios";

// export default async function getShopCategories() {
//   const res = await axios.get('https://store-api-pyo1.onrender.com/category/get')
//   const categories = await res.data.data
//   return categories
// }


// useGetProducts.js
import axios from "axios";
import { useEffect, useState } from "react";

const getShopCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get('https://store-api-pyo1.onrender.com/category/get')
      
      setCategories(res.data.data);
    } catch (error:any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
  

    fetchProducts();
  }, []);
  

  return { categories, loading, error,fetchProducts };
};

export default getShopCategories;
