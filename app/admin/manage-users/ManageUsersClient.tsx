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
interface ManageProductClientProps {
  products: any[];
}

const ManageUsersClient = () => {

    // const { productss, loading, error } = useGetProducts();
    const { users, loadings, errors } = useGetAllUsers();
     console.log(users,'usersssssssssss')







    const userToken = localStorage.getItem('user')
    const storedisAdmin = (localStorage.getItem('isAdmin'))
    const isAdmin = storedisAdmin ? atob(storedisAdmin) : null
  
    const router = useRouter();
    const storage = getStorage(firebaseApp);
    let rows: any = [];
    if (users) {
        rows = users.map((product: any) => {
          return {
            id: product.id,  // Use the appropriate property as the unique identifier
            name: product.profile.first_name +" "+ product.profile.last_name,
            email: product.profile.email,
            // price: formatPrice(product.price),
            // category: product.category,
            isAdmin: product.isAdmin,

            // inStock: product.inStock,
            images: product.images,
          };
        });
      }
    const columns: GridColDef[] = [
        { field: "id", headerName: "ID", width: 220 },
        { field: "name", headerName: "Name", width: 220 },
        // {
        //     field: "price",
        //     headerName: "Price(USD)",
        //     width: 100,
        //     renderCell: (params) => {
        //         return <div style={{ fontWeight: "bold" }}>{params.row.price}</div>;
        //     },
        // },
        // { field: "category", headerName: "Category", width: 100 },
        { field: "isAdmin", headerName: "Admin", width: 100 },

        { field: "email", headerName: "Email", width: 100 },
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
                                handleUserBan(params.row.id, params.row.inStock);
                            }}
                        />
                        <ActionBtn
                            icon={MdDelete}
                            onClick={() => {
                                handleDeleteStock(params.row.id, params.row.images);
                            }}
                        />
                        <ActionBtn
                            icon={MdRemoveRedEye}
                            onClick={() => {
                                router.push(`/product/${params.row.id}`);
                            }}
                        />
                    </div>
                );
            },
        },
    ];

    //this is to change the status from either in stock or out of stock
    const handleUserBan = useCallback((id: string, inStock: boolean) => {
        axios
            .put("/api/product", { id, inStock: !inStock })
            .then((res) => {
                toast.success("UserBanned");
                
                router.refresh();
            })
            .catch((error) => {
                toast.error("Something went wrong");
                console.log(error, "error");
            });
    }, []);

    //this is to delete stock
    const handleDeleteStock = useCallback(async (id: string, images: any[]) => {
        toast("Deleting product, please wait!...");
        const handleImageDelete = async () => {
            try {
                for (const item of images) {
                    if (item.image) {
                        const imageRef = ref(storage, item.image);
                        await deleteObject(imageRef);
                        console.log("Image deleted", item.image);
                    }
                }
            } catch (error) {
                return console.log("Deleting images error", error);
            }
        };

        axios
            .delete(`https://store-api-pyo1.onrender.com/product/delete/${id}`,{
                headers:{
                    'Authorization': userToken
                }
            })
            .then((res) => {
                toast.success("Product deleted");
                router.refresh();
            })
            .catch((error) => {
                toast.error("Failed to delete product!");
                console.log(error, "error");
            });
        await handleImageDelete();

    }, []);


    if (loadings) {
        return <div className="flex items-center justify-center h-screen">
        <div className="relative">
            <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-200"></div>
            <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-teal-500 animate-spin">
            </div>
        </div>
    </div>; // You can replace this with a loading spinner or any loading UI
      }
    
      if (errors) {
        return <div>Error loading products. Please try again.</div>;
      }
    


    if (!isAdmin) {
      return <NullData title="Oops access denied" />;
    }


    return (
        <div className="max-w-[1150px] m-auto text-xl">
            <div className="mb-4 mt-8">
                <Heading title="Manage Users" center />
            </div>
            <div style={{ height: 600, width: "100%" }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
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