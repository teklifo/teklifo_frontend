import { SelectOptionType } from "@/types";

const SelectOption = ({ value, title }: SelectOptionType) => {
  return <option value={value}>{title}</option>;
};

export default SelectOption;
