import { createTranslator } from "next-intl";

const serverTranslator = async (
  request: Request,
  namespace: string | undefined
) => {
  const locale = request.headers.get("Accept-Language") ?? "az";

  const messages = (await import(`../messages/${locale}.json`)).default;

  return createTranslator({ locale, messages, namespace });
};

export default serverTranslator;
