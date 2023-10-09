import NextLink from "next/link";
import { useTranslations } from "next-intl";
import { LogIn } from "lucide-react";
import NavbarLinks from "@/components/layout/NavbarLinks";
import Link from "@/components/ui/Link";
import Logo from "@/components/layout/Logo";
import UserDropdown from "@/components/layout/UserDropdown";
import LanguageSwitch from "@/components/layout/LanguageSwitch";
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
      </nav>
    </header>
  );
};

export default Navbar;
