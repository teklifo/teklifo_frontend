import NextLink from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import Link from "@/components/ui/Link";

const Navbar = () => {
  const t = useTranslations("Layout");

  return (
    <header className="w-full fixed top-0 z-10 bg-white border-b border-zinc-100">
      <nav className="container flex items-center justify-between mx-auto px-6 py-1 md:py-2">
        <NextLink
          href="/"
          className="flex justify-center items-center text-sky-500"
        >
          <Image src="/logo.svg" alt="Tekliff Logo" width="48" height="18" />
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
        <Link href="/dashboard" type="primary">
          {t("getStartedBtn")}
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;