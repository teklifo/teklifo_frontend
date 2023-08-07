import ThemeSwitcher from "@/components/layout/ThemeSwitcher";
import Logo from "@/components/layout/Logo";

const Footer = () => {
  return (
    <footer className="mt-20 border-t border-zinc-300 dark:border-zinc-800">
      <div className="container flex flex-col justify-center items-center mx-auto py-10 px-6 space-y-2">
        <Logo />
        <span>2023 &copy;</span>
        <ThemeSwitcher />
      </div>
    </footer>
  );
};

export default Footer;
