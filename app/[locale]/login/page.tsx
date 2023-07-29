import { Metadata } from "next";
import NextLink from "next/link";
import Image from "next/image";
import { getTranslator } from "next-intl/server";
import { useTranslations } from "next-intl";
import LoginForm from "@/components/login/LoginForm";

type Props = {
  params: { locale: string };
};

export async function generateMetadata({
  params: { locale },
}: Props): Promise<Metadata> {
  const t = await getTranslator(locale, "Metadata");

  return {
    title: t("loginTitle"),
    description: t("loginDescription"),
  };
}

export default function Login() {
  const t = useTranslations("Login");

  return (
    <main>
      <div className="flex flex-col h-screen md:flex-row">
        <div className="hidden flex-col justify-center items-center bg-sky-200 w-full md:flex">
          <Image
            src="/login.svg"
            alt="login"
            width="600"
            height="600"
            priority
          />
          <h1 className="text-5xl font-bold px-16 text-center">{t("title")}</h1>
        </div>
        <div className="flex flex-col w-full justify-center items-center space-y-8 px-8 my-auto md:my-0">
          <h3 className="text-4xl text-center">{t("welcome")}</h3>
          <p className="max-w-sm text-center text-zinc-400">
            {t("welcomeSubtitle")}
          </p>
          <LoginForm />
          <span>
            {`${t("registrationText")} `}
            <NextLink href="/registration" className="underline">
              {t("registration")}
            </NextLink>
          </span>
        </div>
      </div>
    </main>
  );
}
