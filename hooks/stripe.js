import axios from "axios";

export const checkOutService = async (product) => {
  const token = localStorage.getItem("user");
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
    return window.open(responseURL.data.data, "_blank");
  } catch (error) {
    return false;
  }
};
