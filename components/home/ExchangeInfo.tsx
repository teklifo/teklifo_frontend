import Image from "next/image";
import { useTranslations } from "next-intl";

const Exchange = () => {
  const t = useTranslations("Home");

  return (
    <section
      id="features"
      className="my-20 py-10 mx-2 bg-sky-100 rounded-3xl dark:bg-sky-500"
    >
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
        <p className="px-2 max-w-lg text-center text-black font-medium text-xl md:text-left dark:text-white">
          {t("1cExchangeText")}
        </p>
      </div>
    </section>
  );
};

export default Exchange;
