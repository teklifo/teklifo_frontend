import { Metadata } from "next";
import Image from "next/image";
import { cookies } from "next/headers";
import { getTranslator } from "next-intl/server";
import { useTranslations } from "next-intl";
import Divider from "@/components/ui/Divider";
import Link from "@/components/ui/Link";
import { fetchUser } from "@/app/actions/auth";
import request from "@/utils/request";
import { CompanyType, PaginationType } from "@/types/";

type Props = {
  params: { locale: string };
};

type PaginatedData = {
  result: CompanyType[];
  pagination: PaginationType;
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

async function getUserCompanies() {
  const nextCookies = cookies();
  const token = nextCookies.get("token")?.value ?? "";
  const locale = nextCookies.get("NEXT_LOCALE")?.value ?? "az";

  if (!token) {
    throw new Error("No user");
  }

  try {
    const user = await fetchUser(token, locale);
    if (!user) throw new Error("No user");
    return await request<PaginatedData>(`/api/companies?page=${1}&limit=10`);
  } catch (error) {
    throw error;
  }
}

export default async function UserCompanies() {
  const data = await getUserCompanies();
  return <UserCompaniesContent data={data} />;
}

function UserCompaniesContent({ data }: { data: PaginatedData }) {
  const t = useTranslations("UserCompanies");

  const { result, pagination } = data;

  return (
    <main className="my-10 mx-4 md:mx-8">
      <h1 className="text-3xl font-bold">{t("title")}</h1>
      <h3 className="text-zinc-400 mt-1 mb-4">{t("subtitle")}</h3>
      <Divider classes="my-4" />
      <div className="w-full flex flex-row justify-center items-center md:justify-start">
        <Link href="/dashboard/create_company" type="secondary">
          {t("createNewCompany")}
        </Link>
      </div>
      <Divider classes="my-4" />
      {result.length === 0 ? (
        <div className="flex flex-col justify-center items-center my-10 space-y-12">
          <Image
            src="/my_companies.svg"
            alt="my_companies"
            width="400"
            height="400"
            priority
          />
          <h5 className="text-2xl text-center">{t("noCompanies")}</h5>
        </div>
      ) : null}
    </main>
  );
}
