"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { object, string } from "yup";
import { Rocket } from "lucide-react";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { getCookie, setCookie } from "cookies-next";
import { Input, Button } from "@/components/ui";
import request from "@/utils/request";

const LoginForm = () => {
  const t = useTranslations("Login");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const schema = object({
    email: string().required(t("emailIsRequired")),
    password: string().required(t("passwordIsRequired")),
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
      const result = await request<{ token: string }>("/api/auth", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": getCookie("NEXT_LOCALE") ?? "az",
        },
        body: JSON.stringify(data),
      });
      setCookie("token", result.token);
      router.refresh();
      router.push("/");
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
      className="flex flex-col w-full space-y-6 md:max-w-md lg:max-w-lg"
      onSubmit={handleSubmit(onSumbit)}
    >
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
        title={t("loginBtn")}
        icon={<Rocket />}
        btnType="submit"
        loading={isLoading}
        btnstyle="primary"
      />
    </form>
  );
};

export default LoginForm;
