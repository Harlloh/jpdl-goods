import axios from "axios";
import { useState } from "react";

export const checkOutService = async (product) => {
  const token = localStorage.getItem("user");
let loading = false
  let redirectUrl
  try {
    loading = true
    const responseURL = await axios.post(
      "https://store-api-pyo1.onrender.com/payment/cart/check-out",
      product,
      {
        headers: {
          Authorization: token,
        },
      }
      );
     redirectUrl = responseURL.data.data;
     return {redirectUrl,loading}
  } catch (error) {
    loading = false
    return { redirectUrl: false, loading }
  }finally{
    loading = false
  }
};
 