import { Metadata } from "next";
import { cookies } from "next/headers";
import { getTranslator } from "next-intl/server";
import request from "@/utils/request";
import EmailVerificationContent from "@/components/email_verification/EmailVerificationContent";

type Props = {
  params: { locale: string };
  searchParams: {
    activationToken?: string;
  };
};

export async function generateMetadata({
  params: { locale },
}: Props): Promise<Metadata> {
  const t = await getTranslator(locale, "Metadata");

  return {
    title: t("emailVerificationTitle"),
    description: t("emailVerificationDescription"),
  };
}

async function verifyToken(activationToken: string) {
  const nextCookies = cookies();
  const locale = nextCookies.get("NEXT_LOCALE")?.value ?? "az";
  try {
    const result = await request<{ token: string }>("/api/auth/verification", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Accept-Language": locale,
      },
      cache: "no-cache",
      body: JSON.stringify({ activationToken }),
    });
    return result.token;
  } catch (error) {
    return null;
  }
}

export default async function EmailVerification({
  searchParams: { activationToken },
}: Props) {
  let token: string | null = null;
  if (activationToken) token = await verifyToken(activationToken);

  return (
    <main>
      <div className="flex flex-col-reverse justify-center items-center min-h-[80vh] m-4 lg:flex-row">
        <EmailVerificationContent token={token} />
      </div>
    </main>
  );
}
