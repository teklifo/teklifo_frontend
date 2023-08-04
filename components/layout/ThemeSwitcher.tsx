"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import GroupButtons from "@/components/ui/GroupButtons";
import { GroupButtonProps } from "@/types";

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const buttons: GroupButtonProps[] = [
    {
      title: "Light",
      onClick: () => {
        setTheme("light");
      },
    },
    {
      title: "Dark",
      onClick: () => {
        setTheme("dark");
      },
    },
    {
      title: "System",
      onClick: () => {
        setTheme("system");
      },
    },
  ];

  return <GroupButtons buttons={buttons} />;
};

export default ThemeSwitcher;
