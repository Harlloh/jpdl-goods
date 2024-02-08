// useOrderActions.ts
import { useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import useGetAllOrders from "./getOrders";

const useOrderActions = () => {
  const { fetchOrders } = useGetAllOrders();
  //   const router = useRouter();
  const userToken = localStorage.getItem("user");

  const handleDelivered = useCallback(
    (id: string) => {
      axios
        .put(
          `https://store-api-pyo1.onrender.com/order/update/${id}?status=2`,
          {},
          {
            headers: {
              Authorization: userToken,
            },
          }
        )
        .then((res) => {
          toast.success(res.data.data.delivery_status);
          fetchOrders();
        })
        .catch((error) => {
          toast.error("Something went wrong");
          console.log(error, "error");
        });
    },
    [userToken, fetchOrders]
  );

  const handleDispatch = useCallback((id: any) => {
    axios
      .put(
        `https://store-api-pyo1.onrender.com/order/update/${id}?status=1`,
        {},
        {
          headers: {
            Authorization: userToken,
          },
        }
      )
      .then((res) => {
        toast.success(res.data.data.delivery_status);
        fetchOrders();
      })
      .catch((error) => {
        toast.error("Something went wrong");
        console.log(error, "error");
      });
  }, []);

  return { handleDelivered, handleDispatch };
};

export default useOrderActions;
