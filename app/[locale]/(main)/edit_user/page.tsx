import { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { getTranslator } from "next-intl/server";
import { useTranslations } from "next-intl";
import { User } from "lucide-react";
import { fetchUser } from "@/app/actions/auth";
import EditUserForm from "@/components/edit_user/EditUserForm";
import { UserType } from "@/types";

type Props = {
  params: { locale: string };
};

type CompanyContentProps = {
  user: UserType;
};

export async function generateMetadata({
  params: { locale },
}: Props): Promise<Metadata> {
  const t = await getTranslator(locale, "Metadata");

  const nextCookies = cookies();
  const token = nextCookies.get("token")?.value ?? "";
  const user = token ? await fetchUser(token, locale) : null;
  if (!user) {
    return {
      title: `${t("projectName")}`,
      description: "",
    };
  }

  return {
    title: `${user.name} | ${t("editUserTitle")}`,
    description: t("editUserDescription"),
  };
}

export default async function EditUser({ params: { locale } }: Props) {
  const nextCookies = cookies();
  const token = nextCookies.get("token")?.value ?? "";
  const user = token ? await fetchUser(token, locale) : null;
  if (!user) return notFound();

  return <EditUserContent user={user} />;
}

function EditUserContent({ user }: CompanyContentProps) {
  const t = useTranslations("EditUser");

  return (
    <div className="flex flex-col items-center my-0 md:my-5">
      <div className="mx-4 md:mx-8">
        <div className="flex flex-row items-start space-x-3">
          <User size={36} />
          <h1 className="text-2xl font-bold md:text-3xl">{t("title")}</h1>
        </div>
        <h3 className="text-zinc-500 mt-1 mb-4">{t("subtitle")}</h3>
        <EditUserForm user={user} />
      </div>
    </div>
  );
}
