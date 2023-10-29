"use client";

import React, { useRef, useState, useEffect } from "react";
import NextLink from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { deleteCookie } from "cookies-next";
import { LogOut } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Logo from "@/components/layout/Logo";
import Sidebar from "@/components/ui/Sidebar";
import SidebarLinks from "@/components/layout/SidebarLinks";
import useOutsideClick from "@/utils/hooks/useOutsideClick";
import { UserType } from "@/types";

type LayoutSidebarProps = {
  user: UserType | null;
};

const LayoutSidebar = ({ user }: LayoutSidebarProps) => {
  const ref = useRef(null);

  const t = useTranslations("Layout");

  const [displaySidebar, setDisplaySidebar] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useOutsideClick(ref, () => {
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

  const logout = () => {
    setDisplaySidebar(!displaySidebar);
    deleteCookie("token");
    router.refresh();
    router.push("/");
  };

  return (
    <>
      <Navbar user={user} toggleSidebar={toggleSidebar} />
      <div ref={ref} className="block lg:hidden">
        <Sidebar display={displaySidebar}>
          <div className="flex flex-col place-content-between h-full pt-16">
            <div className="py-2">
              <NextLink
                href="/"
                className="flex justify-center items-center text-zinc-900 ml-2 my-2 dark:text-white"
              >
                <Logo />
              </NextLink>
              <SidebarLinks user={user} />
              {user && (
                <button
                  onClick={logout}
                  className="flex items-center mt-2 w-full p-2 text-black hover:bg-sky-200 hover:text-zinc-900 dark:text-white dark:hover:bg-sky-800 rounded-lg"
                >
                  <LogOut />
                  <span className="ml-3">{t("logout")}</span>
                </button>
              )}
            </div>
          </div>
        </Sidebar>
      </div>
      {displaySidebar && (
        <div
          className="h-screen w-full fixed top-0 backdrop-blur-sm
        bg-zinc-200/70
        dark:bg-zinc-800/70
        z-10"
        ></div>
      )}
    </>
  );
};

export default LayoutSidebar;
