import { Metadata } from "next";
import { getTranslator } from "next-intl/server";
import { useTranslations } from "next-intl";
import EditCompanyForm from "@/components/edit_company/EditCompanyForm";

type Props = {
  params: { locale: string };
};

export async function generateMetadata({
  params: { locale },
}: Props): Promise<Metadata> {
  const t = await getTranslator(locale, "Metadata");

  return {
    title: t("createCompanyTitle"),
    description: t("createCompanyDescription"),
  };
}

export default function CreateCompany() {
  const t = useTranslations("CreateEditCompany");

  return (
    <main className="overflow-hidden mt-20">
      <div className="mx-8">
        <h1 className="text-2xl font-bold mb-4">{t("createTitle")}</h1>
        <EditCompanyForm />
      </div>
    </main>
  );
}
