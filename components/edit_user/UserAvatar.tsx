"use client";

import React from "react";
import { getCookie } from "cookies-next";
import AvatarUpload from "@/components/utils/AvatarUpload";
import request from "@/utils/request";
import { UserType, ImageType } from "@/types";

async function handleImageUpload(user: UserType, image: ImageType) {
  try {
    return await request<UserType>(`/api/users/${user.id}`, {
      method: "put",
      headers: {
        Authorization: `JWT ${getCookie("token") ?? ""}`,
        "Accept-Language": getCookie("NEXT_LOCALE") ?? "az",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...user,
        image,
      }),
    });
  } catch (error) {
    throw error;
  }
}

const UserAvatar = ({ user }: { user: UserType }) => {
  return (
    <AvatarUpload
      image={user.image}
      name={user.name}
      onUpload={async (image) => await handleImageUpload(user, image)}
    />
  );
};

export default UserAvatar;
