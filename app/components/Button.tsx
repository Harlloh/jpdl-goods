"use client";
import React from "react";
import { IconType } from "react-icons";

interface ButtonProps {
  lable: string;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  custom?: string;
  icon?: IconType;
  handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<ButtonProps> = ({
  lable,
  disabled,
  outline,
  small,
  custom,
  icon: Icon,
  handleClick,
}) => {
  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`disabled:opacity-70 disabled:curosr-not-allowed rounded-md hover:opacity-80 transition w-full border-orange-400 flex gap-2 items-center justify-center 
      ${outline ? "bg-white text-orange-400" : "bg-teal-700 text-white"} 
      ${outline ? "" : ""}
       ${
         small
           ? "text-sm py-1 px-2 font-light border-[1px]"
           : "text-md py-3 px-4 font-semibold border-2"
       } 
      ${small ? "" : ""} 
      ${custom ? custom : ""}
      `}
    >
      {Icon && <Icon size={24} />}
      {lable}
    </button>
  );
};

export default Button;
