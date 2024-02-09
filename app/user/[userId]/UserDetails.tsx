// Import necessary modules and components
import React from "react";
import Heading from "@/app/components/Heading";
import Status from "@/app/components/Status";
import { formatPrice } from "@/app/utils/formatPrice";
import moment from "moment";
import { MdAccessTime, MdDeliveryDining, MdDone } from "react-icons/md";
// import OrderItem from "@/path-to-OrderItem"; // Replace with the correct path to OrderItem component
import { useRouter } from "next/navigation";
import OrderItem from "@/app/userOrder/[orderId]/OrderItem";
import OrderItemDetail from "@/app/userOrder/[orderId]/OrderItemDetails";
import OrderFavDetail from "@/app/userOrder/[orderId]/OrderFavDetail";
import NullData from "@/app/components/NullData";
interface UserDetailsProps {
  order: any; // Assuming order is the correct prop name
}

const UserDetails: React.FC<UserDetailsProps> = ({ order }) => {
  const router = useRouter(); // Add this line to import useRouter
  console.log(order);
  return (
    <div className="max-w-[1150px] m-auto flex flex-col gap-2 ">
      <div className="mt-8">
        <Heading title="User Details" />
      </div>
      {/* <div>User Id: {order.id}</div> */}
      {/* <div>
        Total Amount spent:{" "}
        <span className="font-bold">{formatPrice(order.amount)}</span>
      </div> */}
      <div className="flex gap-2 items-center">
        <div>Name:</div>
        {order.profile.first_name + " " + order.profile.last_name}
      </div>
      <div className="flex gap-2 items-center">
        <div>Email:</div>
        {order.profile.email}
      </div>
      {/* <div className="flex gap-2 items-center">
        <div>Delivery Status:</div>
        <div>
          {order.deliveryStatus === "pending" ? (
            <Status
              text="pending"
              icon={MdAccessTime}
              bg="bg-slate-200"
              color="text-slate-700"
            />
          ) : order.deliveryStatus === "dispatched" ? (
            <Status
              text="Dispatched"
              icon={MdDeliveryDining}
              bg="bg-purple-200"
              color="text-purple-700"
            />
          ) : order.deliveryStatus === "delivered" ? (
            <Status
              text="Delivered"
              icon={MdDone}
              bg="bg-green-200"
              color="text-green-700"
            />
          ) : (
            <></>
          )}
        </div>
      </div> */}
      <div>Account Created: {moment(order.createdDate).fromNow()}</div>
      <div>
        <h2 className="font-semibold mt-4 mb-2">WishList</h2>
        <div className="grid grid-cols-6 text-xs gap-4 pb-2 items-center">
          <div className="col-span-2 justify-self-start">PRODUCTS</div>
          <div className=" justify-self-center">NAME</div>
          <div className=" justify-self-end">CATEGORY</div>
          <div className=" justify-self-end">BRAND</div>
          <div className=" justify-self-center">PRICE</div>
        </div>
        {order.favourites.length > 0 ? (
          order.favourites.map((item: any) => {
            return <OrderFavDetail key={item.id} item={item}></OrderFavDetail>;
          })
        ) : (
          <NullData title="No Favourites" />
        )}
      </div>
      <div>
        <h2 className="font-semibold mt-4 mb-2">Product ordered</h2>
        <div className="grid grid-cols-6 text-xs gap-4 pb-2 items-center">
          <div className="col-span-2 justify-self-start">PRODUCTS</div>
          <div className=" justify-self-center">Delivery Status</div>
          <div className=" justify-self-center">PRICE</div>
          <div className=" justify-self-center">QTY</div>
          <div className=" justify-self-end">TOTAL</div>
        </div>
        {order.orders.length > 0 ? (
          order.orders.map((item: any) => {
            return (
              <OrderItemDetail key={item.id} item={item}></OrderItemDetail>
            );
          })
        ) : (
          <NullData title="No Product ordered yet" />
        )}
      </div>
    </div>
  );
};

export default UserDetails;
