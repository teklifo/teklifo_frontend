import { NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { withAuth } from "next-auth/middleware";

const locales = ["az", "ru"];
const publicPages = ["/", "/login", "/registration", "/user_verification"];

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale: "az",
});

const authMiddleware = withAuth(
  function onSuccess(req) {
    return intlMiddleware(req);
  },
  {
    callbacks: {
      authorized: ({ token }) => token != null,
    },
    pages: {
      signIn: "/login",
    },
  }
);

export default async function middleware(request: NextRequest) {
  const publicPathnameRegex = RegExp(
    `^(/(${locales.join("|")}))?(${publicPages.join("|")})?/?$`,
    "i"
  );
  const isPublicPage = publicPathnameRegex.test(request.nextUrl.pathname);

  if (isPublicPage) {
    return intlMiddleware(request);
  } else {
    return (authMiddleware as any)(request);
  }
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
