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
import { useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Heading from "../components/Heading";
import { useRouter } from "next/navigation";

const Orders = () => {
  const { userOrders } = useCart();
  const orders = userOrders;
  console.log(orders);
  let rows: any = [];
  const router = useRouter();

  if (orders) {
    rows = orders.map((order: any) => {
      const totalAmount = order.orderDetails.reduce(
        (acc: number, item: any) => acc + item.price * item.quantity,
        0
      );
      return {
        id: order.id,
        // customer: order.user.name,
        amount: formatPrice(totalAmount),
        paymentStatus: order.status,
        date: moment(order.createdDate).fromNow(),
        deliveryStatus: order.delivery_status,
      };
    });
  }
  const columns: GridColDef[] = [
    // { field: "id", headerName: "ID", width: 220 },
    // { field: "customer", headerName: "Customer Name", width: 130 },
    {
      field: "amount",
      headerName: "Amount(USD)",
      width: 100,
      renderCell: (params) => {
        return <div style={{ fontWeight: "bold" }}>{params.row.amount}</div>;
      },
    },
    {
      field: "paymentStatus",
      headerName: "Payment Status",
      width: 130,
      renderCell: (params) => {
        return (
          <div className="text-center items-center flex ">
            {params.row.paymentStatus === "pending" ? (
              <Status
                text="pending"
                icon={MdAccessTime}
                bg="bg-slate-200"
                color="text-slate-700"
              />
            ) : params.row.paymentStatus === "complete" ? (
              <Status
                text="Completed"
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
    { field: "date", headerName: "Date", width: 130 },
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
                router.push(`/userOrder/${params.row.id}`);
              }}
            />
          </div>
        );
      },
    },
  ];

  return (
    <div className="max-w-[1150px] m-auto text-xl">
      <div className="mb-4 mt-8">
        <Heading title="Your Orders" center />
      </div>
      <div style={{ height: 600, width: "80%" }}>
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
