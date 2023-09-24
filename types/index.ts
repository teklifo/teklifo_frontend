import { MouseEventHandler } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";

export type ImageType = {
  id: string;
  url: string;
  commerceMl?: boolean;
};

export type UserType = {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
  image: ImageType | null;
  createdAt: Date;
  updatedAt: Date;
};

export type EntityType = "physical" | "legal";

export type TypeOfContact = "phone" | "email" | "address" | "website";

export type ContactsType = {
  type: TypeOfContact;
  value: string;
};

export type SocialsType = {
  facebook: string;
  instagram: string;
  youtube: string;
};

export type UserAndCompanyType = {
  userId: number;
  companyId: number;
};

export type CompanyType = {
  id: number;
  name: string;
  tin: string;
  entityType: EntityType;
  image: ImageType | null;
  description: string;
  shortDescription: string | null;
  contacts: ContactsType[] | null;
  socials: SocialsType | SocialsType;
  createdAt: Date;
  updatedAt: Date;
  users?: UserAndCompanyType[];
};

export type ProductType = {
  id: number;
  externalId: string;
  productId: string;
  characteristicId: string;
  number: string;
  barcode: string;
  name: string;
  unit: string;
  vat: string;
  sellPrice: number;
  inStock: number;
  images: ImageType[];
  createdAt: Date;
  updatedAt: Date;
  companyId: number;
};

export type ButtonProps = {
  title: string;
  btnstyle: "primary" | "secondary";
  btnType?: "submit" | "button";
  disabled?: boolean;
  loading?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  btnClass?: string;
};

export type GroupButtonProps = {
  content: JSX.Element;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

export type GroupButtonsProps = {
  buttons: GroupButtonProps[];
};

export type SidebarProps = {
  display: boolean;
  children: React.ReactNode;
};

export type SidebarItemProps = {
  href: string;
  title: string;
  isActive: boolean;
  icon?: JSX.Element;
};

export type InputProps = {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  required?: boolean | string;
  register: UseFormRegister<any>;
  errors: FieldErrors;
  autoComplete?: string;
};

export type SelectOptionProps = {
  value: string;
  title: string;
};

export type SelectProps = {
  id: string;
  label: string;
  disabled?: boolean;
  required?: boolean | string;
  register: UseFormRegister<any>;
  errors: FieldErrors;
  children: React.ReactNode;
};

export type TextareaProps = {
  id: string;
  label: string;
  col?: number;
  row?: number;
  disabled?: boolean;
  required?: boolean | string;
  register: UseFormRegister<any>;
  errors: FieldErrors;
};

export type DividerProps = {
  classes?: string;
};

export type PaginationType = {
  skipped: number;
  current: number;
  total: number;
};

export type ApiError = {
  errors: [
    {
      msg: string;
      param?: string;
    }
  ];
};
