"use client";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React, { useCallback, useEffect, useState } from "react";
import { formatPrice } from "../../utils/formatPrice";
import Heading from "@/app/components/Heading";
import Status from "@/app/components/Status";
import {
  MdCached,
  MdClose,
  MdDelete,
  MdDone,
  MdRemoveRedEye,
} from "react-icons/md";
import ActionBtn from "@/app/components/ActionBtn";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { deleteObject, getStorage, ref } from "firebase/storage";
import firebaseApp from "@/libs/firebase";
import { useCart } from "@/hooks/useCartHook";
import NullData from "@/app/components/NullData";
import getAllProducts from "@/hooks/useGetProducts";
import useGetProducts from "@/hooks/useGetProducts";
import useGetAllUsers from "@/hooks/useGetAllUser";
import { FaBan } from "react-icons/fa";
import Loading from "@/app/components/Loading";
import { BASE_URL } from "@/api/auth/apis";
interface ManageProductClientProps {
  products: any[];
}

const ManageUsersClient = () => {
  // const { productss, loading, error } = useGetProducts();
  const { users, loadings, errors, fetchUsers } = useGetAllUsers();

  const userToken = localStorage.getItem("user");
  const storedisAdmin = localStorage.getItem("isAdmin");
  const isAdmin = storedisAdmin ? atob(storedisAdmin) : null;

  const router = useRouter();
  const storage = getStorage(firebaseApp);
  let rows: any = [];
  if (users) {
    rows = users.map((product: any, index) => {
      return {
        sn: index + 1,
        id: product.id, // Use the appropriate property as the unique identifier
        name: product.profile.first_name + " " + product.profile.last_name,
        email: product.profile.email,
        // price: formatPrice(product.price),
        // category: product.category,
        isAdmin: product.isAdmin,

        banned: product.isBlocked ? true : false,
        images: product.images,
      };
    });
  }
  const columns: GridColDef[] = [
    { field: "sn", headerName: "S/N", width: 50 },
    { field: "name", headerName: "Name", width: 220 },
    // {
    //     field: "price",
    //     headerName: "Price(USD)",
    //     width: 100,
    //     renderCell: (params) => {
    //         return <div style={{ fontWeight: "bold" }}>{params.row.price}</div>;
    //     },
    // },
    {
      field: "banned",
      headerName: "Banned",
      width: 150,
      renderCell: (params) => {
        const isBanned = params.row.banned;

        return (
          <div
            style={{
              backgroundColor: isBanned ? "red" : "green",
              color: "white",
              padding: "8px",
              borderRadius: "4px",
              textAlign: "center",
            }}
          >
            {isBanned ? "Banned" : "Not Banned"}
          </div>
        );
      },
    },
    { field: "isAdmin", headerName: "Admin", width: 100 },

    { field: "email", headerName: "Email", width: 250 },
    // {
    //     field: "inStock",
    //     headerName: "InStock",
    //     width: 100,
    //     renderCell: (params) => {
    //         return (
    //             <div className="text-center items-center flex ">
    //                 {params.row.inStock === true ? (
    //                     <Status
    //                         text="in stock"
    //                         icon={MdDone}
    //                         bg="bg-teal-200"
    //                         color="text-teal-700"
    //                     />
    //                 ) : (
    //                     <Status
    //                         text="out of stock"
    //                         icon={MdClose}
    //                         bg="bg-rose-200"
    //                         color="text-rose-700"
    //                     />
    //                 )}
    //             </div>
    //         );
    //     },
    // },
    {
      field: "action",
      headerName: "Actions",
      width: 100,
      renderCell: (params) => {
        return (
          <div className="flex justify-between gap-3 w-full">
            <ActionBtn
              icon={FaBan}
              onClick={() => {
                handleUserBan(params.row.id);
              }}
            />
            {/* <ActionBtn
                            icon={MdDelete}
                            onClick={() => {
                                handleDeleteStock(params.row.id, params.row.images);
                            }}
                        /> */}
            <ActionBtn
              icon={MdRemoveRedEye}
              onClick={() => {
                router.push(`/user/${params.row.id}`);
              }}
            />
          </div>
        );
      },
    },
  ];

  //this is to change the status from either in stock or out of stock
  const handleUserBan = useCallback((userId: string) => {
    axios
      .put(
        `${BASE_URL}/user/block/${userId}`,
        {},
        {
          headers: {
            Authorization: userToken,
          },
        }
      )
      .then((res) => {
        toast.success("UserBanned");
        fetchUsers();
        router.refresh();
      })
      .catch((error) => {
        toast.error("Something went wrong");
        console.log(error, "error");
      });
  }, []);

  //this is to delete stock
  // const handleDeleteStock = useCallback(async (id: string, images: any[]) => {
  //     toast("Deleting product, please wait!...");
  //     const handleImageDelete = async () => {
  //         try {
  //             for (const item of images) {
  //                 if (item.image) {
  //                     const imageRef = ref(storage, item.image);
  //                     await deleteObject(imageRef);
  //                     console.log("Image deleted", item.image);
  //                 }
  //             }
  //         } catch (error) {
  //             return console.log("Deleting images error", error);
  //         }
  //     };

  //     axios
  //         .delete(`https://store-api-pyo1.onrender.com/product/delete/${id}`, {
  //             headers: {
  //                 'Authorization': userToken
  //             }
  //         })
  //         .then((res) => {
  //             toast.success("Product deleted");
  //             router.refresh();
  //         })
  //         .catch((error) => {
  //             toast.error("Failed to delete product!");
  //             console.log(error, "error");
  //         });
  //     await handleImageDelete();

  // }, []);

  if (loadings) {
    return <Loading />; // You can replace this with a loading spinner or any loading UI
  }

  if (errors) {
    return <div>Error loading users. Please try again.</div>;
  }

  if (!isAdmin) {
    return <NullData title="Oops access denied" />;
  }

  return (
    <div className="max-w-[1150px] m-auto text-xl">
      <div className="mb-4 mt-8">
        <Heading title="Manage Users" center />
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

export default ManageUsersClient;
