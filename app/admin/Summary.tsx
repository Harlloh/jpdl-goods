'use client'
import { useEffect, useState } from "react";
import Heading from "../components/Heading";
import { formatPrice } from "../utils/formatPrice";
import { formatNumber } from "../utils/formatNumber";
import { wishProductType } from "../wishlist/ItemContent";
import useGetProducts from "@/hooks/useGetProducts";
import { getOrders } from "@/hooks/getOrders";
import useGetAllUsers from "@/hooks/useGetAllUser";

type SummaryDataType = {
  [key: string]: {
    label: string;
    digit: number;
  };
};

const Summary = () => {
  const { productss, loading, error, fetchProducts } = useGetProducts();
  const orders = getOrders();
  const { users, loadings, errors, fetchUsers } = useGetAllUsers();

  const isLoading = loading || loadings;

  useEffect(() => {
    if (!isLoading) {
      
          setSummaryData((prev) => {
            let tempData = { ...prev };
            const totalSale = orders.reduce((accumulator, item) => {
              if (item.status === "complete") {
                return accumulator + item.amount;
              } else return accumulator;
            }, 0);

            const paidOrders = orders.filter((order) => {
              return order.status === "complete";
            });

            const unPaidOrders = orders.filter((order) => {
              return order.status === "pending";
            });
            const totalProducts = productss.length;
            const inStockProducts = productss.filter((product:any) => product.inStock).length;
            const outOfStockProducts = totalProducts - inStockProducts;


            tempData.sale.digit = totalSale;
            tempData.orders.digit = orders.length;
            tempData.paidOrders.digit = paidOrders.length;
            tempData.unPaidOrders.digit = unPaidOrders.length;
            tempData.products.digit = productss.length;
            tempData.inStockProducts.digit = inStockProducts;
            tempData.outOfStockProducts.digit = outOfStockProducts;
            tempData.users.digit = users.length;

            return tempData;
          });
       
    }
  }, [fetchProducts, fetchUsers, isLoading, orders, productss, users]);

  const [summaryData, setSummaryData] = useState<SummaryDataType>({
    sale: {
      label: "Total Sale",
      digit: 0,
    },
    products: {
      label: "Total Products",
      digit: 0,
    },
    inStockProducts: {
      label: "In Stock",
      digit: 0,
    },
    outOfStockProducts: {
      label: "Out of Stock",
      digit: 0,
    },
    orders: {
      label: "Total Orders",
      digit: 0,
    },
    paidOrders: {
      label: "Paid Orders",
      digit: 0,
    },
    unPaidOrders: {
      label: "Unpaid Orders",
      digit: 0,
    },
    users: {
      label: "Total Users",
      digit: 0,
    },
  });

  const summaryKeys = Object.keys(summaryData);
  return (
    <div className="max-w-[1150px] m-auto">
      <div className="mb-4 mt-8">
        <Heading title="Stats" center />
      </div>
      <div className="grid grid-cols-2 gap-3 max-h-50vh overflow-y-auto">
        {summaryKeys &&
          summaryKeys.map((key) => (
            <div
              key={key}
              className="rounded-xl border-2 p-4 flex flex-col items-center gap-2 transition"
            >
              <div className="text-xl md:text-4xl font-bold">
                {summaryData[key].label === "Total Sale" ? (
                  <>{formatPrice(summaryData[key].digit)}</>
                ) : (
                  <>{formatNumber(summaryData[key].digit)}</>
                )}
              </div>
              <div>{summaryData[key].label}</div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Summary;
