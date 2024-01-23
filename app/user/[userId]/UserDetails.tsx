// Import necessary modules and components
import React from "react";
import Heading from "@/app/components/Heading";
import Status from "@/app/components/Status";
import { formatPrice } from "@/app/utils/formatPrice";
import moment from "moment";
import { MdAccessTime, MdDeliveryDining, MdDone } from "react-icons/md";
// import OrderItem from "@/path-to-OrderItem"; // Replace with the correct path to OrderItem component
import { useRouter } from "next/navigation";
interface UserDetailsProps {
    order: any; // Assuming order is the correct prop name
  }
  
  const UserDetails: React.FC<UserDetailsProps> = ({ order }) => {
    const router = useRouter(); // Add this line to import useRouter
    console.log(order)
    return (
      <div className="max-w-[1150px] m-auto flex flex-col gap-2 ">
        <div className="mt-8">
          <Heading title="User Details" />
        </div>
        <div>User Id: {order.id}</div>
        <div>
          Total Amount spent:{" "}
          <span className="font-bold">{formatPrice(order.amount)}</span>
        </div>
        <div className="flex gap-2 items-center">
          <div>Name:</div>
            {order.profile.first_name + ' ' + order.profile.last_name}
        </div>
        <div className="flex gap-2 items-center">
          <div>Email:</div>
            {order.profile.email}
        </div>
        <div className="flex gap-2 items-center">
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
        </div>
        <div>Date Created: {moment(order.createdDate).fromNow()}</div>
        <div>
          <h2 className="font-semibold mt-4 mb-2">Product ordered</h2>
          <div className="grid grid-cols-5 text-xs gap-4 pb-2 items-center">
            <div className="col-span-2 justify-self-start">PRODUCTS</div>
            <div className=" justify-self-center">PRICE</div>
            <div className=" justify-self-center">QTY</div>
            <div className=" justify-self-end">TOTAL</div>
          </div>
          {/* {order.products &&
            order.products.map((item: any) => {
              return <OrderItem key={item.id} item={item}></OrderItem>;
            })} */}
        </div>
      </div>
    );
  };
  
  export default UserDetails;
  