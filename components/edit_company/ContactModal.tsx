"use client";

import React, { useEffect } from "react";
import { useTranslations } from "next-intl";
import { SubmitHandler, useForm } from "react-hook-form";
import { object, string, mixed, InferType } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input, Select, SelectOption, Button } from "@/components/ui";
import Modal from "@/components/modals/Modal";
import { ContactsType } from "@/types";

type ContactModalProps = {
  isOpen: boolean;
  defaultValues?: ContactsType;
  onFormSubmit: (contact: ContactsType) => void;
  onClose: () => void;
};

const ContactModal = ({
  isOpen,
  defaultValues,
  onFormSubmit,
  onClose,
}: ContactModalProps) => {
  const t = useTranslations("CreateEditCompany");

  const phoneRegExp = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g;
  const urlRegExp =
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;

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
        then: (schema) => schema.matches(urlRegExp, t("invalidWebsait")),
      })
      .when("type", {
        is: "phone",
        then: (schema) => schema.matches(phoneRegExp, t("invalidPhone")),
      }),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    reset({
      type: defaultValues ? defaultValues.type : "phone",
      value: defaultValues ? defaultValues.value : "",
    });
  }, [defaultValues, reset]);

  const onSumbit: SubmitHandler<InferType<typeof schema>> = async (data) => {
    onFormSubmit(data as ContactsType);
    reset({
      type: defaultValues ? defaultValues.type : "phone",
      value: defaultValues ? defaultValues.value : "",
    });
  };

  const bodyContent = (
    <div className="flex flex-col w-full mx-auto space-y-6 md:w-2/3">
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
    </div>
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
