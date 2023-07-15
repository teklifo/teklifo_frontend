"use client";

import { ButtonProps } from "@/types";

const Button = ({
  title,
  containerStyles,
  btnType,
  disabled,
  onClick,
}: ButtonProps) => {
  return (
    <button
      disabled={disabled}
      type={btnType || "button"}
      className={`custom-btn ${containerStyles}`}
      onClick={onClick}
    >
      <span className={`flex-1`}>{title}</span>
    </button>
  );
};

export default Button;
