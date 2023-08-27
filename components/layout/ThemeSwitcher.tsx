"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon, Laptop2 } from "lucide-react";
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
      content: <Sun />,
      onClick: () => {
        setTheme("light");
      },
    },
    {
      content: <Moon />,
      onClick: () => {
        setTheme("dark");
      },
    },
    {
      content: <Laptop2 />,
      onClick: () => {
        setTheme("system");
      },
    },
  ];

  return <GroupButtons buttons={buttons} />;
};

export default ThemeSwitcher;
