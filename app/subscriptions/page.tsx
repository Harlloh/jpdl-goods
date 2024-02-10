"use client";
import { useCart } from "@/hooks/useCartHook";
import OrderItem from "../order/[orderId]/OrderItem";
import { formatPrice } from "../utils/formatPrice";
import moment from "moment";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Status from "../components/Status";
import {
  MdAccessTime,
  MdDeliveryDining,
  MdDone,
  MdRemoveRedEye,
} from "react-icons/md";
import ActionBtn from "../components/ActionBtn";
import { useCallback, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Heading from "../components/Heading";
import { useRouter } from "next/navigation";
import OrderDetails from "../order/[orderId]/OrderDetails";
import { BASE_URL, getToken } from "@/api/auth/apis";
import { FaTimes } from "react-icons/fa";

const Orders = () => {
  const { userSubs, fetchUserProducts } = useCart();
  const userToken = getToken();
  const [loading, setLoading] = useState(false);

  let rows: any = [];
  const router = useRouter();
  console.log(userSubs);

  if (userSubs && userSubs.length > 0) {
    rows = userSubs.map((order: any) => {
      // const totalAmount = order.orderDetails.reduce(
      //   (acc: number, item: any) => acc + item.price * item.quantity,
      //   0
      // );
      return {
        id: order.orderDetails.id,
        subscriptionId: order.id,
        brand: order.orderDetails.brand,
        category: order.orderDetails.category,
        name: order.orderDetails.name,
        amount: formatPrice(order.orderDetails.price),
        images: order.orderDetails.selectedImage.image,

        // paymentStatus: order.delivery_status,
        // date: moment(order.createdDate).fromNow(),
        deliveryStatus: order.delivery_status,
      };
    });
  }
  const columns: GridColDef[] = [
    // { field: "id", headerName: "ID", width: 220 },
    {
      field: "images",
      headerName: "Images",
      width: 170,
      renderCell: (params) => {
        return <img src={params.row.images} alt={params.row.name} />;
      },
    },
    { field: "name", headerName: "Name", width: 130 },
    { field: "category", headerName: "Category", width: 100 },
    { field: "brand", headerName: "Brand", width: 100 },
    {
      field: "amount",
      headerName: "Amount(USD)",
      width: 100,
      renderCell: (params) => {
        return <div style={{ fontWeight: "bold" }}>{params.row.amount}</div>;
      },
    },
    // {
    //   field: "paymentStatus",
    //   headerName: "Payment Status",
    //   width: 130,
    //   renderCell: (params) => {
    //     return (
    //       <div className="text-center items-center flex ">
    //         {params.row.paymentStatus === "pending" ? (
    //           <Status
    //             text="pending"
    //             icon={MdAccessTime}
    //             bg="bg-slate-200"
    //             color="text-slate-700"
    //           />
    //         ) : params.row.paymentStatus === "complete" ? (
    //           <Status
    //             text="Completed"
    //             icon={MdDone}
    //             bg="bg-green-200"
    //             color="text-green-700"
    //           />
    //         ) : (
    //           <></>
    //         )}
    //       </div>
    //     );
    //   },
    // },
    {
      field: "deliveryStatus",
      headerName: "Delivery Status",
      width: 130,
      renderCell: (params) => {
        return (
          <div className="text-center items-center flex ">
            {params.row.deliveryStatus === "Pending Delivery" ? (
              <Status
                text="pending"
                icon={MdAccessTime}
                bg="bg-slate-200"
                color="text-slate-700"
              />
            ) : params.row.deliveryStatus === "Package Enroute" ? (
              <Status
                text="Dispatched"
                icon={MdDeliveryDining}
                bg="bg-purple-200"
                color="text-purple-700"
              />
            ) : params.row.deliveryStatus === "Package Delivered" ? (
              <Status
                text="delivered"
                icon={MdDone}
                bg="bg-green-200"
                color="text-green-700"
              />
            ) : (
              <></>
            )}
          </div>
        );
      },
    },
    // { field: "date", headerName: "Date", width: 130 },
    {
      field: "action",
      headerName: "Actions",
      width: 100,
      renderCell: (params) => {
        return (
          <div className="flex justify-between gap-3 w-full">
            <ActionBtn
              icon={MdRemoveRedEye}
              onClick={() => {
                router.push(`/product/${params.row.id}`);
              }}
            />
            <ActionBtn
              icon={FaTimes}
              onClick={() => {
                handleCancleSub(params.row.subscriptionId);
              }}
            />
          </div>
        );
      },
    },
  ];

  const handleCancleSub = async (subId: string) => {
    try {
      setLoading(true);
      const res = await axios.post(
        `${BASE_URL}/payment/subscription/cancel/${subId}`,
        null,
        {
          headers: {
            Authorization: userToken,
          },
        }
      );

      console.log(res);

      if (res.status === 200) {
        toast.success(res.data.message);
        fetchUserProducts(userToken);
      } else {
        throw new Error();
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
      console.log(error, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[1150px] m-auto text-xl">
      <div className="mb-4 mt-8">
        <Heading title="Your Subscribed Products" center />
      </div>
      <div style={{ height: "fit-content", width: "fit-content" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </div>
    </div>
  );
};
export default Orders;
