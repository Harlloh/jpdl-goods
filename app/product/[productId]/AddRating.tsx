import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Rating } from "@mui/material";
import axios from "axios";
import toast from "react-hot-toast";
import Button from "@/app/components/Button";
import Heading from "@/app/components/Heading";
import Inputs from "@/app/components/inputs/inputs";
import { BASE_URL } from "@/api/auth/apis";

interface AddRatingProps {
  product: any;
}

const AddRating: React.FC<AddRatingProps> = ({ product }) => {
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
    setIsLoading(true);

    if (data.rating === 0) {
      setIsLoading(false);
      return toast.error("No rating is selected");
    }

    const userToken = localStorage.getItem("user");

    if (!userToken) {
      setIsLoading(false);
      return null;
    }

    axios
      .post(
        `${BASE_URL}/product/review/${product.id}`,
        { starCount: data.rating, body: data.comment },
        {
          headers: {
            Authorization: userToken,
          },
        }
      )
      .then((res) => {
        toast.success(res.data.message);
        router.refresh();
        reset();
      })
      .catch((err: any) => {
        toast.error(err.data.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

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
    </div>
  );
};

export default AddRating;
