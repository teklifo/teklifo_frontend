"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { getCookie } from "cookies-next";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-hot-toast";
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
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": getCookie("NEXT_LOCALE") ?? "az",
        },
        body: JSON.stringify(data),
      });
      router.push("/verify_email");
    } catch (error) {
      let message;
      if (error instanceof Error) message = error.message;
      else message = String(error);
      toast.error(message);
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
