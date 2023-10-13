"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { getCookie } from "cookies-next";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import UserAvatar from "@/components/edit_user/UserAvatar";
import DeleteUserModal from "@/components/edit_user/DeleteUserModal";
import { Input, Button } from "@/components/ui";
import request from "@/utils/request";
import { UserType, ImageType } from "@/types";

type EditUserFormProps = {
  user: UserType;
};

const EditUserForm = ({ user }: EditUserFormProps) => {
  const t = useTranslations("EditUser");

  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);

  const schema = object({
    name: string().required(t("nameIsRequired")),
    currentPassword: string(),
    newPassword: string().matches(/.{6,}/, {
      excludeEmptyString: true,
      message: t("invalidPassword"),
    }),
    image: object<ImageType>(),
  });

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: user.name,
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    let invalidPasswords = false;

    if (data.currentPassword && !data.newPassword) {
      invalidPasswords = true;
      setError("newPassword", {
        type: "manual",
        message: t("newPasswordIsRequired"),
      });
    }

    if (data.newPassword && !data.currentPassword) {
      invalidPasswords = true;
      setError("currentPassword", {
        type: "manual",
        message: t("currentPasswordIsRequired"),
      });
    }

    if (invalidPasswords) return;

    setIsLoading(true);

    const config = {
      method: "put",
      headers: {
        Authorization: `JWT ${getCookie("token") ?? ""}`,
        "Accept-Language": getCookie("NEXT_LOCALE") ?? "az",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
      }),
    };

    try {
      await request<UserType>(`/api/users/${user.id}/`, config);
      toast.success(t("userUpdated"));
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
      <DeleteUserModal
        user={user}
        isOpen={openDeleteModal}
        onClose={onDeleteModalClose}
      />
      <div className="flex justify-center items-center">
        <UserAvatar user={user} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Input
          id="name"
          label={t("name")}
          disabled={isLoading}
          register={register}
          errors={errors}
        />
        <Input
          id="currentPassword"
          label={t("currentPassword")}
          disabled={isLoading}
          register={register}
          type="password"
          errors={errors}
        />
        <Input
          id="newPassword"
          label={t("newPassword")}
          disabled={isLoading}
          register={register}
          type="password"
          errors={errors}
        />
        <Button
          title={t("editBtn")}
          btnType="submit"
          loading={isLoading}
          btnstyle="primary"
          btnClass="w-full"
        />
      </form>
      {user && (
        <Button
          title={t("deleteUserBtn")}
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

export default EditUserForm;
