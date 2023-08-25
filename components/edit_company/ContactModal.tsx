"use client";

import { useTranslations } from "next-intl";
import { SubmitHandler, useForm } from "react-hook-form";
import { object, string, mixed, InferType } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input, Select, SelectOption, Button } from "@/components/ui";
import Modal from "@/components/modals/Modal";
import { ContactsType } from "@/types";

interface ContactModalProps {
  isOpen: boolean;
  onFormSubmit: (contact: ContactsType) => void;
  onClose: () => void;
}

const ContactModal = ({ isOpen, onFormSubmit, onClose }: ContactModalProps) => {
  const t = useTranslations("CreateEditCompany");

  const phoneRegExp = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g;
  const websaitRegExp =
    /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/;

  const schema = object({
    type: mixed()
      .oneOf(["phone", "address", "email", "website"])
      .required("contactTypeIsRequired"),
    value: string()
      .required(t("contactValueIsRequired"))
      .when("type", {
        is: "email",
        then: (schema) => schema.email(t("invalidEmail")),
      })
      .when("type", {
        is: "website",
        then: (schema) => schema.matches(websaitRegExp, t("invalidWebsait")),
      })
      .when("type", {
        is: "phone",
        then: (schema) => schema.matches(phoneRegExp, t("invalidPhone")),
      }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      type: "phone",
      value: "",
    },
  });

  const onSumbit: SubmitHandler<InferType<typeof schema>> = async (data) => {
    onFormSubmit(data as ContactsType);
  };

  const bodyContent = (
    <form className="flex flex-col w-full mx-auto space-y-6 md:w-2/3">
      <Select
        id="type"
        label={t("contactType")}
        register={register}
        errors={errors}
      >
        <SelectOption value="phone" title={t("phone")} />
        <SelectOption value="email" title={t("email")} />
        <SelectOption value="address" title={t("address")} />
        <SelectOption value="website" title={t("website")} />
      </Select>
      <Input
        id="value"
        label={t("contactValue")}
        register={register}
        type="text"
        errors={errors}
      />
      <Button
        title={t("saveContact")}
        btnType="button"
        btnstyle="primary"
        onClick={handleSubmit(onSumbit)}
      />
    </form>
  );

  return (
    <Modal
      isOpen={isOpen}
      title={t("contacts")}
      onClose={onClose}
      body={bodyContent}
    />
  );
};

export default ContactModal;
