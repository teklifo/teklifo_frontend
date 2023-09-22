import React, { useState } from "react";
import useOutsideClick from "@/utils/hooks/useOutsideClick";

type DropdownType = {
  trigger: JSX.Element;
  menu: JSX.Element[];
};

const Dropdown = ({ trigger, menu }: DropdownType) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  const ref = useOutsideClick(() => {
    setOpen(false);
  });

  return (
    <div className="relative">
      {React.cloneElement(trigger, {
        onClick: handleOpen,
      })}
      {open ? (
        <div
          ref={ref}
          className="z-10 mt-2 absolute transform:translate3d(82.5px, 70px, 0px) bg-white divide-y divide-zinc-200 rounded-lg shadow w-64 dark:bg-zinc-700 right-0"
        >
          <ul className="py-2 text-sm text-zinc-700 dark:text-zinc-200">
            {menu.map((menuItem, index) => (
              <li key={index}>
                {React.cloneElement(menuItem, {
                  onClick: () => {
                    menuItem.props.onClick();
                    setOpen(false);
                  },
                })}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
};

export default Dropdown;
