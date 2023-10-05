import { Metadata } from "next";
import { cookies } from "next/headers";
import Image from "next/image";
import { getTranslator } from "next-intl/server";
import { useTranslations } from "next-intl";
import { PackageSearch } from "lucide-react";
import Divider from "@/components/ui/Divider";
import Pagination from "@/components/ui/Pagination";
import ProductCard from "@/components/utils/ProductCard";
import request from "@/utils/request";
import { ProductType, PaginationType } from "@/types";

type Props = {
  params: { locale: string };
  searchParams: {
    page?: number;
  };
};

type PaginatedData = {
  result: ProductType[];
  pagination: PaginationType;
};

export async function generateMetadata({
  params: { locale },
}: Props): Promise<Metadata> {
  const t = await getTranslator(locale, "Metadata");

  return {
    title: t("productsTitle"),
    description: t("productsDescription"),
  };
}

async function getProducts(page: number) {
  const nextCookies = cookies();
  const locale = nextCookies.get("NEXT_LOCALE")?.value ?? "az";

  try {
    return await request<PaginatedData>(`/api/products?page=${page}&limit=10`, {
      headers: {
        "Accept-Language": locale,
      },
    });
  } catch (error) {
    throw error;
  }
}

export default async function Products({ searchParams: { page } }: Props) {
  const productsData = await getProducts(page ?? 1);
  return <ProductsContent productsData={productsData} />;
}

function ProductsContent({ productsData }: { productsData: PaginatedData }) {
  const t = useTranslations("Products");

  const { result: products, pagination } = productsData;

  return (
    <div className="my-2 mx-4 md:my-5 md:mx-8">
      <div className="flex flex-row items-start space-x-3">
        <PackageSearch size={36} />
        <h1 className="text-3xl font-bold">{t("title")}</h1>
      </div>
      <h3 className="text-zinc-400 mt-1 mb-4">{t("subtitle")}</h3>
      <Divider classes="my-4" />
      {products.length > 0 ? (
        <>
          <div className="grid grid-flow-row auto-rows-max place-items-center grid-cols-1 gap-4 pt-4 md:place-items-start md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="w-full flex flex-row justify-center items-center py-10">
            <Pagination href="/products?page=" pagination={pagination} />
          </div>
        </>
      ) : (
        <div className="flex flex-col justify-center items-center my-10 space-y-12">
          <Image
            src="/no_products.svg"
            alt="no_products"
            width="400"
            height="400"
            priority
          />
          <h5 className="max-w-md text-xl text-center text-zinc-400">
            {t("noProducts")}
          </h5>
        </div>
      )}
    </div>
  );
}
