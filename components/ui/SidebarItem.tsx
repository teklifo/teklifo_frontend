import Link from "next/link";
import { SidebarItemProps } from "@/types";

const SidebarItem = ({ href, title, isActive, icon }: SidebarItemProps) => {
  return (
    <li>
      <Link
        href={href}
        className={`flex items-center p-2 text-black ${
          isActive
            ? "bg-sky-500 text-white dark:text-black"
            : "hover:bg-sky-200 hover:text-zinc-900 dark:text-white dark:hover:bg-sky-800"
        } rounded-lg group`}
      >
        {icon}
        <span className="ml-3">{title}</span>
      </Link>
    </li>
  );
};

export default SidebarItem;
