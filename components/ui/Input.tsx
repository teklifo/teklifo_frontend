"use client";

import { InputProps } from "@/types";

const Input = ({
  id,
  label,
  type = "text",
  disabled,
  formatPrice,
  register,
  required,
  errors,
  autoComplete,
}: InputProps) => {
  return (
    <div className="w-full relative">
      <label
        className="block text-zinc-500 text-sm font-bold mb-2"
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
          bg-white 
          border-2
          rounded-2xl
          outline-none
          transition
          disabled:opacity-70
          disabled:cursor-not-allowed
          dark:bg-zinc-900
          ${formatPrice ? "pl-9" : "pl-4"}
          ${
            errors[id]
              ? "border-rose-500"
              : "border-zinc-300 dark:border-zinc-700"
          }
          ${
            errors[id]
              ? "focus:border-rose-500"
              : "focus:border-sky-500 dark:focus:border-sky-500"
          }
        `}
      />
      {errors[id] && (
        <p className="text-rose-500">{`${errors[id]?.message}`}</p>
      )}
    </div>
  );
};

export default Input;
