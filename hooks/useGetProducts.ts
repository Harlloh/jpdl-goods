
import axios from "axios";

export default async function getAllProducts() {
  const res = await axios.get('https://store-api-pyo1.onrender.com/product/get/all')
  const products = await res.data.data
  return products
}
