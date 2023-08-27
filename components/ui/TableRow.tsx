const TableRow = ({ children }: { children: React.ReactNode }) => {
  return (
    <tr className="border-b border-zinc-100 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800">
      {children}
    </tr>
  );
};

export default TableRow;
