import Image from "next/image";
import { useTranslations } from "next-intl";

const Exchange = () => {
  const t = useTranslations("Home");

  return (
    <section id="features" className="my-20 py-10 bg-sky-100 rounded-3xl">
      <h2 className="text-4xl font-bold text-center mb-4">
        {t("1cExchangeTitle")}
      </h2>
      <div className="flex flex-col-reverse justify-center items-center md:flex-row">
        <div className="max-w-sm">
          <Image
            src="/1c_exchange.svg"
            alt="hero"
            width="500"
            height="500"
            priority
          />
        </div>
        <p className="max-w-lg text-center text-zinc-800 font-medium text-xl md:text-left">
          {t("1cExchangeText")}
        </p>
      </div>
    </section>
  );
};

export default Exchange;
