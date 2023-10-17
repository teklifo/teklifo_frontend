"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { setCookie } from "cookies-next";
import Link from "@/components/ui/Link";

interface EmailVerificationContentProps {
  token: string | null;
}

export default function EmailVerificationContent({
  token,
}: EmailVerificationContentProps) {
  useEffect(() => {
    setCookie("token", token);
  }, [token]);

  const t = useTranslations("EmailVerification");

  return (
    <>
      <div className="space-y-6">
        <h1 className="text-5xl font-bold mx-16 text-center">
          {token ? t("titleSuccess") : t("titleError")}
        </h1>
        <h3 className="max-w-sm text-center px-4 mx-auto text-zinc-500">
          {token ? t("subtitleSuccess") : t("subtitleError")}
        </h3>
        <div className="flex justify-center">
          {token ? (
            <Link href="/" type="primary">
              {t("home")}
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
          token
            ? "/email_verification_success.svg"
            : "/email_verification_error.svg"
        }
        alt="verify_email"
        width="600"
        height="600"
        priority
        className="max-w-2xl"
      />
    </>
  );
}
