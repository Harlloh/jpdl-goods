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
import Loading from "@/app/components/Loading";
interface ManageProductClientProps {
  products: any[];
}

const ManageProductClient = () => {

    const { productss, loading, error,fetchProducts } = useGetProducts();







    const userToken = localStorage.getItem('user')
    const storedisAdmin = (localStorage.getItem('isAdmin'))
    const isAdmin = storedisAdmin ? atob(storedisAdmin) : null
  
    const router = useRouter();
    const storage = getStorage(firebaseApp);
    let rows: any = [];
    if (productss) {
        rows = productss.map((product: any) => {
          return {
            id: product.id,  // Use the appropriate property as the unique identifier
            name: product.name,
            price: formatPrice(product.price),
            category: product.category,
            brand: product.brand,
            inStock: product.inStock,
            images: product.images,
          };
        });
      }
    const columns: GridColDef[] = [
        { field: "id", headerName: "ID", width: 220 },
        { field: "name", headerName: "Name", width: 220 },
        {
            field: "price",
            headerName: "Price(USD)",
            width: 100,
            renderCell: (params) => {
                return <div style={{ fontWeight: "bold" }}>{params.row.price}</div>;
            },
        },
        { field: "category", headerName: "Category", width: 100 },
        { field: "brand", headerName: "Brand", width: 100 },
        {
            field: "inStock",
            headerName: "InStock",
            width: 100,
            renderCell: (params) => {
                return (
                    <div className="text-center items-center flex ">
                        {params.row.inStock === true ? (
                            <Status
                                text="in stock"
                                icon={MdDone}
                                bg="bg-teal-200"
                                color="text-teal-700"
                            />
                        ) : (
                            <Status
                                text="out of stock"
                                icon={MdClose}
                                bg="bg-rose-200"
                                color="text-rose-700"
                            />
                        )}
                    </div>
                );
            },
        },
        {
            field: "action",
            headerName: "Actions",
            width: 100,
            renderCell: (params) => {
                return (
                    <div className="flex justify-between gap-3 w-full">
                        <ActionBtn
                            icon={MdCached}
                            onClick={() => {
                                handleToggleStock(params.row.id, params.row.inStock);
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
    const handleToggleStock = useCallback((id: string, inStock: boolean) => {
        axios
            .put(
                `https://store-api-pyo1.onrender.com/product/instock/${id}?inStock=${!inStock}`,
                null,  // pass null as the request body if not sending any data
                {
                    headers: {
                        'Authorization': userToken
                    }
                }
            )
            .then((res) => {
                toast.success("Product status changed");
                fetchProducts();  // Assuming fetchProducts is a function you have defined to fetch products
                router.refresh();
            })
            .catch((error) => {
                toast.error("Something went wrong");
                console.log(error, "error");
            });
    }, [userToken, fetchProducts, router]);
    




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
        await handleImageDelete();

        axios
            .delete(`https://store-api-pyo1.onrender.com/product/delete/${id}`,{
                headers:{
                    'Authorization':userToken
                }
            })
            .then((res) => {
                toast.success("Product deleted");
                fetchProducts()
                router.refresh();
            })
            .catch((error) => {
                toast.error("Failed to delete product!");
                console.log(error, "error");
            });
    }, []);


    if (loading) {
        return <Loading/>; 
      }
    
      if (error) {
        return <div>Error loading products. Please try again.</div>;
      }
    


    if (!isAdmin) {
      return <NullData title="Oops access denied" />;
    }


    return (
        <div className="max-w-[1150px] m-auto text-xl">
            <div className="mb-4 mt-8">
                <Heading title="Manage Product" center />
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

export default ManageProductClient;