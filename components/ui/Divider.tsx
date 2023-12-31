import { DividerProps } from "@/types";

const Divider = ({ classes }: DividerProps) => {
  return (
    <hr
      className={`border-zinc-300 dark:border-zinc-700 ${
        classes ? classes : ""
      }`}
    />
  );
};

export default Divider;
