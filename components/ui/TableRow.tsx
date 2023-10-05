const TableRow = ({ children }: { children: React.ReactNode }) => {
  return (
    <tr className="border-b border-zinc-200 dark:border-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-800">
      {children}
    </tr>
  );
};

export default TableRow;
