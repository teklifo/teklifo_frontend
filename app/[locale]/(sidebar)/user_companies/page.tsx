import { Metadata } from "next";
import Image from "next/image";
import { cookies } from "next/headers";
import { getTranslator } from "next-intl/server";
import { useTranslations } from "next-intl";
import Divider from "@/components/ui/Divider";
import Link from "@/components/ui/Link";
import Card from "@/components/ui/Card";
import { fetchUser } from "@/app/actions/auth";
import request from "@/utils/request";
import { CompanyType, PaginationType } from "@/types";

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
        <div className="grid place-items-center grid-cols-1 gap-4 pt-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {result.map((company) => (
            <Card key={company.id}>
              <div className="flex flex-col items-center py-10">
                {company.image ? (
                  <Image
                    className="mb-3 rounded-full shadow-lg"
                    src="/docs/images/people/profile-picture-3.jpg"
                    width="96"
                    height="96"
                    alt={company.name}
                  />
                ) : (
                  <div className="w-24 h-24 mb-3 rounded-full shadow-lg flex justify-center items-center bg-sky-500 text-white dark:text-black">
                    <span className="text-3xl font-extrabold">
                      {company.name[0].toUpperCase()}
                    </span>
                  </div>
                )}
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
                  <Link href={`/company/${company.id}`} type="primary">
                    {t("more")}
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </main>
  );
}
