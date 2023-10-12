import Link from "next/link";
import { useTranslations } from "next-intl";
import Avatar from "@/components/utils/Avatar";
import Divider from "@/components/ui/Divider";
import { ProductType } from "@/types";

type ProductInfoProps = {
  product: ProductType;
};

const ProductInfo = ({ product }: ProductInfoProps) => {
  const t = useTranslations("Product");

  const { company } = product;

  return (
    <div className="w-full border border-zinc-300 rounded-lg dark:border-zinc-700">
      <div className="px-8 py-4 flex flex-col justify-center items-center">
        <Link
          href={`/companies/${company.id}`}
          className="flex justify-center items-center space-x-2 font-bold"
        >
          <Avatar image={company.image} name={company.name} size="sm" />
          <h3>{company.name}</h3>
        </Link>
      </div>
      <Divider classes="w-full" />
      <div className="px-8 py-4 space-y-2 flex flex-col justify-center items-start">
        <h1 className="text-2xl font-bold md:text-3xl">{product.name}</h1>
        <h2 className="text-md font-semibold text-black dark:text-white">
          <span className="text-lg">{product.sellPrice} AZN</span> /{" "}
          <span className="font-normal">{product.unit}</span>
        </h2>
        <h2 className="text-sm">
          <span className="text-zinc-500">{`${t("number")}: `}</span>
          <span>{product.number}</span>
        </h2>
        {product.barcode && (
          <h2 className="text-sm">
            <span className="text-zinc-500">{`${t("barcode")}: `}</span>
            <span>{product.barcode}</span>
          </h2>
        )}
        <h2 className="text-sm">
          <span className="text-zinc-500">{`${t("vatPrc")}: `}</span>
          <span>{`${product.vat}%`}</span>
        </h2>
        <h2 className="text-sm">
          <span className="text-zinc-500">{`${t("inStock")}: `}</span>
          <span>{`${product.inStock} / ${product.unit}`}</span>
        </h2>
      </div>
    </div>
  );
};

export default ProductInfo;
