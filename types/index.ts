import { MouseEventHandler } from "react";

export type EmailType = "email_verification";

export interface EmailContextType {
  [key: string]: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
  activationToken?: string;
  activationTokenExpires?: Date;
  resetPasswordToken?: string;
  avatarUrl: string;
  createdAt: Date;
  updatedAt: Date;
  companies: Company[];
}

export type CompanyType = "physical" | "entity";

export interface CompanyContacts {
  phone: string[];
  email: string[];
  address: string[];
  website: string[];
}

export interface CompanySocials {
  facebook: string;
  instragram: string;
  youtube: string;
}

export interface Company {
  id: number;
  name: string;
  tin: string;
  type: CompanyType;
  logoUrl: string;
  description: string;
  contacts: CompanyContacts;
  socials: CompanySocials;
  createdAt: Date;
  updatedAt: Date;
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
