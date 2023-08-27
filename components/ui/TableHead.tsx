const TableHead = ({ children }: { children: React.ReactNode }) => {
  return (
    <thead className="text-xs bg-zinc-100 dark:bg-zinc-800">{children}</thead>
  );
};

export default TableHead;
