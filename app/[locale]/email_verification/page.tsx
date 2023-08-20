import { Metadata } from "next";
import Image from "next/image";
import { getTranslator } from "next-intl/server";
import { useTranslations } from "next-intl";
import { setCookie } from "cookies-next";
import Link from "@/components/ui/Link";
import request from "@/utils/request";

type Props = {
  params: { locale: string };
  searchParams: {
    activationToken?: string;
  };
};

interface EmailVerificationContentProps {
  verificationResult: boolean;
}

export async function generateMetadata({
  params: { locale },
}: Props): Promise<Metadata> {
  const t = await getTranslator(locale, "Metadata");

  return {
    title: t("emailVerificationTitle"),
    description: t("emailVerificationDescription"),
  };
}

export async function verifyToken(activationToken: string) {
  try {
    const result = await request<{ token: string }>("/api/auth/verification", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ activationToken }),
    });
    setCookie("token", result.token);
    return true;
  } catch (error) {
    return false;
  }
}

export default async function EmailVerification({
  searchParams: { activationToken },
}: Props) {
  let verificationResult = false;
  if (activationToken) verificationResult = await verifyToken(activationToken);

  return (
    <main>
      <div className="flex flex-col-reverse justify-center items-center h-screen m-4 lg:flex-row">
        <EmailVerificationContent verificationResult={verificationResult} />
      </div>
    </main>
  );
}

function EmailVerificationContent({
  verificationResult,
}: EmailVerificationContentProps) {
  const t = useTranslations("EmailVerification");

  return (
    <>
      <div className="space-y-6">
        <h1 className="text-5xl font-bold px-16 text-center">
          {verificationResult ? t("titleSuccess") : t("titleError")}
        </h1>
        <h3 className="max-w-sm text-center mx-auto text-zinc-400">
          {verificationResult ? t("subtitleSuccess") : t("subtitleError")}
        </h3>
        <div className="flex justify-center">
          {verificationResult ? (
            <Link href="/dashboard" type="primary" prefetch={false}>
              {t("dashboard")}
            </Link>
          ) : (
            <Link href="/register" type="primary">
              {t("register")}
            </Link>
          )}
        </div>
      </div>
      <Image
        src={
          verificationResult
            ? "/email_verification_success.svg"
            : "/email_verification_error.svg"
        }
        alt="verify_email"
        width="600"
        height="600"
        priority
      />
    </>
  );
}
