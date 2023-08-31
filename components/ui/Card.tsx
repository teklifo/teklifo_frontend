const Card = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full max-w-sm bg-white border border-zinc-200 rounded-lg dark:bg-zinc-800 dark:border-zinc-700">
      {children}
    </div>
  );
};

export default Card;
