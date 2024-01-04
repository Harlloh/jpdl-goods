"use client";
import { CartContextProvider } from "@/hooks/useCartHook";
import React from "react";
interface CartProviderProp {
  children: React.ReactNode;
}

const CartProvider: React.FC<CartProviderProp> = ({ children }) => {
  return (
    <div>
      <CartContextProvider>{children}</CartContextProvider>
    </div>
  );
};

export default CartProvider;
