import { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import NextLink from "next/link";
import Image from "next/image";
import { useLocale } from "next-intl";
import { getTranslator } from "next-intl/server";
import { useTranslations } from "next-intl";
import {
  Pencil,
  Instagram,
  Facebook,
  Youtube,
  Linkedin,
  Phone,
} from "lucide-react";
import { fetchUser } from "@/app/actions/auth";
import CompanyAvatar from "@/components/edit_company/CompanyAvatar";
import Pagination from "@/components/ui/Pagination";
import Link from "@/components/ui/Link";
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
  if (!company)
    return {
      title: `${t("projectName")}`,
      description: "",
    };

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
    return undefined;
  }
}

async function getProducts(companyId: number, page: number) {
  const nextCookies = cookies();
  const locale = nextCookies.get("NEXT_LOCALE")?.value ?? "az";

  try {
    return await request<PaginatedData>(
      `/api/products?companyId=${companyId}&page=${page}&limit=10`,
      {
        headers: {
          "Accept-Language": locale,
        },
      }
    );
  } catch (error) {
    throw error;
  }
}

export default async function Company({
  params: { id },
  searchParams: { page },
}: Props) {
  const company = await getCompany(id);
  if (!company) return notFound();

  const productsData = await getProducts(company.id, page ?? 1);

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
  const currentLocale = useLocale();
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

  let description = company.description;
  if (currentLocale === "ru" && company.descriptionRu) {
    description = company.descriptionRu;
  }

  let shortDescription = company.shortDescription;
  if (currentLocale === "ru" && company.shortDescriptionRu) {
    shortDescription = company.shortDescriptionRu;
  }

  return (
    <div className="my-2 mx-4 md:my-5 md:mx-8">
      {/* About company */}
      <div className="p-8 space-y-3 border bg-white border-zinc-300 rounded-lg dark:bg-zinc-800 dark:border-zinc-700">
        <div className="flex flex-col items-center md:justify-between md:flex-row">
          <div className="flex flex-col justify-start space-x-0 items-center w-full md:flex-row md:justify-start md:space-x-6">
            <div>
              {isMember ? (
                <CompanyAvatar company={company} />
              ) : (
                <Avatar image={company.image} name={company.name} />
              )}
            </div>
            <div className="space-y-3">
              <div>
                <h1 className="text-center text-3xl font-bold md:text-start">
                  <span>{company.name}</span>
                </h1>
                <h2 className="flex flex-col text-sm text-center text-zinc-500 md:text-start dark:text-zinc-400">
                  <span>{`${t("tin")}: ${company.tin}`}</span>
                  <span>{t(company.entityType)}</span>
                </h2>
              </div>
              <h3 className="text-center text-zinc-500 mb-4 md:text-start dark:text-zinc-400">
                {shortDescription}
              </h3>
            </div>
          </div>
          {isMember && (
            <div className="h-fit my-2">
              <Link href={`/edit_company/${company.id}`} type="secondary">
                <div className="flex space-x-2">
                  <Pencil />
                  <span>{t("edit")}</span>
                </div>
              </Link>
            </div>
          )}
        </div>
        {/* Socials */}
        <div className="flex flex-row items-center space-x-3 text-zinc-700 dark:text-zinc-300">
          {company.socials.instagram && (
            <NextLink href={company.socials.instagram}>
              <Instagram size={24} />
            </NextLink>
          )}
          {company.socials.facebook && (
            <NextLink href={company.socials.facebook} target="_blank">
              <Facebook size={24} />
            </NextLink>
          )}
          {company.socials.youtube && (
            <NextLink href={company.socials.youtube} target="_blank">
              <Youtube size={24} />
            </NextLink>
          )}
          {company.socials.linkedin && (
            <NextLink href={company.socials.linkedin} target="_blank">
              <Linkedin size={24} />
            </NextLink>
          )}
          {company.socials.whatsapp && (
            <NextLink href={`tel:${company.socials.whatsapp}`} target="_blank">
              <Phone size={24} />
            </NextLink>
          )}
        </div>
        <div className="flex flex-col justify-start items-start space-y-3 w-full bg-whitedark:bg-zinc-800">
          <h4 className="text-lg font-extrabold text-start">
            {t("aboutSupplier")}
          </h4>
          <h2 className="text-sm text-start text-zinc-500 dark:text-zinc-400">
            {description}
          </h2>
        </div>
        {company.contacts && company.contacts.length > 0 && (
          <div className="flex flex-col justify-start items-start space-y-3 w-full bg-whitedark:bg-zinc-800">
            <h4 className="text-lg font-extrabold text-start">
              {t("contacts")}
            </h4>
            <div className="grid grid-cols-1 gap-4 pt-4  md:grid-cols-2 md:w-2/3">
              <ContactsBlock array={phones} label={t("phones")} type="tel" />
              <ContactsBlock array={emails} label={t("emails")} type="mailto" />
              <ContactsBlock
                array={addresses}
                label={t("addresses")}
                type="address"
              />
              <ContactsBlock
                array={websites}
                label={t("websites")}
                type="url"
              />
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
            <div className="grid grid-flow-row auto-rows-max place-items-center grid-cols-1 gap-4 pt-4 md:place-items-start md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <div className="w-full flex flex-row justify-center items-center py-10">
              <Pagination
                href={`/companies/${company.id}?page=`}
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
              className="max-w-md"
            />
            <h5 className="max-w-md text-xl text-center text-zinc-500 dark:text-zinc-400">
              {t("noProducts")}
            </h5>
          </div>
        )}
      </div>
    </div>
  );
}

function ContactsBlock({
  array,
  label,
  type,
}: {
  array: ContactsType[] | undefined;
  label: String;
  type: "mailto" | "tel" | "url" | "address";
}) {
  return (
    array &&
    array.length > 0 && (
      <div className="space-y-1">
        <h6 className="text-sm text-zinc-500 dark:text-zinc-400">{label}</h6>
        {array.map((element, index) => {
          if (type === "address") {
            return (
              <address key={index} className="block not-italic">
                {element.value}
              </address>
            );
          }

          return (
            <a
              key={index}
              className="block underline text-sky-500"
              href={`${type === "url" ? "" : `${type}:`}${element.value}`}
              target="_blank"
            >
              {removeHttp(element.value)}
            </a>
          );
        })}
      </div>
    )
  );
}

function removeHttp(url: string) {
  return url.replace(/^https?:\/\//, "");
}
