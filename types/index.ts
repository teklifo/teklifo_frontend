import { MouseEventHandler } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";

export type EmailType = "email_verification";

export interface EmailContextType {
  [key: string]: string;
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
  containerStyles?: string;
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

export interface SelectOptionType {
  value: string;
  title: string;
}

export interface SelectType {
  id: string;
  label: string;
  disabled?: boolean;
  required?: boolean | string;
  register: UseFormRegister<any>;
  errors: FieldErrors;
  children: React.ReactNode;
}
