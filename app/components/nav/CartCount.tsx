"use client";
import { useCart } from "@/hooks/useCartHook";
import { useRouter } from "next/navigation";
import { FaShoppingBag, FaShoppingCart } from "react-icons/fa";
import { CiShoppingCart } from "react-icons/ci";

function CartCount() {
  const { cartTotalQty, cartTotalAmount } = useCart();
  console.log(cartTotalQty, cartTotalAmount);
  const router = useRouter();
  return (
    <div
      className="cursor-pointer relative"
      onClick={() => router.push("/cart")}
    >
      <div className="text-3xl">
        <CiShoppingCart />
      </div>
      <span className="absolute top-[-10px] right-[-10px] bg-slate-700 text-white h-6 w-6 rounded-full flex items-center justify-center text-sm">
        {cartTotalQty}
      </span>
    </div>
  );
}

export default CartCount;
