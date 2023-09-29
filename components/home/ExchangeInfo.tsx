import Image from "next/image";
import { useTranslations } from "next-intl";
import Link from "@/components/ui/Link";

const Exchange = () => {
  const t = useTranslations("Home");

  return (
    <section id="features" className="my-20 py-10 mx-2">
      <h2 className="text-4xl font-bold text-center mb-4">
        {t("1cExchangeTitle")}
      </h2>
      <div className="flex flex-col justify-center items-center px-8 space-y-12 md:flex-row md:space-y-0 md:space-x-12">
        <div className="max-w-sm">
          <Image
            src="/1c_exchange.svg"
            alt="hero"
            width="300"
            height="300"
            priority
          />
        </div>
        <div className="text-center space-y-6 md:text-left">
          <p className="px-2 max-w-lg text-black font-medium text-xl dark:text-white">
            {t("1cExchangeTextSubtitle")}
          </p>
          <p className="px-2 max-w-lg text-black font-medium text-xl dark:text-white">
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
