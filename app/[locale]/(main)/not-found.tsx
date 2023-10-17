import Image from "next/image";
import { useTranslations } from "next-intl";
import Link from "@/components/ui/Link";

export default function NotFound() {
  const t = useTranslations("NotFound");

  return (
    <main>
      <div className="flex flex-col-reverse justify-center items-center min-h-[80vh] m-4 lg:flex-row">
        <div className="space-y-6">
          <h1 className="text-5xl font-bold mx-16 text-center">{t("title")}</h1>
          <h3 className="max-w-sm text-center px-4 mx-auto text-zinc-500">
            {t("subtitle")}
          </h3>
          <div className="flex justify-center">
            <Link href="/" type="primary">
              {t("home")}
            </Link>
          </div>
        </div>
        <Image
          src="/404.svg"
          alt="not_found"
          width="600"
          height="600"
          priority
          className="max-w-2xl"
        />
      </div>
    </main>
  );
}
