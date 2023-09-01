const Card = ({
  classes,
  children,
}: {
  classes?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={`${
        classes ? classes : ""
      } w-full max-w-sm bg-white border border-zinc-200 rounded-lg dark:bg-zinc-800 dark:border-zinc-700`}
    >
      {children}
    </div>
  );
};

export default Card;
