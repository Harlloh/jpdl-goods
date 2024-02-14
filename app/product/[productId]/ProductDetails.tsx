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
import ListRating from "./ListRating";
import UserOrder from "../../userOrder/[orderId]/page";
import Product from "./page";
import { BASE_URL, getToken } from "@/api/auth/apis";
import axios from "axios";
import { handleSubscriptions } from "@/hooks/stripe";
import Loading from "@/app/components/Loading";
import SmLoading from "@/app/components/SmLoading";

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
  reviews: any[];
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
  const userToken = getToken();
  const router = useRouter();

  const { handleAddProductToCart, cartProducts, userSubs } = useCart();

  const [isProductInCart, setIsProductInCart] = useState(false);
  const [subLoading, setSubLoading] = useState(false);
  const [cartloading, setCartLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const productRating =
    products.reviews.length > 0
      ? products.reviews.reduce(
          (acc: any, review: any) => acc + review.starCount,
          0
        ) / products.reviews.length
      : null;

  useEffect(() => {
    // Function to toggle the modal visibility
    const toggleModal = () => {
      const modal = document.getElementById("default-modal");
      if (modal) {
        modal.classList.toggle("hidden");
      }
    };

    // Event listener for the modal toggle button
    const modalToggleButton = document.querySelector("[data-modal-toggle]");
    if (modalToggleButton) {
      modalToggleButton.addEventListener("click", toggleModal);
    }

    // Event listeners for the modal close buttons
    const closeModalButtons = document.querySelectorAll("[data-modal-hide]");
    closeModalButtons.forEach((button) => {
      button.addEventListener("click", toggleModal);
    });

    return () => {
      // Cleanup: Remove event listeners when the component is unmounted
      if (modalToggleButton) {
        modalToggleButton.removeEventListener("click", toggleModal);
      }
      closeModalButtons.forEach((button) => {
        button.removeEventListener("click", toggleModal);
      });
    };
  }, []);

  const [cartProduct, setCartProduct] = useState<cartProductType>({
    id: products.id,
    name: products.name,
    description: products.description,
    category: products.category,
    brand: products.brand,
    selectedImage: { ...products.images[0] },
    quantity: 1,
    price: products.price,
    reviews: products.reviews,
  });

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

  const handleSubscription = async (product: any) => {
    try {
      setSubLoading(true);
      const { redirectUrl } = await handleSubscriptions(product);
      if (redirectUrl) {
        window.location.href = redirectUrl;
      }
      setIsSubscribed(true);
    } catch (error) {
      // Handle error if needed
      console.error("Error handling subscription:", error);
    } finally {
      setSubLoading(false);
    }
  };

  const isProductInSubscription = userSubs?.some(
    (sub) => sub.orderDetails.id === products.id
  );
  console.log(isProductInSubscription);

  const handleAddToCart = async () => {
    try {
      setCartLoading(true);
      await handleAddProductToCart(cartProduct, userToken);
      // Optionally, you can set isProductInCart state here based on the result if needed.
      setIsProductInCart(true);
    } catch (error) {
      // Handle error if needed
      console.error("Error adding product to cart:", error);
    } finally {
      setCartLoading(false);
    }
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 py-6">
      <ProductImage
        cartProduct={cartProduct}
        product={products}
        handleColorSelect={handleColorSelect}
      />

      <div className="flex flex-col gap-1 text-slate-500 text-sm">
        <h2 className=" font-medium text-slate-700 text-3xl ">
          {truncateText(products?.name)}
        </h2>

        {/* RATING */}
        <div className="flex items-center gap-2">
          <Rating value={productRating} readOnly />
          <div>{products.reviews.length} reviews</div>
        </div>

        <Horizontal />

        <div className="text-justify text-wrap max-w-[600px] items-center bg-red descrip">
          <p> {products.description}</p>
        </div>

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
            <p className="font-semibold">PRICE:</p>
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
                disabled={!products.inStock || cartloading}
                lable={cartloading ? "Adding to cart" : "Add to cart"}
                handleClick={handleAddToCart}
              />
              <Link
                href={"/shop"}
                className="text-slate-500 flex items-center gap-1 mt-2"
              >
                <FaArrowLeft />
                <span>Continue shopping</span>
              </Link>
            </div>
          </>
        )}
        {/* subscription */}
        {products.isSubscribe && (
          <div>
            {isProductInSubscription || isSubscribed ? (
              <div className="text-red-500 p-3">
                This product is already in your subscription.
              </div>
            ) : (
              <button
                data-modal-target="default-modal"
                data-modal-toggle="default-modal"
                className={`block text-white bg-orange-500 hover:bg-teal-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
                type="button"
              >
                {subLoading ? (
                  <>
                    <SmLoading />
                  </>
                ) : (
                  "Subscription"
                )}
              </button>
            )}

            <div
              id="default-modal"
              tabIndex={-1}
              aria-hidden="true"
              className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
            >
              <div className="relative p-4 w-full max-w-2xl max-h-full">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                  <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      Terms of Subscription
                    </h3>
                    <button
                      type="button"
                      className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                      data-modal-hide="default-modal"
                    >
                      <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 14"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                        />
                      </svg>
                      <span className="sr-only">Close modal</span>
                    </button>
                  </div>
                  <div className="p-4 md:p-5 space-y-4">
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                      Subscribe to this product and enjoy exclusive benefits! By
                      subscribing, you get access to the latest updates, special
                      offers, and exciting promotions. Be the first to know
                      about new releases and receive personalized
                      recommendations tailored just for you.
                    </p>
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                      Our subscription service ensures a hassle-free experience.
                      You can modify or cancel your subscription anytime. No
                      hidden fees, and your privacy is our priority. Your
                      subscription helps us continue providing you with
                      high-quality products and services.
                    </p>
                    <p
                      className="underline underline-orange-700 cursor-pointer text-orange-600"
                      onClick={() => router.push("/subscribe")}
                    >
                      Learn more about our subscription terms and conditions
                    </p>
                  </div>

                  <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                    <button
                      onClick={(e) => {
                        e.preventDefault(); // Prevent the default behavior of the button click
                        handleSubscription(cartProduct);
                      }}
                      data-modal-hide="default-modal"
                      type="button"
                      className={`text-white bg-teal-700 hover:scale-115 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${
                        subLoading ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                      disabled={subLoading}
                    >
                      {subLoading
                        ? "Subscribing..."
                        : "Subscribe to this product"}
                    </button>
                    <button
                      data-modal-hide="default-modal"
                      type="button"
                      className="ms-3 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* <Button
          lable="Subscribe to this Product"
          outline
          handleClick={() => {
            router.push("/cart");
          }}
        /> */}
      </div>
    </div>
  );
};

export default ProductDetails;
