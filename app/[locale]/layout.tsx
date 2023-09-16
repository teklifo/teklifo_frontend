import "./globals.css";
import { Rubik } from "next/font/google";
import { useLocale, NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import Providers from "@/app/[locale]/providers";

const inter = Rubik({ subsets: ["latin"], weight: "400" });

type Props = {
  locale: string;
};

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: Props;
}) {
  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html>
      <body className={`${inter.className} dark:bg-zinc-900`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Providers>{children}</Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
