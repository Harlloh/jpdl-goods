import axios from "axios";

export const checkOutService = async (product) => {
  const token = localStorage.getItem("user");
  try {
    const responseURL = await axios.post(
      "http://localhost:8081/payment/cart/check-out",
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
