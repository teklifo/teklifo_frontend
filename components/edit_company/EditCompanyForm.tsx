"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { getCookie } from "cookies-next";
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
import request from "@/utils/request";
import { EntityType, ContactsType, SocialsType, CompanyType } from "@/types";

const EditCompanyForm = () => {
  const t = useTranslations("CreateEditCompany");

  const router = useRouter();

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
      .min(200, t("invalidDescription")),
    shortDescription: string()
      .required(t("shortDescriptionIsRequired"))
      .max(100, t("invalidShortDescription")),
    contacts: object<ContactsType>(),
    instagram: string().url(t("invalidWebsait")),
    facebook: string().url(t("invalidWebsait")),
    youtube: string().url(t("invalidWebsait")),
    linkedin: string().url(t("invalidWebsait")),
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

    const config = {
      method: "post",
      headers: {
        Authorization: `JWT ${getCookie("token") ?? ""}`,
        "Accept-Language": getCookie("NEXT_LOCALE") ?? "az",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
        socials: {
          instagram: data.instagram,
          facebook: data.facebook,
          youtube: data.youtube,
          linkedin: data.linkedin,
        },
      }),
    };

    try {
      await request<CompanyType>("/api/companies", config);
      router.push("/dashboard/user_companies");
    } catch (error) {
      // todo
    }

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
      <h5 className="text-xl font-bold mb-4">{t("socials")}</h5>
      <Input
        id="instagram"
        label={t("instagram")}
        disabled={isLoading}
        register={register}
        errors={errors}
      />
      <Input
        id="facebook"
        label={t("facebook")}
        disabled={isLoading}
        register={register}
        errors={errors}
      />
      <Input
        id="youtube"
        label={t("youtube")}
        disabled={isLoading}
        register={register}
        errors={errors}
      />
      <Input
        id="linkedin"
        label={t("linkedin")}
        disabled={isLoading}
        register={register}
        errors={errors}
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
