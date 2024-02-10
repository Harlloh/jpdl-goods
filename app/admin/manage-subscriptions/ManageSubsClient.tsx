/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
// import { Order, User } from "@prisma/client";
import React, { useCallback, useState } from "react";
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
import useGetAllSubs from "@/hooks/useGetSubs";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { BASE_URL, getIsAdmin, getToken } from "@/api/auth/apis";

const ManageSubClient = () => {
  const { subs, loadings, errors, fetchSubs } = useGetAllSubs();

  const storedisAdmin = getIsAdmin();
  const isAdmin = storedisAdmin ? atob(storedisAdmin) : null;
  const [searchTerm, setSearchTerm] = useState("");
  let [currentPage, setCurrentPage] = useState(0);

  const filteredRows = subs?.filter((order: any) =>
    order.user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  console.log(filteredRows, "usersssssssssss");

  if (!isAdmin) {
    return <NullData title="Oops access denied" />;
  }

  const router = useRouter();
  const userToken = getToken();
  let rows: any = [];
  if (subs) {
    rows = filteredRows.map((order: any, index) => {
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
  console.log(rows, "orederrrrrrr");

  //this is to change the status from either in stock or out of stock
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const handleDispatch = useCallback((id: any) => {
    axios
      .put(
        `${BASE_URL}/subscription/update/${id}?status=1`,
        {},
        {
          headers: {
            Authorization: userToken,
          },
        }
      )
      .then((res) => {
        toast.success(res.data.data.delivery_status);
        fetchSubs(currentPage);
        router.refresh();
      })
      .catch((error) => {
        toast.error("Something went wrong");
        console.log(error, "error");
      });
  }, []);
  //sdfsd
  // //this is to change the status from either in stock or out of stock
  const handleDelevered = useCallback((id: string) => {
    axios
      .put(`${BASE_URL}/subscription/update/${id}?status=2`, {
        headers: {
          Authorization: userToken,
        },
      })
      .then((res) => {
        toast.success(res.data.data.delivery_status);
        fetchSubs(currentPage);
      })
      .catch((error) => {
        toast.error("Something went wrong");
        console.log(error, "error");
      });
  }, []);

  const handleInputChange = (e: any) => {
    setSearchTerm(e.target.value);
  };
  const handlePageChange = (params: any) => {
    setCurrentPage(++currentPage);
    fetchSubs(currentPage);
  };
  const handlePageChangeBack = (params: any) => {
    setCurrentPage((prev) => (prev -= 1));
    fetchSubs(currentPage);
  };

  return (
    <div className="max-w-[1150px] m-auto text-xl">
      <div className="mb-4 mt-8">
        <Heading title="Manage Orders" center />
      </div>
      <div>
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="search for a ORDER..."
          className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-half p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div style={{ height: "fit-content", width: "100%" }}>
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
      <div className="flex gap-5 w-full justify-between">
        <button
          onClick={handlePageChangeBack}
          className="flex items-center btn-sm"
        >
          <FaArrowLeft size={10} /> <p className="text-sm">prev page</p>
        </button>
        <button onClick={handlePageChange} className="flex items-center btn-sm">
          <p className="text-sm">next page</p> <FaArrowRight size={10} />
        </button>
      </div>
    </div>
  );
};

export default ManageSubClient;
