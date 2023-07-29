import { createTranslator } from "next-intl";

const serverTranslator = async (request: Request) => {
  const locale = request.headers.get("Accept-Language") ?? "az";

  const messages = (await import(`../messages/server_${locale}.json`)).default;

  return createTranslator({ locale, messages, namespace: "Users" });
};

export default serverTranslator;
