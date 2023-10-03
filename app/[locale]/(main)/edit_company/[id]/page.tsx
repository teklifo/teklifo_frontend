import { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { getTranslator } from "next-intl/server";
import { useTranslations } from "next-intl";
import { Briefcase } from "lucide-react";
import { fetchUser } from "@/app/actions/auth";
import EditCompanyForm from "@/components/edit_company/EditCompanyForm";
import request from "@/utils/request";
import { CompanyType } from "@/types";

type Props = {
  params: { locale: string; id: string };
};

type CompanyContentProps = {
  company: CompanyType;
};

export async function generateMetadata({
  params: { locale, id },
}: Props): Promise<Metadata> {
  const t = await getTranslator(locale, "Metadata");

  const company = await getCompany(id);
  if (!company)
    return {
      title: `${t("projectName")}`,
      description: "",
    };

  return {
    title: `${company.name} | ${t("editCompanyTitle")} | ${t("projectName")}`,
    description: t("editCompanyDescription"),
  };
}

async function getCompany(companyId: string) {
  const nextCookies = cookies();
  const locale = nextCookies.get("NEXT_LOCALE")?.value ?? "az";

  try {
    return await request<CompanyType>(`/api/companies/${companyId}`, {
      headers: {
        "Accept-Language": locale,
      },
    });
  } catch (error) {
    return undefined;
  }
}

export default async function EditCompany({ params: { id } }: Props) {
  const company = await getCompany(id);
  if (!company) return notFound();

  const nextCookies = cookies();
  const token = nextCookies.get("token")?.value ?? "";
  const locale = nextCookies.get("NEXT_LOCALE")?.value ?? "az";

  const user = token ? await fetchUser(token, locale) : null;

  const isMember = user
    ? (company.users?.filter((element) => element.userId === user.id) ?? [])
        .length > 0 ?? false
    : false;

  if (!isMember) return notFound();

  return <EditCompanyContent company={company} />;
}

function EditCompanyContent({ company }: CompanyContentProps) {
  const t = useTranslations("CreateEditCompany");

  return (
    <div className="flex flex-col items-center my-0 md:my-5">
      <div className="mx-4 md:mx-8">
        <div className="flex flex-row items-start space-x-3">
          <Briefcase size={36} />
          <h1 className="text-3xl font-bold">{t("editTitle")}</h1>
        </div>
        <h3 className="text-zinc-400 mt-1 mb-4">{t("editSubtitle")}</h3>
        <EditCompanyForm company={company} />
      </div>
    </div>
  );
}
