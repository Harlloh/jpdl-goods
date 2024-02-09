import { BASE_URL } from "@/api/auth/apis";
import axios from "axios";
import { useEffect, useState } from "react";

const useGetAllSubs = () => {
  const [subs, setSubs] = useState([]);
  const [loadings, setLoading] = useState(true);
  const [errors, setError] = useState(null);
  const userToken = localStorage.getItem("user");
  const fetchSubs = async (pagenumber: number) => {
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
      setSubs(productsData);
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchSubs(0);
  }, []);

  return { subs, loadings, errors, fetchSubs };
};

export default useGetAllSubs;
