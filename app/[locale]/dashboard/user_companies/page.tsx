import { Metadata } from "next";
import { getTranslator } from "next-intl/server";
import { useTranslations } from "next-intl";
import Link from "@/components/ui/Link";

type Props = {
  params: { locale: string };
};

export async function generateMetadata({
  params: { locale },
}: Props): Promise<Metadata> {
  const t = await getTranslator(locale, "Metadata");

  return {
    title: t("userCompaniesTitle"),
    description: t("userCompaniesDescription"),
  };
}

export default function UserCompanies() {
  const t = useTranslations("UserCompanies");

  return (
    <main className="overflow-hidden mt-20">
      <div className="">
        <Link href="/dashboard/create_company" type="primary">
          {t("createNewCompany")}
        </Link>
      </div>
    </main>
  );
}
