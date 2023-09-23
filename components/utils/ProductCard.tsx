import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import Card from "@/components/ui/Card";
import Divider from "@/components/ui/Divider";
import { ProductType } from "@/types";

type ProductCardProps = {
  product: ProductType;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const t = useTranslations("ProductCard");

  const image = product.images.length > 0 ? product.images[0].url : "";

  return (
    <Link href={`/products/${product.id}`}>
      <Card classes="h-full overflow-auto transition-all ease-in-out duration-200 hover:shadow-md">
        <div className="w-full h-1/6">
          <Image src={image} width="350" height="350" alt={product.name} />
        </div>
        <Divider />
        <div className="px-5 py-4 space-y-2">
          <h5 className="text-md font-semibold text-black dark:text-white">
            <span>{product.sellPrice} AZN</span> /{" "}
            <span className="font-normal">{product.unit}</span>
          </h5>
          <h5 className="text-xs text-black dark:text-white">{product.name}</h5>
        </div>
        <Divider />
        <div className="w-full flex flex-row justify-center items-center my-4 space-x-2">
          <span className="font-bold">{t("more")}</span>
          <ArrowRight />
        </div>
      </Card>
    </Link>
  );
};

export default ProductCard;
