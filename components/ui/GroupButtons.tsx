import { GroupButtonsProps } from "@/types";

const GroupButtons = ({ buttons }: GroupButtonsProps) => {
  return (
    <div className="inline-flex rounded-md" role="group">
      {buttons.map((button, index) => {
        const firstButton = index === 0;
        const lastButton = index === buttons.length - 1;

        const borderClass =
          !firstButton && !lastButton ? "border-t border-b" : "border";

        let roundedClass = "";
        if (firstButton) roundedClass = "rounded-l-lg";
        if (lastButton) roundedClass = "rounded-r-md";

        return (
          <button
            key={index}
            type="button"
            className={`
            px-4
            py-2
            text-sm
            font-medium
            bg-white
            ${borderClass}
            border-zinc-300
            ${roundedClass}
            hover:text-sky-500
            focus:z-10
            dark:bg-zinc-900
            dark:border-zinc-800
            `}
            onClick={button.onClick}
          >
            {button.content}
          </button>
        );
      })}
    </div>
  );
};

export default GroupButtons;
