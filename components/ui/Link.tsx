import NextLink from "next/link";
import { FC } from "react";
import { UrlObject } from "url";

type LinkType = "primary" | "secondary";

interface Props {
  href: string | UrlObject;
  type: LinkType;
  children: React.ReactNode;
}

const Link: FC<Props> = ({ href, type, children }) => {
  return (
    <NextLink
      href={href}
      className={`transition-colors duration-150 ease-in-out
             ${type === "primary" ? "bg-sky-500" : "bg-zinc-200"}     
              ${type === "primary" ? "text-white" : "text-black"} 
              ${type === "primary" ? "hover:bg-sky-600" : "hover:bg-zinc-200"} 
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
