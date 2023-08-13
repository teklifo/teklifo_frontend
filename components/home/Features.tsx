import { useTranslations } from "next-intl";

interface FeatureProps {
  number: string;
  title: string;
  text: string;
}

const Feature = ({ number, title, text }: FeatureProps) => {
  return (
    <div className="flex flex-col space-y-3 md:space-y-0 md:space-x-6 md:flex-row">
      <div className="rounded-full bg-sky-100 md:bg-transparent dark:bg-sky-400 dark:md:bg-transparent">
        <div className="flex items-center space-x-2">
          <div className="px-4 py-2 text-white rounded-full md:py-1 bg-sky-500 dark:text-black">
            {number}
          </div>
          <h3 className="text-base font-bold md:mb-4 md:hidden dark:text-black">
            {title}
          </h3>
        </div>
      </div>
      <div>
        <h3 className="hidden mb-4 text-lg font-bold md:block">{title}</h3>
        <p className="text-zinc-400">{text}</p>
      </div>
    </div>
  );
};

const Features = () => {
  const t = useTranslations("Home");

  return (
    <section
      id="features"
      className="container flex flex-col px-4 mx-auto mt-20 space-y-12 md:space-y-0 md:flex-row"
    >
      <div className="flex flex-col space-y-12 md:w-1/2">
        <h2 className="max-w-md text-4xl font-bold text-center md:text-left">
          {t("featuresTitle")}
        </h2>
        <p className="max-w-sm text-center text-zinc-400 md:text-left">
          {t("featuresText")}
        </p>
      </div>
      <div className="flex flex-col space-y-8 md:w-1/2">
        <Feature
          number="1"
          title={t("featureTitleOne")}
          text={t("featureTextOne")}
        />
        <Feature
          number="2"
          title={t("featureTitleTwo")}
          text={t("featureTextTwo")}
        />
        <Feature
          number="3"
          title={t("featureTitleThree")}
          text={t("featureTextThree")}
        />
      </div>
    </section>
  );
};

export default Features;
