import axios from "axios";
import { useEffect, useState } from "react";

const useGetAllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loadings, setLoading] = useState(true);
  const [errors, setError] = useState(null);
  const userToken = localStorage.getItem("user");
  const fetchOrders = async (pagenumber: number) => {
    try {
      setLoading(true);
      const res = await axios.get(
        `https://store-api-pyo1.onrender.com/order/get/all?page=${pagenumber}`,
        {
          headers: {
            Authorization: userToken,
          },
        }
      );
      console.log(res, "hellloooo");
      const productsData = res.data.data.orders.map((product: any) => {
        // Rename _id to id
        const { _id, ...rest } = product;
        return { id: _id, ...rest };
      });
      setOrders(productsData);
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchOrders(0);
  }, []);

  return { orders, loadings, errors, fetchOrders };
};

export default useGetAllOrders;
