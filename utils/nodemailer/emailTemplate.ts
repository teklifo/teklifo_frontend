import handlebars from "handlebars";
import fs from "fs";
import path from "path";
import { EmailType, EmailContextType } from "@/types";

export default async function emailTemplate(
  emailType: EmailType,
  locale: string,
  context: EmailContextType
) {
  const filePath = path.join(
    process.cwd(),
    `utils/nodemailer/emails/${locale}/${emailType}.html`
  );

  const source = (await fs.promises.readFile(filePath, "utf-8")).toString();
  const template = handlebars.compile(source);
  const html = template(context);

  return {
    text: "",
    html,
  };
}
