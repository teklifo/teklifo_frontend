import { Metadata } from "next";
import Image from "next/image";
import { cookies } from "next/headers";
import { getTranslator } from "next-intl/server";
import { useTranslations } from "next-intl";
import { Briefcase } from "lucide-react";
import Divider from "@/components/ui/Divider";
import Pagination from "@/components/ui/Pagination";
import CompanyCard from "@/components/utils/CompanyCard";
import request from "@/utils/request";
import { CompanyType, PaginationType } from "@/types";

type Props = {
  params: { locale: string };
  searchParams: {
    page?: number;
  };
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
    title: t("companiesTitle"),
    description: t("companiesDescription"),
  };
}

async function getCompanies(page: number) {
  const nextCookies = cookies();
  const locale = nextCookies.get("NEXT_LOCALE")?.value ?? "az";

  try {
    return await request<PaginatedData>(
      `/api/companies?page=${page}&limit=10`,
      {
        cache: "no-cache",
        headers: { "Accept-Language": locale },
      }
    );
  } catch (error) {
    throw error;
  }
}

export default async function Companies({ searchParams: { page } }: Props) {
  const data = await getCompanies(page ?? 1);
  return <CompaniesContent data={data} />;
}

function CompaniesContent({ data }: { data: PaginatedData }) {
  const t = useTranslations("Companies");

  const { result, pagination } = data;

  return (
    <div className="my-2 mx-4 md:my-5 md:mx-8">
      <div className="flex flex-row items-start space-x-3">
        <Briefcase size={36} />
        <h1 className="text-2xl font-bold md:text-3xl">{t("title")}</h1>
      </div>
      <h3 className="text-zinc-500 mt-1 mb-4">{t("subtitle")}</h3>
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
          <h5 className="max-w-md text-xl text-center text-zinc-500">
            {t("noCompanies")}
          </h5>
        </div>
      ) : (
        <>
          <div className="grid grid-flow-row auto-rows-max place-items-center grid-cols-1 gap-4 pt-4 md:place-items-start md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {result.map((company) => (
              <CompanyCard key={company.id} company={company} />
            ))}
          </div>
          <div className="w-full flex flex-row justify-center items-center py-10">
            <Pagination href="/companies?page=" pagination={pagination} />
          </div>
        </>
      )}
    </div>
  );
}
