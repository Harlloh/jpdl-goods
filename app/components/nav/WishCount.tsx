"use client";
import { useCart } from "@/hooks/useCartHook";
import { useRouter } from "next/navigation";
import { FaHeart, FaShoppingBag, FaShoppingCart } from "react-icons/fa";
import { CiHeart, CiShoppingCart } from "react-icons/ci";

function WishCount() {
  const { wishTotalQty, wishProducts } = useCart();
  console.log(wishTotalQty);

  const router = useRouter();
  const wishCount = wishProducts?.length ?? 0;
  console.log(wishCount, "wishCount");
  return (
    <div
      className="cursor-pointer relative"
      onClick={() => router.push("/wishlist")}
    >
      <div className="text-3xl">
        <CiHeart />
      </div>
      <span className="absolute top-[-10px] right-[-10px] bg-red-700 text-white h-6 w-6 rounded-full flex items-center justify-center text-sm">
        {wishCount}
      </span>
    </div>
  );
}

export default WishCount;
