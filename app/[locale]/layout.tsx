import "./globals.css";
import { Rubik } from "next/font/google";
import { useLocale, NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";

const inter = Rubik({ subsets: ["latin"], weight: "400" });

type Props = {
  locale: string;
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Props;
}) {
  const locale = useLocale();

  // Show a 404 error if the user requests an unknown locale
  if (params.locale !== locale) {
    notFound();
  }

  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
