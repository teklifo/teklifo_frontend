import { MouseEventHandler } from "react";

export interface ButtonProps {
  title: string;
  containerStyles?: string;
  btnType?: "submit" | "button";
  onClick?: MouseEventHandler<HTMLButtonElement>;
}
