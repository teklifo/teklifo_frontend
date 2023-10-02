import { Metadata } from "next";
import { getTranslator } from "next-intl/server";
import { useTranslations } from "next-intl";
import { Briefcase } from "lucide-react";
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
    <div className="flex flex-col items-center my-0 mx-4 md:my-5 md:mx-8">
      <div className="flex flex-row items-start space-x-3">
        <Briefcase size={36} />
        <h1 className="text-3xl font-bold">{t("createTitle")}</h1>
      </div>
      <h3 className="text-zinc-400 mt-1 mb-4">{t("createSubtitle")}</h3>
      <EditCompanyForm />
    </div>
  );
}
