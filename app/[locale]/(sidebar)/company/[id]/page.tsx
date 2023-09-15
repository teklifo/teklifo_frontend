import { Metadata } from "next";
import { cookies } from "next/headers";
import { getTranslator } from "next-intl/server";
import { useTranslations } from "next-intl";
import { fetchUser } from "@/app/actions/auth";
import AvatarUpload from "@/components/utils/AvatarUpload";
import Avatar from "@/components/utils/Avatar";
import request from "@/utils/request";
import { CompanyType, ContactsType } from "@/types";

type Props = {
  params: { locale: string; id: string };
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

export default async function Company({ params: { id } }: Props) {
  const company = await getCompany(id);

  const nextCookies = cookies();
  const token = nextCookies.get("token")?.value ?? "";
  const locale = nextCookies.get("NEXT_LOCALE")?.value ?? "az";

  const user = token ? await fetchUser(token, locale) : null;

  const isMember = user
    ? (company.users?.filter((element) => element.userId === user.id) ?? [])
        .length > 0 ?? false
    : false;

  return <CompanyContent company={company} isMember={isMember} />;
}

function CompanyContent({
  company,
  isMember,
}: {
  company: CompanyType;
  isMember: boolean;
}) {
  const t = useTranslations("Company");

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
    <main className="my-10 mx-4 md:mx-8 space-y-6">
      <div className="flex flex-col justify-start space-x-0 items-center w-full py-4 px-8 bg-white border border-zinc-200 rounded-lg dark:bg-zinc-800 dark:border-zinc-700 md:flex-row md:justify-start md:space-x-6">
        <div>
          {isMember ? (
            <AvatarUpload image={company.image} name={company.name} />
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
      <div className="flex flex-col justify-start items-start space-y-3 w-full py-4 px-8 bg-white border border-zinc-200 rounded-lg dark:bg-zinc-800 dark:border-zinc-700">
        <h5 className="text-lg font-extrabold text-start">
          {t("aboutSupplier")}
        </h5>
        <h2 className="text-start text-zinc-400">{company.description}</h2>
      </div>
      {company.contacts && (
        <div className="flex flex-col justify-start items-start space-y-3 w-full py-4 px-8 bg-white border border-zinc-200 rounded-lg dark:bg-zinc-800 dark:border-zinc-700">
          <h5 className="text-lg font-extrabold text-start">{t("contacts")}</h5>
          <div className="grid grid-cols-1 gap-4 pt-4  md:grid-cols-2 md:w-2/3">
            <ContactsBlock array={phones} label={t("phones")} />
            <ContactsBlock array={emails} label={t("emails")} />
            <ContactsBlock array={addresses} label={t("addresses")} />
            <ContactsBlock array={websites} label={t("websites")} />
          </div>
        </div>
      )}
    </main>
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
