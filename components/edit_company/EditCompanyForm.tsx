"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { companySchema, CompanyType } from "@/schemas/company";
import CompanyContacts from "@/components/edit_company/CompanyContacts";
import {
  Input,
  Button,
  Divider,
  Select,
  SelectOption,
  Textarea,
} from "@/components/ui";
import { ContactsType } from "@/types";

const EditCompanyForm = () => {
  const t = useTranslations("CreateEditCompany");
  const [isLoading, setIsLoading] = useState(false);
  const [contacts, setContacts] = useState<ContactsType[]>([]);

  const schema = companySchema(t);

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

  const onSubmit: SubmitHandler<CompanyType> = async (data) => {
    setIsLoading(true);

    setIsLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="container w-full space-y-6 md:max-w-md"
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
      />
    </form>
  );
};

export default EditCompanyForm;
