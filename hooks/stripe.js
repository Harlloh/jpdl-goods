import { BASE_URL } from "@/api/auth/apis";
import axios from "axios";
import { useState } from "react";

export const checkOutService = async (product) => {
  const token = localStorage.getItem("user");
  let loading = false;
  let redirectUrl;
  try {
    loading = true;
    const responseURL = await axios.post(
      `${BASE_URL}/payment/cart/check-out`,
      product,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    redirectUrl = responseURL.data.data;
    return { redirectUrl, loading };
  } catch (error) {
    loading = false;
    return { redirectUrl: false, loading };
  } finally {
    loading = false;
  }
};
export const handleSubscriptions = async (product) => {
  const token = localStorage.getItem("user");
  let loading = false;
  let redirectUrl;
  try {
    loading = true;
    const responseURL = await axios.post(
      `${BASE_URL}/payment/subscription/check-out`,
      product,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    redirectUrl = responseURL.data.data;
    return { redirectUrl, loading };
  } catch (error) {
    loading = false;
    return { redirectUrl: false, loading };
  } finally {
    loading = false;
  }
};
