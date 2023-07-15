"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

const LoginForm = () => {
  const t = useTranslations("Login");

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSumbit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    // setIsLoading(false)
  };

  return (
    <form
      className="flex flex-col w-2/3 space-y-6"
      onSubmit={handleSubmit(onSumbit)}
    >
      <Input
        id="email"
        label={t("email")}
        disabled={isLoading}
        register={register}
        errors={errors}
        required={t("required")}
      />
      <Input
        id="password"
        label={t("password")}
        disabled={isLoading}
        register={register}
        type="password"
        errors={errors}
        required={t("required")}
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

export default LoginForm;
