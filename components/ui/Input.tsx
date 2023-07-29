"use client";

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  required?: boolean | string;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  autoComplete?: string;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type = "text",
  disabled,
  formatPrice,
  register,
  required,
  errors,
  autoComplete,
}) => {
  return (
    <div className="w-full relative">
      <label
        className="block text-zinc-400 text-sm font-bold mb-2"
        htmlFor={id}
      >
        {label}
      </label>
      <input
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        type={type}
        autoComplete={autoComplete}
        className={`      
          w-full
          p-4
          font-light 
          bg-zinc-300 
          border-2
          rounded-2xl
          outline-none
          transition
          disabled:opacity-70
          disabled:cursor-not-allowed
          focus:bg-white
          ${formatPrice ? "pl-9" : "pl-4"}
          ${errors[id] ? "border-rose-500" : "border-zinc-300"}
          ${errors[id] ? "focus:border-rose-500" : "focus:border-sky-500"}
        `}
      />
      {errors[id] && (
        <p className="text-rose-500">{`${errors[id]?.message}`}</p>
      )}
    </div>
  );
};

export default Input;
