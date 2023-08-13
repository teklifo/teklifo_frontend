import { SelectOptionProps } from "@/types";

const SelectOption = ({ value, title }: SelectOptionProps) => {
  return <option value={value}>{title}</option>;
};

export default SelectOption;
