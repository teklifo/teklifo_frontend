import { MouseEventHandler } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";

export interface UserType {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
  image: string | null;
  created_at: Date;
  updated_at: Date;
}

export type EntityType = "physical" | "legal";

export interface ContactsType {
  phone: string[];
  email: string[];
  address: string[];
  website: string[];
}

export interface SocialsType {
  facebook: string;
  instagram: string;
  youtube: string;
}

export interface ButtonProps {
  title: string;
  btnstyle: "primary" | "secondary";
  btnType?: "submit" | "button";
  disabled?: boolean;
  loading?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export interface GroupButtonProps {
  title: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export interface GroupButtonsProps {
  buttons: GroupButtonProps[];
}

export interface SidebarProps {
  display: boolean;
  children: React.ReactNode;
}

export interface SidebarItemProps {
  href: string;
  title: string;
  isActive: boolean;
}

export interface InputProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  required?: boolean | string;
  register: UseFormRegister<any>;
  errors: FieldErrors;
  autoComplete?: string;
}

export interface SelectOptionProps {
  value: string;
  title: string;
}

export interface SelectProps {
  id: string;
  label: string;
  disabled?: boolean;
  required?: boolean | string;
  register: UseFormRegister<any>;
  errors: FieldErrors;
  children: React.ReactNode;
}

export interface TextareaProps {
  id: string;
  label: string;
  col?: number;
  row?: number;
  disabled?: boolean;
  required?: boolean | string;
  register: UseFormRegister<any>;
  errors: FieldErrors;
}
