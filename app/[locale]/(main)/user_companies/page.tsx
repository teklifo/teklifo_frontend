import { Metadata } from "next";
import Image from "next/image";
import { cookies } from "next/headers";
import { getTranslator } from "next-intl/server";
import { useTranslations } from "next-intl";
import Avatar from "@/components/utils/Avatar";
import Divider from "@/components/ui/Divider";
import Link from "@/components/ui/Link";
import Card from "@/components/ui/Card";
import Pagination from "@/components/ui/Pagination";
import { fetchUser } from "@/app/actions/auth";
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
    title: t("userCompaniesTitle"),
    description: t("userCompaniesDescription"),
  };
}

async function getUserCompanies(page: number) {
  const nextCookies = cookies();
  const token = nextCookies.get("token")?.value ?? "";
  const locale = nextCookies.get("NEXT_LOCALE")?.value ?? "az";

  if (!token) {
    throw new Error("No user");
  }

  try {
    const user = await fetchUser(token, locale);
    if (!user) throw new Error("No user");
    return await request<PaginatedData>(
      `/api/companies?page=${page}&limit=10`,
      {
        cache: "no-cache",
      }
    );
  } catch (error) {
    throw error;
  }
}

export default async function UserCompanies({ searchParams: { page } }: Props) {
  const data = await getUserCompanies(page ?? 1);
  return <UserCompaniesContent data={data} />;
}

function UserCompaniesContent({ data }: { data: PaginatedData }) {
  const t = useTranslations("UserCompanies");

  const { result, pagination } = data;

  return (
    <div className="my-5 mx-4 md:my-10 md:mx-8">
      <h1 className="text-3xl font-bold">{t("title")}</h1>
      <h3 className="text-zinc-400 mt-1 mb-4">{t("subtitle")}</h3>
      <Divider classes="my-4" />
      <div className="w-full flex flex-row justify-center items-center md:justify-start">
        <Link href="/create_company" type="secondary">
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
      ) : (
        <>
          <div className="grid grid-flow-row auto-rows-max place-items-center grid-cols-1 gap-4 pt-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {result.map((company) => (
              <Card key={company.id} classes="h-full">
                <div className="flex flex-col items-center py-10 px-2">
                  <Avatar image={company.image} name={company.name} />
                  <h5 className="mb-1 text-xl font-medium text-zinc-900 dark:text-white">
                    {company.name}
                  </h5>
                  <span className="text-sm text-zinc-500 dark:text-zinc-400">
                    {company.tin}
                  </span>
                  <span className="mt-3 text-sm text-center text-zinc-500 dark:text-zinc-400">
                    {company.shortDescription?.slice(0, 100)}
                  </span>
                  <div className="flex mt-4 space-x-3 md:mt-6">
                    <Link href={`/companies/${company.id}`} type="primary">
                      {t("more")}
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          <div className="w-full flex flex-row justify-center items-center py-10">
            <Pagination href="/user_companies?page=" pagination={pagination} />
          </div>
        </>
      )}
    </div>
  );
}
