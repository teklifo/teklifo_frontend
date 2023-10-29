import { Metadata } from "next";
import NextLink from "next/link";
import Image from "next/image";
import { getTranslator } from "next-intl/server";
import { useTranslations } from "next-intl";
import RegisterForm from "@/components/register/RegisterForm";
import Logo from "@/components/layout/Logo";

type Props = {
  params: { locale: string };
};

export async function generateMetadata({
  params: { locale },
}: Props): Promise<Metadata> {
  const t = await getTranslator(locale, "Metadata");

  return {
    title: t("registerTitle"),
    description: t("registerDescription"),
  };
}

export default function Register() {
  const t = useTranslations("Register");

  return (
    <main>
      <div className="flex flex-col h-screen md:flex-row">
        <div className="hidden px-8 flex-col justify-center items-center bg-sky-400 w-full lg:flex text-white dark:text-black">
          <div className="absolute top-0 left-0 px-8 py-4">
            <NextLink href="/" className="text-sky-500">
              <Logo className="text-white dark:text-zinc-900" />
            </NextLink>
          </div>
          <Image
            src="/register.svg"
            alt="register"
            width="600"
            height="600"
            priority
            className="max-w-xl my-8"
          />
          <h1 className="text-5xl font-bold mx-auto max-w-md text-center">
            {t("title")}
          </h1>
        </div>
        <div className="flex flex-col w-full justify-center items-center space-y-4 px-8 my-8 md:my-0 md:space-y-8">
          <div className="block lg:hidden mb-16">
            <NextLink href="/" className="text-sky-500">
              <Logo className="text-black dark:text-white" />
            </NextLink>
          </div>
          <h3 className="text-4xl text-center">{t("welcome")}</h3>
          <p className="max-w-sm text-center text-zinc-500">
            {t("welcomeSubtitle")}
          </p>
          <RegisterForm />
          <span>
            {`${t("loginText")} `}
            <NextLink href="/login" type="secondary" className="underline">
              {t("login")}
            </NextLink>
          </span>
        </div>
      </div>
    </main>
  );
}
