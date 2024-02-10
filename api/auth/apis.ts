export const BASE_URL = "https://store-api-pyo1.onrender.com";

export const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("user");
  }
  return null; // or handle the absence of window.localStorage in your desired way
};

export const getIsAdmin = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("isAdmin");
  }
  return null; // or handle the absence of window.localStorage in your desired way
};
