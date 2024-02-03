// export const getOrders = ()=>{

//     return  [
//         {
//             id: '2345jkasdf',
//             user:{

//                 name: 'John Doe',
//             },
//             amount: 1223,
//             status: 'pending',
//             createdDate: '2022-12-23T12:34:56Z',
//             deliveryStatus: 'dispatched',

//         },
//         {
//             id: '23sfds45jkasdf',
//             user:{

//                 name: 'Johasdfn Doe',
//             },
//             amount: 122323,
//             status: 'complete',
//             createdDate: '2022-12-23T12:34:56Z',
//             deliveryStatus: 'delivered',

//         },
//         {
//             id: '23sfsfds45jkasdf',
//             user:{

//                 name: 'Johasdfasdfn Doe',
//             },
//             amount: 12223323,
//             status: 'pending',
//             createdDate: '2022-12-23T12:34:56Z',
//             deliveryStatus: 'pending',

//         },
//     ]
// }
// useGetProducts.js
import axios from "axios";
import { useEffect, useState } from "react";

const useGetAllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loadings, setLoading] = useState(true);
  const [errors, setError] = useState(null);
  const userToken = localStorage.getItem("user");
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        "https://store-api-pyo1.onrender.com/order/get/all",
        {
          headers: {
            Authorization: userToken,
          },
        }
      );
      const productsData = res.data.data.map((product: any) => {
        // Rename _id to id
        const { _id, ...rest } = product;
        return { id: _id, ...rest };
      });
      setOrders(productsData);
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchOrders();
  }, []);

  return { orders, loadings, errors, fetchOrders };
};

export default useGetAllOrders;
