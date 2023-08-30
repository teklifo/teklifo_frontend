import NextLink from "next/link";
import { FC } from "react";
import { UrlObject } from "url";

type LinkType = "primary" | "secondary";

interface Props {
  href: string | UrlObject;
  type: LinkType;
  prefetch?: boolean;
  children: React.ReactNode;
}

const Link: FC<Props> = ({ href, type, prefetch = true, children }) => {
  return (
    <NextLink
      href={href}
      prefetch={prefetch}
      className={`inline-block transition-colors duration-150 ease-in-out
             ${
               type === "primary"
                 ? "bg-sky-500"
                 : "bg-zinc-100 dark:bg-zinc-800"
             }     
              ${
                type === "primary"
                  ? "text-white dark:text-black"
                  : "text-black dark:text-white"
              } 
              ${
                type === "primary"
                  ? "hover:bg-sky-600"
                  : "hover:bg-zinc-200 dark:hover:bg-zinc-700"
              } 
              rounded-full 
              font-bold
               py-3 
               px-6`}
    >
      {children}
    </NextLink>
  );
};

export default Link;
