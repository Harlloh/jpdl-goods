// useGetProducts.js
import { BASE_URL } from "@/api/auth/apis";
import axios from "axios";
import { useEffect, useState } from "react";

const getShopCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/category/get`);

      setCategories(res.data.data);
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  return { categories, loading, error, fetchProducts };
};

export default getShopCategories;
