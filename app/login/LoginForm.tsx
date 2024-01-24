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


const LoginForm = () => {
  const {userToken} = useCart() 

  const currentUser = userToken;

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const {handleSignIn,userData} = useCart()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
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
      await handleSignIn(data);
      console.log(data);      
      router.push("/"); // Redirect to login after signup
    } catch (error:any) {
      toast.error('Something went wrong')
      // Handle signup error, show an error message, etc.
    } finally {
      setIsLoading(false);
    }

    console.log(userData, 'asdfkksdfbiasdfu')
  };

  return (
    <>
      <Heading title="Sign in for E-shop" />
      <Button
        outline
        lable="Cotinue with Google"
        icon={AiOutlineGoogle}
        handleClick={() => {}}
      />
      <hr className="bg-slate-300 w-full h-px" />
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
        lable={`${isLoading ? "Logging in" : "Login"}`}
        handleClick={handleSubmit(onSubmit)}
      />
      <p className="text-sm">
        Don&apos;t have an accound?{" "}
        <Link className="underline" href="/register">
          Sign up
        </Link>
      </p>
    </>
  );
};

export default LoginForm;
