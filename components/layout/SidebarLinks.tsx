"use client";

import { useTranslations } from "next-intl";
import { usePathname } from "next-intl/client";
import { LogIn, User, PackageSearch, Briefcase } from "lucide-react";
import SidebarItem from "@/components/ui/SidebarItem";
import { UserType } from "@/types";

type SidebarLinks = {
  user: UserType | null;
};

const SidebarLinks = ({ user }: SidebarLinks) => {
  const t = useTranslations("Layout");

  const pathname = usePathname();

  const links = [
    {
      title: t("getStartedBtn"),
      href: "/login",
      icon: <LogIn />,
      isPublic: true,
      isForGuest: true,
    },
    {
      title: t("userProfile"),
      href: "/edit_user",
      icon: <User />,
      isPublic: false,
      isForGuest: false,
    },
    {
      title: t("userCompanies"),
      href: "/user_companies",
      icon: <Briefcase />,
      isPublic: false,
      isForGuest: false,
    },
    {
      title: t("products"),
      href: "/products",
      icon: <PackageSearch />,
      isPublic: true,
      isForGuest: false,
    },
    {
      title: t("companies"),
      href: "/companies",
      icon: <Briefcase />,
      isPublic: true,
      isForGuest: false,
    },
  ];

  return (
    <ul className="space-y-2 font-medium pt-4">
      {links.map(
        ({ title, href, icon, isPublic, isForGuest }, index) =>
          ((isPublic && !isForGuest) ||
            (!isPublic && user) ||
            (!user && isForGuest)) && (
            <SidebarItem
              key={index}
              href={href}
              title={title}
              isActive={pathname === href}
              icon={icon}
            />
          )
      )}
    </ul>
  );
};

export default SidebarLinks;
