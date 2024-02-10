"use client";
import { useRouter } from "next/navigation";
import Button from "../components/Button";
import NullData from "../components/NullData";
import Container from "../components/Container";
import { FaCheckCircle } from "react-icons/fa";
import { useCart } from "@/hooks/useCartHook";
import { useEffect } from "react";
import { getToken } from "@/api/auth/apis";

const CheckoutSuccess = () => {
  const { handleClearCart } = useCart();
  const token = getToken();
  useEffect(() => {
    handleClearCart(token);
  }, []);
  const router = useRouter();
  return (
    <Container>
      <div
        className="w-25 flex justify-between items-center flex-col m-auto mt-11 gap-2"
        style={{ width: "25%" }}
      >
        <FaCheckCircle color="teal" size={250} />
        <h1>Order placed succesfully</h1>
        <Button
          lable="view your order"
          handleClick={() => router.push("/your-order")}
        />
      </div>
    </Container>
  );
};
export default CheckoutSuccess;
