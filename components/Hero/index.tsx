"use client";

import Image from "next/image";
import Button from "../ui/Button";
import { useTranslations } from "next-intl";

const Hero = () => {
  const t = useTranslations("Hero");

  const pushToLogin = () => {};

  return (
    <section className="container flex flex-col-reverse items-center px-6 mx-auto mt-10 space-y-0 md:flex-row md:space-y-0">
      <div className="flex flex-col mb-32 space-y-12 md:w-1/2">
        <h1 className="max-w-md text-4xl font-bold text-center md:text-5xl md:text-left">
          {t("title")}
        </h1>
        <p className="max-w-sm text-center text-zinc-400 md:text-left">
          {t("subtitle")}
        </p>
        <div className="flex justify-center md:justify-start">
          <Button
            title={t("getStartedBtn")}
            containerStyles="transition-colors duration-150 ease-in-out bg-sky-500 text-white rounded-full hover:bg-sky-600"
            onClick={pushToLogin}
          />
        </div>
      </div>
      <div className="md:w-1/2">
        <Image src="/hero.svg" alt="hero" width="600" height="600" />
      </div>
    </section>
  );
};

export default Hero;
