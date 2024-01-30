"use client"
import { useCart } from "@/hooks/useCartHook";
import OrderItem from "../order/[orderId]/OrderItem";

const Orders = ()=>{
    const {userOrders} = useCart()
    console.log(userOrders)
    return (
        <div>
            <div>
        <h2 className="font-semibold mt-4 mb-2">Products ordered</h2>
        <div className="grid grid-cols-5 text-xs gap-4 pb-2 items-center">
          <div className="col-span-2 justify-self-start">PRODUCTS</div>
          <div className=" justify-self-center">PRICE</div>
          <div className=" justify-self-center">QTY</div>
          <div className=" justify-self-end">TOTAL</div>
        </div>
        {userOrders &&
          userOrders.map((item: any) => {
            return <OrderItem key={item.id} item={item}></OrderItem>;
          })}
      </div>
        </div>
    )
}
export default Orders