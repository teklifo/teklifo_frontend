import NextLink from "next/link";
import { useTranslations } from "next-intl";
import { LogIn, Menu } from "lucide-react";
import NavbarLinks from "@/components/layout/NavbarLinks";
import Link from "@/components/ui/Link";
import Logo from "@/components/layout/Logo";
import UserDropdown from "@/components/layout/UserDropdown";
import LanguageSwitch from "@/components/layout/LanguageSwitch";
import { UserType } from "@/types";

type NavbarProps = {
  user: UserType | null;
  toggleSidebar: () => void;
};

const Navbar = ({ user, toggleSidebar }: NavbarProps) => {
  const t = useTranslations("Layout");

  return (
    <header className="w-full fixed top-0 z-50 bg-white shadow dark:shadow-none dark:border dark:bg-zinc-900 dark:border-zinc-700">
      <nav>
        <div className="hidden container items-center justify-between mx-auto px-6 py-1 md:py-2 lg:flex">
          <NextLink
            href="/"
            className="flex justify-center items-center text-sky-500"
          >
            <Logo />
          </NextLink>
          <NavbarLinks />
          <div className="flex justify-center items-center space-x-12">
            {user ? (
              <UserDropdown user={user} />
            ) : (
              <Link href="/login" type="primary">
                <div className="flex space-x-2">
                  <span>{t("getStartedBtn")}</span>
                  <LogIn />
                </div>
              </Link>
            )}
            <LanguageSwitch />
          </div>
        </div>
        <div className="flex items-center justify-between px-6 py-1 md:py-2 lg:hidden">
          <div className="flex items-center justify-start">
            <button
              aria-controls="sidebar"
              type="button"
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              onClick={toggleSidebar}
            >
              <span className="sr-only">Open sidebar</span>
              <Menu />
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
