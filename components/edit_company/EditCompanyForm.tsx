"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import CompanyContacts from "@/components/edit_company/CompanyContacts";
import {
  Input,
  Button,
  Divider,
  Select,
  SelectOption,
  Textarea,
} from "@/components/ui";
import { EntityType, ContactsType, SocialsType } from "@/types";

const EditCompanyForm = () => {
  const t = useTranslations("CreateEditCompany");
  const [isLoading, setIsLoading] = useState(false);
  const [contacts, setContacts] = useState<ContactsType[]>([]);

  const schema = object({
    name: string().required(t("nameIsRequired")),
    tin: string()
      .required(t("tinIsRequired"))
      .matches(/^\d+$/, t("invalidTin"))
      .length(10, t("invalidTin")),
    entityType: string<EntityType>().required(t("entityTypeIsRequired")),
    image: string().url(t("invalidImage")),
    description: string()
      .required(t("descriptionIsRequired"))
      .min(100, t("invalidDescription")),
    shortDescription: string()
      .required(t("descriptionIsRequired"))
      .min(200, t("invalidShortDescription")),
    contacts: object<ContactsType>(),
    socials: object<SocialsType>(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      tin: "",
      description: "",
      shortDescription: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);

    setIsLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="container w-full space-y-6 md:max-w-5xl"
    >
      <Input
        id="name"
        label={t("name")}
        disabled={isLoading}
        register={register}
        errors={errors}
      />
      <Input
        id="tin"
        label={t("tin")}
        disabled={isLoading}
        register={register}
        errors={errors}
      />
      <Select
        id="entityType"
        label={t("entityType")}
        disabled={isLoading}
        register={register}
        errors={errors}
      >
        <SelectOption value="" title={t("notSelected")} />
        <SelectOption value="physical" title={t("physical")} />
        <SelectOption value="legal" title={t("legal")} />
      </Select>
      <Textarea
        id="description"
        label={t("description")}
        disabled={isLoading}
        register={register}
        errors={errors}
      />
      <Textarea
        id="shortDescription"
        label={t("shortDescription")}
        disabled={isLoading}
        register={register}
        errors={errors}
      />
      <Divider />
      <CompanyContacts
        contacts={contacts}
        setContacts={setContacts}
        isLoading={isLoading}
      />
      <Divider />
      <Button
        title={t("createBtn")}
        btnType="submit"
        loading={isLoading}
        btnstyle="primary"
        btnClass="w-full"
      />
    </form>
  );
};

export default EditCompanyForm;
