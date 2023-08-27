const TableHeadCell = ({ children }: { children: React.ReactNode }) => {
  return (
    <th scope="col" className="px-6 py-3">
      {children}
    </th>
  );
};

export default TableHeadCell;
