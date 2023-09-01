import { Metadata } from "next";
import Image from "next/image";
import { cookies } from "next/headers";
import { getTranslator } from "next-intl/server";
import { useTranslations } from "next-intl";
import Link from "@/components/ui/Link";
import { fetchUser } from "@/app/actions/auth";
import request from "@/utils/request";
import { CompanyType, PaginationType } from "@/types";

type Props = {
  params: { locale: string; id: string };
};

export async function generateMetadata({
  params: { locale },
}: Props): Promise<Metadata> {
  const t = await getTranslator(locale, "Metadata");

  return {
    title: "Some company",
    description: "Some company",
  };
}

async function getCompany(companyId: string) {
  const nextCookies = cookies();
  const token = nextCookies.get("token")?.value ?? "";
  const locale = nextCookies.get("NEXT_LOCALE")?.value ?? "az";

  if (!token) {
    throw new Error("No user");
  }

  try {
    const user = await fetchUser(token, locale);
    if (!user) throw new Error("No user");
    return await request<CompanyType>(`/api/companies/${companyId}`);
  } catch (error) {
    throw error;
  }
}

export default async function Company({ params: { id } }: Props) {
  const company = await getCompany(id);
  return <CompanyContent company={company} />;
}

function CompanyContent({ company }: { company: CompanyType }) {
  const t = useTranslations("Company");

  return (
    <main>
      <div className="flex flex-col-reverse justify-center items-center h-screen m-4 lg:flex-row">
        <div className="space-y-6">
          <h1 className="text-5xl font-bold px-16 text-center">{t("title")}</h1>
          <h3 className="max-w-sm text-center mx-auto text-zinc-400">
            {t("subtitle")}
          </h3>
          <div className="flex justify-center">
            <Link href="/" type="primary">
              {t("home")}
            </Link>
          </div>
        </div>
        <Image
          src="/verify_email.svg"
          alt="verify_email"
          width="600"
          height="600"
          priority
        />
      </div>
    </main>
  );
}
