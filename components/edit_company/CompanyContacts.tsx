import React, { useState, FormEvent, Dispatch, SetStateAction } from "react";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui";
import { useTranslations } from "next-intl";
import ContactModal from "@/components/edit_company/ContactModal";
import MenuButton from "@/components/utils/MenuButton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  Dropdown,
} from "@/components/ui";
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
  const [updatedContact, setUpdatedContact] = useState<{
    values: ContactsType;
    index: number;
  }>();

  const handleOnClick = (event: FormEvent) => {
    event.preventDefault();
    setUpdatedContact(undefined);
    setOpen(true);
  };

  const onSubmit = (contact: ContactsType) => {
    setOpen(false);

    if (updatedContact) {
      setContacts((prevState) =>
        prevState.map((c, index) => {
          return index === updatedContact.index ? contact : c;
        })
      );
      setUpdatedContact(undefined);
    } else {
      if (contact) {
        setContacts((prevState) => {
          return [...prevState, contact];
        });
      }
    }
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <ContactModal
        isOpen={open}
        onFormSubmit={onSubmit}
        onClose={onClose}
        defaultValues={updatedContact?.values}
      />
      <div className="space-y-8">
        <h5 className="text-xl font-bold mb-4">{t("contacts")}</h5>
        {contacts.length > 0 && (
          <div className="relative">
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeadCell>{t("contactType")}</TableHeadCell>
                  <TableHeadCell>{t("contactValue")}</TableHeadCell>
                  <TableHeadCell>
                    <span className="sr-only">{t("editContact")}</span>
                  </TableHeadCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {contacts.map((contact, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell>{t(contact.type)}</TableCell>
                      <TableCell>{contact.value}</TableCell>
                      <TableCell>
                        <Dropdown
                          trigger={
                            <button
                              type="button"
                              className="px-2 py-2 text-xs font-medium text-center inline-flex items-center rounded-lg bg-white border-[1px] border-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:border-zinc-600 dark:hover:bg-zinc-700"
                            >
                              <MoreHorizontal size={18} />
                            </button>
                          }
                          menu={[
                            <MenuButton
                              key={1}
                              icon={<Pencil size={18} />}
                              label={t("editContact")}
                              onClick={() => {
                                setUpdatedContact({
                                  values: {
                                    type: contact.type,
                                    value: contact.value,
                                  },
                                  index,
                                });
                                setOpen(true);
                              }}
                            />,
                            <MenuButton
                              key={2}
                              icon={<Trash2 size={18} />}
                              label={t("deleteContact")}
                              onClick={() => {
                                setContacts(
                                  contacts.filter((_c, i) => i !== index)
                                );
                              }}
                            />,
                          ]}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}
        <Button
          title={t("addContacts")}
          btnType="button"
          loading={isLoading}
          btnstyle="secondary"
          onClick={handleOnClick}
          btnClass="w-full"
        />
      </div>
    </>
  );
};

export default CompanyContacts;
