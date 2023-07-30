import nodemailer from "nodemailer";
import mailgunTransport from "nodemailer-mailgun-transport";
import emailTemplate from "@/utils/nodemailer/emailTemplate";
import { EmailType, EmailContextType } from "@/types";

interface EmailParametersType {
  locale: string;
  emailType: EmailType;
  subject: string;
  receivers: string;
  context: EmailContextType;
}

export default async function sendEmail(params: EmailParametersType) {
  const { emailType, locale, subject, receivers, context } = params;
  const { text, html } = await emailTemplate(emailType, locale, context);
  const mailgunTransporter = mailgunTransport({
    auth: {
      api_key: process.env.MAILGUN_API_KEY ?? "",
      domain: process.env.MAILGUN_DOMAIN,
    },
    host: process.env.MAILGUN_HOST,
  });
  const transporter = nodemailer.createTransport(mailgunTransporter);

  const info = await transporter.sendMail({
    from: "Tekliff <info@tekliff.az>",
    to: receivers,
    subject,
    text,
    html,
  });

  return info;
}
