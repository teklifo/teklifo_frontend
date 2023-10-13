import Image from "next/image";
import { useTranslations } from "next-intl";
import Link from "@/components/ui/Link";

const Exchange = () => {
  const t = useTranslations("Home");

  return (
    <section id="features" className="my-20 py-10 mx-2">
      <div className="flex flex-col justify-center items-center px-8 space-y-12 md:flex-row md:space-y-0 md:space-x-12">
        <div className="md:w-1/2 flex justify-center items-center">
          <Image
            src="/1c_exchange.svg"
            alt="hero"
            width="300"
            height="300"
            priority
          />
        </div>
        <div className="md:w-1/2 text-center space-y-6 md:text-left">
          <h2 className="text-5xl font-bold">{t("1cExchangeTitle")}</h2>
          <p className="px-2 max-w-lg text-lg text-zinc-500">
            {t("1cExchangeTextSubtitle")}
          </p>
          <p className="px-2 max-w-lg text-lg text-zinc-500">
            {t("1cExchangeText")}
          </p>
          <Link href="/1c_exchange" type="primary">
            {t("1cExchangeMore")}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Exchange;
