import { BASE_URL, getToken } from "@/api/auth/apis";
import axios from "axios";
import { useEffect, useState } from "react";

const useGetAllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loadings, setLoading] = useState(true);
  const [errors, setError] = useState(null);
  const userToken = getToken();
  const fetchOrders = async (pagenumber: number) => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${BASE_URL}/order/get/all?page=${pagenumber}`,
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
