import { Metadata } from "next";
import { getTranslator } from "next-intl/server";
import LoginForm from "@/components/login/LoginForm";

type Props = {
  params: { locale: string };
};

export async function generateMetadata({
  params: { locale },
}: Props): Promise<Metadata> {
  const t = await getTranslator(locale, "Metadata");

  return {
    title: t("homeTitle"),
    description: t("homeDescription"),
  };
}

export default function Login() {
  return (
    <main className="overflow-hidden mt-20">
      <LoginForm />
    </main>
  );
}
