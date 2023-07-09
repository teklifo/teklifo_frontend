import request from "@/utils/request";
import { User } from "@/types";

export const fetchUser = async (token: string, locale: string) => {
  if (!token) return null;

  const config = {
    headers: {
      Authorization: `JWT ${token}`,
      "Accept-Language": locale,
    },
  };

  try {
    return await request<User>(`/api/auth`, config);
  } catch (error) {
    return null;
  }
};
