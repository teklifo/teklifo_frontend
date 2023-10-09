"use client";

import Image from "next/image";
import { useLocale } from "next-intl";
import { usePathname } from "next-intl/client";
import Link from "next-intl/link";
import Dropdown from "@/components/ui/Dropdown";

const UserDropdown = () => {
  const currentLocale = useLocale();
  const pathname = usePathname();

  const languages = [
    {
      name: "Azərbaycan",
      locale: "az",
    },
    {
      name: "Русский",
      locale: "ru",
    },
  ];

  const currentLanguage =
    languages.filter((language) => language.locale === currentLocale)[0] ||
    languages[0];

  const menu: JSX.Element[] = [];
  languages.forEach((language) => {
    if (language.locale === currentLocale) return;
    return menu.push(
      <Link
        href={pathname}
        locale={language.locale}
        key={language.locale}
        className="flex justify-start items-center space-x-5 px-4 py-2 hover:bg-zinc-100 w-full dark:hover:bg-zinc-600"
      >
        <Image
          src={`/languages/${language.locale}.png`}
          alt={language.name}
          width={24}
          height={24}
        />
        <span className="font-semibold">{language.name}</span>
      </Link>
    );
  });

  return (
    <Dropdown
      trigger={
        <div className="flex justify-start items-center space-x-5 px-4 py-2 cursor-pointer">
          <Image
            src={`/languages/${currentLocale}.png`}
            alt={currentLanguage.name}
            width={24}
            height={24}
          />
          <span>{currentLanguage.name}</span>
        </div>
      }
      menu={menu}
    />
  );
};

export default UserDropdown;
