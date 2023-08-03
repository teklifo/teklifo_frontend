import NextAuth, { AuthOptions } from "next-auth";
import EmailProvider, {
  SendVerificationRequestParams,
} from "next-auth/providers/email";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/app/lib/prisma";
import sendEmail from "@/utils/nodemailer/sendEmail";

declare module "next-auth" {
  interface User {
    id: number;
  }
}

const sendVerificationRequest = async ({
  identifier,
  url,
}: SendVerificationRequestParams) => {
  await sendEmail({
    locale: "ru",
    emailType: "email_verification",
    receivers: identifier,
    subject: "Email",
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
  },
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
