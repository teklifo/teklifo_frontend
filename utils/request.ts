import { ApiError } from "@/types";

const request = async <T>(url: string, config?: any): Promise<T> => {
  const response = await fetch(`${process.env.BACKEND_URL}${url}`, config);
  if (!response.ok) {
    const result = (await response.json()) as ApiError;
    const errorMessage = result.errors.map((e) => e.msg).join("\n\n");
    throw Error(errorMessage);
  }
  return await response.json();
};

export default request;
