import { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
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
  if (!company)
    return {
      title: `${t("projectName")}`,
      description: "",
    };

  return {
    title: `${company.name} | ${t("projectName")}`,
    description: `${company.name}, ${company.number} | ${company.description}`,
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
    return undefined;
  }
}

export default async function Product({ params: { id } }: Props) {
  const product = await getProduct(id);
  if (!product) return notFound();

  return <ProductContent product={product} />;
}

function ProductContent({ product }: ProductContentProps) {
  const t = useTranslations("Product");

  return (
    <div className="my-0 px-4 md:my-5 md:px-8">
      <div className="w-full flex flex-col space-y-6 lg:flex-row lg:space-x-6">
        <div className="lg:w-2/3">
          <ProductGallery images={product.images} name={product.name} />
        </div>
        <div className="lg:w-1/3">
          <ProductInfo product={product} />
        </div>
      </div>
      {product.description && (
        <div className="my-6">
          <h4 className="text-center text-2xl font-extrabold md:text-start">
            {t("description")}
          </h4>
          <p>{product.description}</p>
        </div>
      )}
    </div>
  );
}
