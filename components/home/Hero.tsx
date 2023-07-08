import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";

const Hero = () => {
  const t = useTranslations("Home");

  return (
    <section className="container flex flex-col-reverse items-center px-6 mx-auto mt-20 space-y-0 md:flex-row md:space-y-0">
      <div className="flex flex-col space-y-8 mt-8 md:w-1/2 md:mt-0">
        <h1 className="max-w-md text-4xl font-bold text-center md:text-5xl md:text-left">
          {t("title")}
        </h1>
        <p className="max-w-sm text-center text-zinc-400 md:text-left">
          {t("subtitle")}
        </p>
        <div className="flex justify-center md:justify-start">
          <Link
            href="/dashboard"
            className="transition-colors duration-150 ease-in-out bg-sky-500 text-white rounded-full hover:bg-sky-600 py-3 px-6"
          >
            {t("getStartedBtn")}
          </Link>
        </div>
      </div>
      <div className="md:w-1/2">
        <Image src="/hero.svg" alt="hero" width="600" height="600" priority />
      </div>
    </section>
  );
};

export default Hero;
