import React, { useState, FormEvent, Dispatch, SetStateAction } from "react";
import { Button } from "@/components/ui";
import { useTranslations } from "next-intl";
import ContactModal from "@/components/edit_company/ContactModal";
import { ContactsType } from "@/types";

interface CompanyContactsProps {
  contacts: ContactsType[];
  setContacts: Dispatch<SetStateAction<ContactsType[]>>;
  isLoading: boolean;
}

const CompanyContacts = ({
  contacts,
  setContacts,
  isLoading,
}: CompanyContactsProps) => {
  const t = useTranslations("CreateEditCompany");

  const [open, setOpen] = useState<boolean>(false);

  const handleOnClick = (event: FormEvent) => {
    event.preventDefault();
    setOpen(true);
  };

  const onSubmit = (contact: ContactsType) => {
    setOpen(false);
    if (contact) {
      setContacts((prevState) => {
        return [...prevState, contact];
      });
    }
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <ContactModal isOpen={open} onFormSubmit={onSubmit} onClose={onClose} />
      <div>
        <h5 className="text-xl font-bold mb-4">{t("contacts")}</h5>
        <Button
          title={t("addContacts")}
          btnType="button"
          loading={isLoading}
          btnstyle="secondary"
          onClick={handleOnClick}
        />
      </div>
    </>
  );
};

export default CompanyContacts;
