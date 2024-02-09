"use client";
import React from "react";
import Container from "@/app/components/Container";
import { products } from "../../utils/Product";
import useGetProducts from "@/hooks/useGetProducts";
import UserDetails from "./UserDetails";
import useGetAllUsers from "@/hooks/useGetAllUser";
import NullData from "@/app/components/NullData";
interface IParams {
  userId?: string;
}

function Users({ params }: { params: IParams }) {
  const { users, loadings, errors, fetchUsers } = useGetAllUsers();

  if (loadings) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="relative">
          <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-200"></div>
          <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-teal-500 animate-spin"></div>
        </div>
      </div>
    ); // You can replace this with a loading spinner or any loading UI
  }

  if (errors) {
    return <NullData title="Error" />;
  }
  const user = users.find((item: any) => {
    return item.id === params.userId;
  });

  console.log(user, ">>>>", users);
  return (
    <Container>
      <div>
        <UserDetails order={user} />
      </div>
    </Container>
  );
}

export default Users;
