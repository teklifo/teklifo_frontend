import { Metadata } from "next";
import NextLink from "next/link";
import Image from "next/image";
import { getTranslator } from "next-intl/server";
import { useTranslations } from "next-intl";
import LoginForm from "@/components/login/LoginForm";
import Logo from "@/components/layout/Logo";

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
        <div className="hidden flex-col justify-center items-center bg-sky-400 w-full md:flex text-white dark:text-black">
          <div className="absolute top-0 left-0 px-8 py-4">
            <NextLink href="/" className="text-sky-500">
              <Logo className="text-white dark:text-zinc-900" />
            </NextLink>
          </div>
          <Image
            src="/login.svg"
            alt="login"
            width="600"
            height="600"
            priority
          />
          <h1 className="text-5xl font-bold px-16 text-center">{t("title")}</h1>
        </div>
        <div className="flex flex-col w-full justify-center items-center space-y-4 px-8 my-8 md:my-0 md:space-y-8">
          <h3 className="text-4xl text-center">{t("welcome")}</h3>
          <p className="max-w-sm text-center text-zinc-400">
            {t("welcomeSubtitle")}
          </p>
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
