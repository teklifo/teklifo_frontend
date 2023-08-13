import { SelectType } from "@/types";

const Select = ({
  id,
  label,
  disabled,
  register,
  required,
  errors,
  children,
}: SelectType) => {
  return (
    <div className="w-full relative">
      <label
        htmlFor={id}
        className="block text-zinc-400 text-sm font-bold mb-2"
      >
        {label}
      </label>
      <div className="w-full relative mb-2 flex items-center after:w-[8px] after:h-[8px] after:border-black/70 after:border-b after:border-r after:transform after:rotate-45 after:absolute after:right-3">
        <select
          {...register(id, { required })}
          name={id}
          id={id}
          disabled={disabled}
          className={` 
          appearance-none  
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
          ${
            errors[id]
              ? "border-rose-500"
              : "border-zinc-300 dark:border-zinc-800"
          }
          ${
            errors[id]
              ? "focus:border-rose-500"
              : "focus:border-sky-500 dark:focus:border-sky-500"
          }
        `}
        >
          {children}
        </select>
      </div>
      {errors[id] && (
        <p className="text-rose-500">{`${errors[id]?.message}`}</p>
      )}
      <div className="signupselect ml-2" />
    </div>
  );
};

export default Select;
