import NextLink from "next/link";
import { useTranslations } from "next-intl";
import Link from "@/components/ui/Link";
import Logo from "@/components/layout/Logo";
import UserDropdown from "@/components/layout/UserDropdown";
import { UserType } from "@/types";

type NavbarProps = {
  user: UserType | null;
};

const Navbar = ({ user }: NavbarProps) => {
  const t = useTranslations("Layout");

  return (
    <header className="w-full fixed top-0 z-50 bg-white shadow dark:shadow-none dark:border dark:bg-zinc-900 dark:border-zinc-700">
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
        {user ? (
          <UserDropdown user={user} />
        ) : (
          <Link href="/login" type="primary">
            {t("getStartedBtn")}
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
