import { BASE_URL, getToken } from "@/api/auth/apis";
import axios from "axios";
import { useState } from "react";

export const checkOutService = async (product) => {
  const token = getToken();
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
  const token = getToken();
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
    const succMeassage = error.response.data.message;

    redirectUrl = responseURL.data.data;
    return { redirectUrl, loading, succMeassage };
  } catch (error) {
    // const errorMeassage = error.response.data.message;
    loading = false;
    return { redirectUrl: false, loading };
  } finally {
    loading = false;
  }
};
