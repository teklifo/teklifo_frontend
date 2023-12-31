"use client";

import { ButtonProps } from "@/types";
import Spiner from "@/components/ui/Spiner";

const Button = ({
  title,
  icon,
  btnstyle,
  btnType,
  disabled,
  loading,
  onClick,
  btnClass,
}: ButtonProps) => {
  let styles = "";
  if (btnstyle === "primary") {
    styles = "bg-sky-500 text-white hover:bg-sky-600 dark:text-black";
  } else if (btnstyle === "secondary") {
    styles =
      "bg-zinc-100 text-black hover:bg-zinc-200 dark:text-white dark:bg-zinc-800 dark:hover:bg-zinc-700";
  } else if (btnstyle === "danger") {
    styles = "bg-red-500 text-white hover:bg-red-600 dark:text-black";
  }

  return (
    <button
      disabled={disabled || loading}
      type={btnType || "button"}
      className={`custom-btn
      transition-colors
      duration-150
      ease-in-out 
      rounded-full
      font-bold
      py-3
      px-6
      ${styles}
      ${btnClass ?? ""}
      `}
      onClick={onClick}
    >
      {loading ? (
        <Spiner />
      ) : icon ? (
        <div className="flex space-x-2">
          <span>{title}</span>
          {icon}
        </div>
      ) : (
        <span className={`flex-1`}>{title}</span>
      )}
    </button>
  );
};

export default Button;
