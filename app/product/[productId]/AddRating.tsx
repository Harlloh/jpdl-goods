"use client";
import Button from "@/app/components/Button";
import Heading from "@/app/components/Heading";
import Inputs from "@/app/components/inputs/inputs";
import { Rating } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

const AddRating = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      comment: "",
      rating: 0,
    },
  });

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldTouch: true,
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    //     console.log(data);
    //     setIsLoading(true);
    //     if (data.rating === 0) {
    //       setIsLoading(false);
    //       return toast.error("No rating is selected");
    //     }
    //     const ratingData = { ...data, userId: user?.id, product: product };
    //     axios
    //       .post("/api/rating", ratingData)
    //       .then(() => {
    //         toast.success("Rating submitted");
    //         router.refresh();
    //         reset();
    //       })
    //       .catch((error) => {
    //         toast.error("Something went wrong with rating this product");
    //       })
    //       .finally(() => {
    //         setIsLoading(false);
    //       });
  };

  const userToken = localStorage.getItem("user");
  if (
    !userToken
    // || !product
  )
    return null;

  //   const deliveredOrder = user?.orders.some(
  //     (order) =>
  //       order.products.find((item) => item.id === product.id) &&
  //       order.deliveryStatus === "delivered"
  //   );

  //   const userReview = product?.reviews.find(
  //     (review: Review) => review.userId === user.id
  //   );

  //   if (userReview || !deliveredOrder) return null;

  return (
    <div className="flex flex-col gap-2 max-w-[500px]">
      <Heading title="Rate this product" />
      <Rating
        onChange={(event, newValue) => {
          setCustomValue("rating", newValue);
        }}
      />
      <Inputs
        id="comment"
        label="Comment"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Button
        lable={isLoading ? "Loading..." : "Rate this Product"}
        handleClick={handleSubmit(onSubmit)}
      />
      .
    </div>
  );
};

export default AddRating;
