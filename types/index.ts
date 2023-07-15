import { MouseEventHandler } from "react";

export interface User {
  id: number;
  name: string;
  email: string;
  is_active: boolean;
  activation_token?: string;
  activation_token_expires?: Date;
  reset_password_token?: string;
  avatar_url: string;
  companies: Company[];
  created_at: Date;
  updated_at: Date;
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
  logo_url: string;
  description: string;
  contacts: CompanyContacts;
  socials: CompanySocials;
  created_at: Date;
  updated_at: Date;
}

export interface ButtonProps {
  title: string;
  containerStyles?: string;
  btnType?: "submit" | "button";
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}
