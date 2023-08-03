import { EmailType, EmailContextType } from "@/types";
import {
  emailVerificationAz,
  emailVerificationRu,
} from "@/utils/nodemailer/emails/email_verification";

export default async function emailTemplate(
  emailType: EmailType,
  locale: string,
  context: EmailContextType
) {
  let html = "";

  if (emailType === "email_verification") {
    switch (locale) {
      case "ru":
        html = emailVerificationRu(context.url);
      case "az":
      default:
        html = emailVerificationAz(context.url);
    }
  }

  return {
    text: "",
    html,
  };
}
