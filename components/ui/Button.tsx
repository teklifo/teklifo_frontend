"use client";

import { ButtonProps } from "@/types";
import Spiner from "@/components/ui/Spiner";

const Button = ({
  title,
  btnstyle,
  btnType,
  disabled,
  loading,
  onClick,
}: ButtonProps) => {
  let styles = "";
  if (btnstyle === "primary") {
    styles = "bg-sky-500 text-white hover:bg-sky-600 dark:text-black";
  } else if (btnstyle === "secondary") {
    styles =
      "bg-zinc-100 text-black hover:bg-zinc-200 dark:text-white dark:bg-zinc-800";
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
      `}
      onClick={onClick}
    >
      {loading ? <Spiner /> : <span className={`flex-1`}>{title}</span>}
    </button>
  );
};

export default Button;
