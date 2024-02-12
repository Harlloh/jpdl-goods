"use client";
import React, { useEffect, useState } from "react";
import Heading from "../components/Heading";
import Inputs from "../components/inputs/inputs";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Button from "../components/Button";
import Link from "next/link";
import { AiOutlineGoogle } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { useCart } from "@/hooks/useCartHook";
import toast from "react-hot-toast";
import { getToken } from "@/api/auth/apis";

const RegisterForm = () => {
  const currentUser = getToken();

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { handleSignUp } = useCart();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
    },
  });
  useEffect(() => {
    if (currentUser) {
      router.push("/cart");
      router.refresh();
    }
  }, []);
  if (currentUser) {
    return <p className="text-center">Logged in. Redirecting</p>;
  }

  const onSubmit: SubmitHandler<FieldValues> = async (data: any) => {
    try {
      setIsLoading(true);
      await handleSignUp(data);
      console.log(data);
      // Optionally, perform any other actions upon successful signup
      router.push("/openmail"); // Redirect to login after signup
    } catch (error: any) {
      toast.error("Something went wrong");
      // Handle signup error, show an error message, etc.
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Heading title="Sign up for E-shop" />
      {/* <Button
        outline
        lable="Sign up with Google"
        icon={AiOutlineGoogle}
        handleClick={() => {}}
      /> */}
      <hr className="bg-slate-300 w-full h-px" />
      <Inputs
        id="first_name"
        label="First Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        type="text"
      />
      <Inputs
        id="last_name"
        label="Last Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        type="text"
      />
      <Inputs
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        type="email"
      />
      <Inputs
        id="password"
        label="Password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        type="password"
      />
      <Button
        lable={`${isLoading ? "Loading" : "Sign up"}`}
        disabled={isLoading}
        handleClick={handleSubmit(onSubmit)}
      />
      <p className="text-sm">
        Already have an accound?{" "}
        <Link className="underline" href="/login">
          Login
        </Link>
      </p>
    </>
  );
};

export default RegisterForm;
