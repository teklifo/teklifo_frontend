import { object, string, InferType } from "yup";

export const companySchema = (t: any) => {
  return object({
    name: string().required(t("nameIsRequired")),
  });
};

const schema = companySchema((_string: string) => undefined);

export interface CompanyType extends InferType<typeof schema> {}
