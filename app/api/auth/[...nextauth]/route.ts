import NextAuth, { AuthOptions } from "next-auth";
import EmailProvider, {
  SendVerificationRequestParams,
} from "next-auth/providers/email";
import { cookies } from "next/headers";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/app/lib/prisma";
import sendEmail from "@/utils/nodemailer/sendEmail";

declare module "next-auth" {
  interface User {
    id: number;
  }
}

const getEmailSubject = (locale: string) => {
  switch (locale) {
    case "ru":
      return "Авторизация на Tekliff.az";
    case "az":
    default:
      return "Avtorizasiya | Tekliff.az";
  }
};

const sendVerificationRequest = async ({
  identifier,
  url,
}: SendVerificationRequestParams) => {
  const cookieStore = cookies();
  const locale = cookieStore.get("NEXT_LOCALE")?.value ?? "az";

  await sendEmail({
    locale,
    emailType: "email_verification",
    receivers: identifier,
    subject: getEmailSubject(locale),
    context: {
      url,
    },
  });
};

const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    EmailProvider({
      from: process.env.EMAIL_FROM,
      sendVerificationRequest,
    }),
  ],
  pages: {
    signIn: "/login",
    verifyRequest: "/verify_email",
  },
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
