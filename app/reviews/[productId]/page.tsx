"use client";
import ListRating from "@/app/product/[productId]/ListRating";
import useGetProducts from "@/hooks/useGetProducts";

interface IParams {
  productId?: string;
}

function Reviews({ params }: { params: IParams }) {
  const { productss, loading, error } = useGetProducts();

  const product = (productss as any)?.find((item: any) => {
    return item.id === params.productId;
  });
  console.log(product);
  return (
    <div>
      <p>Ratings</p>
      {product !== undefined && <ListRating product={product?.reviews} />}
    </div>
  );
}
export default Reviews;
