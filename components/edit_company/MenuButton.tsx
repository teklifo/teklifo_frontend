import React from "react";

type MenuButton = {
  label: string;
  icon: JSX.Element;
  onClick: () => void;
};

const MenuButton = ({ label, icon, onClick }: MenuButton) => {
  return (
    <button
      type="button"
      className="block px-4 py-2 hover:bg-zinc-100 w-full dark:hover:bg-zinc-600"
      onClick={onClick}
    >
      <div className="flex flexrow justify-start items-center space-x-5">
        {icon}
        <span>{label}</span>
      </div>
    </button>
  );
};

export default MenuButton;
