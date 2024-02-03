/* eslint-disable react-hooks/rules-of-hooks */
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
import { BiTimeFive } from "react-icons/bi";

import ActionBtn from "@/app/components/ActionBtn";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import moment from "moment";
import NullData from "@/app/components/NullData";
import useGetAllUsers from "@/hooks/useGetAllUser";
import Loading from "@/app/components/Loading";
import useGetAllOrders from "@/hooks/getOrders";

const ManageOrdersClient = () => {
  const { orders, loadings, errors, fetchOrders } = useGetAllOrders();
  console.log(orders, "usersssssssssss");

  // if(loadings){
  //   return <Loading/>
  // }
  // if(errors){
  //   return <NullData title="Error loading orders, refresh!"/>
  // }

  const storedisAdmin = localStorage.getItem("isAdmin");
  const isAdmin = storedisAdmin ? atob(storedisAdmin) : null;
  if (!isAdmin) {
    return <NullData title="Oops access denied" />;
  }

  const router = useRouter();
  const userToken = localStorage.getItem("user");
  let rows: any = [];
  if (orders) {
    rows = orders.map((order: any, index) => {
      const totalAmount = order.orderCart.reduce(
        (acc: number, item: any) => acc + item.price * item.quantity,
        0
      );
      return {
        id: order.id,
        sn: index + 1,
        customer: order.user.name,
        amount: formatPrice(totalAmount),
        paymentStatus: order.payment_status,
        date: moment(order.createdDate).fromNow(),
        deliveryStatus: order.delivery_status,
      };
    });
  }
  const columns: GridColDef[] = [
    { field: "sn", headerName: "S/N", width: 70 },
    { field: "customer", headerName: "Customer Name", width: 150 },
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
      width: 150,
      renderCell: (params) => {
        return (
          <div className="text-center items-center flex ">
            {params.row.paymentStatus === "open" ? (
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
            ) : params.row.paymentStatus === "expired" ? (
              <Status
                text="Expired"
                icon={BiTimeFive}
                bg="bg-red-200"
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
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const handleDispatch = useCallback((id: any) => {
    axios
      .put(
        `https://store-api-pyo1.onrender.com/order/update/${id}?status=1`,
        {},
        {
          headers: {
            Authorization: userToken,
          },
        }
      )
      .then((res) => {
        toast.success(res.data.data.delivery_status);
        fetchOrders();
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
      .put(
        `https://store-api-pyo1.onrender.com/order/update/${id}?status=2`,
        {},
        {
          headers: {
            Authorization: userToken,
          },
        }
      )
      .then((res) => {
        toast.success(res.data.data.delivery_status);
        fetchOrders();
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
      <div style={{ height: 800, width: "100%" }}>
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

export default ManageOrdersClient;
