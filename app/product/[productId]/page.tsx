"use client";
import React, { useEffect, useState } from "react";
import ProductDetails from "./ProductDetails";
import Container from "@/app/components/Container";
import ListRating from "./ListRating";
import { products } from "../../utils/Product";
import useGetProducts from "@/hooks/useGetProducts";
import Loading from "@/app/components/Loading";
import AddRating from "./AddRating";
import axios from "axios";
import { useCart } from "@/hooks/useCartHook";
import reviews from "./reviews";
import { useRouter } from "next/navigation";
interface IParams {
  productId?: string;
}

function Product({ params }: { params: IParams }) {
  const { productss, loading, error } = useGetProducts();
  const [deliveryStatus, setDeliveryStatus] = useState(false);
  const userToken = localStorage.getItem("user");
  const { userOrders } = useCart();
  const router = useRouter();

  useEffect(() => {
    const orderedProduct = userOrders?.find((order: any) => {
      return order?.orderDetails.find((product: any) => {
        return product.id === params.productId;
      });
    });
    if (orderedProduct?.delivery_status === "Package Delivered") {
      setDeliveryStatus(true);
    }

    console.log(orderedProduct, ">>>>>>>>>");
  }, [params.productId, userOrders]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }
  const product = (productss as any)?.find((item: any) => {
    return item.id === params.productId;
  });
  console.log(product, ">.");

  const shortReview =
    product?.reviews?.length > 3
      ? product?.reviews.slice(0, 3)
      : product?.reviews;

  return (
    <Container>
      <div>
        <ProductDetails products={product} />
        <div className="flex flex-col gap-4 mt-20">
          <div>RATING</div>
          <div>
            {deliveryStatus && <AddRating product={product} />}

            <ListRating product={shortReview} />
            {product?.reviews?.length > 3 && (
              <button onClick={() => router.push(`/reviews/${product.id}`)}>
                see more
              </button>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Product;
