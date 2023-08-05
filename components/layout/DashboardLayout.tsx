"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import DashboardNavbar from "@/components/layout/DashboardNavbar";
import Sidebar from "@/components/ui/Sidebar";
import SidebarItem from "@/components/ui/SidebarItem";

const DashboardLayout = () => {
  const t = useTranslations("DashboardLayout");

  const [displaySidebar, setDisplaySidebar] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const locale = useLocale();

  useEffect(() => {
    setDisplaySidebar(false);
  }, [pathname, searchParams]);

  const toggleSidebar = () => {
    setDisplaySidebar(!displaySidebar);
  };

  return (
    <>
      <DashboardNavbar toggleSidebar={toggleSidebar} />
      <Sidebar display={displaySidebar}>
        <SidebarItem
          href="/dashboard"
          title={t("dashboard")}
          isActive={pathname === `/${locale}/dashboard`}
        />
        <SidebarItem
          href="/dashboard/user_companies"
          title={t("userCompanies")}
          isActive={pathname === `/${locale}/dashboard/user_companies`}
        />
      </Sidebar>
    </>
  );
};

export default DashboardLayout;
