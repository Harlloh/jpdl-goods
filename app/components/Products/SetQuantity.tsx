"use client";
import React from "react";
import { cartProductType } from "../../product/[productId]/ProductDetails";
interface setQtyPropsTypes {
  cartCounter?: boolean;
  cartProduct: cartProductType;
  handleQuantityIncrease: () => void;
  handleQuantityDecrease: () => void;
}

const SetQuantity: React.FC<setQtyPropsTypes> = ({
  cartProduct,
  cartCounter,
  handleQuantityDecrease,
  handleQuantityIncrease,
}) => {
  const btnStyles = "border-[1.2px] border-slate-300 px-2 rounded";
  return (
    <div className="flex gap-8 items-center">
      {cartCounter ? null : <div className="font-semibold ">QUANTITY:</div>}
      <div className="flex gap-4 items-center text-base">
        <button className={btnStyles} onClick={handleQuantityDecrease}>
          -
        </button>
        <div>{cartProduct.quantity}</div>
        <button className={btnStyles} onClick={handleQuantityIncrease}>
          +
        </button>
      </div>
    </div>
  );
};

export default SetQuantity;
