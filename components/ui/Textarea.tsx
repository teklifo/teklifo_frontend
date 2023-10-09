import { TextareaProps } from "@/types";

const Textarea = ({
  id,
  label,
  col,
  row,
  disabled,
  register,
  required,
  errors,
}: TextareaProps) => {
  return (
    <div className="w-full relative">
      <label
        className="block text-zinc-500 text-sm font-bold mb-2"
        htmlFor={id}
      >
        {label}
      </label>
      <textarea
        id={id}
        cols={col}
        rows={row}
        disabled={disabled}
        {...register(id, { required })}
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
      ></textarea>
      {errors[id] && (
        <p className="text-rose-500">{`${errors[id]?.message}`}</p>
      )}
    </div>
  );
};

export default Textarea;
