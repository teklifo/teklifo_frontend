import { Metadata } from "next";
import Image from "next/image";
import { cookies } from "next/headers";
import { getTranslator } from "next-intl/server";
import { useTranslations } from "next-intl";
import Carousel from "@/components/ui/Carousel";
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
    <div className="w-full my-5 flex flex-col space-y-3 md:flex-row md:space-x-6">
      <div className="w-2/3">
        <Carousel>
          {product.images.map((image) => (
            <div
              key={image.id}
              className="w-[500px] h-[500px] relative overflow-hidden"
            >
              <Image
                src={image.url}
                alt={product.name}
                width="500"
                height="500"
                priority
                className="absolute w-full h-full inset-0 object-contain bg-transparent"
              />
            </div>
          ))}
        </Carousel>
      </div>
      <div className="w-1/3">
        <ProductInfo product={product} />
      </div>
    </div>
  );
}
