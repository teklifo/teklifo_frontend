import { Metadata } from "next";
import { getTranslator } from "next-intl/server";
import { useTranslations } from "next-intl";

type Props = {
  params: { locale: string };
};

export async function generateMetadata({
  params: { locale },
}: Props): Promise<Metadata> {
  const t = await getTranslator(locale, "Metadata");

  return {
    title: t("dashboardTitle"),
    description: t("dashboardDescription"),
  };
}

export default function Dashboard() {
  const t = useTranslations("Dashboard");

  return <main className="overflow-hidden mt-20">Dashboard</main>;
}
