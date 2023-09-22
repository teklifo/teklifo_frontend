import { Metadata } from "next";
import { getTranslator } from "next-intl/server";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";

type Props = {
  params: { locale: string };
};

export async function generateMetadata({
  params: { locale },
}: Props): Promise<Metadata> {
  const t = await getTranslator(locale, "Metadata");

  return {
    title: t("homeTitle"),
    description: t("homeDescription"),
  };
}

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
    </>
  );
}
