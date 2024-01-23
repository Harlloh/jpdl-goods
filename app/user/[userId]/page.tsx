'use client'
import React from "react";
import Container from "@/app/components/Container";
import { products } from "../../utils/Product";
import useGetProducts from "@/hooks/useGetProducts";
import UserDetails from "./UserDetails";
import useGetAllUsers from "@/hooks/useGetAllUser";
interface IParams {
  productId?: string;
}

function Users({ params }: { params: IParams }) {
  const { users, loadings, errors,fetchUsers } = useGetAllUsers();

  if (loadings) {
    return <div className="flex items-center justify-center h-screen">
    <div className="relative">
        <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-200"></div>
        <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-teal-500 animate-spin">
        </div>
    </div>
</div>; // You can replace this with a loading spinner or any loading UI
  }

  if (errors) {
    return <p>Error: {errors}</p>;
  }
  const user = users.find((item) =>{
    return item.id === params.userId});
  return (
    <Container>
      <div>
        <UserDetails order={user} />
      </div>
    </Container>
  );
}

export default Users;
