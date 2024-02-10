// useOrderActions.ts
import { useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import useGetAllOrders from "./getOrders";
import { BASE_URL, getToken } from "@/api/auth/apis";

const useOrderActions = () => {
  const { fetchOrders } = useGetAllOrders();
  //   const router = useRouter();
  const userToken = getToken();

  const handleDelivered = useCallback(
    (id: string, currentPage: any) => {
      axios
        .put(
          `${BASE_URL}/order/update/${id}?status=2`,
          {},
          {
            headers: {
              Authorization: userToken,
            },
          }
        )
        .then((res) => {
          toast.success(res.data.data.delivery_status);
          fetchOrders(0);
        })
        .catch((error) => {
          toast.error("Something went wrong");
          console.log(error, "error");
        });
    },
    [userToken, fetchOrders]
  );

  const handleDispatch = useCallback((id: any, currentPage: any) => {
    axios
      .put(
        `${BASE_URL}/order/update/${id}?status=1`,
        {},
        {
          headers: {
            Authorization: userToken,
          },
        }
      )
      .then((res) => {
        toast.success(res.data.data.delivery_status);
        fetchOrders(0);
      })
      .catch((error) => {
        toast.error("Something went wrong");
        console.log(error, "error");
      });
  }, []);

  return { handleDelivered, handleDispatch };
};

export default useOrderActions;
