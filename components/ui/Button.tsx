"use client";

import { ButtonProps } from "@/types";
import Spiner from "@/components/ui/Spiner";

const Button = ({
  title,
  containerStyles,
  btnType,
  disabled,
  loading,
  onClick,
}: ButtonProps) => {
  return (
    <button
      disabled={disabled || loading}
      type={btnType || "button"}
      className={`custom-btn ${containerStyles}`}
      onClick={onClick}
    >
      {loading ? <Spiner /> : <span className={`flex-1`}>{title}</span>}
    </button>
  );
};

export default Button;
