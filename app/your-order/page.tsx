"use client";

import axios from "axios";
import { useEffect } from "react";

const YourOrder = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userToken = localStorage.getItem("user");
        const res = await axios.get(
          "https://store-api-pyo1.onrender.com/order/my/order/1",{
            headers:{
                Authorization: userToken
            }
          }
        );
        console.log(res.data); // Assuming you want to log the response data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run the effect only once

  return (
    <div>
      <h1>Your Order</h1>
    </div>
  );
};

export default YourOrder;
