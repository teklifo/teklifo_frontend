"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { companySchema, CompanyType } from "@/schemas/company";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

const EditCompanyForm = () => {
  const t = useTranslations("CreateEditCompany");
  const [isLoading, setIsLoading] = useState(false);

  const schema = companySchema(t);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CompanyType>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
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
        required={t("nameIsRequired")}
      />
      <Button
        title={t("createBtn")}
        btnType="submit"
        loading={isLoading}
        containerStyles="transition-colors duration-150 ease-in-out bg-sky-500 text-white rounded-full font-bold hover:bg-sky-600 py-3 px-6 dark:text-black"
      />
    </form>
  );
};

export default EditCompanyForm;
