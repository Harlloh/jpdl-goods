import axios from "axios";

export default async function getShopCategories() {
  const res = await axios.get('https://store-api-pyo1.onrender.com/category/get')
  const categories = await res.data.data
  return categories
}
