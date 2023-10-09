import { useTranslations } from "next-intl";
import Avatar from "@/components/utils/Avatar";
import Link from "@/components/ui/Link";
import Card from "@/components/ui/Card";
import { CompanyType } from "@/types";

type CompanyCardProps = {
  company: CompanyType;
};

const CompanyCard = ({ company }: CompanyCardProps) => {
  const t = useTranslations("Companies");

  return (
    <Card key={company.id} classes="h-full">
      <div className="flex flex-col items-center py-10 px-2">
        <Avatar image={company.image} name={company.name} />
        <h5 className="mt-3 mb-1 text-xl font-medium text-zinc-900 dark:text-white">
          {company.name}
        </h5>
        <span className="text-sm text-zinc-500 dark:text-zinc-500">
          {company.tin}
        </span>
        <span className="mt-3 text-sm text-center text-zinc-500 dark:text-zinc-500">
          {company.shortDescription?.slice(0, 100)}
        </span>
        <div className="flex mt-4 space-x-3 md:mt-6">
          <Link href={`/companies/${company.id}`} type="primary">
            {t("more")}
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default CompanyCard;
