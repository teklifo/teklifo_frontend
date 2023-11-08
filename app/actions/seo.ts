import request from "@/utils/request";
import { SEOData } from "@/types";

export const getCompaniesData = async () => {
  try {
    return await request<SEOData[]>(`/api/seo/companies`, {
      cache: "no-cache",
    });
  } catch (error) {
    return [];
  }
};

export const getProductsData = async () => {
  try {
    return await request<SEOData[]>(`/api/seo/products`, { cache: "no-cache" });
  } catch (error) {
    return [];
  }
};
