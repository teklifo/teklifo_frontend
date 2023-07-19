"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import request from "@/utils/request";

const RegistrationForm = () => {
  const t = useTranslations("Registration");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSumbit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);

    try {
      await request("/api/auth/login", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } catch (error) {
      router.push("/dashboard");
    }

    setIsLoading(false);
  };

  return (
    <form
      className="flex flex-col w-full space-y-6 md:w-2/3"
      onSubmit={handleSubmit(onSumbit)}
    >
      <Input
        id="email"
        label={t("email")}
        disabled={isLoading}
        register={register}
        errors={errors}
        required={t("required")}
        autoComplete="username"
      />
      <Input
        id="password"
        label={t("password")}
        disabled={isLoading}
        register={register}
        type="password"
        errors={errors}
        required={t("required")}
        autoComplete="current-password"
      />
      <Button
        title={t("loginBtn")}
        btnType="submit"
        disabled={isLoading}
        containerStyles="transition-colors duration-150 ease-in-out bg-sky-500 text-white rounded-full font-bold hover:bg-sky-600 py-3 px-6"
      />
    </form>
  );
};

export default RegistrationForm;
