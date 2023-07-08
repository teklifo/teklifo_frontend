"use client";

import { ButtonProps } from "@/types";

const Button = ({ title, containerStyles, btnType, onClick }: ButtonProps) => {
  return (
    <button
      disabled={false}
      type={btnType || "button"}
      className={`custom-btn  ${containerStyles}`}
      onClick={onClick}
    >
      <span className={`flex-1`}>{title}</span>
    </button>
  );
};

export default Button;
