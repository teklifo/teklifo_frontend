import { Metadata } from "next";
import Image from "next/image";
import { getTranslator } from "next-intl/server";
import { useTranslations } from "next-intl";
import Link from "@/components/ui/Link";

type Props = {
  params: { locale: string };
};

export async function generateMetadata({
  params: { locale },
}: Props): Promise<Metadata> {
  const t = await getTranslator(locale, "Metadata");

  return {
    title: t("verifyEmailTitle"),
    description: t("verifyEmailDescription"),
  };
}

export default function VerifyEmail() {
  const t = useTranslations("VerifyEmail");

  return (
    <main>
      <div className="flex flex-col-reverse justify-center items-center h-[80vh] m-4 lg:flex-row">
        <div className="space-y-6">
          <h1 className="text-5xl font-bold px-16 text-center">{t("title")}</h1>
          <h3 className="max-w-sm text-center mx-auto text-zinc-500">
            {t("subtitle")}
          </h3>
          <div className="flex justify-center">
            <Link href="/" type="primary">
              {t("home")}
            </Link>
          </div>
        </div>
        <Image
          src="/verify_email.svg"
          alt="verify_email"
          width="600"
          height="600"
          priority
        />
      </div>
    </main>
  );
}
