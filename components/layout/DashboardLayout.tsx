"use client";

import React, { useState, useEffect } from "react";
import NextLink from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { LayoutDashboard, Briefcase } from "lucide-react";
import DashboardNavbar from "@/components/layout/DashboardNavbar";
import ThemeSwitcher from "@/components/layout/ThemeSwitcher";
import Logo from "@/components/layout/Logo";
import Sidebar from "@/components/ui/Sidebar";
import SidebarItem from "@/components/ui/SidebarItem";
import useOutsideClick from "@/utils/hooks/useOutsideClick";

const DashboardLayout = () => {
  const t = useTranslations("DashboardLayout");

  const [displaySidebar, setDisplaySidebar] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const locale = useLocale();

  const ref = useOutsideClick(() => {
    if (displaySidebar) {
      setDisplaySidebar(false);
    }
  });

  useEffect(() => {
    setDisplaySidebar(false);
  }, [pathname, searchParams]);

  const toggleSidebar = () => {
    setDisplaySidebar(!displaySidebar);
  };

  return (
    <>
      <DashboardNavbar toggleSidebar={toggleSidebar} />
      <div ref={ref}>
        <Sidebar display={displaySidebar}>
          <div className="flex flex-col place-content-between h-full">
            <div className="py-2">
              <NextLink
                href="/"
                className="flex justify-center items-center text-zinc-900 ml-2 my-2 dark:text-white"
              >
                <Logo />
              </NextLink>
              <ul className="space-y-2 font-medium pt-4">
                <SidebarItem
                  href="/dashboard"
                  title={t("dashboard")}
                  isActive={pathname === `/${locale}/dashboard`}
                  icon={<LayoutDashboard />}
                />
                <SidebarItem
                  href="/user_companies"
                  title={t("userCompanies")}
                  isActive={pathname === `/${locale}/user_companies`}
                  icon={<Briefcase />}
                />
              </ul>
            </div>
            <div className="flex justify-center items-center">
              <ThemeSwitcher />
            </div>
          </div>
        </Sidebar>
      </div>
    </>
  );
};

export default DashboardLayout;
