import { BASE_URL, getToken } from "@/api/auth/apis";
import axios from "axios";
import { useEffect, useState } from "react";
interface EndpointResponse {
  totalSales: number;
  totalProducts: number;
  inStockProduct: number;
  outOfStockProducts: number;
  totalOrders: number;
  totalUsers: number;
}

const useGetAllStats = () => {
  const [orderStat, setOrderStat] = useState<EndpointResponse | any>([]);
  const [loadings, setLoading] = useState(true);
  const [errors, setError] = useState(null);
  const userToken = getToken();
  const fetchStats = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/admin/statistics`, {
        headers: {
          Authorization: userToken,
        },
      });
      console.log(res, "hellloooo");

      setOrderStat(res.data.data);
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchStats();
  }, []);

  return { orderStat, loadings, errors, fetchStats };
};

export default useGetAllStats;
