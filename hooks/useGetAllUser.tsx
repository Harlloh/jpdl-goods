// useGetProducts.js
import axios from "axios";
import { useEffect, useState } from "react";

const useGetAllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loadings, setLoading] = useState(true);
  const [errors, setError] = useState(null);
  const userToken = localStorage.getItem('user')
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get('https://store-api-pyo1.onrender.com/user/get/all', {
          headers:{
              'Authorization': userToken
          }
      });
      const productsData = res.data.data.map((product:any) => {
        // Rename _id to id
        const { _id, ...rest } = product;
        return { id: _id, ...rest };
      });
      setUsers(productsData);
    } catch (error:any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
  

    fetchUsers();
  }, []);
  

  return { users, loadings, errors,fetchUsers };
};

export default useGetAllUsers;
