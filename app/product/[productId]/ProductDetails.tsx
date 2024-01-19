"use client";
import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { Rating } from "@mui/material";
import SetColor from "@/app/components/Products/Color";
import SetQuantity from "@/app/components/Products/SetQuantity";
import Button from "@/app/components/Button";
import { FaArrowLeft, FaCartPlus, FaCheckCircle } from "react-icons/fa";
import ProductImage from "@/app/components/Products/ProductImage";
import { useCart } from "@/hooks/useCartHook";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { truncateText } from "@/app/utils/TruncateText";
import { formatPrice } from "@/app/utils/formatPrice";

interface ProductParams {
  products: any;
}

export type cartProductType = {
  id: string;
  name: string;
  description: string;
  category: string;
  brand: string;
  selectedImage: selectedImg;
  quantity: number;
  price: number;
};

export type selectedImg = {
  color: string;
  colorCode: string;
  image: string;
};

const Horizontal = () => {
  return <hr className="w-30% my-3" />;
};

const ProductDetails: React.FC<ProductParams> = ({ products }) => {
  const router = useRouter();
  const { handleAddProductToCart, cartProducts } = useCart();
  const [isProductInCart, setIsProductInCart] = useState(false);
  const productRating = products.reviews.length;

  const [cartProduct, setCartProduct] = useState<cartProductType>({
    id: products.id,
    name: products.name,
    description: products.description,
    category: products.category,
    brand: products.brand,
    selectedImage: { ...products.images[0] },
    quantity: 1,
    price: products.price,
  });

  console.log(cartProducts);

  const handleColorSelect = useCallback(
    (value: selectedImg) => {
      setCartProduct((prev) => {
        return {
          ...prev,
          selectedImage: value,
        };
      });
    },
    [cartProduct.selectedImage]
  );

  const handleQuantityDecrease = useCallback(() => {
    if (cartProduct.quantity === 1) {
      return;
    }
    setCartProduct((prev) => {
      return {
        ...prev,
        quantity: prev.quantity - 1,
      };
    });
  }, [cartProduct]);

  const handleQuantityIncrease = useCallback(() => {
    if (cartProduct.quantity === 99) {
      return;
    }
    setCartProduct((prev) => {
      return {
        ...prev,
        quantity: prev.quantity + 1,
      };
    });
  }, [cartProduct]);

  //to check if the product is in the cart on first render
  useEffect(() => {
    setIsProductInCart(false);
    if (cartProducts) {
      const existingIndex = cartProducts.findIndex(
        (item) => item.id === products.id
      );
      if (existingIndex > -1) {
        setIsProductInCart(true);
      }
    }
  }, [cartProducts]);

  useEffect(() => {
    setIsProductInCart(false);
    if (cartProducts) {
      const existingProductIndex = cartProducts.findIndex(
        (item) => item.id === products.id
      );
      if (existingProductIndex > -1) {
        setIsProductInCart(true);
      }
    }
  }, [cartProducts]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 py-6">
      <ProductImage
        cartProduct={cartProduct}
        product={products}
        handleColorSelect={handleColorSelect}
      />

      <div className="flex flex-col gap-1 text-slate-500 text-sm">
        <h2 className="text-3xl font-medium text-slate-700 text-3xl ">
          {truncateText(products?.name)}
        </h2>

        {/* RATING */}
        <div className="flex items-center gap-2">
          <Rating value={productRating} readOnly />
          <div>{products.reviews.length} reviews</div>
        </div>

        <Horizontal />

        <div className="text-justify">{products.description}</div>

        <Horizontal />

        <div>
          <span className="font-semibold">CATEGORY: </span>
          {products.category}
        </div>

        <div>
          <span className="font-semibold">BRAND: </span>
          {products.brand}
        </div>
        <div>
          <span className=" flex items-center gap-2">
            
          <p className="font-semibold">
          PRICE:
          </p>
          <p className="font-bold text-orange-500">
          {formatPrice(products.price)}
          </p>
             </span>
        </div>

        <div className={products.inStock ? "text-teal-400" : "text-rose-400"}>
          {products.inStock ? "In Stock" : "Out of Stock"}
        </div>
        <Horizontal />
        {isProductInCart ? (
          <>
            <p className="text-slate-500 mb-2 flex items-center gap-1">
              <FaCheckCircle size={20} className="text-teal-400 " />
              <span>Product Added to cart</span>
            </p>
            <div className="w-[300px]">
              <Button
                lable="View Cart"
                outline
                handleClick={() => {
                  router.push("/cart");
                }}
              />
              <Link
                href={"/"}
                className="text-slate-500 flex items-center gap-1 mt-2"
              >
                <FaArrowLeft />
                <span>Continue shopping</span>
              </Link>
            </div>
          </>
        ) : (
          <>
            {" "}
            <SetColor
              cartProduct={cartProduct}
              images={products.images}
              handleColorSelect={handleColorSelect}
            />
            <Horizontal />
            <SetQuantity
              cartProduct={cartProduct}
              handleQuantityDecrease={handleQuantityDecrease}
              handleQuantityIncrease={handleQuantityIncrease}
            />
            <Horizontal />
            <div className="max-w-[300px]">
              <Button
                lable={"Add to cart"}
                handleClick={() => handleAddProductToCart(cartProduct)}
              />
              <Link
                href={"/"}
                className="text-slate-500 flex items-center gap-1 mt-2"
              >
                <FaArrowLeft />
                <span>Continue shopping</span>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
