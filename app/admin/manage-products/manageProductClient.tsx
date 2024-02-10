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
  MdEdit,
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
import { BASE_URL, getIsAdmin, getToken } from "@/api/auth/apis";
import { FaEye, FaToggleOff, FaToggleOn } from "react-icons/fa";
interface ManageProductClientProps {
  products: any[];
}

const ManageProductClient = () => {
  const { productss, loading, error, fetchProducts } = useGetProducts();
  const [searchTerm, setSearchTerm] = useState("");

  const userToken = getToken();
  const storedisAdmin = getIsAdmin();
  const isAdmin = storedisAdmin ? atob(storedisAdmin) : null;

  const filteredRows = productss?.filter((product: any) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  console.log(productss);

  const router = useRouter();
  const storage = getStorage(firebaseApp);
  let rows: any = [];
  if (filteredRows) {
    rows = filteredRows.map((product: any, index) => {
      console.log(product);

      return {
        id: product.id,
        sn: index + 1, // Use the appropriate property as the unique identifier
        name: product.name,
        price: product.price,
        category: product.category,
        brand: product.brand,
        inStock: product.inStock,
        images: product.images,
        subscribeable: product.isSubscribe,
        subscribeButton: product.isSubscribe,
      };
    });
  }

  const columns: GridColDef[] = [
    // { field: "sn", headerName: "S/N", width: 70 },
    {
      field: "images",
      headerName: "Images",
      width: 170,
      renderCell: (params) => {
        return <img src={params.row.images[0]?.image} alt="" />;
      },
    },
    { field: "name", headerName: "Name", width: 220 },
    {
      field: "subscribeable",
      headerName: "Subscribeable",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="text-center items-center flex ">
            {params.row.subscribeable === true ? (
              <Status
                text="SubscribeAble"
                icon={MdDone}
                bg="bg-teal-200"
                color="text-teal-700"
              />
            ) : (
              <Status
                text="UnsubscribAable"
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
      field: "price",
      headerName: "Price(USD)",
      width: 100,
      renderCell: (params) => {
        return (
          <div style={{ fontWeight: "bold" }}>
            {formatPrice(params.row.price)}
          </div>
        );
      },
    },
    { field: "category", headerName: "Category", width: 100 },
    { field: "brand", headerName: "Brand", width: 100 },
    {
      field: "inStock",
      headerName: "InStock",
      width: 130,
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
      width: 150,
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
            {/* <ActionBtn
              icon={MdEdit}
              onClick={() => {
                router.push(`/admin/edit/${params.row.id}`);
              }}
            /> */}
            {/* {params.row.subscribeable !== true ? (
              <ActionBtn
                icon={FaToggleOn}
                onClick={() => handleIsSubscribe(params.row.id)}
              />
            ) : (
              <ActionBtn
                icon={FaToggleOff}
                onClick={() => handleIsSubscribe(params.row.id)}
              />
            )} */}
          </div>
        );
      },
    },
    {
      field: "subscribeButton",
      headerName: "Toggle Subscription",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="flex justify-center gap-3 w-full">
            {params.row.subscribeable !== true ? (
              <ActionBtn
                icon={FaToggleOn}
                onClick={() => handleIsSubscribe(params.row.id)}
              />
            ) : (
              <ActionBtn
                icon={FaToggleOff}
                onClick={() => handleNotSubscribe()}
              />
            )}
          </div>
        );
      },
    },
  ];

  //this is to change the status from either in stock or out of stock
  const handleIsSubscribe = useCallback(
    (id: string) => {
      axios
        .put(
          `${BASE_URL}/product/subscription/add/${id}`,
          null, // pass null as the request body if not sending any data
          {
            headers: {
              Authorization: userToken,
            },
          }
        )
        .then((res) => {
          console.log(res);
          toast.success(res.data.message);
          fetchProducts(); // Assuming fetchProducts is a function you have defined to fetch products
          router.refresh();
        })
        .catch((error) => {
          toast.error(error.response.data.message);
          console.log(error, "error");
        });
    },
    [userToken, fetchProducts, router]
  );

  const handleNotSubscribe = () => {
    toast("Product Subscription cannot be turned off");
  };

  //this is to change the status from either in stock or out of stock
  const handleToggleStock = useCallback(
    (id: string, inStock: boolean) => {
      axios
        .put(
          `${BASE_URL}/product/instock/${id}?inStock=${!inStock}`,
          null, // pass null as the request body if not sending any data
          {
            headers: {
              Authorization: userToken,
            },
          }
        )
        .then((res) => {
          console.log(res);
          toast.success(res.data.message);
          fetchProducts(); // Assuming fetchProducts is a function you have defined to fetch products
          router.refresh();
        })
        .catch((error) => {
          toast.error(error.response.data.message);
          console.log(error, "error");
        });
    },
    [userToken, fetchProducts, router]
  );

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
      .delete(`${BASE_URL}/product/delete/${id}`, {
        headers: {
          Authorization: userToken,
        },
      })
      .then((res) => {
        toast.success(res.data.message);
        fetchProducts();
        router.refresh();
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        console.log(error, "error");
      });
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <NullData title="Error loading products. Please try again" />;
  }

  if (!isAdmin) {
    return <NullData title="Oops access denied" />;
  }

  const handleInputChange = (e: any) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="max-w-[1150px] m-auto text-xl">
      <div className="mb-4 mt-8">
        <Heading title="Manage Product" center />
      </div>
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="search for a product..."
        className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-half p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
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

export default ManageProductClient;
