"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input, Button } from "@/components/ui";
import request from "@/utils/request";

const RegisterForm = () => {
  const t = useTranslations("Register");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const schema = object({
    name: string().required(t("nameIsRequired")),
    email: string().email(t("invalidEmail")).required(t("emailIsRequired")),
    password: string()
      .min(6, t("invalidPassword"))
      .required(t("passwordIsRequired")),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSumbit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);

    try {
      await request("/api/users", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      router.push("/verify_email");
    } catch (error) {
      // todo
    }

    setIsLoading(false);
  };

  return (
    <form
      className="flex flex-col w-full space-y-6 md:w-2/3"
      onSubmit={handleSubmit(onSumbit)}
    >
      <Input
        id="name"
        label={t("name")}
        disabled={isLoading}
        register={register}
        errors={errors}
      />
      <Input
        id="email"
        label={t("email")}
        disabled={isLoading}
        register={register}
        errors={errors}
        autoComplete="username"
      />
      <Input
        id="password"
        label={t("password")}
        disabled={isLoading}
        register={register}
        type="password"
        errors={errors}
        autoComplete="current-password"
      />
      <Button
        title={t("registerBtn")}
        btnType="submit"
        loading={isLoading}
        btnstyle="primary"
      />
    </form>
  );
};

export default RegisterForm;
