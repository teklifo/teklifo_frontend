"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { getCookie } from "cookies-next";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import CompanyAvatar from "@/components/edit_company/CompanyAvatar";
import DeleteCompanyModal from "@/components/edit_company/DeleteCompanyModal";
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
import { EntityType, ContactsType, CompanyType, ImageType } from "@/types";

type EditCompanyFormProps = {
  company?: CompanyType;
};

const EditCompanyForm = ({ company }: EditCompanyFormProps) => {
  const t = useTranslations("CreateEditCompany");

  const router = useRouter();

  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const [contacts, setContacts] = useState<ContactsType[]>(
    company?.contacts ?? []
  );

  const schema = object({
    name: string().required(t("nameIsRequired")),
    tin: string()
      .required(t("tinIsRequired"))
      .matches(/^\d+$/, t("invalidTin"))
      .length(10, t("invalidTin")),
    entityType: string<EntityType>().required(t("entityTypeIsRequired")),
    image: object<ImageType>(),
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
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: company?.name,
      tin: company?.tin,
      description: company?.description,
      shortDescription: company?.shortDescription ?? "",
      entityType: company?.entityType,
      image: company?.image ?? undefined,
      facebook: company?.socials.facebook,
      instagram: company?.socials.instagram,
      linkedin: company?.socials.linkedin,
      youtube: company?.socials.youtube,
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);

    const config = {
      method: company ? "put" : "post",
      headers: {
        Authorization: `JWT ${getCookie("token") ?? ""}`,
        "Accept-Language": getCookie("NEXT_LOCALE") ?? "az",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
        contacts,
        socials: {
          instagram: data.instagram,
          facebook: data.facebook,
          youtube: data.youtube,
          linkedin: data.linkedin,
        },
      }),
    };

    try {
      const editedCompany = await request<CompanyType>(
        `/api/companies/${company ? `${company.id}/` : ""}`,
        config
      );
      toast.success(company ? t("companyUpdated") : t("companyCreated"));
      router.refresh();
      router.push(`/companies/${editedCompany.id}`);
    } catch (error) {
      let message;
      if (error instanceof Error) message = error.message;
      else message = String(error);
      toast.error(message);
    }

    setIsLoading(false);
  };

  const onDeleteModalClick = () => {
    setOpenDeleteModal(true);
  };

  const onDeleteModalClose = () => {
    setOpenDeleteModal(false);
  };

  return (
    <>
      {company && (
        <>
          <DeleteCompanyModal
            company={company}
            isOpen={openDeleteModal}
            onClose={onDeleteModalClose}
          />
          <div className="flex justify-center items-center">
            <CompanyAvatar company={company} />
          </div>
        </>
      )}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 md:max-w-5xl"
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
          title={company ? t("editBtn") : t("createBtn")}
          btnType="submit"
          loading={isLoading}
          btnstyle="primary"
          btnClass="w-full"
        />
      </form>
      {company && (
        <Button
          title={t("deleteCompanyBtn")}
          btnType="button"
          loading={isLoading}
          btnstyle="secondary"
          btnClass="w-full mt-4"
          onClick={onDeleteModalClick}
        />
      )}
    </>
  );
};

export default EditCompanyForm;
