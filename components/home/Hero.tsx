import Image from "next/image";
import { useTranslations } from "next-intl";
import Link from "@/components/ui/Link";

const Hero = () => {
  const t = useTranslations("Home");

  return (
    <section className="flex flex-col-reverse items-center px-6 space-y-0 mt-4 md:flex-row md:space-y-0">
      <div className="flex flex-col space-y-8 mt-8 md:w-1/2 md:mt-0">
        <h1 className="text-4xl font-extrabold text-center md:text-5xl lg:text-6xl xl:text-7xl md:text-left">
          {t("title")}
          <br />
          <span className="text-7xl max-w-md font-extrabold bg-gradient-to-r from-sky-500 to-sky-800 bg-clip-text text-transparent mt-2 inline-block md:text-7xl lg:text-8xl xl:text-9xl">
            {t("projectName")}
          </span>
        </h1>
        <p className="max-w-sm text-center text-lg text-zinc-500 md:text-left">
          {t("subtitle")}
        </p>
        <div className="flex justify-center md:justify-start">
          <Link href="/user_companies" type="primary">
            {t("getStartedBtn")}
          </Link>
        </div>
      </div>
      <div className="w-full md:w-1/2">
        <Image src="/hero.svg" alt="hero" width="600" height="600" priority />
      </div>
    </section>
  );
};

export default Hero;
