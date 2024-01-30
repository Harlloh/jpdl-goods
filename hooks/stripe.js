import axios from "axios";

export const checkOutService = async (product) => {
  const token = localStorage.getItem("user");
  debugger
  try {
    const responseURL = await axios.post(
      "https://store-api-pyo1.onrender.com/payment/cart/check-out",
      product,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return window.location.href = responseURL.data.data;
  } catch (error) {
    return false;
  }
};
 