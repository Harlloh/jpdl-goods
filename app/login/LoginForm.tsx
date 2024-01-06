"use client";
import React, { useEffect, useState } from "react";
import Heading from "../components/Heading";
import Inputs from "../components/inputs/inputs";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Button from "../components/Button";
import Link from "next/link";
import { AiOutlineGoogle } from "react-icons/ai";
import { useRouter } from "next/navigation";
interface LoginFormProps {
  currentUser: any;
}

const LoginForm: React.FC<LoginFormProps> = ({ currentUser }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
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

  const onSubmit: SubmitHandler<FieldValues> = (data: any) => {
    setIsLoading(true);
    console.log(data);
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
        lable={`${isLoading ? "Loading" : "Login"}`}
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
