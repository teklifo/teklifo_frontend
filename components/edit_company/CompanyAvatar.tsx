"use client";

import React from "react";
import { getCookie } from "cookies-next";
import AvatarUpload from "@/components/utils/AvatarUpload";
import request from "@/utils/request";
import { CompanyType, ImageType } from "@/types";

async function handleImageUpload(company: CompanyType, image: ImageType) {
  try {
    return await request<CompanyType>(`/api/companies/${company.id}`, {
      method: "put",
      headers: {
        Authorization: `JWT ${getCookie("token") ?? ""}`,
        "Accept-Language": getCookie("NEXT_LOCALE") ?? "az",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...company,
        image,
      }),
    });
  } catch (error) {
    throw error;
  }
}

const CompanyAvatar = ({ company }: { company: CompanyType }) => {
  return (
    <AvatarUpload
      image={company.image}
      name={company.name}
      onUpload={async (image) => await handleImageUpload(company, image)}
    />
  );
};

export default CompanyAvatar;
