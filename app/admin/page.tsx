import React from "react";
import Summary from "./Summary";
import Container from "../components/Container";
import useGetProducts from "@/hooks/useGetProducts";
import useGetAllUsers from "@/hooks/useGetAllUser";

async function page() {
  // const products = await getProducts({ category: null });

  return (
    <div className="pt-8">
      <Container>
        <Summary />
        <div className="mt-4 mx-auto max-w-[1150px]">{/* <BarGraph  /> */}</div>
      </Container>
    </div>
  );
}

export default page;
