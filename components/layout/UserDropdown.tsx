"use client";

import { useTranslations } from "next-intl";
import { Briefcase } from "lucide-react";
import Dropdown from "@/components/ui/Dropdown";
import MenuLink from "@/components/utils/MenuLink";
import Avatar from "@/components/utils/Avatar";
import { UserType } from "@/types";

type UserDropdownProps = {
  user: UserType;
};

const UserDropdown = ({ user }: UserDropdownProps) => {
  const t = useTranslations("Layout");

  return (
    <Dropdown
      trigger={
        <button type="button" className="flex flex-row items-center space-x-2">
          <Avatar image={user.image} name={user.name} size="sm" />
          <span className="hidden md:block">{user.name}</span>
        </button>
      }
      menu={[
        <MenuLink
          key={1}
          href="/user_companies"
          icon={<Briefcase size={18} />}
          label={t("userCompanies")}
          onClick={() => {}}
        />,
      ]}
    />
  );
};

export default UserDropdown;
