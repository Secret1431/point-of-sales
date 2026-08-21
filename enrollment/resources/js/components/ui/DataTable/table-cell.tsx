interface TableCellProps {
  children: React.ReactNode;
  header?: boolean;
  className?: string;
}

export function TableCell({ children, header = false, className = '' }: TableCellProps ) {
  if (header) {
    return (
      <th className={`py-3 px-4 font-semibold text-gray-700 text-left ${className}`}>
        {children}
      </th>
    )
  }

  return (
    <th className={`py-3 px-4 font-semibold text-gray-700`}>
      {children}
    </th>
  )
}