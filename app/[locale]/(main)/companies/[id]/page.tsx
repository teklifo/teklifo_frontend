import { Metadata } from "next";
import { cookies } from "next/headers";
import Image from "next/image";
import { getTranslator } from "next-intl/server";
import { useTranslations } from "next-intl";
import { fetchUser } from "@/app/actions/auth";
import CompanyAvatar from "@/components/company/CompanyAvatar";
import Pagination from "@/components/ui/Pagination";
import Avatar from "@/components/utils/Avatar";
import ProductCard from "@/components/utils/ProductCard";
import request from "@/utils/request";
import {
  CompanyType,
  ContactsType,
  ProductType,
  PaginationType,
} from "@/types";

type Props = {
  params: { locale: string; id: string };
  searchParams: {
    page?: number;
  };
};

type PaginatedData = {
  result: ProductType[];
  pagination: PaginationType;
};

export async function generateMetadata({
  params: { locale, id },
}: Props): Promise<Metadata> {
  const t = await getTranslator(locale, "Metadata");

  const company = await getCompany(id);

  return {
    title: `${company.name} | ${t("projectName")}`,
    description: company.description,
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
    throw error;
  }
}

async function getProducts(page: number) {
  const nextCookies = cookies();
  const locale = nextCookies.get("NEXT_LOCALE")?.value ?? "az";

  try {
    return await request<PaginatedData>(`/api/products?page=${page}&limit=10`, {
      headers: {
        "Accept-Language": locale,
      },
    });
  } catch (error) {
    throw error;
  }
}

export default async function Company({
  params: { id },
  searchParams: { page },
}: Props) {
  const company = await getCompany(id);
  const productsData = await getProducts(page ?? 1);

  const nextCookies = cookies();
  const token = nextCookies.get("token")?.value ?? "";
  const locale = nextCookies.get("NEXT_LOCALE")?.value ?? "az";

  const user = token ? await fetchUser(token, locale) : null;

  const isMember = user
    ? (company.users?.filter((element) => element.userId === user.id) ?? [])
        .length > 0 ?? false
    : false;

  return (
    <CompanyContent
      company={company}
      isMember={isMember}
      productsData={productsData}
    />
  );
}

function CompanyContent({
  company,
  isMember,
  productsData,
}: {
  company: CompanyType;
  isMember: boolean;
  productsData: PaginatedData;
}) {
  const t = useTranslations("Company");

  const { result: products, pagination } = productsData;

  const phones = company.contacts?.filter(
    (contact) => contact.type === "phone"
  );
  const emails = company.contacts?.filter(
    (contact) => contact.type === "email"
  );
  const addresses = company.contacts?.filter(
    (contact) => contact.type === "address"
  );
  const websites = company.contacts?.filter(
    (contact) => contact.type === "website"
  );

  return (
    <div className="my-5 mx-4 md:mx-8">
      {/* About company */}
      <div className="px-8 border space-y-3 py-4 border-zinc-200 rounded-lg dark:border-zinc-700">
        <div className="flex flex-col justify-start space-x-0 items-center w-full bg-whitedark:bg-zinc-800 md:flex-row md:justify-start md:space-x-6">
          <div>
            {isMember ? (
              <CompanyAvatar company={company} />
            ) : (
              <Avatar image={company.image} name={company.name} />
            )}
          </div>
          <div>
            <h1 className="text-center text-3xl font-bold md:text-start">
              {company.name}
            </h1>
            <h3 className="text-center text-zinc-400 mt-1 mb-4 md:text-start">
              {company.shortDescription}
            </h3>
          </div>
        </div>
        <div className="flex flex-col justify-start items-start space-y-3 w-full bg-whitedark:bg-zinc-800">
          <h4 className="text-lg font-extrabold text-start">
            {t("aboutSupplier")}
          </h4>
          <h2 className="text-sm text-start text-zinc-400">
            {company.description}
          </h2>
        </div>
        {company.contacts && company.contacts.length > 0 && (
          <div className="flex flex-col justify-start items-start space-y-3 w-full bg-whitedark:bg-zinc-800">
            <h4 className="text-lg font-extrabold text-start">
              {t("contacts")}
            </h4>
            <div className="grid grid-cols-1 gap-4 pt-4  md:grid-cols-2 md:w-2/3">
              <ContactsBlock array={phones} label={t("phones")} />
              <ContactsBlock array={emails} label={t("emails")} />
              <ContactsBlock array={addresses} label={t("addresses")} />
              <ContactsBlock array={websites} label={t("websites")} />
            </div>
          </div>
        )}
      </div>
      {/* Products */}
      <div className="py-8">
        <h4 className="text-center text-2xl font-extrabold md:text-start">
          {t("products")}
        </h4>
        {products.length > 0 ? (
          <>
            <div className="grid grid-flow-row auto-rows-max place-items-center grid-cols-1 gap-4 pt-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <div className="w-full flex flex-row justify-center items-center py-10">
              <Pagination
                href="/user_companies?page="
                pagination={pagination}
              />
            </div>
          </>
        ) : (
          <div className="flex flex-col justify-center items-center my-10 space-y-12">
            <Image
              src="/no_products.svg"
              alt="no_products"
              width="400"
              height="400"
              priority
            />
            <h5 className="max-w-md text-2xl text-center">{t("noProducts")}</h5>
          </div>
        )}
      </div>
    </div>
  );
}

function ContactsBlock({
  array,
  label,
}: {
  array: ContactsType[] | undefined;
  label: String;
}) {
  return (
    array &&
    array.length > 0 && (
      <div className="space-y-1">
        <h6 className="text-sm text-zinc-400">{label}</h6>
        {array.map((element, index) => (
          <span key={index} className="block">
            {element.value}
          </span>
        ))}
      </div>
    )
  );
}
