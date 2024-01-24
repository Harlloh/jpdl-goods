"use client";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
// import { Order, User } from "@prisma/client";
import React, { useCallback } from "react";
import { formatPrice } from "../../utils/formatPrice";
import Heading from "@/app/components/Heading";
import Status from "@/app/components/Status";
import {
  MdAccessTime,
  MdDeliveryDining,
  MdDone,
  MdRemoveRedEye,
} from "react-icons/md";
import ActionBtn from "@/app/components/ActionBtn";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import moment from "moment";
import NullData from "@/app/components/NullData";
import useGetAllUsers from "@/hooks/useGetAllUser";
import Loading from "@/app/components/Loading";
interface ManageOrdersClientProps {
  orders: ExtendedOrder[];
}
type ExtendedOrder = any & {
  user: any;
};

const ManageOrdersClient: React.FC<ManageOrdersClientProps> = ({ orders }) => {

  const { users, loadings, errors } = useGetAllUsers();
  console.log(users,'usersssssssssss')

  if(loadings){
    return <Loading/>
  }














  const storedisAdmin = (localStorage.getItem('isAdmin'))
  const isAdmin = storedisAdmin ? atob(storedisAdmin) : null
  if (!isAdmin) {
    return <NullData title="Oops access denied" />;
  }



  const router = useRouter();
  let rows: any = [];
  if (orders) {
    rows = orders.map((order) => {
      return {
        id: order.id,
        customer: order.user.name,
        amount: formatPrice(order.amount / 100),
        paymentStatus: order.status,
        date: moment(order.createdDate).fromNow(),
        deliveryStatus: order.deliveryStatus,
      };
    });
  }
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 220 },
    { field: "customer", headerName: "Customer Name", width: 130 },
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
            {params.row.deliveryStatus === "pending" ? (
              <Status
                text="pending"
                icon={MdAccessTime}
                bg="bg-slate-200"
                color="text-slate-700"
              />
            ) : params.row.deliveryStatus === "dispatched" ? (
              <Status
                text="Dispatched"
                icon={MdDeliveryDining}
                bg="bg-purple-200"
                color="text-purple-700"
              />
            ) : params.row.deliveryStatus === "delivered" ? (
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
              icon={MdDeliveryDining}
              onClick={() => {
                handleDispatch(params.row.id);
              }}
            />
            <ActionBtn
              icon={MdDone}
              onClick={() => {
                handleDelevered(params.row.id);
              }}
            />
            <ActionBtn
              icon={MdRemoveRedEye}
              onClick={() => {
                router.push(`/order/${params.row.id}`);
              }}
            />
          </div>
        );
      },
    },
  ];

  //this is to change the status from either in stock or out of stock
  const handleDispatch = useCallback((id: string) => {
    axios
      .put("/api/order", { id, deliveryStatus: "dispatched" })
      .then((res) => {
        toast.success("Order Dispatched");
        router.refresh();
      })
      .catch((error) => {
        toast.error("Something went wrong");
        console.log(error, "error");
      });
  }, []);

  //this is to change the status from either in stock or out of stock
  const handleDelevered = useCallback((id: string) => {
    axios
      .put("/api/order", { id, deliveryStatus: "delivered" })
      .then((res) => {
        toast.success("Order Delivered");
        router.refresh();
      })
      .catch((error) => {
        toast.error("Something went wrong");
        console.log(error, "error");
      });
  }, []);

  return (
    <div className="max-w-[1150px] m-auto text-xl">
      <div className="mb-4 mt-8">
        <Heading title="Manage Orders" center />
      </div>
      <div style={{ height: 600, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10},
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

export default ManageOrdersClient;