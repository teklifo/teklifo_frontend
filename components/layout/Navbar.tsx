import NextLink from "next/link";
import { useTranslations } from "next-intl";
import Link from "@/components/ui/Link";
import Logo from "@/components/layout/Logo";

const Navbar = () => {
  const t = useTranslations("Layout");

  return (
    <header className="w-full fixed top-0 z-50 bg-white border-b border-zinc-300 dark:bg-zinc-900 dark:border-zinc-800">
      <nav className="container flex items-center justify-between mx-auto px-6 py-1 md:py-2">
        <NextLink
          href="/"
          className="flex justify-center items-center text-sky-500"
        >
          <Logo />
        </NextLink>
        <div className="hidden md:flex space-x-6">
          <a className="hover:text-sky-500" href="#features">
            {t("features")}
          </a>
          <a className="hover:text-sky-500" href="#">
            Prices
          </a>
          <a className="hover:text-sky-500" href="#">
            About us
          </a>
        </div>
        <Link href="/dashboard" type="primary" prefetch={false}>
          {t("getStartedBtn")}
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;
