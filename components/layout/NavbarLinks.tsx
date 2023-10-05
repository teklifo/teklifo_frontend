"use client";

import NextLink from "next/link";
import { useTranslations } from "next-intl";
import { usePathname } from "next-intl/client";

const NavbarLinks = () => {
  const t = useTranslations("Layout");

  const path = usePathname();

  const links = [
    {
      title: t("products"),
      href: "/products",
    },
    {
      title: t("companies"),
      href: "/companies",
    },
  ];

  return (
    <div className="hidden md:flex space-x-6">
      {links.map(({ title, href }, index) => (
        <NextLink key={index} className="hover:text-sky-500" href={href}>
          <span className={path === href ? "text-sky-500" : ""}>{title}</span>
        </NextLink>
      ))}
    </div>
  );
};

export default NavbarLinks;
