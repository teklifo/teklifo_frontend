"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { getCookie } from "cookies-next";
import { AlertCircle } from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui";
import Modal from "@/components/modals/Modal";
import request from "@/utils/request";
import { CompanyType } from "@/types";

type DeleteCompanyProps = {
  isOpen: boolean;
  onClose: () => void;
  company: CompanyType;
};

const DeleteCompany = ({ isOpen, onClose, company }: DeleteCompanyProps) => {
  const t = useTranslations("CreateEditCompany");
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);

    const config = {
      method: "delete",
      headers: {
        Authorization: `JWT ${getCookie("token") ?? ""}`,
        "Accept-Language": getCookie("NEXT_LOCALE") ?? "az",
        "Content-Type": "application/json",
      },
    };

    try {
      await request<CompanyType>(`/api/companies/${company.id}`, config);
      toast.success(t("companyDeleted"));
      router.refresh();
      router.push("/user_companies");
    } catch (error) {
      let message;
      if (error instanceof Error) message = error.message;
      else message = String(error);
      toast.error(message);
    }
    setLoading(false);
  };

  const bodyContent = (
    <div className="flex flex-col w-full mx-auto space-y-6 md:w-2/3">
      <div className="flex flex-row justify-center items-center space-x-3">
        <AlertCircle size={48} />
        <span className="font-semibold text-center">
          {t("deleteCompanyText")}
        </span>
      </div>
      <Button
        title={t("deleteCompanyBtn")}
        btnType="button"
        btnstyle="danger"
        loading={loading}
        onClick={handleClick}
      />
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      title={t("deleteCompanyTitle")}
      onClose={onClose}
      body={bodyContent}
    />
  );
};

export default DeleteCompany;
