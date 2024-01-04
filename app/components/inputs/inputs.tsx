"use client";

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface InputProp {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

const inputs: React.FC<InputProp> = ({
  id,
  label,
  type,
  disabled,
  required,
  register,
  errors,
}) => {
  return (
    <div className="w-full relative">
      <input
        autoComplete="off"
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        placeholder=""
        className={`peer w-full p-4 pt-6 outline-none bg-white font-light border-2 rounded-md transition disabled:opacity-70 disabled:cursor-not-allowed ${
          errors[id]
            ? "border-rose-400 focus:border-rose-400"
            : "border-slate-300 focus:border-slate-300"
        }`}
        type={type}
      />
      <label className="absolute " htmlFor={id}>
        {label}
      </label>
    </div>
  );
};

export default inputs;
