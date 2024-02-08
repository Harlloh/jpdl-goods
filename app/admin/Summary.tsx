"use client";
import { useEffect, useState } from "react";
import Heading from "../components/Heading";
import { formatPrice } from "../utils/formatPrice";
import { formatNumber } from "../utils/formatNumber";
import { wishProductType } from "../wishlist/ItemContent";
import useGetProducts from "@/hooks/useGetProducts";
import useGetAllOrders from "@/hooks/getOrders";
import useGetAllUsers from "@/hooks/useGetAllUser";
import useGetAllStats from "@/hooks/useGetAllStats";

type SummaryDataType = {
  [key: string]: {
    label: string;
    digit: number;
  };
};
interface EndpointResponse {
  totalSales: number;
  totalProducts: number;
  inStockProduct: number;
  outOfStockProducts: number;
  totalOrders: number;
  totalUsers: number;
}

const Summary = () => {
  const { productss, loading, error, fetchProducts } = useGetProducts();
  const { orders } = useGetAllOrders();
  const { orderStat } = useGetAllStats();
  const { users, loadings, errors, fetchUsers } = useGetAllUsers();
  const [orderStatistics, setOrderStats] =
    useState<EndpointResponse>(orderStat);
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

  const isLoading = loading || loadings;

  // useEffect(() => {
  //   setSummaryData((prev) => {
  //     let tempData = { ...prev };
  //     const totalSale = orders.reduce((accumulator, item: any) => {
  //       if (item.status === "complete") {
  //         return accumulator + item.amount;
  //       } else return accumulator;
  //     }, 0);

  //     const paidOrders = orders.filter((order: any) => {
  //       return order.status === "complete";
  //     });

  //     const unPaidOrders = orders.filter((order: any) => {
  //       return order.status === "pending";
  //     });
  //     const totalProducts = productss.length;
  //     const inStockProducts = productss.filter(
  //       (product: any) => product.inStock
  //     ).length;
  //     const outOfStockProducts = totalProducts - inStockProducts;

  //     tempData.sale.digit = totalSale;
  //     tempData.orders.digit = orders.length;
  //     tempData.paidOrders.digit = paidOrders.length;
  //     tempData.unPaidOrders.digit = unPaidOrders.length;
  //     tempData.products.digit = productss.length;
  //     tempData.inStockProducts.digit = inStockProducts;
  //     tempData.outOfStockProducts.digit = outOfStockProducts;
  //     tempData.users.digit = users.length;

  //     return tempData;
  //   });
  //   console.log(orderStat, orderStat);
  // }, [orders, productss, users, orderStat]);

  useEffect(() => {
    if (orderStat) {
      setSummaryData({
        sale: {
          label: "Total Sale",
          digit: orderStat.totalSales || 0,
        },
        products: {
          label: "Total Products",
          digit: orderStat.totalProducts || 0,
        },
        inStockProducts: {
          label: "In Stock",
          digit: orderStat.inStockProduct || 0,
        },
        outOfStockProducts: {
          label: "Out of Stock",
          digit: orderStat.outOfStockProducts || 0,
        },
        orders: {
          label: "Total Orders",
          digit: orderStat.totalOrders || 0,
        },
        users: {
          label: "Total Users",
          digit: orderStat.totalUsers || 0,
        },
      });
    }
    console.log(summaryData, ">>>>>>>");
  }, [orderStat]);
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
