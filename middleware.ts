import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { fetchUser } from "@/app/actions/auth";

const locales = ["az", "ru"];
const publicPages = [
  "/",
  "/login",
  "/register",
  "/user_verification",
  "/verify_email",
  "/email_verification",
  "/company/*",
];

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale: "az",
});

export default async function middleware(request: NextRequest) {
  const publicPathnameRegex = RegExp(
    `^(/(${locales.join("|")}))?(${publicPages
      .map((page) => page.replace(/\*/, ".*"))
      .join("|")})?/?$`,
    "i"
  );
  const isPublicPage = publicPathnameRegex.test(request.nextUrl.pathname);

  if (isPublicPage) {
    return intlMiddleware(request);
  } else {
    const token = request.cookies.get("token")?.value ?? "";
    const locale = request.cookies.get("NEXT_LOCALE")?.value ?? "az";
    const user = await fetchUser(token, locale);
    if (user) {
      return intlMiddleware(request);
    } else {
      request.cookies.delete("token");
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
