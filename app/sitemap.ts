import { MetadataRoute } from "next";
import { getCompaniesData, getProductsData } from "@/app/actions/seo";

const URL = "https://teklifo.com";
const locales = ["", "/ru"];

export default async function sitemap() {
  const result = await Promise.all([
    await getCompaniesData(),
    await getProductsData(),
  ]);

  const companies: MetadataRoute.Sitemap = [];
  const companiesData = result[0];
  companiesData.forEach(({ id, updatedAt }) => {
    locales.map((locale) => {
      companies.push({
        url: `${URL}${locale}/companies/${id}`,
        lastModified: updatedAt,
      });
    });
  });

  const products: MetadataRoute.Sitemap = [];
  const productsData = result[1];
  productsData.forEach(({ id, updatedAt }) => {
    locales.map((locale) => {
      products.push({
        url: `${URL}${locale}/products/${id}`,
        lastModified: updatedAt,
      });
    });
  });

  const pages: MetadataRoute.Sitemap = [];
  const routes = ["", "login", "register", "1c_exchange"];
  routes.forEach((route) => {
    locales.map((locale) => {
      pages.push({
        url: `${URL}${locale}/${route}`,
        lastModified: new Date().toISOString(),
      });
    });
  });

  return [...pages, ...companies, ...products];
}
