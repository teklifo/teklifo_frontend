import Image from "next/image";
import ThemeSwitcher from "@/components/layout/ThemeSwitcher";

const Footer = () => {
  return (
    <footer className="mt-20 bg-zinc-100 dark:bg-zinc-900">
      <div className="container flex flex-col justify-center items-center mx-auto py-10 px-6 space-y-2">
        <Image src="/logo.svg" alt="Tekliff Logo" width="48" height="18" />
        <div className="span">Tekliff 2023 &copy;</div>
        <ThemeSwitcher />
      </div>
    </footer>
  );
};

export default Footer;
