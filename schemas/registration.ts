import { object, string, InferType } from "yup";

export const registrationSchema = (t: any) => {
  return object({
    name: string().required(t("nameIsRequired")),
    email: string().required(t("emailIsRequired")).email(),
    password: string()
      .required(t("passwordIsPassword"))
      .min(6, t("invalidPassword")),
  });
};

const schema = registrationSchema((string: string) => undefined);

export interface RegistrationData extends InferType<typeof schema> {}
