import request from "@/utils/request";
import { UserType } from "@/types";

export const fetchUser = async (token: string, locale: string) => {
  if (!token) return null;

  const config = {
    headers: {
      Authorization: `JWT ${token}`,
      "Accept-Language": locale,
    },
    cache: "no-cache",
  };

  try {
    return await request<UserType>("/api/auth", config);
  } catch (error) {
    return null;
  }
};
