import Link from "next/link";

type MenuLinkProps = {
  label: string;
  icon: JSX.Element;
  href: string;
  onClick: () => void;
};

const MenuLink = ({ href, label, icon, onClick }: MenuLinkProps) => {
  return (
    <div onClick={onClick}>
      <Link
        href={href}
        className="block px-4 py-2 hover:bg-zinc-100 w-full dark:hover:bg-zinc-600"
      >
        <div className="flex flexrow justify-start items-center space-x-5">
          {icon}
          <span className="font-semibold">{label}</span>
        </div>
      </Link>
    </div>
  );
};

export default MenuLink;
