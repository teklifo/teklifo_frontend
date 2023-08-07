import { object, array, string, date, InferType } from "yup";
import { User } from "next-auth";
import { EntityType, ContactsType, SocialsType } from "@/types";

export const companySchema = (t: any) => {
  return object({
    name: string().required(t("nameIsRequired")),
    tin: string()
      .required(t("tinIsRequired"))
      .matches(/^\d+$/, t("invalidTin"))
      .length(10, t("invalidTin")),
    entityType: string<EntityType>().required(t("entityTypeIsRequired")),
    image: string().url(t("invalidImage")),
    description: string()
      .required(t("descriptionIsRequired"))
      .min(100, t("invalidDescription")),
    shortDescription: string()
      .required(t("descriptionIsRequired"))
      .min(200, t("invalidShortDescription")),
    contacts: object<ContactsType>(),
    socials: object<SocialsType>(),
    createdAt: date(),
    updatedAt: date(),
    users: array<User, User>(),
  });
};

const schema = companySchema((_string: string) => undefined);

export interface CompanyType extends InferType<typeof schema> {}
