export const BASE_URL = "https://store-api-pyo1.onrender.com";

export const getToken = () => {
  return localStorage.getItem("user");
};
export const getIsAdmin = () => {
  return localStorage.getItem("isAdmin");
};
