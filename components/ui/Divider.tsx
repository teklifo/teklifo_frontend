import { DividerProps } from "@/types";

const Divider = ({ classes }: DividerProps) => {
  return (
    <hr
      className={`h-0.5 border-t-0 bg-zinc-100 opacity-100 dark:bg-zinc-800 ${
        classes ? classes : ""
      }`}
    />
  );
};

export default Divider;
