import { Metadata } from "next";
import Image from "next/image";
import { cookies } from "next/headers";
import { getTranslator } from "next-intl/server";
import { useTranslations } from "next-intl";
import ProductGallery from "@/components/product/ProductGallery";
import ProductInfo from "@/components/product/ProductInfo";
import request from "@/utils/request";
import { ProductType } from "@/types";

type Props = {
  params: { locale: string; id: string };
};

type ProductContentProps = {
  product: ProductType;
};

export async function generateMetadata({
  params: { locale, id },
}: Props): Promise<Metadata> {
  const t = await getTranslator(locale, "Metadata");

  const company = await getProduct(id);

  return {
    title: `${company.name} | ${t("projectName")}`,
    description: `${company.name}, ${company.number}`,
  };
}

async function getProduct(productId: string) {
  const nextCookies = cookies();
  const locale = nextCookies.get("NEXT_LOCALE")?.value ?? "az";

  try {
    return await request<ProductType>(`/api/products/${productId}`, {
      headers: {
        "Accept-Language": locale,
      },
    });
  } catch (error) {
    throw error;
  }
}

export default async function Product({ params: { id } }: Props) {
  const product = await getProduct(id);

  return <ProductContent product={product} />;
}

function ProductContent({ product }: ProductContentProps) {
  const t = useTranslations("Product");

  return (
    <div className="w-full my-0 px-4 flex flex-col space-y-6 lg:flex-row lg:space-x-6 md:my-5 md:px-8">
      <div className="lg:w-2/3">
        <ProductGallery images={product.images} name={product.name} />
      </div>
      <div className="lg:w-1/3">
        <ProductInfo product={product} />
      </div>
    </div>
  );
}
